# Decisions — Observability

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 12/09/2026 — Sentry (`@sentry/nextjs`) added for error tracking + perf monitoring

Commit `f3df38e`. Configured client/server/edge via `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts` + `src/instrumentation.ts` (instrumentation hook enabled in `next.config.mjs`). Sampling is env-based: 100% traces in dev, 10% in prod. Future error-handling/observability work should route through these existing configs rather than adding new logging. `.heap-diagnostics` and Sentry configs are excluded from eslint (chore commit `74bb040`).
