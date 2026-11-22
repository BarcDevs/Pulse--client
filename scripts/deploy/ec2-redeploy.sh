#!/bin/bash
set -euo pipefail

# Runs on the EC2 box via SSM Run Command (AWS-RunShellScript), triggered by
# .github/workflows/deploy.yml after a merge to main. Pulls the image CI just
# pushed to ECR, then blue/green-swaps the app container so a bad image never
# takes down the last-known-good one. No migrations here — all NEXT_PUBLIC_*
# config is baked in at build time in CI. The only secret is the Cloudflare
# Tunnel token: public traffic arrives through an outbound-only tunnel, so the
# app binds to localhost and the security group has no public HTTP ingress.

REGION="eu-central-1"
ACCOUNT_ID="110015905368"
ECR="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"
REPO="pulse-client-app"
IMAGE_TAG="${1:?image tag required}"
CLOUDFLARED_IMAGE="cloudflare/cloudflared:2026.10.3"

# Starts cloudflared (host network, forwards to localhost:80) unless it is
# already running this pinned version.
ensure_tunnel() {
    if [ "$(docker inspect -f '{{.State.Running}} {{.Config.Image}}' cloudflared 2>/dev/null)" = "true $CLOUDFLARED_IMAGE" ]; then
        return 0
    fi
    local token
    token=$(aws secretsmanager get-secret-value --region "$REGION" \
        --secret-id pulse/client/CLOUDFLARE_TUNNEL_TOKEN --query SecretString --output text)
    docker rm -f cloudflared 2>/dev/null || true
    docker run -d --name cloudflared --restart=always --network host \
        -e TUNNEL_TOKEN="$token" \
        "$CLOUDFLARED_IMAGE" tunnel --no-autoupdate run
    echo "cloudflared (re)started."
}

# One deploy at a time on the box: the server and the client deploys share this
# lock, so two candidates never run together and one deploy never prunes the
# other's rollback image. Waits up to 10 minutes, then gives up. The lock is
# held until this script exits.
DEPLOY_LOCK_FILE="${DEPLOY_LOCK_FILE:-/var/lock/pulse-deploy.lock}"
acquire_deploy_lock() {
    exec 9>"$DEPLOY_LOCK_FILE"
    if ! flock -w "${DEPLOY_LOCK_WAIT_SECONDS:-600}" 9; then
        echo "Another deploy holds $DEPLOY_LOCK_FILE - giving up." >&2
        return 1
    fi
}

# Image references of ONE repository to remove: reads "repo:tag" lines on stdin,
# newest first (the order `docker images` prints), skips the newest KEEP and any
# untagged line, and never lists an image of another repository.
select_images_to_prune() {
    local repo="$1" keep="$2"
    grep -F "$repo:" | grep -v '<none>' | tail -n "+$((keep + 1))" || true
}

# `docker rmi` refuses an image a container still uses, so the running and the
# previous containers' images are always safe.
prune_old_images() {
    docker images --format '{{.Repository}}:{{.Tag}}' "$1"         | select_images_to_prune "$1" "$2"         | xargs -r docker rmi > /dev/null 2>&1 || true
}

# Gives the container time to finish in-flight requests before Docker kills it.
graceful_stop() {
    docker stop -t "${2:-30}" "$1" > /dev/null 2>&1 || true
}

# Last good image tag per service, kept in Parameter Store so a replaced box
# boots the version that last passed its health check.
write_last_good() {
    aws ssm put-parameter --region "$REGION" --name "/pulse/last-good/$1"         --value "$2" --type String --overwrite > /dev/null
}

health_check() {
    local port="$1"
    for i in $(seq 1 60); do
        if curl -sf --max-time 5 "http://localhost:$port/" > /dev/null; then
            return 0
        fi
        sleep 2
    done
    return 1
}

# --- Edge mode -------------------------------------------------------------
# On the app box the server deploy (or boot-stack.sh) has created the pulse_edge
# network, and cloudflared (a compose service) reaches this container as
# client:3000. The client then runs on pulse_edge at a fixed address with the
# alias `client`, and the swap uses the candidate as a bridge, like the server's.
# On the old client box pulse_edge does not exist and the host-port flow below is
# used unchanged. Keep in sync with the server's ec2-redeploy.sh.
edge_mode() {
    docker network inspect pulse_edge > /dev/null 2>&1
}

# Health check from inside the container: Node is in the image (curl and wget
# are not guaranteed), so it needs no published port.
container_health_check() {
    local name="$1"
    for i in $(seq 1 60); do
        if docker exec "$name" node -e "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))" > /dev/null 2>&1; then
            return 0
        fi
        sleep 2
    done
    return 1
}

# Fixed address on pulse_edge; extra arguments (restart policy, alias) follow.
# Needs ECR, REPO and IMAGE_TAG.
run_client_container() {
    local name="$1" ip="$2"
    shift 2
    docker run -d --name "$name" --network pulse_edge --ip "$ip"         --cap-drop ALL --security-opt no-new-privileges --pids-limit 512         "$@"         "$ECR/$REPO:$IMAGE_TAG" > /dev/null || return 1
}

# A running container cannot gain an alias, so it is reconnected with the same address.
attach_alias() {
    local name="$1" ip="$2" alias="$3"
    docker network disconnect pulse_edge "$name" || return 1
    docker network connect --ip "$ip" --alias "$alias" pulse_edge "$name" || return 1
}

is_running() {
    [ "$(docker inspect -f '{{.State.Running}}' "$1" 2>/dev/null)" = "true" ]
}

# A run that died between stopping the old container and starting the new one
# leaves pulse-client stopped (or gone) and pulse-client-prev holding the last
# good container.
recover_interrupted_run() {
    if ! is_running pulse-client && docker inspect pulse-client-prev > /dev/null 2>&1; then
        echo "Interrupted earlier deploy: restoring pulse-client-prev as pulse-client."
        docker rm -f pulse-client > /dev/null 2>&1 || true
        docker rename pulse-client-prev pulse-client || return 1
        docker start pulse-client > /dev/null || return 1
    fi
}

# Zero-gap swap on pulse_edge: the candidate (.21) passes the health check and takes
# the alias, the old container is stopped gracefully, the new pulse-client (.20)
# starts, and only when it is healthy the candidate and the old one go.
swap_client_edge() {
    local direct=""
    recover_interrupted_run || return 1
    if ! is_running pulse-client && is_running pulse-client-candidate; then
        direct=1
        echo "pulse-client is not running and the candidate is serving: starting pulse-client without a new candidate."
    fi

    if [ -z "$direct" ]; then
        echo "Starting candidate container on pulse_edge..."
        docker rm -f pulse-client-candidate > /dev/null 2>&1 || true
        run_client_container pulse-client-candidate 172.30.0.21 || return 1
        if ! container_health_check pulse-client-candidate; then
            echo "Candidate container failed health check — leaving the current production container untouched." >&2
            docker logs --tail 100 pulse-client-candidate >&2 || true
            docker rm -f pulse-client-candidate > /dev/null 2>&1 || true
            return 1
        fi
        echo "Candidate healthy. Taking over the client alias and swapping..."
        attach_alias pulse-client-candidate 172.30.0.21 client || return 1
        docker rm -f pulse-client-prev > /dev/null 2>&1 || true
        if docker inspect pulse-client > /dev/null 2>&1; then
            docker rename pulse-client pulse-client-prev || return 1
            docker update --restart=no pulse-client-prev > /dev/null 2>&1 || true
            graceful_stop pulse-client-prev
        fi
    fi

    run_client_container pulse-client 172.30.0.20 --restart=unless-stopped --network-alias client || true
    if is_running pulse-client && container_health_check pulse-client; then
        echo "Deploy succeeded, container healthy."
        graceful_stop pulse-client-candidate
        docker rm -f pulse-client-candidate > /dev/null 2>&1 || true
        docker rm -f pulse-client-prev > /dev/null 2>&1 || true
        return 0
    fi

    echo "New production container failed its health check — rolling back to the previous image." >&2
    docker logs --tail 100 pulse-client >&2 || true
    docker rm -f pulse-client > /dev/null 2>&1 || true
    if docker rename pulse-client-prev pulse-client 2>/dev/null; then
        docker update --restart=unless-stopped pulse-client > /dev/null 2>&1 || true
        docker start pulse-client > /dev/null 2>&1 || true
        if container_health_check pulse-client; then
            docker rm -f pulse-client-candidate > /dev/null 2>&1 || true
            echo "Rolled back to previous container." >&2
        else
            echo "Rolled back container did not become healthy — the candidate (if any) still serves. Check EC2 manually." >&2
        fi
    elif is_running pulse-client-candidate; then
        echo "No previous container to roll back to — the candidate keeps serving. Check EC2 manually." >&2
    else
        echo "No previous container to roll back to — production is down. Check EC2 manually." >&2
    fi
    return 1
}

if [ -n "${REDEPLOY_SOURCE_ONLY:-}" ]; then
    return 0
fi

acquire_deploy_lock

aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$ECR"

docker pull "$ECR/$REPO:$IMAGE_TAG"

if edge_mode; then
    # cloudflared is a compose service on this box: no host-network connector here
    if swap_client_edge; then
        prune_old_images "$ECR/$REPO" 2
        write_last_good client "$IMAGE_TAG"             || echo "WARNING: could not record the last good tag in Parameter Store." >&2
        exit 0
    fi
    exit 1
fi

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
graceful_stop pulse-client-candidate
docker rm -f pulse-client-candidate

# Idempotent swap: clear any stale leftover from an interrupted previous run
# before renaming, so a wedged pulse-client-prev can never block this deploy.
docker rm -f pulse-client-prev 2>/dev/null || true
if docker inspect pulse-client > /dev/null 2>&1; then
    docker rename pulse-client pulse-client-prev
    graceful_stop pulse-client-prev
fi

docker run -d --name pulse-client --restart=always -p 127.0.0.1:80:3000 \
    "$ECR/$REPO:$IMAGE_TAG"

if health_check 80; then
    echo "Deploy succeeded, container healthy."
    ensure_tunnel
    docker rm -f pulse-client-prev 2>/dev/null || true
    prune_old_images "$ECR/$REPO" 2
    write_last_good client "$IMAGE_TAG" || echo "WARNING: could not record the last good tag in Parameter Store." >&2
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
