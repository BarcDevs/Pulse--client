#!/bin/bash
set -euo pipefail

# Runs on the EC2 box via SSM Run Command (AWS-RunShellScript), triggered by
# .github/workflows/deploy.yml after a merge to main. Pulls the image CI just
# pushed to ECR, then blue/green-swaps the app container so a bad image never
# takes down the last-known-good one. No secrets/migrations here — all
# NEXT_PUBLIC_* config is baked in at build time in CI.

REGION="eu-central-1"
ACCOUNT_ID="110015905368"
ECR="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"
REPO="pulse-client-app"
IMAGE_TAG="${1:?image tag required}"

health_check() {
    local port="$1"
    for i in $(seq 1 15); do
        if curl -sf --max-time 5 "http://localhost:$port/" > /dev/null; then
            return 0
        fi
        sleep 2
    done
    return 1
}

aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$ECR"

docker pull "$ECR/$REPO:$IMAGE_TAG"

echo "Starting candidate container on a staging port..."
docker rm -f pulse-client-candidate 2>/dev/null || true
docker run -d --name pulse-client-candidate -p 127.0.0.1:3001:3000 \
    "$ECR/$REPO:$IMAGE_TAG"

if ! health_check 3001; then
    echo "Candidate container failed health check — leaving the current production container untouched." >&2
    docker logs --tail 100 pulse-client-candidate >&2 || true
    docker rm -f pulse-client-candidate 2>/dev/null || true
    exit 1
fi

echo "Candidate healthy. Swapping into production..."
docker rm -f pulse-client-candidate

# Idempotent swap: clear any stale leftover from an interrupted previous run
# before renaming, so a wedged pulse-client-prev can never block this deploy.
docker rm -f pulse-client-prev 2>/dev/null || true
if docker inspect pulse-client > /dev/null 2>&1; then
    docker rename pulse-client pulse-client-prev
    docker stop pulse-client-prev > /dev/null 2>&1 || true
fi

docker run -d --name pulse-client --restart=always -p 80:3000 \
    "$ECR/$REPO:$IMAGE_TAG"

if health_check 80; then
    echo "Deploy succeeded, container healthy."
    docker rm -f pulse-client-prev 2>/dev/null || true
    docker image prune -af --filter "until=24h" > /dev/null 2>&1 || true
    exit 0
fi

echo "New production container failed its health check — rolling back to the previous image." >&2
docker logs --tail 100 pulse-client >&2 || true
docker rm -f pulse-client 2>/dev/null || true
if docker rename pulse-client-prev pulse-client 2>/dev/null; then
    docker start pulse-client > /dev/null 2>&1 || true
    echo "Rolled back to previous container." >&2
else
    echo "No previous container to roll back to — production is down. Check EC2 manually." >&2
fi
exit 1
