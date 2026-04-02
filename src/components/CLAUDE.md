# Components — Code Conventions

Keep components small (~40 lines), one per file. Use shadcn/ui components when available.

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
- AVOID BREAK LINES IN CLASSNAMES - NOT THE STRING ITSELF AND NOT AROUND IT. example: 
 `'some-classes' +
    'other-classes'` ❌ → `'some-classes other-classes'` ✓
- Avoid redundant linebreaks in lines shorter that the threshold (50-60 chars)
- If you need to specify certain part of a component with a comment, that probably means that part should be extracted into a separate component

## shadcn/ui
- Always use shadcn/ui components when available
- Components in `src/components/ui/`
- Use Form, FormField, FormItem for form inputs
- `src/components/ui` is out of bound for edits, never edit shadcn/ui components directly