# HealEase Client — TODO Tracker

MVP-level TODOs only. See `scaling-todo.md` for deferred items.

---

## CRITICAL — Replace Mocks in Active Pages

Replace hardcoded mock data with real API integration for pages with enabled features.

| # | File | Feature | Mock Data | Note |
|---|------|---------|-----------|------|
| 1 | `src/components/dashboard/community/CommunityActivity.tsx` | forumLinking | `COMMUNITY_ACTIVITY_FEED` | Community activity feed mock — integrate with real forum posts API |
| 2 | `src/components/dashboard/cards/TodaysFocus.tsx` | motivationFeedback | "5 minutes of mindfulness" (hardcoded in messages/en-US.json:306) | Replace hardcoded suggested activity with real API data from activity suggestions endpoint |

---

## API / Backend

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/profile/settings/BasicInfoView.tsx` | 37–39 | Add `dateOfBirth`, `recoveryType`, `careProvider` once API supports them |

---

## Profile / Identity

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/profile/RecoveryIdentity.tsx` | 66 | Show user bio once seeded data replaced with real content |
| 2 | `src/components/profile/RecoveryIdentity.tsx` | 67 | Add health interests editing (`getProfileOptions` + `addInterests`/`removeInterest`) |
| 3 | `src/components/profile/info/ProfileCard.tsx` | 47 | Hide camera upload button behind feature flag (image upload implementation deferred to scaling) |

---

## Community

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/community/` | — | Forum tweaks — add author badge next to post author name |
| 2 | `src/components/community/postDetail/` | — | Limit reply count — use expand button to show remaining replies |

---

## Progress / Goals

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/progress/ProgressPageContent.tsx` | 18 | Add error card to Milestones & Achievements section when API errors occur |
| 2 | `src/components/goals/form/GoalForm.tsx` | — | Replace native date input with shadcn calendar component |

---

## Style / Design

| # | File | Line | Note |
|---|------|------|------|
| 1 | `.claude/design/` | — | Apply Claude Design's style guide to components (low priority) |
