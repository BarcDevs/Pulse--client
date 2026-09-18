# Decisions — log

**Why this file exists:** architecture/product decisions made during sessions in this repo, with
the reasoning behind them, so a session doesn't have to re-derive or re-litigate a choice already
made deliberately.

Single log file for now — split into `index.md` + topic files once this grows large enough to need
it (see `~/Claude/work/projects/.sources/RULES.md` § Context Log for the full split format).

---

## 18/09/2026 — Trend charts (mood/pain history) never reverse day order by locale

**Problem:** `useCheckInChartData.ts` reversed the chart's data array for Hebrew (`isRtl ? reverseChartData(filled) : filled`), so Hebrew users saw newest-day-on-left, oldest-on-right — opposite of English. This desynced from `TrendChart.tsx`'s x-axis/tooltip rendering (which reads array order directly, unaffected by page `dir`), producing a visible mismatch between plotted points and axis labels when a redundant `XAxis reversed` prop was tried as a fix on top of it.

**Decision:** chart timeline direction is locale-independent. Removed the RTL reversal entirely — chronological order (oldest → newest, left to right) is now identical in Hebrew and English. Quoting the user: *"timed chart should actually shouldn't differ between heb/eng since time dir itself doesn't change (you always write time from left to right regardless on lang). that's the final decision. lock it on."*

**Why over alternatives:** the tempting alternative — reverse the data AND add `XAxis reversed` to visually re-flip it back for RTL — is strictly more code for the same visual result, and is what caused the original bug (the two reversals didn't stay in sync across the axis/tooltip/bridge-line rendering). Removing the single source of asymmetry is simpler and can't drift out of sync again.

**How to apply:** any other locale-aware chart/data-ordering code in this app should default to *not* reversing chronological order for RTL — direction-of-time is not a text-direction property. `src/utils/chart.ts`'s `reverseChartData` helper is still present (only its one former call site was removed) — don't reintroduce it for a chart-ordering use case without re-litigating this decision first.
