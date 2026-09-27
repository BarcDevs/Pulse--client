# Corrections — Chart No-Data Regions

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 27/09/2026 — Reimplemented a dropped no-data grey-out fix from scratch, got the boundary math wrong

The dashboard/progress chart unification (`c4c21d3`) silently dropped a prior fix (`1e859ee`,
`fix(charts): grey out no-data ranges, fix RTL/LTR chart order...`) without carrying it into the
new shared `TrendChart.tsx`. Asked to fix the resulting missing grey background, guessed a
reimplementation using `firstIdx - 1` / `lastIdx + 1` as the `ReferenceArea` boundary (exclusive of
the real-data day) — this left a one-day gap between the grey no-data band and the first/last real
point. User: "the fill should reach UNTIL THE EXACT DAY CHECKED IN no day before" / "see state
before that change".

The original fix used the real-data index itself as the inclusive boundary
(`x2: enrichedData[firstGlobalIdx].date`), so the grey band reaches all the way to touch the
check-in day. It also used a much lighter fill (`var(--muted-foreground)` @ 0.15 vs. a guessed
`var(--muted)` @ 0.5) and handled the all-empty-chart case, which the reimplementation missed.

**Lesson:** before reimplementing any "this used to work" fix from scratch, run
`git log --all --oneline -S "<key symbol from the missing feature>"` to find the commit that added
it, and restore it verbatim (or diff against it) instead of re-deriving the logic. Also: when a bug
reappears in a file you didn't touch, check `git log --oneline -- <file>` first — a later refactor
likely dropped or reverted an earlier fix, not a fresh regression.

Also fixed the same regression's twin: `useCheckInChartData.ts` had reintroduced
`isRtl ? reverseChartData(filled) : filled` — the same commit `1e859ee` had removed this; chart
order is chronological (oldest→newest, left-to-right) regardless of locale.

Confirmed deviation from the original commit (keep, don't "correct" back): the interior-gap
bridge line's `strokeOpacity` is `0.2`, not the original `0.4` — user found `0.4` too thick/dark
on re-review.
