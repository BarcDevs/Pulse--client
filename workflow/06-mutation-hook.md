# SCENARIO 6: Adding a mutation hook

## File
`src/hooks/mutations/use[Feature]Mutations.ts`

## Constraints
- Use `useQueryClient()` for invalidation
- On success: invalidate query keys
- For create: invalidate `queryKeys.all`
- For update: invalidate both specific key + `queryKeys.all`
- Access variables in `onSuccess` second param: `onSuccess: (result, variables) => {...}`

## Optimistic Updates (CUD operations)

Use Context + `useOptimistic` + `useTransition` + `withOptimisticToast` for instant UI feedback. Define action types with `OptimisticActionMap<T>` from `@/types/react`. Toast handles success/error with retry.

## References
- `src/hooks/mutations/useGoalMutations.ts` (multiple mutations)
- `src/hooks/mutations/useSaveSettings.ts` (single mutation)
- `src/context/GoalsContext.tsx` (optimistic updates example)
- `src/types/react.ts` (OptimisticActionMap type)
- `src/utils/optimisticToast.ts` (toast utility)
