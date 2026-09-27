# Handoff: Pulse — Recovery Sanctuary

## Overview
Pulse is a recovery-support web application focused on mood/wellness check-ins, progress tracking, AI-assisted reflection, community support, and goal management. This handoff packages the complete prototype: a marketing/auth flow and a logged-in app with 14 internal screens, navigated via a persistent left sidebar.

## About the Design Files
The files in this bundle are **design references created in HTML/React (Babel-transpiled JSX)**. They are prototypes showing the intended look and behaviour — **not production code to ship directly**.

Your task is to **recreate these designs inside the target codebase's existing environment** (likely a Next.js / React + TypeScript app — note the original sidebar comment references `AppSidebar.tsx` + `globals.css`) using the project's established patterns: routing, component library, design tokens, state management, and data layer. If no environment exists yet, pick the framework most appropriate for the project and implement the designs there.

Treat the JSX in these files as a visual + behavioural spec. Re-derive structure from your codebase's conventions; copy exact values (colors, spacing, copy, layout) from these files.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, iconography, hover/active states, and micro-interactions are all defined. Recreate pixel-perfectly using your codebase's existing component library (shadcn/ui, Radix, Chakra, MUI, Tailwind, etc.) — substitute components where appropriate, but match visual output.

---

## Design Tokens

All tokens are defined inline in each screen file as a `const C = { ... }` object. Canonical values:

### Colors
| Token | Value | Use |
|---|---|---|
| `bg` | `#f5f7fa` | App background |
| `card` | `#ffffff` | Card / surface background |
| `foreground` | `#1a2b3c` | Primary text |
| `mutedFg` | `#64748b` | Secondary / muted text |
| `muted` | `#eef1f5` | Muted surface (tags, chips) |
| `border` | `#e2e8f0` | Borders, dividers |
| `primary` | `#4a90e2` | Primary brand blue (buttons, accents) |
| `primaryGradStart` | `#005da7` | Primary gradient start (deeper blue) |
| `primaryGradEnd` | `#2976c7` | Primary gradient end |
| `primaryLight` | `#e8f4fd` | Primary tint (selected nav, badges) |
| `secondary` | `#006b5b` | Secondary teal (success-leaning accents) |
| `secondaryLight` | `#e6f5f2` | Secondary tint |
| `accent` | `#7c4dff` | Accent purple (sparingly) |
| `accentLight` | `#f3eeff` | Accent tint |
| `logo` | `#183e9f` | Wordmark color |
| `sidebarBg` | `#ffffff` | Sidebar background |
| `sidebarAccent` | `#e8f4fd` | Active nav item background |
| `sidebarAccentFg` | `#005da7` | Active nav item foreground |
| `success` | `#10b981` | Success / positive |
| `warning` | `#f59e0b` | Warning |
| `destructive` | `#ef4444` | Destructive / error |

Primary CTA gradient: `linear-gradient(to right, #005da7, #2976c7)` with shadow `0 4px 12px rgba(0,93,167,0.25)`.

### Typography
- **Font family:** `'Inter', sans-serif` (Google Fonts, weights 400/500/600/700/800)
- **Body:** 14–15px / line-height ~1.5
- **Section labels (eyebrows):** 11px, weight 600, uppercase, `letter-spacing: 0.5px`, color `mutedFg`
- **H1 (page titles):** 24–28px, weight 700
- **H2 (card titles):** 16–18px, weight 600–700
- **Small / meta:** 12–13px, color `mutedFg`

### Spacing & Radii
- **Sidebar width:** 256px (fixed)
- **Card radius:** 12–14px
- **Button radius:** 8px
- **Pill / tag radius:** 99px
- **Card padding:** 20–24px
- **Card shadow (resting):** `0 1px 3px rgba(0,0,0,0.04)` (subtle) or none with `1px solid #e2e8f0`
- **Modal / floating shadow:** `0 8px 32px rgba(0,0,0,0.15)`
- **Range slider thumb:** 18px circle, `border: 2.5px solid #fff`, shadow `0 1px 4px rgba(74,144,226,0.4)`
- **Scrollbar:** 6px wide, thumb `#cbd5e1` → `#94a3b8` on hover, transparent track

### Iconography
Lucide-style line icons, `strokeWidth: 2`, `strokeLinecap/Linejoin: round`. All icons are inlined as SVGs in `sidebar.jsx` under the `Icon` component — see that file for the full set (`layoutDashboard`, `calendarCheck`, `trendingUp`, `lightbulb`, `users`, `messageCircle`, `bot`, `user`, `settings`, `bell`, `send`, `search`, `plus`, `arrowRight`, `flame`, `activity`, `smile`, `sparkles`, `check`, `close`, `edit`, `lock`, `eye`, `mail`, `shield`, `logout`, `award`, etc.).

**Recommendation for codebase:** install `lucide-react` and use the matching named exports.

---

## Screens / Views

The app has **two surfaces**: unauthenticated (Auth) and authenticated (App). The root `App` component switches between them based on a `page` string stored in `localStorage` (`pulse_page`).

### Auth surface (full-bleed, no sidebar)

#### 1. Landing (`landing`)
- **Purpose:** marketing entry point. Hero + value props + CTAs.
- **File:** `auth.jsx` → `LandingPage`
- **Layout:** centred max-width column on `bg`, hero copy, primary "Get Started" CTA → `signup`, secondary "Sign In" → `login`.

#### 2. Sign In (`login`)
- **Purpose:** existing user login.
- **File:** `auth.jsx` → `LoginPage`
- **Components:** `AuthCard` wrapper (logo + title + subtitle + slot), `InputField` (email, password with eye toggle), primary gradient CTA, "Forgot password?" → `forgot`, link to `signup`.

#### 3. Sign Up (`signup`)
- **Purpose:** new account creation.
- **File:** `auth.jsx` → `SignUpPage`
- **Components:** `AuthCard`, full name, email, password fields, T&C checkbox, primary gradient CTA, link to `login`.

#### 4. Forgot Password (`forgot`)
- **File:** `Pulse Prototype.html` → `ForgotPassword` (defined inline in root)
- **States:** form (email input + "Send Reset Link") and success state (60×60 circle with mail icon on `secondaryLight`, copy "We sent a reset link to {email}", "try again" + "Back to Sign In" links).

### App surface (sidebar + content)

Persistent **Sidebar** (256px, file `sidebar.jsx`) appears on the left for all app screens. Sidebar contains: logo wordmark + tagline, primary nav group (Dashboard, Check-In, Progress, Insights, Goals, Community, AI Chat), secondary group (Profile, Settings), user card at bottom (avatar + name + sign-out). Active item gets `sidebarAccent` background + `sidebarAccentFg` text + left accent bar.

#### 5. Dashboard (`dashboard`) — `dashboard.jsx`
- Top: greeting + date + streak chip
- Grid of metric cards (mood today, streak days, check-ins this week, goals progress)
- "Today's check-in" CTA card (gradient primary)
- Recent activity timeline
- Quick links to Insights / Community

#### 6. Check-In (`checkin`) — `checkin.jsx`
- Daily mood + reflection flow. Multi-step: mood slider (1–10), feeling chips (multi-select), free-text journal, optional triggers, submit.

#### 7. Progress (`progress`) — `progress.jsx`
- Long-term trends. Streak counter, milestone cards, recovery-days chart, badges grid.

#### 8. Insights (`insights`) — `insights.jsx`
- AI-generated patterns. Mood line chart (recharts-style), trigger frequency bars, time-of-day heatmap, AI summary cards with recommendations.
- Also see `insights_v1.jsx` — earlier variant kept for reference.

#### 9. Goals (`goals`) — `goals.jsx`
- Active goals list with progress bars, add-goal CTA, completed goals collapsed section.

#### 10. Community (`community`) — `community.jsx`
- Anonymous peer support feed. Post composer at top, post cards with reactions (heart, hug, thinking), comment counts, filter tabs (All / Following / My Posts).

#### 11. AI Chat (`aichat`) — `aichat.jsx`
- Conversational support. Chat bubble layout, suggested prompts, typing indicator, input with send button. Sidebar of past conversations.

#### 12. Profile (`profile`) — `profile.jsx`
- User identity. Avatar upload, name, bio, recovery start date, public/private toggle, share-progress CTA.

#### 13. Settings (`settings`) — `settings.jsx`
- Account, notifications, privacy, language (uses `language_switcher.jsx`), data export, delete account.

#### 14. Support (`support`) — `support.jsx`
- Help center. Search bar, FAQ accordion, contact form, crisis resources callout.

#### 15. Legal screens — `legal.jsx`
- `PrivacyScreen`, `TermsScreen`, `CookiesScreen`, `AccessibilityScreen` — long-form scrollable documents with table-of-contents sidebar.

#### Cross-cutting
- **`app_chrome.jsx`** — shared topbar / page-header pattern for app screens
- **`share_progress.jsx`** — share modal triggered from Profile / Progress
- **`language_switcher.jsx`** — language dropdown used in Settings & onboarding

---

## Interactions & Behavior

### Routing / Navigation
- Single-page React app, page state held in root `App` (`page` string).
- All children receive `onNavigate(pageId)` prop; sidebar uses it for nav clicks.
- Persisted to `localStorage` under key `pulse_page` so refreshes keep the user on the same screen.
- **In your codebase:** replace with the framework's router (Next.js App Router, React Router, etc.). Each `page` id maps cleanly to a route segment.

### Auth flow
- Landing → Sign Up / Sign In → Dashboard (no real auth in the prototype; assume your codebase's existing auth — Supabase, NextAuth, Clerk, etc.).
- Forgot password is a UI-only two-state flow (form → success).

### Forms
- `InputField` shared component pattern: label above, icon + input inside a bordered field, focus state lifts border to `primary` and adds a subtle ring.
- Password fields include an eye-toggle for show/hide.
- Validation rules are not enforced in the prototype — use your codebase's form library (React Hook Form + Zod recommended).

### Animations
- Hover states on cards: subtle background tint or border darkening (no scale).
- Buttons: no transform, just shadow + color on hover.
- Mood slider: native range input with custom thumb (see global CSS in `Pulse Prototype.html`).
- Modals / overlays: fade + slight scale in (0.95 → 1) over ~150ms.

### Sidebar active state
- Compares `currentPage` prop with each nav item's id. Active item: `backgroundColor: sidebarAccent`, `color: sidebarAccentFg`, font-weight 600, 3px left accent bar in `primary`.

---

## State Management

Prototype-level state (local `useState`); for production:
- **Auth/session:** your existing provider.
- **User profile, goals, check-ins, posts:** server-side DB (Supabase / Postgres / etc.). Per-screen queries; mutations on submit.
- **AI Chat:** streaming completion endpoint (the prototype uses canned messages — wire to your LLM provider).
- **Insights:** server-computed aggregations from check-in data (rolling 30-day windows are reasonable defaults).

---

## Assets

- **`pulse-logo.webp`** — wordmark/logo image. Used in the sidebar header and auth card header.
- **Icons:** all inlined SVG. No icon files needed — but consider `lucide-react` since the set matches Lucide.
- **Fonts:** Inter from Google Fonts, weights 400/500/600/700/800.
- **No raster imagery** beyond the logo. Avatars are letter-initial circles on a `primaryLight` background.

---

## Files in this bundle

| File | What it is |
|---|---|
| `Pulse Prototype.html` | Root HTML; loads React + Babel + every JSX file; defines `App`, routing, Tweaks panel |
| `sidebar.jsx` | Sidebar component + shared `C` (colors) + `Icon` component (full icon set) |
| `auth.jsx` | Landing, Login, Sign Up, shared `AuthCard` + `InputField` |
| `dashboard.jsx` | Dashboard screen |
| `checkin.jsx` | Daily check-in flow |
| `progress.jsx` | Progress / streaks / badges |
| `insights.jsx` | AI insights & charts (current) |
| `insights_v1.jsx` | Earlier insights variant — reference only |
| `goals.jsx` | Goals list & creation |
| `community.jsx` | Community feed |
| `aichat.jsx` | AI chat |
| `profile.jsx` | User profile |
| `settings.jsx` | Settings |
| `support.jsx` | Help / support center |
| `legal.jsx` | Privacy / Terms / Cookies / Accessibility |
| `share_progress.jsx` | Share modal |
| `language_switcher.jsx` | Language picker |
| `app_chrome.jsx` | Topbar / page-header helpers |
| `OTP Emails.html` | OTP / transactional email templates (for password reset, sign-up confirmation, etc.) |
| `pulse-logo.webp` | Wordmark logo |

---

## Implementation Recommendations

1. **Bootstrap once:** lift the `C` color object into a Tailwind `theme.extend.colors` or CSS variables in `globals.css`. The original sidebar comment notes it's already aligned with an `AppSidebar.tsx` + `globals.css` — check whether tokens already exist before duplicating.
2. **Component library:** if using shadcn/ui, map: `AuthCard` → `Card`, `InputField` → `Input` + `Label`, primary CTA → `Button` with custom gradient class, sidebar → existing layout shell.
3. **Charts:** Recharts or Visx for Insights & Progress charts. Match colors to tokens above.
4. **Icons:** `lucide-react`.
5. **Routing:** one route per `page` id. Group `(auth)` and `(app)` route segments; gate `(app)` behind auth middleware.
6. **i18n:** the prototype includes a language switcher — plan for `next-intl` or similar if multi-language is in scope.
7. **Accessibility:** ensure focus rings on all interactive elements, semantic headings, ARIA on icon-only buttons, and that the mood slider has a visible numeric value + keyboard support.

---

## Crisis / Safety Note

This is a recovery app. The Support screen includes a crisis-resources callout — make sure that surface is prominent, always reachable from the sidebar (it is), and that any AI Chat output has guard-rails against giving medical advice. Coordinate copy with a clinician before launch.
