# Pulse Client — TODO Tracker

MVP-level TODOs only. See `scaling-todo.md` for deferred items.

---

## CRITICAL — Replace Mocks in Active Pages

Replace hardcoded mock data with real API integration for pages with enabled features.

| # | File | Feature | Mock Data | Note |
|---|------|---------|-----------|------|
| ~~1~~ | ~~`src/components/dashboard/community/CommunityActivity.tsx`~~ | ~~forumLinking~~ | ~~`COMMUNITY_ACTIVITY_FEED`~~ | ~~Community activity feed mock — integrate with real forum posts API~~ |
| ~~2~~ | ~~`src/components/dashboard/cards/DailyObservation.tsx`~~ | ~~motivationFeedback~~ | ~~"5 minutes of mindfulness" (hardcoded in messages/en-US.json:306)~~ | ~~Replace hardcoded suggested activity with real API data from activity suggestions endpoint~~ |

---

## AI / Reflective Insights

The `DailyObservation` card currently shows a static hardcoded description. This is temporary.

**MVP goal:** Replace with a small AI-generated reflective insight card derived from:
- Deterministic backend signals (top activities, mood trend, streak, check-in frequency)
- Lightweight AI phrasing (short, calm, observational)

Card must stay: **small · passive · reflective · observational · calm**

No recommendations, no "you should", no pseudo-coaching.
The card reflects the user back to themselves — it does not instruct them.

| # | File | Note |
|---|------|------|
| ~~1~~ | ~~`src/components/dashboard/cards/DailyObservation.tsx`~~ | ~~Replace static `observation` with AI-generated reflective insight from backend. Backend derives insight from check-in signals; client renders as-is.~~ |

**Scaling-deferred — do NOT build until data maturity + trust calibration:**

Behavioral intelligence systems require medical/legal caution, behavioral tuning, repetition management, and data maturity. Deferred entirely to scaling phase:
- Recommendation engines
- Predictive suggestions
- Adaptive wellness coaching
- Intervention systems
- Proactive AI guidance
- Emotional diagnosis
- Personalized recovery plans
- Conversational coaching loops

---

## API / Backend

| # | File | Line | Note |
|---|------|------|------|
| ~~1~~ | ~~`src/components/profile/settings/BasicInfoView.tsx`~~ | ~~37–39~~ | ~~Add `dateOfBirth`, `recoveryType`, `careProvider` once API supports them~~ |
| ~~2~~ | ~~`../pulse--server`~~ | ~~—~~ | ~~`GET /forum/recommendations` should always return posts — currently returns empty `posts: []` when `status: "processing"` causing blank community activity card~~ |
| ~~3~~ | ~~`src/context/ForumRepliesContext.tsx`~~ | ~~—~~ | ~~Add reply count to post API response (or dedicated endpoint) so "Show more replies" button can display exact remaining count instead of static label~~ |

---

## Profile / Identity

| #     | File                                              | Line   | Note                                                                                                |
|-------|---------------------------------------------------|--------|-----------------------------------------------------------------------------------------------------|
| ~~1~~ | ~~`src/components/profile/RecoveryIdentity.tsx`~~ | ~~66~~ | ~~Show user bio once seeded data replaced with real content~~                                     |
| ~~2~~ | ~~`src/components/profile/RecoveryIdentity.tsx`~~ | ~~67~~ | ~~Fetch available interests via `getProfileOptions` and render selectable options~~                 |
| ~~3~~ | ~~`src/components/profile/info/ProfileCard.tsx`~~ | ~~47~~ | ~~Hide camera upload button behind feature flag (image upload implementation deferred to scaling)~~ |

---

## Community

| # | File | Line | Note |
|---|------|------|------|
| ~~1~~ | ~~`src/components/community/`~~ | ~~—~~ | ~~Forum tweaks — add author badge next to post author name~~ |
| ~~2~~ | ~~`src/components/community/postDetail/`~~ | ~~—~~ | ~~Limit reply count — use expand button to show remaining replies~~ |

---

## Progress / Goals

| # | File | Line | Note |
|---|------|------|------|
| ~~1~~ | ~~`src/components/progress/ProgressPageContent.tsx`~~ | ~~18~~ | ~~Add error card to Milestones & Achievements section when API errors occur~~ |
| ~~2~~ | ~~`src/components/goals/form/GoalForm.tsx`~~ | ~~—~~ | ~~Replace native date input with shadcn calendar component~~ |
| ~~3~~ | ~~`src/components/shared/`~~ | ~~—~~ | ~~Create reusable `ErrorMessage` component for inline form root errors (currently inlined in `GoalForm`)~~ |

---

## Style / Design

| #     | File                                             | Line  | Note                                                               |
|-------|--------------------------------------------------|-------|--------------------------------------------------------------------|
| ~~1~~ | ~~`.claude/design/resources/design-canvas.jsx`~~ | ~~—~~ | ~~Apply Claude Design's style guide to components (low priority)~~ |

spotted:
community activity loading forever if no activity to recommend
progress streak - no optimistic update, broken streak shown as active streak color