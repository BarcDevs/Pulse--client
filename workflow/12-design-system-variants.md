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
- Every instance of a design-system element uses a type, even one with no `className` today (one edit instead of N).
- Applies to every design-system element, not only buttons: each gets a base plus a component per type, and every existing instance is migrated once the types exist. Buttons go first, one commit per type.
- Scope guard: no wrapper for a primitive the design does not style.
- Verify: `grep -rln "from '@/components/ui/<thing>'" src --include="*.tsx"` and `grep -rln "from '@/components/shared/<group>/<Base>'" src --include="*.tsx"` list nothing outside the group.
- `npm run typecheck && npm run lint:check && npm test` before done.

## Pulse audit (nothing implemented)

Catalog: every shared component is recorded in `src/components/shared/SHARED_COMPONENTS.md` (renamed from `index.md`, same role as pantry's). Add or update its entry in the same turn as the component.

### Buttons

120 `<Button>` tags outside `ui/` (93 files). Variants passed: outline 42, ghost 33, destructive 2, secondary 1, link 1, the rest default. 37 tags have no `className`: they are NOT left alone, every button gets a type (a later design change must be one edit, not 37).

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

### Design button types (extracted from `docs/design/pages/**`, 210 `<button>`s, plus `designsystem.html`)

`designsystem.html` only defines four looks (primary gradient, secondary bordered white, ghost primary text, destructive). The screens use more shapes, grouped by inline-style signature:

| Type | Design signature | Design examples |
|---|---|---|
| Primary (CTA) | gradient `#005da7 -> #2976c7`, white 14-15px bold, r8-10, pad 10-13 x 20-28, glow shadow | Sign In, Create Goal, Add to routine, onboarding CTA, Start Your Journey |
| Secondary | white, 1px border, foreground/muted text, r8, pad 8-10 x 16-20, 13-14px | Cancel, Not relevant, Sign Out, Back to Dashboard, Reject all optional |
| Destructive | `--destructive` bg, white, r8, pad 8x16, 13px | Delete |
| Text link | no bg/border, no padding, primary or muted text, 12-13px | Forgot password?, View all, Reply, @mention, author name, Explore Community |
| Icon (bare) | no bg, pad 2-8, icon only | mobile nav toggle, close x, bell, password eye |
| FAB | r50%, primary bg, white plus icon | community new post |
| Chip | r99, pad 5-12 x 12, 12px, muted or foreground text, selected state | check-in prompts, filters, "Backfill this day" |
| Option tile | r10, pad ~11 x 14, icon + label, bordered | check-in actions, social login |
| Small secondary | r6-8, pad 5-6 x 12-14, 12px | community Chat/Reply toolbar |
| Chat send | 40px circle, primary gradient + glow, white icon, muted grey when disabled | chat send (separate from FAB and bare Icon) |

Variant, not a type: **Primary, on-gradient** (white bg, `primaryGradStart` text, r10, pad 13 x 32) for buttons on the gradient hero: landing "Get Started for Free", dashboard "Start Check-In".

### Mapping app buttons to design types

| App usage | Design type |
|---|---|
| default variant, bare or gradient classes (goals gradient x3, insights `bg-primary`, form/auth `h-11 w-full`) | Primary (gradient is the design look; a prop for full-width/large) |
| `variant='outline'` (42, mostly Cancel/Back/Edit/dialog actions) | Secondary |
| `variant='destructive'` (2) | Destructive |
| `variant='ghost'` with `text-muted-foreground` / `p-0`, `variant='link'` | Text link |
| `size='icon'` ghost/outline, password toggle, goals card corner | Icon |
| chat send (`ChatInputField`) | Chat send |
| `fixed bottom-24 end-4 ... size-14 rounded-full` (community, goals) | FAB |
| `rounded-full` with a selected state (chat suggestions, community tags, goals category, insights range) | Chip |
| `w-full h-auto justify-between/start` rows (community categories, filters) | Option tile |
| `border-white/30 bg-white text-primary` (dashboard "Start Check-In") | Primary, on-gradient variant |
| `from-orange-400 to-pink-500` ("Complete Today", `GoalActionButtons`) | Was dead code (`MainProgressCard` chain never imported), removed in the cleanup commit |
| `shadow-blue-500/30`, raw `text-white` | Off-design: map to Primary/FAB tokens, verify with the design before changing |
| `outline` with `size='sm'` (37 `size='sm'`) | Small secondary |

Open decision: the design's secondary (white + border) matches `outline`, so `outline` = Secondary; the single `secondary` use folds into it or Small secondary.

### Next

1. Confirm the design type table and mapping above (chip vs tab).
2. Audit badges and cards the same way.
3. Implement all button types and migrate every button (93 files, including the 37 plain ones), one `rfc` commit per button type. Buttons come first; every other design element (badges, tags, pills, cards, inputs, avatars, and so on) then gets the same treatment, one commit per type.
4. Done for buttons: all button types and migrations landed as `rfc(buttons)` commits, then a separate `chore` cleanup commit removed dead code via `/dead-code`. Repeat steps 3 and 4 for the next element (badges, tags, pills, cards, inputs, avatars).
