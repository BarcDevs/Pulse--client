# SCENARIO 7: Adding an action handler

## File
`src/handlers/actions/[feature].ts`

## Constraints
- Thin wrapper over API functions — no error handling, no branching
- Named exports: `handle[Domain][Operation]`
- Type-annotated input + return
- `handle*Save` returns `{ entity, created: boolean }` for create vs update distinction
- No error catching — bubble to caller

## References
- `src/handlers/actions/goals.ts`
- `src/handlers/actions/checkIn.ts`
