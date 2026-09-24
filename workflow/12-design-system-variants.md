# Adding a Design-System Element as Modular Variants

Use when the design system (`docs/design/designsystem.html`) gives an element its own look that is (or will be) reused across components (button kinds, badge kinds), even if only one variant exists today. Not for a primitive used plain.

## Files

- `src/styles/globals.css` - any new token: raw var in `:root`/`.dark`, alias in `@theme inline` as `--color-<name>`
- `src/components/shared/<group>/<Base>.tsx` - base wrapping the `ui/` primitive (see `05-wrapping-a-shadcn-component.md`); never used at call sites
- `src/components/shared/<group>/<Type>.tsx` - one per distinct element *type* (e.g. `TextButton`, `IconButton`), wraps the base
- Variants (primary/secondary/ghost/destructive) are NOT components: they live as a variant style object (cva-style className map) on the base
- `src/components/shared/index.md` - add a row per new file, same turn

## Constraints

- Type vs variant: a *variant* is a look of the same element (a className style entry on the base), a *type* is a structurally/behaviorally different element (its own component). Don't make a component per variant. A design change to a variant is one style-object edit, a change to the base reaches all types.
- Call sites import a type component, never the base, never the raw `ui/` primitive, never an ad hoc `className` override for something the design defines.
- Tokens first: check `globals.css` for an existing token before adding one. No hex/rgb literals in components.
- Scope guard: no wrapper for a primitive used plain, no bulk migration of existing call sites. Apply when building or touching that UI.
- Verify: `grep -rln "from '@/components/ui/<thing>'" src --include="*.tsx"` and `grep -rln "from '@/components/shared/<group>/<Base>'" src --include="*.tsx"` list nothing outside the group.
- `npm run typecheck && npm run lint:check && npm test` before done.

## Pulse candidates (audit only, nothing implemented)

- Button: design defines look variants `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-destructive` (variant style object on the base, not separate components). Distinct types (text-style, icon-only, etc.) would be separate components; needs a pass over current call sites to find them. Code has no `shared/buttons/`; 93 files import `ui/button` directly. Usage: outline 44, ghost 35, destructive 3, secondary 2, white/link/card 1 each. Only 3 files use a raw `<button>`.
- Badge: design defines look variants `b-primary/secondary/accent/success/warning/destructive/neutral` (style object); `badge-dot` looks like a distinct type. Not yet checked against `ui/badge` usage.
- Also in design: `tag`, `pill`, `avatar` (`UserAvatar` already exists in `shared/`).
- Tokens: `--color-*` aliases already exist in `@theme inline`; no new token needed until a variant needs one.
