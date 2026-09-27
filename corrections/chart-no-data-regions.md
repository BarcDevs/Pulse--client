# Chart no-data regions

When re-fixing a regression, check `git log --all -S "<distinctive token>"` for the
original fix commit before reimplementing from scratch — guessed reimplementations
get boundary semantics wrong.

**Why:** The dashboard/progress chart unification (`c4c21d3`) silently dropped a
prior fix (`1e859ee`, `fix(charts): grey out no-data ranges, fix RTL/LTR chart
order...`) without carrying it into the new shared `TrendChart.tsx`. When
re-fixing it live, a from-scratch reimplementation used `firstIdx - 1` /
`lastIdx + 1` as the `ReferenceArea` boundary (exclusive of the real-data day),
leaving a one-day gap between the grey no-data band and the first/last real
point. The original used the real-data index itself as the inclusive boundary
(`x2: enrichedData[firstGlobalIdx].date`), so the grey band reaches all the way
to touch the check-in day, no day left ungreyed. Also used a much lighter fill
(`var(--muted-foreground)` @ 0.15) vs. a guessed `var(--muted)` @ 0.5, and
handled the all-empty-chart case.

**How to apply:** Before reimplementing any "this used to work" chart/UI fix,
run `git log --all --oneline -S "<key symbol from the missing feature>"` to find
the commit that added it, and restore it verbatim (or diff against it) instead
of re-deriving the boundary math from scratch. Also: when a bug reappears after
you didn't touch that file, check `git log --oneline -- <file>` first — it's
very likely a later refactor dropped or reverted the earlier fix, not a fresh bug.

Confirmed deviation from the original commit (keep, don't "correct" back): the
interior-gap bridge line's `strokeOpacity` is `0.2`, not the original `0.4` —
user found `0.4` too thick/dark on re-review.

Also fixed the same regression's twin: `useCheckInChartData.ts` had
reintroduced `isRtl ? reverseChartData(filled) : filled` — the same commit
`1e859ee` had removed this; chart order is chronological (oldest→newest,
left-to-right) regardless of locale. Restored by deleting the reversal call
and the now-dead `reverseChartData` import.
