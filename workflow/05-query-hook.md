# SCENARIO 5: Adding a query hook

## File
`src/hooks/queries/use[Feature].ts`

## Constraints
- Always use `useQueryWithNetworkError` (not raw `useQuery`)
- Always: `staleTime: 5 * minuteInMs` (from `@/constants/time`)
- Always: `retry: false`
- When query depends on dynamic ID: add `enabled: Boolean(id)` to skip when null
- Query keys from `@/constants/queryKeys` (use factories like `recoveryGoalsQueryKeys.goal(id)`)

## References
- `src/hooks/queries/useGoal.ts` (with skip condition)
- `src/hooks/queries/useGoals.ts` (simple list)
