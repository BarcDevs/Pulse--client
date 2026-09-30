# Decisions — Privacy & Consent

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 23/09/2026 — No cookie/cache consent popup; disclose on the Privacy page instead

**Problem:** TODO #8 "Cache consent popup" was a pre-launch blocker.

**Decision:** Don't build a consent popup. TODO #8 closed as not needed.

**Why:** A consent popup only exists to gate non-essential on-device storage, and we write none. No service worker, Cache API, persisted query cache, `sessionStorage` or IndexedDB (searched `src/`, `public/`, `next.config.mjs`, `package.json`). TanStack Query's cache is in-memory only. Storage in use is essential/functional: cookies `accessToken`, `_csrf`, `NEXT_LOCALE`, `sidebar_state`, and `localStorage` post/profile drafts. Third-party: Vercel Web Analytics is cookieless; Sentry's browser SDK sets no cookies by default. What users are owed is disclosure (what is collected and why), which belongs on the Privacy page (TODO #7), not a popup.

**Rejected:** Accept/Decline (or Accept all / Decline / Essential only) popup gating Analytics + Sentry — Decline and Essential only would behave identically with just two categories, and it adds code for no strict need.

**How to apply:** Reopen only if we add non-essential storage (a service worker/PWA cache, a persisted query cache, a cookie-setting analytics or ad tool, or Sentry session replay). Unverified at decision time: the Sentry config was not checked for replay/cookies — check before relying on this. The footer's `/cookies` link has no page yet.

---

## 30/09/2026 — Community pages require sign-in (reverses the June "semi-public" call)

**Problem:** A user complained that everyone can see what they typed in the community forum. Commit `53e8b12` (04/06/2026) had removed `/community` from `protectedRoutes` so signed-out visitors could read it.

**Decision:** `/community` is back in `protectedRoutes`: signed-out visitors are redirected to login, and GuardedLink renders links to it as disabled text.

**Why:** Posts are user-written recovery content; making them readable by anyone contradicts the privacy expectation users had when posting.

**How to apply:** This gates the pages only. The server's forum read endpoints are a separate layer — if posts must be unreadable without an account, the API needs the same change (see the community/privacy finding in `docs/SECURITY-AUDIT.md`). The Privacy page wording about forum visibility should match whatever is decided there.
