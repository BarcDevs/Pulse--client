# HealEase Client — TODO Tracker

Centralised list of all in-code TODOs, grouped by domain.

---

## CRITICAL — Replace Mocks in Active Pages

Replace hardcoded mock data with real API integration for pages with enabled features.

| # | File | Feature | Mock Data | Note |
|---|------|---------|-----------|------|
| 1 | `src/components/dashboard/community/CommunityActivity.tsx` | forumLinking | `COMMUNITY_ACTIVITY_FEED` | Community activity feed mock — integrate with real forum posts API |
| 2 | `src/components/dashboard/cards/TodaysFocus.tsx` | motivationFeedback | "5 minutes of mindfulness" (hardcoded in messages/en-US.json:306) | Replace hardcoded suggested activity with real API data from activity suggestions endpoint |

---

## AI / Data

| # | File | Line | Note |
|---|------|------|------|
| 1 | `src/lib/stats/getTrendLabel.ts` | 20 | Use AI to get trend label instead of hardcoded logic |
| 2 | `src/lib/stats/getStatDescription.ts` | 10 | Replace hardcoded stat descriptions with AI-generated insights |
| 3 | `src/components/chat/ChatPageContent.tsx` | 13 | Implement real AI chat API + error handling for chat failures |
| 4 | `src/components/insights/InsightsPageContent.tsx` | 8 | Implement real data fetching + add error cards when APIs are ready |
| 5 | `src/components/community/postForm/TagInput.tsx` | — | AI tag normalization: map typos/variations to canonical tags, surface candidates, auto-correct on high confidence. Triggered via `POST /forum/tags/unknown` data. |

---

## API / Backend Gaps

| # | File | Line | Note |
|---|------|------|------|
| 5 | `src/components/layout/header/HeaderNotificationButton.tsx` | 12 | Replace hardcoded count with real notifications API |
| 6 | `src/components/settings/sections/NotificationsSettings.tsx` | 30 | Push notifications — no API backing yet |
| 7 | `src/components/settings/sections/NotificationsSettings.tsx` | 48 | AI insights notifications — no API backing yet |
| 8 | `src/components/settings/sections/NotificationsSettings.tsx` | 66 | Milestone alerts — no API backing yet |
| 9 | `src/components/settings/sections/PrivacySettings.tsx` | 42 | Share anonymised data toggle — no API backing yet |
| 10 | `src/components/settings/sections/PrivacySettings.tsx` | 60 | Activity visible to mentors — needs `profileVisibility` or new field |
| 11 | `src/components/settings/sections/EmailSection.tsx` | 14 | Implement email change OTP verification flow |
| 12 | `src/components/profile/settings/BasicInfoView.tsx` | 37–39 | Add `dateOfBirth`, `recoveryType`, `careProvider` once API supports them |
| 13 | `src/components/profile/info/ProfileCard.tsx` | 31 | Level data not yet in `Profile` type — requires server changes |
| 14 | `src/components/layout/sidebar/sections/MentorItem.tsx` | 22 | Replace mock mentor data with real data |
| 15 | `src/mocks/progressMocks.ts` | 3 | Replace mock milestones with real milestones API when backend supports it |

---

## Refactoring / Architecture

| # | File | Line | Note |
|---|------|------|------|
| 15 | `src/components/AppHeader.tsx` | 31 | Make `AppHeader` follow OCP rule |
| 16 | `src/lib/forms/handleFormSubmit.ts` | 9 | Wrap all form submits with this utility |
| 17 | `src/components/community/posts/PostList.tsx` | 42 | Extract post fetch logic into a dedicated hook |
| 18 | `src/components/progress/charts/MoodTrendChart.tsx` | 24 | Merge pain and mood charts into one reusable chart component |

---

## Reusable Components (missing abstractions)

| # | File | Line | Note |
|---|------|------|------|
| 20 | `src/components/goals/form/GoalForm.tsx` | 132 | Create reusable `FormField` component |
| 21 | `src/components/goals/form/GoalForm.tsx` | 175 | Create reusable `ErrorMessage` component |
| 22 | `src/components/shared/ErrorBanner.tsx` | 47 | Replace inline close with `CloseButton` component |
| 23 | `src/components/goals/RecoveryGoalsPageContent.tsx` | 53 | Create reusable page header component |
| 24 | `src/components/goals/milestones/MilestonesSection.tsx` | 25 | Use reusable empty state component |

---

## UX / Loading States

| # | File | Line | Note |
|---|------|------|------|
| 25 | `src/components/dashboard/charts/HistoryChart.tsx` | 95 | Add skeleton loader |
| 26 | `src/components/community/posts/PostList.tsx` | 176 | Add skeleton for post list loading |
| 27 | `src/components/checkIn/CheckInPageContent.tsx` | 49 | Add proper skeleton loader |

---

## Profile / Identity

| # | File | Line | Note |
|---|------|------|------|
| 28 | `src/components/profile/RecoveryIdentity.tsx` | 66 | Show user bio once seeded data replaced with real content |
| 29 | `src/components/profile/RecoveryIdentity.tsx` | 67 | Add health interests editing (`getProfileOptions` + `addInterests`/`removeInterest`) |
| 30 | `src/components/profile/info/ProfileCard.tsx` | 47 | Implement profile image upload |
| 31 | `src/components/profile/info/ProfileCard.tsx` | 57 | Add tooltip to profile card element |
| 32 | `src/components/profile/info/ProfileLevel.tsx` | 16 | Add level title to translations |

---

## Community / Misc

| # | File | Line | Note |
|---|------|------|------|
| 33 | `src/components/community/postDetail/PostDetailActions.tsx` | 64 | Make upvotes section clickable as upvote button |
| 34 | `src/components/layout/sidebar/sections/SanctuaryCard.tsx` | 46 | Add community guidelines link/modal |
| 35 | `src/components/progress/ProgressPageContent.tsx` | 18 | Add error card to Milestones & Achievements section |
| 36 | `src/components/goals/form/GoalFormModal.tsx` | 47 | Use locale for modal text (i18n) |