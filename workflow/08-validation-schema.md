# SCENARIO 8: Adding validation schema

## Files
- Schema: `src/validations/forms/[feature]Schema.ts`
- Config: `src/config/schema/[feature]Form.ts`

## Constraints
- **Never hardcode numeric limits** — import from config
- Error messages: user-facing, interpolated with limits
- Optional fields: `.optional()` at end of chain
- One schema per file, file name matches schema name
- Export both schema + inferred type: `export type GoalSchema = z.infer<typeof goalSchema>`

## References
- `src/validations/forms/goalSchema.ts`
- `src/config/schema/goalForm.ts`
