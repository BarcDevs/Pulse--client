# HealEase — Technical Product Requirements

**Version**: 0.9 POC
**Last Updated**: March 2026
**Owner**: @BarcDevs
**Repository**: Frontend-only (client-side UI)

**Note**: This repository contains the frontend application only. The backend API runs separately.

---

## Executive Summary

HealEase is a recovery support platform for patients transitioning from hospital or clinical care back home. The core value proposition is providing structure, visibility, and emotional support during recovery through daily check-ins, trend analytics, and community connection.

The platform centers on a single daily check-in ritual designed to encourage consistency and generate meaningful trend data for supportive insights.

---

## Product Vision

Recovery requires structure and visibility to maintain momentum.

Patients leaving clinical care face a critical gap: the loss of daily medical oversight and structured routine. Between appointments, motivation declines, progress becomes invisible, and recovery drifts without reinforcement.

HealEase fills this gap by creating:
1. A daily behavioral anchor (the check-in ritual)
2. Objective visibility into personal trends (charts and analytics)
3. Early detection of disengagement (pattern analysis)
4. Emotional support from a community of peers (forum and interaction)

---

## Problem Definition

### Current State
Patients transitioning from hospital/clinical care lack:
- **Structure**: No daily reinforcement of recovery goals
- **Visibility**: Progress is invisible day-to-day; hard to feel momentum
- **Support**: Limited emotional connection during vulnerable recovery phases
- **Early Warning**: No way to detect when engagement or progress is declining

### Desired State
Patients have:
- Daily accountability through a structured check-in ritual
- Clear visualization of personal recovery trends
- Early detection system to identify motivation drops
- Connection with others experiencing similar journeys

---

## Target Users

**Primary**: Patients (18+) recently discharged from hospital/clinical care
- Post-surgical recovery
- Post-hospitalization recovery from acute illness or mental health episodes
- Chronic condition management during recovery transitions

---

## Core User Flows

### Flow 1: Logged-Out User
```
Landing Page → Sign Up / Log In → Email verification → Home
```

### Flow 2: Check-In (Logged In)
```
Home (CTA: "Check In Today") → /check-in/new → Form → Submit → Dashboard/Overview
```

### Flow 3: Check-In Form Fields
- Mood score (1-10 slider)
- Pain level (1-10 slider)
- Activities (multi-select with recent suggestions)
- Notes (optional text area)

### Flow 4: Check-In Submission Behavior
```
1. User submits form
2. Client attempts POST /api/v1/check-in
3. If 409 conflict:
   - Display: "You've already checked in today. Update instead?"
   - If confirmed: Send PATCH /api/v1/check-in with same payload
   - If declined: Cancel
4. On success: Redirect to check-in dashboard
```

### Flow 5: Dashboard
```
Check-In Overview → Mood/Pain Charts → Check-In History → Community Forum
```

---

## Check-In Model & Constraints

### Rule: One Primary Check-In Per Day
- Users can create one check-in per calendar day
- If submitted multiple times same day, the entry is updated (not duplicated)
- Timezone-aware (user's local timezone)

### Backend Behavior

**POST /api/v1/check-in**
- Creates check-in for today if none exists
- Returns 409 Conflict if check-in already exists for today
- Request body: `{ moodScore, painLevel, activities, notes }`
- Response (201): `{ message: string, data: CheckIn }`

**PATCH /api/v1/check-in**
- Updates today's check-in
- Idempotent operation
- Request body: `{ moodScore, painLevel, activities, notes }`
- Response (200): `{ message: string, data: CheckIn }`

**GET /api/v1/check-in**
- Fetches check-ins (optionally filtered by date range)
- Returns array of check-ins with insights included
- Query params: `?from=DATE&to=DATE`
- Response (200): `{ message: string, data: CheckIn[] }`

**GET /api/v1/check-in/stats**
- Aggregate statistics for dashboard
- Returns mood/pain averages, streak data, etc.
- Response (200): `{ message: string, data: Stats }`

### Check-In Data Structure

```typescript
{
  id: string
  userId: string
  checkInDate: Date          // Date only, not time
  moodScore: number          // 1-10
  painLevel: number          // 1-10
  activities: string[]       // Array of activity names
  notes?: string
  createdAt: Date
  updatedAt: Date
  insights?: Insight[]       // AI-generated insights
}
```

---

## Feature Specifications

### 1. Daily Check-In Form
- Mood scale: 1-10 slider
- Pain level: 1-10 slider
- Activities: Multi-select with quick-action suggestions (derived client-side from recent history)
- Notes: Optional text field (up to 1000 characters)
- Smart save: POST first, PATCH on 409 conflict
- Form validation with error feedback

### 2. Activity Suggestions (Client-Side)
Activities are suggested based on recent history:

**Algorithm**:
```
1. Fetch user's last 14 days of check-ins via GET /api/v1/check-in
2. Aggregate all activities across those check-ins
3. Count frequency for each activity
4. Rank by frequency (most common first)
5. Display top 5-7 as quick-action chips
6. Allow custom activity entry
```

**Implementation**: Derived on the client from GET /api/v1/check-in response, not from a dedicated suggestions endpoint.

### 3. Mood & Pain Charts
- Line chart: mood score over time (default: last 30 days)
- Line chart: pain level over time
- Interactive (hover for details, date navigation)
- Trend line overlay showing direction (improving/declining)

### 4. AI Insights
Generated from check-in patterns. Three types:

**Tip**: Actionable observation based on trends
**Warning**: Early detection of disengagement or declining patterns
**Positive**: Reinforcement of progress

**Constraints**:
- Insights are explicitly labeled as AI-assisted and supportive, not medical advice
- Generated from aggregate patterns, not individual data points
- Updated on check-in submission or via daily batch
- Clearly distinguished from clinical guidance

### 5. Check-In History
Timeline view of past check-ins:
- Date, mood, pain, activities summary
- Expandable to view full entry
- Filterable by date range

### 6. User Profiles
Profiles include:
- Bio (up to 500 characters)
- Location
- Timezone (used for check-in date calculation)
- Image (supported backend; emerging UX)
- Health interests (many-to-many; supported backend; emerging personalization)
- Activity preferences (derived from check-in history; supported backend; emerging personalization)

**Note**: Profile personalization features are backend-supported but not yet fully surfaced in current client UX. These capabilities enable emerging personalization as the product evolves.

### 7. Community Forum
- Post creation (title, body, optional tags)
- Nested replies
- Voting per post/reply
- User profiles visible on posts
- Tag-based filtering
- Post/reply editing and deletion (by author or admin)

---

## System Architecture

### High-Level Data Flow
```
React Frontend (Next.js App Router + TanStack Query)
    ↓
React Context (Auth state) + TanStack Query (Server state)
    ↓
Axios API Client (with CSRF interceptor)
    ↓
Express Backend (/api/v1 routes)
    ↓
PostgreSQL (via Prisma ORM)
    ↓
Google AI API (for insight generation)
```

### Frontend Architecture
- **Framework**: Next.js 16 with App Router (file-based routing with layout groups)
- **State**: React Context (auth state) + TanStack Query (server state caching)
- **UI**: React 19 with shadcn/ui components and Radix UI
- **Styling**: TailwindCSS 4 + custom CSS variables
- **Forms**: react-hook-form + Zod validation
- **API Client**: Centralized Axios instance with automatic CSRF interceptor
- **Analytics**: Sentry for error tracking

### Backend Architecture
- **Server**: Express.js with middleware (auth, validation, error handling)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT in HTTP-only cookies + CSRF tokens
- **Async Jobs**: Planned (not yet implemented); future for insight generation pipeline
- **Caching**: Session/token caching via Redis (future optimization)

---

## Data Model Overview

### Core Entities

**User**
```
id, email, hashedPassword, firstName, lastName, timezone, bio, location,
image, role, createdAt, updatedAt
```

**CheckIn**
```
id, userId, checkInDate (date, not datetime), moodScore (1-10),
painLevel (1-10), activities (string[]), notes, createdAt, updatedAt
```

**Insight**
```
id, userId, checkInId, type (tip/warning/positive), content, generatedAt
```

**Post** (forum)
```
id, userId, title, body, tags (string[]), createdAt, updatedAt
```

**Reply** (forum)
```
id, postId, userId, body, createdAt, updatedAt, parentReplyId (for nesting)
```

**Vote** (forum)
```
id, userId, postId, replyId, value (+1/-1)
```

**HealthInterest** (user profile personalization)
```
id, slug, name, description, createdAt
```

**UserHealthInterest** (junction table)
```
userId, healthInterestId
```

**ActivityPreference** (user profile personalization)
```
id, slug, name, description, createdAt
```

**UserActivityPreference** (junction table)
```
userId, activityPreferenceId
```

---

## API Interaction Model

### Base URL & Response Format

```
Base URL: http://localhost:3000
API Prefix: /api/v1
```

**Success Response**:
```json
{
  "message": "Operation successful",
  "data": { /* typed response */ }
}
```

**Error Response**:
```json
{
  "message": "User-friendly error message",
  "error": "error_code_or_description"
}
```

### Auth Endpoints — /api/v1/auth

**POST /login**
```
Request: { email, password }
Response 200: { message, data: User }
Response 401: { message, error }
```

**POST /signup**
```
Request: { email, password, firstName, lastName }
Response 201: { message, data: User }
Response 400: { message, error }
```

**GET /csrf**
```
Response 200: { message, data: { token: string } }
```

**GET /me**
```
Response 200: { message, data: User }
Response 401: Unauthorized
```

**GET /logout**
```
Response 200: { message }
```

**GET /forgot-password/:email**
```
Response 200: { message }
```

**POST /confirm-email**
```
Request: { token }
Response 200: { message }
```

**PUT /reset-password**
```
Request: { token, newPassword }
Response 200: { message }
```

### Check-In Endpoints — /api/v1/check-in

**POST /**
```
Request: { moodScore: 1-10, painLevel: 1-10, activities: string[], notes?: string }
Response 201: { message, data: CheckIn }
Response 409: { message: "Check-in already exists for today", error }
Response 400: { message, error }
```

**GET /**
```
Query: ?from=DATE&to=DATE (optional)
Response 200: { message, data: CheckIn[] }
```

**PATCH /**
```
Request: { moodScore: 1-10, painLevel: 1-10, activities: string[], notes?: string }
Response 200: { message, data: CheckIn }
Response 400/404: { message, error }
```

**GET /stats**
```
Response 200: { message, data: { avgMood, avgPain, streak, totalCheckIns, ... } }
```

### Users Endpoints — /api/v1/users

**PATCH /me**
```
Request: { firstName?, lastName?, bio?, location?, timezone?, image? }
Response 200: { message, data: User }
```

**PATCH /password**
```
Request: { currentPassword, newPassword }
Response 200: { message }
Response 401: { message, error }
```

### Profile Endpoints — /api/v1/profile

**GET /**
```
Response 200: { message, data: Profile }
```

**PATCH /**
```
Request: { bio?, location?, timezone?, image? }
Response 200: { message, data: Profile }
```

**POST /health-interests**
```
Request: { healthInterestSlugs: string[] }
Response 200: { message, data: Profile }
```

**DELETE /health-interests/:slug**
```
Response 200: { message }
```

**POST /activities**
```
Request: { activityPreferenceSlugs: string[] }
Response 200: { message, data: Profile }
```

**DELETE /activities/:slug**
```
Response 200: { message }
```

**GET /list/health-interests**
```
Response 200: { message, data: HealthInterest[] }
```

**GET /list/activities**
```
Response 200: { message, data: ActivityPreference[] }
```

### Forum Endpoints — /api/v1/forum

**GET /posts**
```
Query: ?tag=TAG&page=1&limit=20
Response 200: { message, data: { posts: Post[], total, page, pageSize } }
```

**POST /posts**
```
Request: { title, body, tags?: string[] }
Response 201: { message, data: Post }
```

**GET /posts/:postId**
```
Response 200: { message, data: Post }
```

**PUT /posts/:postId**
```
Request: { title?, body?, tags? }
Response 200: { message, data: Post }
```

**DELETE /posts/:postId**
```
Response 200: { message }
```

**GET /posts/:postId/reply**
```
Response 200: { message, data: Reply[] }
```

**POST /posts/:postId/reply**
```
Request: { body, parentReplyId?: string }
Response 201: { message, data: Reply }
```

**PUT /posts/:postId/reply/:replyId**
```
Request: { body }
Response 200: { message, data: Reply }
```

**DELETE /posts/:postId/reply/:replyId**
```
Response 200: { message }
```

**GET /tags**
```
Response 200: { message, data: Tag[] }
```

**GET /tags/:tagId**
```
Response 200: { message, data: Tag }
```

---

## AI Insight Pipeline (High Level)

### Trigger
Insights are generated:
1. Immediately after each check-in submission
2. Via daily batch job (time-based, user's timezone)

### Data Collection
```
1. Fetch user's last 30 days of check-ins
2. Aggregate: mood trends, pain trends, activity frequency
3. Compute: baseline (average), variance, direction (improving/declining)
4. Identify patterns: consistent engagement, anomalies
```

### Insight Generation
```
1. Send aggregated data to Google AI API
2. Prompt: Generate 2-3 supportive insights (tip, observation, encouragement)
   based on check-in trends
3. Parse response into typed insights (type: tip|warning|positive)
4. Store in database
```

### Constraints
- Insights are labeled "AI-assisted" and supportive, not medical diagnosis
- No individual identifiable data sent to OpenAI
- Aggregated patterns only
- Response time cached within 1 hour to avoid duplicate API calls
- Insights are explicitly not a substitute for clinical guidance

---

## Metrics for Success

**Engagement**
- Daily Active Users (DAU)
- Check-in completion rate (% of registered users with check-in today)
- Consecutive check-in streak distribution

**Retention**
- 7-day retention rate
- 30-day retention rate
- Churn rate (users inactive >14 days)

**Community**
- Forum posts per week
- Forum engagement (replies, votes)
- Unique forum users per week

**Platform Health**
- API response time (p95 < 200ms)
- Error rate (target < 0.5%)
- TypeScript type safety (100% strict)

---

## Non-Goals (Current Phase)

- Medical diagnosis or clinical decision support
- Integration with electronic health records (EHR)
- Real-time chat or messaging (Socket.io planned for future)
- Mobile native apps (responsive web for now)
- Medication tracking
- Integration with wearables or health devices
- Third-party data imports
- Therapist or physician dashboards (future product expansion)

---

## Future Roadmap

### Phase 2: Enhanced Community (Planned)
- Direct messaging between users
- Care circles (group recovery support with permission-based access)
- Moderation and safety controls

### Phase 3: Notifications & Reminders (Planned)
- Push notifications for check-in reminders
- Weekly progress summaries via email
- Alerts on mood/pain threshold changes

### Phase 4: Care Partner Portal (Future)
- Family members can view progress (with consent)
- Secure messaging with patient
- Guidance and support resources

### Phase 5: Async Job Pipeline (Future Infrastructure)
- Bull queue for background insight generation
- Redis caching for improved performance
- Scheduled daily insight batches by timezone

---

## Risks & Assumptions

### Risks
1. **User Adoption**: Recovery is individualized; check-in frequency may vary widely
   - Mitigation: Gentle reminders, community encouragement, emphasize consistency in onboarding

2. **Data Privacy**: Health data requires strict security and compliance
   - Mitigation: Encryption at rest/transit, clear privacy policy, HIPAA-readiness roadmap

3. **AI Accuracy**: Insights must be meaningful and non-harmful
   - Mitigation: Extensive testing, explicit "supportive not medical" framing, human review

4. **Regulatory Compliance**: Healthcare regulations vary by jurisdiction
   - Mitigation: Legal review, clear terms of service, no medical claims

5. **Churn During Recovery**: Patients may complete recovery and leave
   - Mitigation: Design for natural lifecycle; focus on retention during active recovery phase

### Assumptions
1. Users will check in consistently (consistency supports trend accuracy)
2. AI insights will be perceived as helpful and supportive
3. Community interaction reduces isolation (peer support value)
4. Daily trends are sufficient for pattern detection
5. Timezone handling is critical (users may travel during recovery)
6. Backend conflict handling (409) is acceptable UX pattern for same-day updates

---

## Technical Decisions

1. **One Check-In Per Day**: Enforces consistency, prevents data noise, simplifies trend analysis
2. **Client-Side Smart Conflict Resolution**: Puts UX decision in user's hands; better than silent overwrite
3. **Aggregated AI Data**: Privacy-first; no individual identifiers sent externally
4. **TanStack Query for Server State**: Caching, invalidation, and real-time updates without boilerplate
5. **Zod + react-hook-form**: Type-safe form validation with clear error messages
6. **PostgreSQL + Prisma**: Type-safe database access, strong schema guarantees
7. **Axios Centralized Instance**: CSRF protection auto-injected, interceptor-based auth refresh

---

## Deployment & Operations

### Current Deployment
- **Frontend**: Render (Node.js / Express static serving)
- **Backend**: Render (Node.js runtime)
- **Database**: PostgreSQL on Render (production) / local (development)
- Automatic builds on main branch push

### Future Production Infrastructure
- **Frontend**: AWS S3 + CloudFront (CDN)
- **Backend**: AWS ECS / Lambda
- **Database**: AWS RDS PostgreSQL
- **Monitoring**: CloudWatch, Sentry

### Development Workflow
- Branch per feature/fix
- Pull requests for code review
- Automated tests run on PR
- Merge to main triggers production deploy

---

## Documentation & Resources

- Frontend: [README.md](../README.md)
- Backend: [HealEase Server](../../HealEase--server/README.md)
- Code Standards: [CLAUDE.md](../CLAUDE.md)
- Folder Structure: [docs/structure.md](./STRUCTURE.md)