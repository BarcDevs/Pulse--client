# Sentry Errors

Maintained by the Sentry error monitor routine (`.claude/routines/sentry-error-monitor.md`).

Shaped like `decisions/` and `corrections/`: this index holds one row per Sentry issue, so it
stays short. Each issue's diagnosis lives in its own `<slug>.md` next to this file. Resolved
issues that haven't recurred in a while move to `archive/<slug>.md` (row removed here, file kept
verbatim plus an "archived <date> — why" line).

The routine records on the local branch `monitor/records` (one commit on top of `development`,
amended every run). Records reach `development` only together with a merged fix.

## Known Issues

Sentry issues already diagnosed. When one shows up again (new events or a regression), the
routine bumps its row instead of re-diagnosing, and flags it if a recorded fix didn't hold.

| Issue | Title | Seen in runs | First seen | Last seen | Record |
|-------|-------|--------------|------------|-----------|--------|

<!--
Row template:
| PULSE-CLIENT-<n> | <issue title> | N | YYYY-MM-DD | YYYY-MM-DD | [<slug>](<slug>.md) |

<slug>.md template:
# <issue title>
- **Sentry issue:** PULSE-CLIENT-<n> (<link>)
- **Fingerprint / culprit:** ...
- **First seen:** YYYY-MM-DD
- **Root cause:** ...
- **Fix:** <what changed> (<commit link>) | not auto-applied, notify only (see confidence gate) |
  blocked by review, branch <name> left unmerged | merge blocked, checkout busy, branch <name>
  left unmerged
-->
