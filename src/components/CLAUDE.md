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

## Imports
- Don't use `React.*` types — import directly from react
- Order: react → third-party → @/ → relative → styles

## State & Props
- Avoid prop drilling — use context or composition
- Use hooks at top of component
- Extract reusable logic and helper functions to separate files
- Don't break lines in a middle of a string
- COMPLETELY IGNORE classnames line-breaking
- Avoid redundant linebreaks in lines shorter that the threshold (50-60 chars)
- If you need to specify a certain part of a component with a comment, that probably means that part should be extracted into a separate component

## Classnames & Links
- Classnames: always use `cn()` from `@/lib/utils`. Never use template strings in classnames: `cn('base', condition && 'conditional')` ✓ not `` `base ${condition ? 'x' : 'y'}` `` ❌
- Navigation: use `<Link>` from `next/link` (not native `<a>` tag). Exception: download links may use `<a>`

## Code blocks wrapped in conditions
- JSX wrapped in `.map()` or conditional render (`{data && <code>}`): extract to separate component. Don't inline multi-line JSX in render conditionals
- Skeleton loading sections: own separate component with `Skeletons` suffix (e.g., `GoalCardSkeletons`, `MilestonesSectionSkeletons`). Never inline skeleton JSX in parent component

## Component Style
- Colors: check `globals.css` @utility blocks first. Only add custom tw color if it doesn't exist. Never hardcode colors. Before adding new custom color, verify it's not already defined under different name
- Always prefer custom brand colors over tw-native colors

## shadcn/ui
- Always use shadcn/ui components when available
- Components in `src/components/ui/`
- Use Form, FormField, FormItem for form inputs
- `src/components/ui` is out of bound for edits, never edit shadcn/ui components directly