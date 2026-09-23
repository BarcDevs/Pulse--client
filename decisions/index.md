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

## Charts & RTL — [[decisions/charts-and-rtl]]
Trend-chart ordering and no-data rendering rules.

| Date | Entry |
|---|---|
| 18/09/2026 | Trend charts never reverse day order by locale |
| 18/09/2026 | No-data days: grey fill for leading/trailing gaps; dashed bridge only between two visible points |

## Error Handling — [[decisions/error-handling]]
How network/unexpected errors surface to the user.

| Date | Entry |
|---|---|
| 23/09/2026 | Network errors never redirect to `/network-error`; use the gentle network bar |

## Privacy & Consent — [[decisions/privacy-and-consent]]
Cookie/storage consent and privacy-disclosure decisions.

| Date | Entry |
|---|---|
| 23/09/2026 | No cookie/cache consent popup — no non-essential storage written; disclose on the Privacy page |
