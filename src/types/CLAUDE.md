# Types — TypeScript Conventions

Type definitions organized by domain in `src/types/`

## Rules
- Prefer type to interface (unless declaration merging needed)
- PascalCase naming
- Named exports preferred
- Organize by domain (forum, profile, checkIn)
- Use module augmentation for extending third-party types

## Structure
- `src/types/` — Domain-specific types
- `src/types/responses/` — API response types
- `src/types/index` — Central exports

## Naming
- Response types: UserResponse, PostResponse
- Entity types: User, Post, CheckIn
- Form types: UserInput, ProfileUpdateInput