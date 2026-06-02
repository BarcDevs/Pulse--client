# SCENARIO 4: Adding a form hook

## File
`src/hooks/forms/use[Feature]Form.ts`

## Constraints
- Accept: `onSubmit: (data: Schema) => Promise<void>`, optional `defaultValues?: Partial<Schema>`
- Use `zodResolver` with matching schema
- Set `mode: 'onBlur'`
- Spread caller's `defaultValues` over hardcoded defaults: `{ title: '', ...defaultValues }`
- Catch errors in `.handleSubmit()` wrapper, set via `form.setError('root', { type: 'manual', message })`
- Call `form.reset()` after successful submission
- **Form validation MUST wire to error display** — validation errors from `form.formState.errors` always shown in UI (error messages, aria-invalid, error styling)
- Return `{ form, handleSubmit }`

## References
- `src/hooks/forms/useGoalForm.ts`
- `src/hooks/forms/usePostForm.ts`
