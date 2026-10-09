# InvalidStateError: Skipped ViewTransition due to document being hidden

- **Sentry issue:** PULSE-CLIENT-1 (https://barcdevs.sentry.io/issues/PULSE-CLIENT-1)
- **Fingerprint / culprit:** `/community` — React ViewTransition on hidden document
- **Environment:** development only (`localhost:5173`) — not production
- **First seen:** 2026-10-02
- **Root cause:** Browser throws `InvalidStateError` when React attempts a View Transition while
  the document is hidden (tab backgrounded). The full stack trace is within Next.js/React compiled
  bundles (`startViewTransition` in React DOM); no first-party frame surfaces.
- **Fix:** not auto-applied, notify only (see confidence gate) — no first-party frame; entire
  stack is Next.js/React internals. This is likely a known React 19 canary behaviour when
  navigating while the tab is not in the foreground. If it appears in production (non-dev), it
  would warrant wrapping `startViewTransition` calls in a `document.hidden` guard, but the cause
  can't be confirmed from the available stack alone.

**2026-10-10 recurrence:** 37 events total, last seen 2026-10-09 (culprit now `/dashboard`, Firefox
157, still `localhost:5173`, environment `development`, 0 users). Same cause, still dev-only, stack
still entirely Next/React internals. Notify-only; no recorded fix to have regressed.

**2026-10-10 fix:** added `ignoreErrors: [/Skipped ViewTransition due to document being hidden/]` to
`Sentry.init` in `src/instrumentation-client.ts` (commit 8c5e2f5, branch
`fix/monitor-viewtransition-hidden`, merged into `development`). The error is benign (React starts
a ViewTransition while the tab is backgrounded) and has no first-party frame to guard, so the fix
drops it at the Sentry client instead of changing the animation. Full `/code-review` clean.
