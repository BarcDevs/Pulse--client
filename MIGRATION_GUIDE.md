# i18n Migration Guide

## Overview
Replace all `componentTexts` imports with `locales` keys + `useTranslations()` hook.

## File Mapping

### Locale Files Created
- `src/locales/authLocales.ts` — auth pages (login, signup, forgot password, reset password)
- `src/locales/globalLocales.ts` — footer, layout, page subtitles, landing, shared, errors
- `src/locales/chatLocales.ts` — AI chat
- `src/locales/checkInLocales.ts` — Daily check-in
- `src/locales/communityLocales.ts` — Community forum, posts, mentors, sanctuary
- `src/locales/dashboardLocales.ts` — Dashboard page
- `src/locales/insightsLocales.ts` — AI Insights
- `src/locales/progressLocales.ts` — Progress page, charts, share
- `src/locales/profileLocales.ts` — Profile pages
- `src/locales/goalsLocales.ts` — Recovery Goals
- `src/locales/settingsLocales.ts` — Settings pages

### Component Text → Locales Mapping
```
componentTexts/auth.ts → authLocales
componentTexts/chat.ts → chatLocales
componentTexts/checkIn.ts → checkInLocales
componentTexts/community.ts → communityLocales
componentTexts/dashboard.ts → dashboardLocales
componentTexts/insights.ts → insightsLocales
componentTexts/insightsComponent.ts → insightsLocales
componentTexts/insightsDetail.ts → insightsLocales
componentTexts/landing.ts → globalLocales.landing
componentTexts/profile.ts → profileLocales
componentTexts/profileActivity.ts → profileLocales
componentTexts/profileDetail.ts → profileLocales
componentTexts/progress.ts → progressLocales
componentTexts/progressCharts.ts → progressLocales.charts
componentTexts/recoveryGoals.ts → goalsLocales
componentTexts/settings.ts → settingsLocales
componentTexts/ui/errors.ts → globalLocales.errors
componentTexts/ui/footer.ts → globalLocales.footer
componentTexts/ui/layout.ts → globalLocales.layout
componentTexts/ui/pageSubtitles.ts → globalLocales.pageSubtitles
componentTexts/ui/sharedTexts.ts → globalLocales.shared
```

## Migration Steps (Per Component)

### 1. Remove 'use client' directive (if present)
Only add back if component has client-side logic.

### 2. Replace imports
**Before:**
```tsx
import { authTexts } from '@/constants/componentTexts/auth'
import { communityPageTexts } from '@/constants/componentTexts/community'
```

**After:**
```tsx
import { useTranslations } from 'next-intl'
import { authLocales } from '@/locales/authLocales'
import { communityLocales } from '@/locales/communityLocales'
```

### 3. Add hook in component
```tsx
const t = useTranslations()
```

### 4. Update references
**Before:**
```tsx
<h1>{authTexts.login.title}</h1>
<p>{authTexts.login.description}</p>
```

**After:**
```tsx
<h1>{t(authLocales.login.title)}</h1>
<p>{t(authLocales.login.description)}</p>
```

### 5. Handle dynamic key access (if applicable)
**Before:**
```tsx
const getLabel = (key) => communityPageTexts.posts.filterLabels[key]
```

**After:**
```tsx
const filterLabels = {
    newest: t(communityLocales.posts.filterLabels.newest),
    popular: t(communityLocales.posts.filterLabels.popular),
    hot: t(communityLocales.posts.filterLabels.hot),
    unanswered: t(communityLocales.posts.filterLabels.unanswered)
}
const getLabel = (key) => filterLabels[key]
```

## Special Cases

### Config/Constant Files (non-components)
If the file exports constant data (arrays, objects) that are used by components:
- Keep in `src/constants/`
- Don't add `useTranslations()` (hooks only in components)
- Reference locale keys as strings from the config
- Components using it will handle translation via `t()`

Example:
```tsx
// src/config/forms/authFormConfig.ts
export const authFormConfig = {
    login: {
        emailLabel: authLocales.login.emailLabel,
        ...
    }
}

// In component:
const t = useTranslations()
return <input placeholder={t(authFormConfig.login.emailLabel)} />
```

### Array/List Data with Text
If componentTexts exports arrays with translatable text:
```tsx
// Before:
export const checkInTexts = {
    activities: {
        default: ['Meditation', 'Exercise', 'Social time', ...]
    }
}

// After: Keep keys in locales file, render with t() in component
// Component:
const defaultActivities = [
    t(checkInLocales.activities.default[0]),
    t(checkInLocales.activities.default[1]),
    ...
]
```

## Files to Delete (After Migration)
- `src/constants/componentTexts/` (entire directory)

## Testing
1. Run `npm run typecheck` — no errors
2. Run `npm run lint:check` — no errors
3. Run `npm test` — all 225+ tests pass
4. Browser test:
   - Default page renders in Hebrew
   - Toggle language (EN/HE button) switches UI + persists cookie
   - Login with user preferring English renders in English
   - Settings language selector updates profile + UI
