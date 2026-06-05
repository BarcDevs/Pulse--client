# Core Rules (Apply Everywhere)

## Principles
- ALWAYS FOLLOW INDUSTRY STANDARDS & SOLID PRINCIPLES (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
- Write clean, maintainable, readable code
- Keep one concern per file (SRP)
- For every function that you want to create make sure it is not already exists
- Avoid using re-export files and barrel indexes

## Code Style
- Never use string literals as object keys - define typed constants and use computed property names `[CONST.Key]: value`
- Never use array index as key - use the current element as an index
- Braces around values inside: Object literal braces, component props and import/export braces
- Text blocks: Don't break unless really long (120–150 chars OK)
- Text: never use `—` character. only the simple hyphen `-` for all text, including classnames and config keys. This avoids encoding issues and ensures consistency across all contexts (JSX, CSS, config, etc.)
- Use unified imports for module that has many imports
- Short conditional blocks - never use `{`
- Don't break single imports to multiple lines unless very long (50+ chars)
- Never break line around single imports - if import is too long, break before the `from` keyword
- Don't make line-breaking too strict
- Always provide informative and self-explanatory filenames and variable names

## Language & Format
- Quotes: Single quotes (') for all strings, imports, JSX props, backtick allowed for template strings
- Indentation: 4 spaces
- Naming: camelCase (non-components), camelCase (folders)
- Functions: Arrow functions ALWAYS, never `function` declarations
- Types: Prefer `type` over `interface` unless declaration merging needed
- React Types: Import directly from `react`, not `React.*`

## Reading Files
- Whenever reading files to understand and identify patterns that may be needed in the future, document them in corresponding context to avoid repeating it afterwards

## Code Quality
- CRITICAL: Delete unused code completely — NEVER comment it out
- No code snippets — provide complete, production-ready code
- One function/component per file
- Extract reusable logic
- Use reusable components from shadcn/ui
- No hardcoded values — use constants or config
- Time values: Always use `src/constants/time` (minuteInMs, hourInMs, etc.) instead of hardcoding milliseconds
- No backwards-compatibility shims for removed code
- Don't use redundant braces or parentheses
- Avoid single statement followed by return — inline: `if (x) return fn()` not `if (x) { fn(); return }`
- Avoid unnecessary `| null`, `| undefined` types for optional types unless explicitly required

## JSX Logic
- Never use IIFEs in JSX — compute values in variables before `return`
- Closing `)` of a multi-line callback stays inline with the next chained method: `.map(...).find(Boolean)` not `.map(...)\n.find(Boolean)`

## Code Formatting
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

## Formatting Tools
- **ESLint** (`.eslint.config.mjs`): Enforces all formatting rules. Run `npm run lint:fix` to auto-apply fixes before committing.
- **.editorconfig**: Cross-IDE settings (4-space indent, UTF-8, LF line endings). Respected by WebStorm, VS Code, etc.

## Imports (eslint-plugin-simple-import-sort)
Groups (auto-fixed by `npm run lint:fix`):
1. React
2. Next.js
3. Third-party packages
4. @-scoped packages (e.g., @tanstack, @radix-ui)
5. @/ custom (types, components, hooks, lib, utils, services, constants, config, context, handlers, pages)
6. Relative imports
7. Styles (last)