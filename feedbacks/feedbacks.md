# Feedback Log

Corrections and confirmed preferences given to Claude during sessions in this repo. Newest entries at the bottom. Split into `feedbacks/<subject>.md` once this file gets large, and index the split files here.

---

**Date-only strings must use local date components, never `toISOString()`.** `toDateStr` used `toISOString()` (UTC) to derive "today's date" for streak/check-in comparisons — shifted the date back a day for positive-UTC-offset users, so today's check-in never matched and active-streak styling never applied. Fixed in `src/lib/time.ts` `toDateStr` (commit `2cc5811`). When writing/reviewing date-only string logic, use `getFullYear`/`getMonth`/`getDate` or date-fns local formatting instead. See `src/components/progress/cards/StreakBars.tsx` / `StreakCard.tsx` for the related `--streak-active` color-token pattern (active streak full opacity, prior streaks 50%) if touching streak UI again.

**Mobile/RTL UI conventions (set in the responsive layout pass, commit `3b5a8e5`):** app supports Hebrew (RTL, he-IL) + iOS Safari, so physical-direction classes and zoom-based scaling break on both.
- Mobile form inputs/textareas must avoid iOS Safari zoom-on-focus — keep `font-size >= 16px`, don't rely on CSS zoom.
- ShareProgressCard/Modal scale via `em` units, not CSS `zoom` (unreliable cross-browser).
- Floating action buttons (NewGoalFloatingButton, NewPostFloatingButton) use `end-4` not `right-4` — use logical positioning (`start`/`end`, `ps`/`pe`) for any new fixed/absolute-positioned UI.

**When told to "read carefully" or "follow the template exactly," inspect the actual spec/system before guessing.** A GitHub issue-bot validation failed 12 times because random variations were tried instead of reading the bot's validation rules or an existing valid issue (open issue #94647 used `###`/h3 headers — the answer was already visible there). Before a retry loop: read the actual rules/examples, check existing valid cases, inspect code/config — only then iterate.
