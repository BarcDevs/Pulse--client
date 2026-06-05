# HealEase Client — Scaling TODOs

Deferred items — not required for MVP. See `TODO.md` for active work.

---

## AI / Data

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/lib/stats/getTrendLabel.ts` | 20 | Use AI to get trend label instead of hardcoded logic |
| 2 | `src/lib/stats/getStatDescription.ts` | 10 | Replace hardcoded stat descriptions with AI-generated insights |
| 3 | `src/components/chat/ChatPageContent.tsx` | 13 | Implement real AI chat API + error handling (page currently behind feature flag) |
| 4 | `src/components/insights/InsightsPageContent.tsx` | 8 | Implement real data fetching + error cards (page currently behind feature flag) |
| 5 | `src/components/community/postForm/TagInput.tsx` | — | AI tag normalization: map typos/variations to canonical tags, surface candidates, auto-correct on high confidence. Triggered via `POST /forum/tags/unknown` data. |
| 6 | `src/components/profile/RecoveryIdentity.tsx` | — | AI-powered interest suggestions — surface relevant health interests based on user activity patterns (drives: community discovery, personalization, recovery identity) |

---

## API / Backend Gaps

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/layout/header/HeaderNotificationButton.tsx` | 12 | Replace hardcoded count with real notifications API |
| 2 | `src/components/settings/sections/NotificationsSettings.tsx` | 30 | Push notifications — no API backing yet |
| 3 | `src/components/settings/sections/NotificationsSettings.tsx` | 48 | AI insights notifications — no API backing yet |
| 4 | `src/components/settings/sections/NotificationsSettings.tsx` | 66 | Milestone alerts — no API backing yet |
| 5 | `src/components/settings/sections/PrivacySettings.tsx` | 42 | Share anonymised data toggle — no API backing yet |
| 6 | `src/components/settings/sections/PrivacySettings.tsx` | 60 | Activity visible to mentors — needs `profileVisibility` or new field |
| 7 | `src/components/profile/info/ProfileCard.tsx` | 31 | Level data not yet in `Profile` type — requires server changes |
| 8 | `src/components/layout/sidebar/sections/MentorItem.tsx` | 22 | Replace mock mentor data with real data |
| 9 | — | — | Refactor server `Tag` model: replace flat `name`/`nameHe` columns with JSON `name: { en, he }` to match the slug-based i18n pattern used by interests/activities |

---

## Profile / Identity

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/profile/info/ProfileCard.tsx` | 47 | Implement profile image upload |
| 2 | `src/components/profile/info/ProfileCard.tsx` | 57 | Add tooltip to profile level badge |
| 3 | `src/components/profile/info/ProfileLevel.tsx` | 16 | Add level title to translations |

---

## Refactoring / Architecture

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/AppHeader.tsx` | 31 | Make `AppHeader` follow OCP rule |
| 2 | `src/lib/forms/handleFormSubmit.ts` | 9 | Wrap all form submits with this utility |
| 3 | `src/components/community/posts/PostList.tsx` | 42 | Extract post fetch logic into a dedicated hook |

---

## Reusable Components

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/goals/form/GoalForm.tsx` | 132 | Create reusable `FormField` component |
| 2 | `src/components/goals/form/GoalForm.tsx` | 175 | Create reusable `ErrorMessage` component |
| 3 | `src/components/shared/ErrorBanner.tsx` | 47 | Replace inline close with `CloseButton` component |
| 4 | `src/components/goals/RecoveryGoalsPageContent.tsx` | 53 | Create reusable page header component |
| 5 | `src/components/goals/milestones/MilestonesSection.tsx` | 25 | Use reusable empty state component |

---

## UX / Loading States

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/dashboard/charts/HistoryChart.tsx` | 95 | Add skeleton loader |
| 2 | `src/components/community/posts/PostList.tsx` | 176 | Add skeleton for post list loading |
| 3 | `src/components/checkIn/CheckInPageContent.tsx` | 49 | Add proper skeleton loader |

---

## Community / Misc

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/components/layout/sidebar/sections/SanctuaryCard.tsx` | 46 | Add community guidelines link/modal |
| 2 | `src/components/community/` | — | Forum tweaks — author profile link/card on post author click |
| 3 | — | — | Translation for server errors — map server error codes/messages to i18n keys |
| 4 | — | — | Improve toast styling to match design |
| 5 | — | — | Reply-to-reply feature — notify replied user |
| 6 | — | — | Add option to translate a post/comment to user's language |
| 7 | — | — | Add an option to backfill 3 past check-ins |
| 8 | — | — | Share Progress feature |
| 9 | — | — | Improve daily observation according to GPT recommendations |
| 10 | `src/components/community/` | — | Author profile view — read-only profile page when clicking a community member's name (design in `.claude/design/pages/profile/profile.jsx` - `AuthorProfileView`) |
