# Decisions — Observability

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 12/09/2026 — Sentry (`@sentry/nextjs`) added for error tracking + perf monitoring

Commit `f3df38e`. Configured client/server/edge via `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts` + `src/instrumentation.ts` (instrumentation hook enabled in `next.config.mjs`). Sampling is env-based: 100% traces in dev, 10% in prod. Future error-handling/observability work should route through these existing configs rather than adding new logging. `.heap-diagnostics` and Sentry configs are excluded from eslint (chore commit `74bb040`).

---

## 27/09/2026 — EC2 deploy wired to the real Sentry DSN

`.github/workflows/deploy.yml`'s Docker build-args had `NEXT_PUBLIC_SENTRY_DSN=` hardcoded blank since the initial AWS cutover (TODO #3, "Finalising / Deployment"), so the EC2-hosted client never reported to Sentry. Set it to the same DSN already used by the old Vercel deploy (`o4506954726703104.ingest.us.sentry.io`, found in the local, gitignored `.env.local`). Hardcoded directly in the workflow rather than a GitHub Actions secret — a Sentry DSN is meant to ship in the client bundle (that's how the browser SDK reports), same as the already-hardcoded `NEXT_PUBLIC_SERVER_URL`/`NEXT_PUBLIC_HOSTNAME` build-args; it isn't a credential.

`NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE` was left at `0` (disabled) rather than matching Vercel's `1.0`. This is a health/recovery app — session replay recording 100% of sessions by default has real privacy implications (check-in notes, mood/pain data on screen) that deserve an explicit decision, not a silent carry-over from the old config. Revisit once someone consciously signs off on replay + what it captures.
