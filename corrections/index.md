# Corrections — index

**Why this file exists:** corrections and confirmed preferences given to Claude during sessions
in this repo, so the same correction never needs repeating.

⚠️ **Load on demand.** This is a log of past mistakes/preferences, grouped by topic so a session
only opens the one file it actually needs, not every dated entry ever written. Full spec:
`~/Claude/work/projects/RULES.md`.

## Date Handling — [[corrections/date-handling]]
Date-only string logic bugs from timezone-unsafe conversions.

| Date | Entry |
|---|---|
| 12/09/2026 | Date-only strings must use local date components, never `toISOString()` |

## RTL & Mobile UI — [[corrections/rtl-mobile-ui]]
Conventions from the responsive/RTL layout pass — physical-direction classes and zoom-based scaling break on Hebrew RTL + iOS Safari.

| Date | Entry |
|---|---|
| 12/09/2026 | Mobile/RTL UI conventions (iOS zoom-on-focus, `em` scaling, logical positioning) |
| 30/09/2026 | shadcn `Switch` mirrors under RTL - always wrap it in `dir="ltr"` |

## Hebrew Copy — [[corrections/hebrew-copy]]
Terminology and wording rules for `messages/he-IL.json` — established Hebrew terms over transliterations.

| Date | Entry |
|---|---|
| 24/09/2026 | "check-in" is דיווח יומי, never the transliteration צ'ק-אין |
| 24/09/2026 | Copy uses plain keyboard punctuation: no em-dashes, curly quotes/apostrophes, gershayim or low-9 quotes |

## Verification Process — [[corrections/verification-process]]
Guessing at a spec instead of checking the actual rules/examples first.

| Date | Entry |
|---|---|
| 12/09/2026 | When told to "read carefully" or "follow the template exactly," inspect the actual spec/system before guessing |
| 18/09/2026 | Claimed a Firefox-only font fix "fixed" it with no way to test in Firefox |
| 23/09/2026 | Font fix committed twice without checking the served CSS; Turbopack ignored `adjustFontFallback` and `.next/dev` served stale CSS |
| 29/09/2026 | Model Selection in CLAUDE.md said Haiku for sub-agents (stale); Sonnet default, Opus via /opusplan |

## Working Style — [[corrections/working-style]]
How to act on bug reports and where to log — state the fix before broad edits, log in this repo, check other branches before claiming a file doesn't exist.

| Date | Entry |
|---|---|
| 18/09/2026 | Jumped to a broad code change on a bug report instead of stating the fix first |
| 18/09/2026 | Wrote corrections into the sibling repo; asserted local log didn't exist without checking other branches |
| 26/09/2026 | Merged into a branch another session was using without coordinating with it first |
| 23/09/2026 | Used `refactor` commit type instead of `rfc` (GIT_RULES); existing commits not renamed |
| 23/09/2026 | Pushed a branch without its tags and argued for withholding them; always push tags |
| 23/09/2026 | Ran Python scripts to edit files instead of the Edit tool |
| 25/09/2026 | Dead code is removed in a separate cleanup commit, not left marked or noted |
| 25/09/2026 | Branched and upgraded deps in the shared checkout while another session was in it; create the worktree first |
| 26/09/2026 | Did a whole rfc series on whatever branch was checked out (the upgrade branch); every separate piece of work gets its own branch, created by Claude without being asked |
| 25/09/2026 | Swapped "Claude routines" for a session cron and never said where scheduled output lands |
| 26/09/2026 | Opened a PR from a feature branch into `development` (direct push is the rule), pushed without tags, and read files via Bash instead of Read/Grep |
| 29/09/2026 | Opened feature → `development` PRs again (#25, #26) from a server session; never read this repo's corrections index before client git work |
| 23/09/2026 | Built new MCP wiring instead of checking `disabledMcpjsonServers` / a working sibling project's settings |
| 28/09/2026 | Blanket-killed every Node process on the machine (`taskkill /IM node.exe`) to free one busy directory instead of targeting the one PID |

## Code Placement — [[corrections/code-placement]]
Where new constants/config values belong.

| Date | Entry |
|---|---|
| 23/09/2026 | Tunable delays go in `src/config/timings.ts`, not `src/constants/time.ts` (which is unit conversions only) |
| 23/09/2026 | Durations must use `*InMs` constants, not magic numbers, even when the surrounding file doesn't |

## Chart No-Data Regions — [[corrections/chart-no-data-regions]]
Reimplementing a dropped fix from scratch instead of restoring the original commit.

| Date | Entry |
|---|---|
| 27/09/2026 | Before reimplementing a "this used to work" fix, `git log --all -S "<symbol>"` to find and restore the original commit instead of re-deriving boundary logic from scratch |
