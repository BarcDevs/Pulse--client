# Corrections — Date Handling

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 12/09/2026 — Date-only strings must use local date components, never `toISOString()`

`toDateStr` used `toISOString()` (UTC) to derive "today's date" for streak/check-in comparisons — shifted the date back a day for positive-UTC-offset users, so today's check-in never matched and active-streak styling never applied. Fixed in `src/lib/time.ts` `toDateStr` (commit `2cc5811`). When writing/reviewing date-only string logic, use `getFullYear`/`getMonth`/`getDate` or date-fns local formatting instead. See `src/components/progress/cards/StreakBars.tsx` / `StreakCard.tsx` for the related `--streak-active` color-token pattern (active streak full opacity, prior streaks 50%) if touching streak UI again.
