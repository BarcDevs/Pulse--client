# SCENARIO 1: Adding a static page

## Files
- Create: `src/app/(dashboard)/[feature]/page.tsx`
- Delegate to: `src/components/[feature]/[Feature]PageContent.tsx`

## Constraints
- Page file: minimal wrapper, `export default`, no logic/JSX/state
- Content component: named export, `'use client'`
- Handle four states sequentially: loading → error → empty → happy path
- Loading: use shadcn `<Skeleton/>`
- Text via next-intl (see [Scenario 9](./09-i18n-text.md)) — never hardcode strings
- No JSX tree branching (use sequential `{isLoading && ...}` not ternary)

## References
- `src/app/(dashboard)/dashboard/page.tsx` (page)
- `src/components/dashboard/DashboardPageContent.tsx` (content)
