# Decisions — Observability

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 12/09/2026 — Sentry (`@sentry/nextjs`) added for error tracking + perf monitoring

Commit `f3df38e`. Configured client/server/edge via `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts` + `src/instrumentation.ts` (instrumentation hook enabled in `next.config.mjs`). Sampling is env-based: 100% traces in dev, 10% in prod. Future error-handling/observability work should route through these existing configs rather than adding new logging. `.heap-diagnostics` and Sentry configs are excluded from eslint (chore commit `74bb040`).

---

## 27/09/2026 — EC2 deploy wired to the real Sentry DSN

`.github/workflows/deploy.yml`'s Docker build-args had `NEXT_PUBLIC_SENTRY_DSN=` hardcoded blank since the initial AWS cutover (TODO #3, "Finalising / Deployment"), so the EC2-hosted client never reported to Sentry. Set it to the same DSN already used by the old Vercel deploy (`o4506954726703104.ingest.us.sentry.io`, found in the local, gitignored `.env.local`). Hardcoded directly in the workflow rather than a GitHub Actions secret — a Sentry DSN is meant to ship in the client bundle (that's how the browser SDK reports), same as the already-hardcoded `NEXT_PUBLIC_SERVER_URL`/`NEXT_PUBLIC_HOSTNAME` build-args; it isn't a credential.

`NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE` was left at `0` (disabled) rather than matching Vercel's `1.0`. This is a health/recovery app — session replay recording 100% of sessions by default has real privacy implications (check-in notes, mood/pain data on screen) that deserve an explicit decision, not a silent carry-over from the old config. Revisit once someone consciously signs off on replay + what it captures. (Moot for now anyway — see below, no replay integration is actually wired up.)

---

## 28/09/2026 — Client-side Sentry was never actually initializing

Verifying the DSN fix above (local prod build + serve, checked `window.__SENTRY__` in the browser) found `sentry.client.config.ts` was dead code: `next.config.mjs` never wraps the config with `withSentryConfig`, which is what auto-injects that file into the client bundle, so it was never imported or executed — `src/instrumentation.ts`'s `register()` only handles `nodejs`/`edge` runtimes. Client-side errors have never reached Sentry, independent of the DSN being blank. Also noticed while in there: `replaysSessionSampleRate` in `src/config/index.ts` is computed but never passed to a `Sentry.replayIntegration()` — no replay integration exists at all, so the sample-rate question above is currently moot either way.

Fixed by moving the client init into `src/instrumentation-client.ts` — Next's own native client-instrumentation convention (no Sentry webpack plugin required), which `@sentry/nextjs` itself recommends over `sentry.client.config.ts` (its webpack-plugin code logs a deprecation warning: "`sentry.client.config.ts` will no longer work" under Turbopack, which this repo's `dev` already uses). Deleted `sentry.client.config.ts`. Verified via a local production build + `node .next/standalone/server.js`: `window.__SENTRY__` is present (`version: 10.57.0`) after the fix, absent before it.

Server/edge init (`sentry.server.config.ts`, `sentry.edge.config.ts` via `src/instrumentation.ts`) is unaffected — that path doesn't depend on the webpack plugin and was never in question.

---

## 30/09/2026 — Sentry MCP is intentionally connected at two scopes

Project `.mcp.json` `sentry` serves local interactive sessions in this repo only. The account-level `claude.ai Sentry` connector (claude.ai/customize/connectors) is required by the cloud **Pulse Sentry Error Watch** routine, since cloud routines can't read local `.mcp.json`. Side effect: `claude.ai Sentry` shows in `/mcp` in every local session, in any project, and cannot be scoped to one project. Decision: keep both; disable the connector per session where unwanted. Do NOT remove the connector without pausing the routine first, and don't treat its presence as a stray global override.

---

## 30/09/2026 — Feedback Watch routine needs `docs.google.com` + `*.googleusercontent.com` in its cloud environment's allowed domains

**Pulse Feedback Watch** (`trig_01Ue4TBymyq5EP6WWEQeMprK`) failed 29–30/09 with `EGRESS_BLOCKED`: the routine's environment (`env_01A9QMZipgECw9E5e37T9Lja`) blocked `docs.google.com`. Google's public CSV export then redirects to a rotating `doc-XX-YY-sheets.googleusercontent.com` host, so that domain family must be allowed too (wildcard, since the subdomain changes). Both were added under the environment's Network access; verified by a manual run that fetched the CSV (header-only, zero responses yet).

The failure was silent in the routine list: a blocked fetch is reported as the final message per the prompt, so the run status was still `succeeded`. Check `list_runs` + `get_run_log`, not the status field, when debugging this routine.
