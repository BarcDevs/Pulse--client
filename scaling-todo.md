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

---

## Dependencies (package upgrades)

Checked with `npm outdated` on 26/09/2026 (69 packages behind). Next 16.3.6 and React 19.3.0 are current. Re-run `npm outdated` before starting; numbers below will drift.

| # | Package(s) | Note |
|---|------------|------|
| 1 | Safe patch/minor bumps (in semver range) | One `chore(deps)` commit, then typecheck, lint, tests and e2e. Includes `tailwindcss` and `@tailwindcss/postcss` 4.2 to 4.3, `@playwright/test` and `playwright` 1.60 to 1.63, `@tanstack/react-query` 5.99 to 5.104, `next-intl` 4.11 to 4.14, `react-hook-form` 7.72 to 7.89, `recharts` 3.8 to 3.10, `@typescript-eslint/*` 8.58 to 8.70, `postcss`, `autoprefixer`, `tailwind-merge`, `globals`, `input-otp`, `@testing-library/*` |
| 2 | Security-related patch bumps | `axios` 1.17 to 1.20, `dompurify` 3.4.0 to 3.4.16. Do first, ahead of the rest of the safe set if it is split |
| 3 | Radix (`@radix-ui/*` 27 packages + `radix-ui`) | Minor/patch only, no majors. Bump together and click through dialogs, selects, popovers, tabs and the slider before merging |
| 4 | `@sentry/nextjs` and `@sentry/react` 10.57 to 10.75 (then 11.0) | Patch/minor now. Sentry 11 is a major: read its migration guide and check `sentry.*.config` and `instrumentation.ts` first |
| 5 | `typescript` alias out of sync | `package.json` aliases `typescript` to `@typescript/typescript6@^6.0.2`, but `node_modules` still has 5.7.3 (merge changed `package.json`, no reinstall). Run `npm install`, then re-run `tsc` and lint on TS 6 |
| 6 | `zod` 3 to 4 with `@hookform/resolvers` 3 to 5 | Upgrade together, as one branch. Touches every form schema and resolver; verify all forms and validation messages |
| 7 | `eslint` 9 to 10, `@eslint/js`, `eslint-plugin-simple-import-sort` 12 to 14 | Separate branch. Check flat config and the import-sort output (import order is enforced by lint) |
| 8 | `vitest` 1 to 5, `jsdom` 24 to 29, `@vitejs/plugin-react` 4 to 6, `@testing-library/jest-dom` 6 to 7 | Test-tooling majors. Upgrade together on one branch and confirm all 754 tests still pass |
| 9 | `lucide-react` 0.564 to 1.48, `sonner` 1 to 2, `react-resizable-panels` 2 to 4, `@vercel/analytics` 1 to 2, `@types/node` 22 to 26 | Independent majors, one branch each. `lucide-react` icon renames are the likeliest breakage |
| 10 | Stable React Compiler (`reactCompiler: true`, `babel-plugin-react-compiler`) | Not in the list above (config, not a bump). Higher dev and build compile times per the Next 16 guide. Try on its own branch and measure |

---

## Separate branches

Found in the design-system rfc review. Each is its own branch, not part of `rfc/design-system-components`.

| # | Branch (suggested) | Note |
|---|--------------------|------|
| 1 | `fix/icon-button-aria-labels` | Icon-only buttons have no accessible name. Add `aria-label` from i18n keys (en + he) |
| 2 | `fix/server-route-guard` | Route protection is client-side only and `protectedRoutes` is orphaned. Needs a server-side guard design decision (proxy/middleware) before implementing |
| ~~3~~ | ~~`chore/fix-regex-test-lint`~~ | ~~Done — `no-useless-escape` on `regex.test.ts` line 12 fixed during the chart merge (27/09)~~ |
| 4 | `fix/icon-size-16px` | `ui/button` forces svg without a `size-*` class to 16px, so `size={N}` icons may render smaller than intended. Pre-existing, unverified visually |
