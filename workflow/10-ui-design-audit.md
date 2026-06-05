# SCENARIO 10: UI Design Audit (Screenshots + Playwright)

Apply this scenario after implementing any UI feature. Goal: verify the feature
looks and behaves correctly by capturing real screenshots and comparing against
design intent.

## Setup

All browser test artifacts (screenshots, traces, temp scripts) live in `.browsertest/`.
This directory is gitignored. Always write and run Playwright scripts from there.

## Auth

Test credentials are in `.browsertest/test-credentials--use-to-pass-auth-guard.md`.
Use these to log in and pass the auth guard before navigating to the feature route.

## Audit Script Pattern

Create a throwaway script at `.browsertest/audit-[feature].ts`:

```ts
import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()
await page.setViewportSize({ width: 1440, height: 900 })

// Auth if needed — adjust cookie/localStorage to match your dev session
await page.goto('http://localhost:3000/your-feature-route')
await page.waitForLoadState('networkidle')

// Capture happy path
await page.screenshot({ path: '.browsertest/happy-path.png', fullPage: true })

// Capture loading state (throttle network or mock)
// Capture empty state (no data)
// Capture error state (simulate fetch failure)

await browser.close()
```

Run with:
```
npx ts-node --esm .browsertest/audit-[feature].ts
# or
npx playwright test .browsertest/audit-[feature].ts
```

## States to Capture

For every UI feature, screenshot all four states:

| State | Screenshot filename |
|-------|-------------------|
| Loading | `.browsertest/state-loading.png` |
| Error | `.browsertest/state-error.png` |
| Empty | `.browsertest/state-empty.png` |
| Happy path | `.browsertest/state-happy.png` |

Add extra screenshots for meaningful interactions (open modal, filled form, etc.).

## Design Audit Checklist

After capturing screenshots, review each against the design files in `.claude/design/`:

- [ ] Spacing and layout match design intent
- [ ] Typography (size, weight, color) correct
- [ ] Colors use design system tokens — no hardcoded hex/rgb
- [ ] Loading skeletons match component shape
- [ ] Empty state has proper illustration/message
- [ ] Error state is user-friendly and styled consistently
- [ ] Responsive: check at 375px (mobile) and 1440px (desktop)
- [ ] No layout shift between states
- [ ] Interactive elements have hover/focus states

## Mobile Screenshot

Add a mobile viewport capture:

```ts
await page.setViewportSize({ width: 375, height: 812 })
await page.screenshot({ path: '.browsertest/mobile-happy.png', fullPage: true })
```

## Cleanup

Delete `.browsertest/` artifacts after audit passes — they are temp files.
Never commit `.browsertest/` contents.
