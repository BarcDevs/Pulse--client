# HealEase — Recovery Support Platform

Recovery is difficult to manage without structure. HealEase provides patients transitioning from hospital or clinical care with daily check-in rituals, progress visibility, and community support.

---

## Problem Statement

Patients leaving hospital or clinical care face a critical gap: the loss of daily medical oversight and structured routine. Between appointments, motivation declines, progress becomes invisible, and recovery drifts without reinforcement. The result is disengagement and setbacks.

HealEase addresses this by creating a structured daily check-in ritual, making recovery progress visible through charts, and providing community connection with others in similar circumstances.

---

## Product Philosophy

**Structure**: Recovery benefits from daily routine. A single check-in per day creates the behavioral anchor needed for consistency.

**Visibility**: Progress is often hard to feel day by day. Charts and trends make recovery visible over time, revealing patterns individual days cannot show.

**Early Detection**: Pattern analysis can identify when engagement or mood is declining, helping catch setbacks early.

**Community**: Connection with others going through recovery reduces isolation during a vulnerable time.

---

## Key Features

**Daily Check-Ins**
Users log mood (1-10), pain level (1-10), activities, and notes in a single daily ritual. The system enforces one check-in per calendar day; subsequent submissions update the existing entry.

**Progress Visualization**
Mood and pain charts display trends over time, making recovery visible and tangible.

**Community Forum**
A space for patients to share experiences, ask questions, and connect with others in recovery. Includes posts, replies, voting, and tag-based filtering.

**User Profiles**
Profiles capture bio, location, timezone, and emerging personalization through health interests and activity preferences. These support improved recommendations and community connection.

**Insights**
Lightweight, supportive insights generated from check-in patterns help detect trends and maintain motivation. Insights are explicitly labeled as AI-assisted suggestions, not medical advice.

---

## Technology Stack

| Layer | Technology                                            |
|---|-------------------------------------------------------|
| **Frontend** | Next.js 16, React 19, TypeScript, TanStack Query      |
| **Styling** | TailwindCSS 4, shadcn/ui                              |
| **Routing** | Next.js App Router (file-based)                       |
| **Forms** | react-hook-form, Zod                                  |
| **HTTP** | Axios with CSRF interceptors                          |
| **State** | TanStack Query, Next.js Context                       |
| **Deployment** | Render (current), AWS (future production)             |

**Note**: This is a frontend-only repository. The backend API runs separately.

---

## Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:4000` (optional for development)

### Installation

```bash
# Clone and install
git clone https://github.com/BarcDevs/HealEase--client.git
cd HealEase--client
npm install

# Create environment file
cp .env.example .env.local

# Start dev server
npm run dev
```

### Environment Variables

```env
# Backend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:4000

# Error tracking (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Commands

```bash
npm run dev       # Start Next.js dev server (localhost:3000)
npm run build     # Production build
npm run start     # Run production server
npm run lint      # Check ESLint violations
npm run lint:fix  # Auto-fix formatting and linting
npm run typecheck # TypeScript type checking
```

---

## Folder Structure

See [docs/structure.md](./docs/structure.md) for complete structure.

Key directories:
- **src/app/** — Next.js App Router (file-based routing)
- **src/api/** — API client modules by domain
- **src/components/** — React components (ui, shared, layout, feature-specific)
- **src/hooks/** — Custom React hooks
- **src/store/** — Redux Toolkit state management
- **src/services/** — Business logic and utilities
- **src/validations/** — Zod validation schemas
- **src/types/** — TypeScript type definitions
- **src/constants/** — App constants and configuration
- **src/context/** — React Context providers
- **src/config/** — Environment and feature configuration

---

## Architecture & Documentation

[Architecture Diagram](https://www.notion.so/HealEase-structure-diagram-30d9e15469d280468f41e0d8925c6c98?source=copy_link)

See [docs/TECHNICAL_PRD.md](./docs/TECHNICAL_PRD.md) for:
- System architecture
- Data models
- API specification
- Check-in model and constraints
- User flows

---

## Code Standards

Code follows [CLAUDE.md](./CLAUDE.md) conventions:
- TypeScript with strict typing
- React 19 functional components
- Single quotes, no semicolons, 4-space indentation
- shadcn/ui for UI components
- Centralized API client with CSRF protection
- TanStack Query for state management

---

## Authentication

HealEase supports two authentication methods:

**Email & Password**
- Traditional email/password signup and login
- Password reset via email
- Form validation with Zod schemas

**Google OAuth**
- Sign in with Google button on login and signup pages
- Automatic account linking for existing emails
- New account creation if no existing email match
- Seamless session management via HTTP-only cookies

Both methods use the same session system:
- JWT stored in HTTP-only `accessToken` cookie (auto-sent on requests)
- CSRF token in `_csrf` cookie (read and sent as `x-csrf-token` header for mutations)
- Redux state tracks authenticated user
- Auto-refresh of auth state on app mount and periodic validation

---

## Security

- CSRF protection via Axios interceptors
- XSS prevention via HTML sanitization (DOMPurify)
- Open redirect validation
- HTTP-only JWT cookies
- Type-safe forms with Zod validation
- OAuth state validation to prevent CSRF attacks

---

## Deployment

Currently deployed on **Render** with automatic builds from main branch. Future production infrastructure planned on **AWS**.

---

## Support & Contribution

- 📖 [Backend Repository](https://github.com/BarcDevs/HealEase--server)
- 📋 [Technical PRD](./docs/TECHNICAL_PRD.md)
- 🐛 [Issues](https://github.com/BarcDevs/HealEase--client/issues)
- 💬 [Community Forum](https://healease-client.onrender.com/forum)