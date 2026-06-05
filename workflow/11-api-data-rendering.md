# SCENARIO 11: API Data Rendering

Apply when a component renders data fetched from the server.

## Loading state — structured skeletons

Skeletons must mirror the **structure** of the loaded component — same layout,
same number of items, same proportions. A skeleton is a wireframe of the real UI,
not a generic placeholder.

- ❌ Never use a single `<Skeleton className="w-full h-20"/>` for a complex component
- ✓ Card list → N skeleton cards matching the card layout
- ✓ Form → skeleton inputs for each field, matching field widths
- ✓ Table → skeleton rows matching expected row count
- ✓ Profile header → skeleton avatar + skeleton text lines at correct widths
- Use realistic counts: 3–5 skeleton items, never 1 unless the component genuinely shows 1 item

```tsx
{isLoading && (
  <div className={'flex flex-col gap-4'}>
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className={'flex items-center gap-3'}>
        <Skeleton className={'size-10 rounded-full'} />
        <div className={'flex flex-col gap-2'}>
          <Skeleton className={'h-4 w-40'} />
          <Skeleton className={'h-3 w-24'} />
        </div>
      </div>
    ))}
  </div>
)}
```

## References

- `src/components/shared/` — existing data-rendering components for reference
