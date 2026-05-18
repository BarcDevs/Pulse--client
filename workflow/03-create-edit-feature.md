# SCENARIO 3: Adding create + edit feature

## Files
```
create/page.tsx → CreatePage (pass mode='create')
[id]/edit/page.tsx → EditPage (pass mode='edit', id)
components/[Feature]FormPageContent.tsx (handles async, loading, error)
components/[Feature]Form.tsx (handles submit, mode detection)
hooks/forms/use[Feature]Form.ts
hooks/mutations/use[Feature]Mutations.ts
hooks/queries/use[Feature].ts (edit mode only)
```

## Constraints
- **Single form component with mode from data presence:** `isUpdate = Boolean(goal)`
- **Never separate Create + Edit components**
- Content: loading/error guards for edit mode only
- Form: mutation logic + handler calls
- Form fields: use reusable `FormInputText`, `FormInputArea` from `@/components/shared/inputs/`
- Form error: add root error field for form-level errors (not field errors)
- Page files minimal: just pass `mode` + optional `id`
- Text via next-intl (see [Scenario 9](./09-i18n-text.md)) — never hardcode strings

## References
- `src/components/goals/GoalFormPageContent.tsx`
- `src/components/goals/GoalForm.tsx`
- `src/components/goals/GoalFormFields.tsx`
- `src/app/(dashboard)/recovery-goals/create/page.tsx`
- `src/app/(dashboard)/recovery-goals/[goalId]/edit/page.tsx`
