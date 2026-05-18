# SCENARIO 6: Adding a mutation hook

## File
`src/hooks/mutations/use[Feature]Mutations.ts`

## Constraints
- Use `useQueryClient()` for invalidation
- On success: invalidate query keys
- For create: invalidate `queryKeys.all`
- For update: invalidate both specific key + `queryKeys.all`
- Access variables in `onSuccess` second param: `onSuccess: (result, variables) => {...}`

## References
- `src/hooks/mutations/useGoalMutations.ts` (multiple mutations)
- `src/hooks/mutations/useSaveSettings.ts` (single mutation)
