# API — Conventions

Centralized Axios instance with CSRF interceptors auto-injected for mutations.

## Core Rules
- ALWAYS use api instance from @/api
- Never create new axios instances or use fetch directly
- One module per domain (auth, forum, profile, checkIn)
- Export functions, not raw api calls

## CSRF
- Auto-injected by axios interceptor for POST, PUT, PATCH, DELETE
- No manual handling needed in components

## DOCS
- On every change in routes, update docs/TECHNICAL_PRD.md and README.md with new API endpoints, request/response formats, and any relevant details for frontend integration.
- Use the API docs to generate the frontend API client. API docs are in `../HealEase--server/docs/API.md`.