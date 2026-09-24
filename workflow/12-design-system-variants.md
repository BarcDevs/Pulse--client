# Adding a Design-System Element as Modular Variants

Use when the design system (`docs/design/designsystem.html`) gives an element its own look that is (or will be) reused across components (button kinds, badge kinds), even if only one variant exists today. Not for a primitive used plain.

## Files

- `src/styles/globals.css` - any new token: raw var in `:root`/`.dark`, alias in `@theme inline` as `--color-<name>`
- `src/components/shared/<group>/<Base>.tsx` - base wrapping the `ui/` primitive (see `05-wrapping-a-shadcn-component.md`); never used at call sites
- `src/components/shared/<group>/<Type>.tsx` - one per distinct element *type* (e.g. `TextButton`, `IconButton`), wraps the base
- Variants (primary/secondary/ghost/destructive) are NOT components: they live as a variant style object (cva-style className map) on the base
- `src/components/shared/SHARED_COMPONENTS.md` - add a row per new file, same turn

## Constraints

- Type vs variant: a *variant* is a look of the same element (a className style entry on the base), a *type* is a structurally/behaviorally different element (its own component). Don't make a component per variant. A design change to a variant is one style-object edit, a change to the base reaches all types.
- Call sites import a type component, never the base, never the raw `ui/` primitive, never an ad hoc `className` override for something the design defines.
- Tokens first: check `globals.css` for an existing token before adding one. No hex/rgb literals in components.
- Scope guard: no wrapper for a primitive used plain, no bulk migration of existing call sites. Apply when building or touching that UI.
- Verify: `grep -rln "from '@/components/ui/<thing>'" src --include="*.tsx"` and `grep -rln "from '@/components/shared/<group>/<Base>'" src --include="*.tsx"` list nothing outside the group.
- `npm run typecheck && npm run lint:check && npm test` before done.

## Pulse audit (nothing implemented)

Catalog: every shared component is recorded in `src/components/shared/SHARED_COMPONENTS.md` (renamed from `index.md`, same role as pantry's). Add or update its entry in the same turn as the component.

### Buttons

120 `<Button>` tags outside `ui/` (93 files). Variants passed: outline 42, ghost 33, destructive 2, secondary 1, link 1, the rest default. 37 tags have no `className` (plain usage, leave as is).

Variants: the design has `btn-primary/secondary/ghost/destructive`; `ui/button` has 6 (adds `outline`, `link`). `outline` is the most used, so decide whether the design's secondary maps to it.

Recurring `className` overrides that point to a distinct **type** (candidate purpose-made component):
- **Icon-action buttons** (`size icon`, round, pinned in a corner or inside an input): chat send, community and goals FABs (`fixed bottom-24 end-4 sm:hidden size-14 rounded-full`, duplicated in 2 features), goals card corner button, form password toggle. Candidates: `IconButton`, `FabButton`.
- **Pill/chip buttons** (`rounded-full`, small text, selected state toggling border/bg): chat suggestion chips (2 looks), community tag/category filters, goals category picker, insights range tabs. Candidate: `ChipButton` with a `selected` prop; the insights and community tab-style ones may be a separate tab type.
- **Text/link-style buttons** (`h-auto p-0 text-xs text-primary hover:underline`, `text-muted-foreground`): insights, community, goals. Candidate: `TextButton`.
- **List-row buttons** (`w-full h-auto justify-between/start`, selected `bg-primary/10`): community category/filter rows. Candidate: `RowButton`.
- **Gradient CTA** (`from-primary-gradient-start to-primary-gradient-end`, plus one orange/pink and one `to-primary/80`): goals, 3 places with duplicated gradient strings. Candidate: `GradientButton`. The orange/pink one is likely off-design.
- **Full-width form submit** (`h-11 w-full`, auth and form): a size/prop, not a component.
- Hard-coded colors bypassing tokens: `shadow-blue-500/30`, `from-orange-400 to-pink-500`, `text-white`, `border-white/30 bg-white`. Should become tokens or be removed.

### Badges, tags, pills

Design: `b-primary/secondary/accent/success/warning/destructive/neutral` (variant map on one `Badge`), `badge-dot` (own type), `tag`, `pill`. Not yet counted against `ui/badge` usage.

### Other

`avatar`: `UserAvatar` exists. Tokens: `--color-*` aliases and `primary-gradient-start/end` exist; no white-on-primary token yet.

### Next

1. Confirm the type list above (chip vs tab, whether `outline` is the design's secondary).
2. Audit badges and cards the same way.
3. Implement per type as separate `rfc` commits, touched call sites only.
