# GLOBAL CONSTRAINTS

## API contracts — check before implementing
- Before building any feature tied to an API endpoint, read `../healease--server/docs/API.md`
- Verify: request body shape, required vs optional fields, response shape, error codes
- Never guess endpoint behavior — the doc is authoritative

## UI components — shadcn first
- Always use shadcn/ui component if one exists (`Button`, `Input`, `Select`, `Badge`, `Card`, etc.)
- ❌ Never use plain `<button>`, `<input>`, `<select>` when shadcn equivalent available
- shadcn components live in `src/components/ui/` — read-only, never edit them
- After shadcn, check `src/components/shared/` before creating new UI

## Shared components — check before creating new ones
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

## Loading states
- Always use shadcn `<Skeleton/>` — never custom loaders

## Error messages
- User sees: generic message ("Failed to save")
- Dev sees: full message via `idDev` config flag in dev mode

## Page headers
- Use reusable `<PageHeader title={...} description={...}/>`

## JSX branching
- ❌ `{isLoading ? <X/> : isError ? <Y/> : <Z/>}`
- ✓ `{isLoading && <X/>}` then `{isError && <Y/>}` then `{!isLoading && !isError && <Z/>}`

## Callback naming
- Mutation/async ops: `onSubmitAction`, `onDeleteAction`, `onEditPlanAction`
- ❌ Not: `onClick`, `onChange`, `onToggle` (UI only, no Action suffix)

## Hydration safety
- Time-dependent components: mark `'use client'` (`new Date()`, timestamps, `formatDistanceToNow`)
- No `window` in render path: wrap in `useEffect`
- Server components default: only `'use client'` when needed

## Data fetching components
- Components that fetch data: always render error state using existing error logic (`ErrorDisplay` or `ErrorStateCard`). Never skip error handling

## Feature flags
- Wrap flagged component from **outside** — never inside the component itself
- ✓ `{flag && <MyComponent/>}` at call site
- ❌ `if (!flag) return null` inside `MyComponent`

## Navigation / links
- Use `<Link href={...}>` for all navigation
- `router.push(...)` only when programmatic navigation is required (e.g. after form submit, redirect on condition)
- ❌ Never use `router.push` as a substitute for a plain link
- Route paths: always from `src/constants/routes.ts` — never hardcode strings like `'/profile'`
- API endpoints: always from `src/api/` endpoint constants — never hardcode URL strings
