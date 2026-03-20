# Handlers — Route Data & Mutations

Route handlers for data loading and form submissions.

## Loaders (src/handlers/loaders/)
- Fetch data before route renders
- Use getRouteApi() to access loader data
- Share data with child routes
- Use TanStack Query or direct API calls

## Actions (src/handlers/actions/)
- Handle form submissions and mutations
- Return redirect or error state
- Validate input with Zod schemas
- Use api instance from @/api

## Auth Handlers (src/handlers/auth)
- Session management functions
- CSRF token handling
- Login/logout logic
- Protected route guards

## Pattern
- Keep handlers focused and testable
- Return typed responses
- Use validators for input safety
- Handle errors consistently