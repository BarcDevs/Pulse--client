# SCENARIO 2: Adding a dynamic route page

## Files
- Create: `src/app/(dashboard)/[feature]/[id]/page.tsx`
- Params: `params: Promise<{ id: string }>`
- Delegate: `src/components/[feature]/[Feature]PageContent.tsx`

## Constraints
- **Server component (async) preferred:** `const EditPage = async ({ params }) => { const { id } = await params; return <Content id={id}/> }`
- **Client + `use()` if page needs hooks:** `const { id } = use(params)`
- Always type params as `Promise<{ key: string }>`
- Always `await params` (server) or wrap with `use()` (client)
- Pass params to content component as props

## References
- `src/app/(dashboard)/recovery-goals/[goalId]/edit/page.tsx` (server)
- `src/app/(dashboard)/community/post/[id]/page.tsx` (client)
