# Project Structure

```
src/
├── app/            # Next.js App Router (file-based routing with layout groups)
├── api/            # Centralized API client modules by domain (auth, checkIn, forum, profile)
├── components/     # React components organized by feature (ui, layout, auth, check-in, community, etc.)
├── hooks/          # Custom React hooks (useAuth, useToast, etc.)
├── middleware/     # Next.js middleware handlers (route protection, auth, extensible pipeline)
├── services/       # Business logic and utilities (checkIn calculations, etc.)
├── utils/          # Helper utilities (api, router, redirect, sentry)
├── lib/            # Library code (chart utilities, style helpers)
├── constants/      # App constants (endpoints, defaults, time values, static text)
├── config/         # Configuration (environment variables, Zod validation schemas)
├── context/        # React Context providers (language, theme)
├── types/          # TypeScript type definitions by domain
├── styles/         # Global CSS (Tailwind, custom variables)
├── app.tsx         # React app entry point
└── main.tsx        # React DOM root
```

Each directory follows a single responsibility principle — one concern per file. See [../CLAUDE.md](../CLAUDE.md) for detailed code conventions.