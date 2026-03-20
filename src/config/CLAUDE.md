# Config — Environment Variables

CRITICAL: Only `src/config/index` can use `import.meta.env` directly.

## Rules
- All env vars must be prefixed with VITE_
- Access ONLY through config object from `@/config`
- Never use import.meta.env outside `src/config/index`

## Adding Variables
1. Add to .env.local with VITE_ prefix
2. Add to config object in `src/config/index`
3. Use via config.yourVariable throughout app

## Structure
- `src/config/index` — Environment variables
- `src/config/schema/` — Form constraints and config values