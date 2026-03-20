# Claude Code Preferences — HealEase

HealEase — Recovery support platform for patients transitioning from hospital/clinical care. Daily check-ins + AI insights + community forum, built with React 19, TypeScript, TanStack Router/Query.

## Core Rules (Apply Everywhere)

### Principles
- ALWAYS FOLLOW INDUSTRY STANDARDS & SOLID PRINCIPLES (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
- Write clean, maintainable, readable code
- One concern per file
- Provide a full file edit instead of one edit at a time

### Code Style
- Never use array index as key - use the current element as an index
- Braces around values inside: Object literal braces, component props and import/export braces
- Text blocks: Don't break unless really long (120–150 chars OK)
- Text: never use `—` character. only the simple hyphen `-` for all text, including classnames and config keys. This avoids encoding issues and ensures consistency across all contexts (JSX, CSS, config, etc.)

### Language & Format
- Quotes: Single quotes (') for all strings, imports, JSX props
- Semicolons: None (except where required)
- Indentation: 4 spaces
- Naming: camelCase (non-components), camelCase (folders)
- Functions: Arrow functions ALWAYS, never regular declarations
- Types: Prefer `type` over `interface` unless declaration merging needed
- React Types: Import directly from `react`, not `React.*`

## Reading Files
- Whenever reading files to understand and identify patterns that may be needed in the future, document them in corresponding context to avoid repeating it afterwards

### Code Quality
- CRITICAL: Delete unused code completely — NEVER comment it out
- No code snippets — provide complete, production-ready code
- One function/component per file
- Extract reusable logic
- Use reusable components from shadcn/ui
- No hardcoded values — use constants or config
- Time values: Always use `src/constants/time` (minuteInMs, hourInMs, etc.) instead of hardcoding milliseconds
- No backwards-compatibility shims for removed code
- Don't use redundant braces or parentheses

### Code Formatting
- Line length: Target 40-50 characters maximum for code lines (strings can be longer if necessary). Break lines that exceed this threshold
- Break long lines and function parameters onto multiple lines
- 2+ conditions in if statements → one condition per line, no condition and action in same line
- Ternary conditions with long or complex expressions → break to multiple lines
- Inline objects with 3+ properties, or 2+ in long lines → always break to new lines
- 2+ chained accessor calls → break after root object
- Nested objects always on a new line — never inline inside a parent object or array
- Objects with 2+ properties → each property on its own line
- 2+ function parameters → each on its own line
- Generic utility types (`Pick`, `Omit` etc.) with 3+ keys → each key on its own line
- 2+ elements in an array → each on its own line

### Imports (eslint-plugin-simple-import-sort)
Groups (auto-fixed by `npm run lint:fix`):
1. React / third-party
2. @tanstack scoped
3. @/ custom (types, components, hooks, lib, utils, services, constants, config, context, handlers, pages)
4. Relative imports
5. Styles (last)

## Tech Stack
Core: Next 16 + App Router, React 19, TypeScript 5, TailwindCSS 4
State: Redux Toolkit 2, redux-persist, TanStack Query
Forms: react-hook-form 7, Zod, shadcn/ui
API: Axios with interceptors (CSRF auto-injected)
UI: shadcn/ui, Radix UI, lucide-react
Tools: Sentry, Million.js, date-fns, DOMPurify

## Quick Checklist
Arrow functions | Single quotes | No semicolons | 4-space indent | Nested content on new lines
JSX props: prop={'value'} | Export at bottom | Keep components ~40 lines
Use api from @/api | Access env via config | Use shadcn/ui components
Avoid prop drilling | Clean imports | Delete unused code
SOLID principles | Industry standards | Type-safe forms | Redux for global state

Never: React.* types | Function declarations | Double quotes | import.meta.env outside config
Never: Direct fetch/axios | Inline exports | Commented code | window.location for navigation
Never: Multiple components per file | Code snippets | NEXT_PUBLIC_ prefix | Server directives

Use /commit skill when auto-commiting

## Before Committing
1. `npm run typecheck`
2. `npm run lint:check`
3. `npm test`
4. Env vars via config exports only — never direct access to env
5. No commented-out code

## Git
- Write clear commit messages (imperative, present tense)
- Use branches for features/fixes
- Use conventional commit format (feat, fix, docs, style, rfc, test, chore)
- Avoid large commits; keep them focused and atomic (every commit should have one change or fix)
- Claude plans should instructions never be committed
