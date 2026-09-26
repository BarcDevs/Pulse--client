# Pulse Client — Scaling TODOs

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
| 7 | — | — | AI agent for onboarding/check-in flow |
| 8 | — | — | RAG implementation |

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

| # | File                                                        | Line | Note                                                                                                                                                                                                           |
|---|-------------------------------------------------------------|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | `src/components/layout/sidebar/sections/GuidelinesCard.tsx` | 46 | Add community guidelines link/modal                                                                                                                                                                            |
| 2 | `src/components/community/`                                 | — | Forum tweaks — author profile link/card on post author click                                                                                                                                                   |
| 3 | —                                                           | — | Translation for server errors — map server error codes/messages to i18n keys                                                                                                                                   |
| 4 | —                                                           | — | Improve toast styling to match design                                                                                                                                                                          |
| 5 | —                                                           | — | Reply-to-reply feature — notify replied user                                                                                                                                                                   |
| 6 | —                                                           | — | Add option to translate a post/comment to user's language                                                                                                                                                      |
| 7 | —                                                           | — | Add an option to backfill 3 past check-ins                                                                                                                                                                     |
| 8 | `src/components/progress/share/ShareProgressCard.tsx` | — | Share progress in community — wire share action to community post creation. Forum has no image-attachment support; needs a design session to define post format (text summary vs. image) before implementation |
| 9 | —                                                           | — | Improve daily observation according to AI recommendations                                                                                                                                                      |
| 10 | `src/components/community/`                                 | — | Author profile view — read-only profile page when clicking a community member's name (design in `.claude/design/pages/profile/profile.jsx` - `AuthorProfileView`)                                              |
| 11 | — | — | Changelog popup — show users what's new after a release |

---

## Framework (Next 16.3 / React 19.3)

Deferred after the 16.3 upgrade. All are opt-in or experimental; none block launch.

| # | Feature | Note |
|---|---------|------|
| 1 | Instant Navigations (`cacheComponents`, `partialPrefetching`) | Changes the rendering and caching model (dynamic by default, explicit `'use cache'`). Big migration, revisit after launch. Guide: `/docs/app/guides/migrating-to-cache-components` |
| 2 | Root params (`next/root-params`) | Only useful if the locale becomes a `[lang]` route segment. Pulse uses next-intl with a cookie locale, so no fit today |
| 3 | Rust React Compiler (`experimental.turbopackRustReactCompiler`) | Experimental. Would remove manual memoization and speed up dev startup |
| 4 | `useOffline` (`experimental.useOffline`) | Experimental, and it only covers soft navigations, RSC fetches and Server Actions. Pulse data goes through TanStack Query, which stays under its own retry policy, and `error.tsx` already handles network errors. Revisit if it stabilizes |
| 5 | `catchError` custom boundaries | Pulse has almost no Server Component data fetching, so a retry that refetches server components has nothing to refetch. Revisit if pages move to server-side data |
| 6 | Trusted Types CSP | React 19.3 passes Trusted Types objects through. Adding `require-trusted-types-for 'script'` needs a review of Sentry, Quill and Analytics first |
