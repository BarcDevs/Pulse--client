# Components — Code Conventions

## Component structure:
- Keep components small (~40 lines), one per file. Use shadcn/ui components when available.
- Design a single render path per component and move state differences into small conditional values or fragments instead of branching entire JSX trees.

## Files & Naming
- PascalCase filenames and components
- One component per file
- Export inline, never default except for app router pages

## JSX Style
- Nested content or content wrapped with a jsx/html, ALWAYS on new line
- Props (2+): Each on new line
- Single quotes wrapped with curly braces for all props and string values: `prop={'value'}`
- Fragment children don't work with Recharts — keep component logic separate
- Never use redundant trailing space after component - ` />` ❌
- Never break line in single-prop components
- Never concatenate text with JSX fragments: `{text}{' '}` ❌ → use template strings instead: {`${text} `} ✓
- **NO redundant spaces**: No extra spaces before `/>` in JSX, no multiple spaces between tokens, no trailing spaces
- Always use `key` prop on lists to avoid unnecessary re-renders
- Always leave a newline between component body and return statement

## Imports
- Don't use `React.*` types — import directly from react
- Order: react → third-party → @/ → relative → styles

## Props
- `className` props must be typed as `ClassName` (from `/types/react`)

## State & Props
- Avoid prop drilling — use context or composition
- Use hooks at top of component
- Extract reusable logic and helper functions to separate files
- Don't break lines in a middle of a string
- COMPLETELY IGNORE classnames line-breaking — this means: no `cn()` wrapping, no `+` splitting, no reformatting — touch nothing in a `className` value
- 50-char line limit does NOT apply to `className` strings
- Avoid redundant linebreaks in lines shorter that the threshold (50-60 chars)
- If you need to specify a certain part of a component with a comment, that probably means that part should be extracted into a separate component

## Classnames & Links
- Classnames: always use `cn()` from `@/lib/utils` for dynamic strings. Never use template strings in classnames: `cn('base', condition && 'conditional')` ✓ not `` `base ${condition ? 'x' : 'y'}` `` ❌
- Never use `cn()` nor break with `+` static classnames
- Navigation: use `<Link>` from `next/link` (not native `<a>` tag). Exception: download links may use `<a>`

## Code blocks wrapped in conditions
- JSX wrapped in `.map()` or conditional render (`{data && <code>}`): extract to separate component. Don't inline multi-line JSX in render conditionals
- Skeleton loading sections: own separate component with `Skeletons` suffix (e.g., `GoalCardSkeletons`, `MilestonesSectionSkeletons`). Never inline skeleton JSX in parent component

## Component Style
- Colors: check `globals.css` @utility blocks first. Only add custom tw color if it doesn't exist. Never hardcode colors. Before adding new custom color, verify it's not already defined under different name
- Always prefer custom brand colors over tw-native colors

### UI components — shadcn first
- Always use shadcn/ui component if one exists (`Button`, `Input`, `Select`, `Badge`, `Card`, etc.)
- ❌ Never use plain `<button>`, `<input>`, `<select>` when shadcn equivalent available
- shadcn components live in `src/components/ui/` — read-only, never edit them
- After shadcn, check `src/components/shared/` before creating new UI
