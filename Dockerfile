FROM node:22-alpine AS base

# ── deps ──────────────────────────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── dev ───────────────────────────────────────────────────────────────────────
FROM base AS dev
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ── builder ───────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SERVER_API_VERSION
ARG NEXT_PUBLIC_HOSTNAME
ARG NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
ARG NEXT_PUBLIC_SENTRY_DSN

ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_API_VERSION=$NEXT_PUBLIC_SERVER_API_VERSION
ENV NEXT_PUBLIC_HOSTNAME=$NEXT_PUBLIC_HOSTNAME
ENV NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE=$NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN

RUN npm run build

# ── runner ────────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
