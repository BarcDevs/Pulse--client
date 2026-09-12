# Decisions — index

**Why this file exists:** architecture/technical decisions made during sessions in this repo,
with reasoning, so they don't need re-deriving or re-explaining in a future session.

⚠️ **Load on demand.** This is a log grouped by topic so a session only opens the one file it
actually needs, not every dated entry ever written. Full spec: `~/Claude/work/projects/RULES.md`.

## Performance — [[decisions/performance]]
Dev-server / build performance root causes and fixes.

| Date | Entry |
|---|---|
| 11/06/2026 | Dev-server OOM root cause: Next.js dev-server HMR module-instance retention, not Turbopack |

## Observability — [[decisions/observability]]
Error tracking and performance-monitoring tooling decisions.

| Date | Entry |
|---|---|
| 12/09/2026 | Sentry (`@sentry/nextjs`) added for error tracking + perf monitoring |
