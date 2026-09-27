# Decisions — Charts & RTL

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 18/09/2026 — Trend charts never reverse day order by locale

**Problem:** `useCheckInChartData.ts` reversed the chart data array for Hebrew (newest-left), opposite of English. `TrendChart` reads array order directly (page `dir` doesn't affect SVG order), so layering an `XAxis reversed` fix on top double-reversed and desynced points from labels/tooltip.

**Decision:** timeline direction is locale-independent — oldest → newest, left to right, in Hebrew and English. RTL reversal removed. User: "time dir itself doesn't change (you always write time from left to right regardless on lang). that's the final decision."

**Why over alternatives:** reverse-data + `XAxis reversed` is more code for the same visual and is exactly what drifted out of sync.

**How to apply:** don't reverse chronological order for RTL in any chart. `reverseChartData` in `src/utils/chart.ts` is left in place but has no chart caller — don't reintroduce it for ordering without re-litigating.

## 18/09/2026 — Chart no-data days: grey fill for leading/trailing gaps, dashed bridge only between two visible points

**Decision:** in `TrendChart`, days with no data that are *not* between two visible real points get a grey `ReferenceArea` background (from the edge to the first/last real day, inclusive). The series-colored dashed bridge is drawn only between two real points inside the visible window — never from the off-screen previous-day anchor (`seriesPrevious`, kept for tracking), which rendered as a dashed line trailing into nothing.
