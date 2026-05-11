# HealEase Feature Implementation Workflow

Quick-reference guide. Find your scenario, read constraints + references only.

**Critical:** All rules in `CLAUDE.md` apply everywhere. When building components, also read `src/components/CLAUDE.md`. This doc adds scenario-specific constraints only.

## Scenarios
- [SCENARIO 1: Adding a static page](#scenario-1-adding-a-static-page)
- [SCENARIO 2: Adding a dynamic route page](#scenario-2-adding-a-dynamic-route-page)
- [SCENARIO 3: Adding create + edit feature](#scenario-3-adding-create--edit-feature)
- [SCENARIO 4: Adding a form hook](#scenario-4-adding-a-form-hook)
- [SCENARIO 5: Adding a query hook](#scenario-5-adding-a-query-hook)
- [SCENARIO 6: Adding a mutation hook](#scenario-6-adding-a-mutation-hook)
- [SCENARIO 7: Adding an action handler](#scenario-7-adding-an-action-handler)
- [SCENARIO 8: Adding validation schema](#scenario-8-adding-validation-schema)
- [SCENARIO 9: Adding text with next-intl (i18n)](#scenario-9-adding-text-with-next-intl-i18n)
- [GLOBAL CONSTRAINTS](#global-constraints)

---

## SCENARIO 1: Adding a static page

### Files
- Create: `src/app/(dashboard)/[feature]/page.tsx`
- Delegate to: `src/components/[feature]/[Feature]PageContent.tsx`

### Constraints
- Page file: minimal wrapper, `export default`, no logic/JSX/state
- Content component: named export, `'use client'`
- Handle four states sequentially: loading → error → empty → happy path
- Loading: use shadcn `<Skeleton/>`
- Text via next-intl (see Scenario 9) — never hardcode strings
- No JSX tree branching (use sequential `{isLoading && ...}` not ternary)

### References
- `src/app/(dashboard)/dashboard/page.tsx` (page)
- `src/components/dashboard/DashboardPageContent.tsx` (content)

---

## SCENARIO 2: Adding a dynamic route page

### Files
- Create: `src/app/(dashboard)/[feature]/[id]/page.tsx`
- Params: `params: Promise<{ id: string }>`
- Delegate: `src/components/[feature]/[Feature]PageContent.tsx`

### Constraints
- **Server component (async) preferred:** `const EditPage = async ({ params }) => { const { id } = await params; return <Content id={id}/> }`
- **Client + `use()` if page needs hooks:** `const { id } = use(params)`
- Always type params as `Promise<{ key: string }>`
- Always `await params` (server) or wrap with `use()` (client)
- Pass params to content component as props

### References
- `src/app/(dashboard)/recovery-goals/[goalId]/edit/page.tsx` (server)
- `src/app/(dashboard)/community/post/[id]/page.tsx` (client)

---

## SCENARIO 3: Adding create + edit feature

### Files
```
create/page.tsx → CreatePage (pass mode='create')
[id]/edit/page.tsx → EditPage (pass mode='edit', id)
components/[Feature]FormPageContent.tsx (handles async, loading, error)
components/[Feature]Form.tsx (handles submit, mode detection)
hooks/forms/use[Feature]Form.ts
hooks/mutations/use[Feature]Mutations.ts
hooks/queries/use[Feature].ts (edit mode only)
```

### Constraints
- **Single form component with mode from data presence:** `isUpdate = Boolean(goal)`
- **Never separate Create + Edit components**
- Content: loading/error guards for edit mode only
- Form: mutation logic + handler calls
- Form fields: use reusable `FormInputText`, `FormInputArea` from `@/components/shared/inputs/`
- Form error: add root error field for form-level errors (not field errors)
- Page files minimal: just pass `mode` + optional `id`
- Text via next-intl (see Scenario 9) — never hardcode strings

### References
- `src/components/goals/GoalFormPageContent.tsx`
- `src/components/goals/GoalForm.tsx`
- `src/components/goals/GoalFormFields.tsx`
- `src/app/(dashboard)/recovery-goals/create/page.tsx`
- `src/app/(dashboard)/recovery-goals/[goalId]/edit/page.tsx`

---

## SCENARIO 4: Adding a form hook

### File
`src/hooks/forms/use[Feature]Form.ts`

### Constraints
- Accept: `onSubmit: (data: Schema) => Promise<void>`, optional `defaultValues?: Partial<Schema>`
- Use `zodResolver` with matching schema
- Set `mode: 'onBlur'`
- Spread caller's `defaultValues` over hardcoded defaults: `{ title: '', ...defaultValues }`
- Catch errors in `.handleSubmit()` wrapper, set via `form.setError('root', { type: 'manual', message })`
- Call `form.reset()` after successful submission
- Return `{ form, handleSubmit }`

### References
- `src/hooks/forms/useGoalForm.ts`
- `src/hooks/forms/usePostForm.ts`

---

## SCENARIO 5: Adding a query hook

### File
`src/hooks/queries/use[Feature].ts`

### Constraints
- Always use `useQueryWithNetworkError` (not raw `useQuery`)
- Always: `staleTime: 5 * minuteInMs` (from `@/constants/time`)
- Always: `retry: false`
- When query depends on dynamic ID: add `enabled: Boolean(id)` to skip when null
- Query keys from `@/constants/queryKeys` (use factories like `recoveryGoalsQueryKeys.goal(id)`)

### References
- `src/hooks/queries/useGoal.ts` (with skip condition)
- `src/hooks/queries/useGoals.ts` (simple list)

---

## SCENARIO 6: Adding a mutation hook

### File
`src/hooks/mutations/use[Feature]Mutations.ts`

### Constraints
- Use `useQueryClient()` for invalidation
- On success: invalidate query keys
- For create: invalidate `queryKeys.all`
- For update: invalidate both specific key + `queryKeys.all`
- Access variables in `onSuccess` second param: `onSuccess: (result, variables) => {...}`

### References
- `src/hooks/mutations/useGoalMutations.ts` (multiple mutations)
- `src/hooks/mutations/useSaveSettings.ts` (single mutation)

---

## SCENARIO 7: Adding an action handler

### File
`src/handlers/actions/[feature].ts`

### Constraints
- Thin wrapper over API functions — no error handling, no branching
- Named exports: `handle[Domain][Operation]`
- Type-annotated input + return
- `handle*Save` returns `{ entity, created: boolean }` for create vs update distinction
- No error catching — bubble to caller

### References
- `src/handlers/actions/goals.ts`
- `src/handlers/actions/checkIn.ts`

---

## SCENARIO 8: Adding validation schema

### Files
- Schema: `src/validations/forms/[feature]Schema.ts`
- Config: `src/config/schema/[feature]Form.ts`

### Constraints
- **Never hardcode numeric limits** — import from config
- Error messages: user-facing, interpolated with limits
- Optional fields: `.optional()` at end of chain
- One schema per file, file name matches schema name
- Export both schema + inferred type: `export type GoalSchema = z.infer<typeof goalSchema>`

### References
- `src/validations/forms/goalSchema.ts`
- `src/config/schema/goalForm.ts`

---

## SCENARIO 9: Adding text with next-intl (i18n)

### Files
- Translation strings: `messages/en-US.json` **and** `messages/he-IL.json` (always update both)
- Locale key file: `src/locales/[feature]Locales.ts`

### Pattern

```typescript
// src/locales/goalsLocales.ts
export const goalsLocales = {
    overview: {
        title: 'goals.overview.title',
        filterButton: 'goals.overview.filterButton',
    },
    buttons: {
        create: 'goals.buttons.create',
        creating: 'goals.buttons.creating',
    }
} as const
```

```json
// messages/en-US.json (partial)
{
    "goals": {
        "overview": {
            "title": "Recovery Goals",
            "filterButton": "Filter"
        },
        "buttons": {
            "create": "Create goal",
            "creating": "Creating..."
        }
    }
}
```

**Client component usage:**
```typescript
import { useTranslations } from 'next-intl'
import { goalsLocales } from '@/locales/goalsLocales'

const t = useTranslations()
t(goalsLocales.overview.title)
```

**Server component usage:**
```typescript
import { getTranslations } from 'next-intl/server'

const t = await getTranslations()
```

### Constraints
- Always update **both** `en-US.json` and `he-IL.json`
- Keys in locales file are dot-path strings matching JSON structure: `'feature.section.key'`
- Locale file name: `[feature]Locales.ts` (camelCase feature name)
- Export: `const [feature]Locales = { ... } as const`
- Nested structure mirrors the JSON — group by page section or semantic group
- Button text: always include both `action` + `action + 'ing'` forms (create/creating, update/updating, delete/deleting)
- Never hardcode text strings in components — always go through `t(localeKey)`
- Never use `src/constants/componentTexts/` — that pattern is dead

### References
- `src/locales/goalsLocales.ts`
- `src/locales/settingsLocales.ts`
- `messages/en-US.json`
- `messages/he-IL.json`

---

## GLOBAL CONSTRAINTS

### Shared components — check before creating new ones
| Component | Purpose | When |
|-----------|---------|------|
| `EmptyState` | No data message | `{!data && <EmptyState message={...}/>}` |
| `ErrorDisplay` | Error router (network vs API) | `{isError && <ErrorDisplay error={error}/>}` |
| `PageHeader` | Page title + description | `<PageHeader title={...} description={...}/>` |
| `Skeleton` | Loading placeholder | `{isLoading && <Skeleton/>}` |
| `DeleteButton` | Delete + confirm | `<DeleteButton onDeleteAction={...}/>` |
| `FormInputText` | Text input (use instead of FormField chains) | Form fields |
| `FormInputArea` | Textarea (use instead of FormField chains) | Form fields |

**Constraint:** Check `src/components/shared/` + `src/components/shared/inputs/` before creating UI. Use shadcn when available. Never edit `src/components/ui/` (read-only).

### Loading states
- Always use shadcn `<Skeleton/>` — never custom loaders

### Error messages
- User sees: generic message ("Failed to save")
- Dev sees: full message via `idDev` config flag in dev mode

### Page headers
- Use reusable `<PageHeader title={...} description={...}/>`

### JSX branching
- ❌ `{isLoading ? <X/> : isError ? <Y/> : <Z/>}`
- ✓ `{isLoading && <X/>}` then `{isError && <Y/>}` then `{!isLoading && !isError && <Z/>}`

### Callback naming
- Mutation/async ops: `onSubmitAction`, `onDeleteAction`, `onEditPlanAction`
- ❌ Not: `onClick`, `onChange`, `onToggle` (UI only, no Action suffix)

### Hydration safety
- Time-dependent components: mark `'use client'` (`new Date()`, timestamps, `formatDistanceToNow`)
- No `window` in render path: wrap in `useEffect`
- Server components default: only `'use client'` when needed

### Data fetching components
- Components that fetch data: always render error state using existing error logic (`ErrorDisplay` or `ErrorStateCard`). Never skip error handling

