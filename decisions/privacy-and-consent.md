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

---

## 02/10/2026 — Vercel Analytics removed; no page-view analytics until one is chosen

**Problem:** `<Analytics/>` (`@vercel/analytics`) loads `/_vercel/insights/script.js`, which only exists on Vercel. Production is EC2 + Docker, so the request failed on every page (visible in the console) and no analytics were collected, while the Privacy page said "privacy-friendly page-view analytics (Vercel Web Analytics, no cookies)". The 23/09 entry above also relied on Vercel Web Analytics being cookieless.

**Decision:** Remove the component and the package, and delete the analytics sentence from the Privacy page (en-US, he-IL) and its PDFs. The "no consent popup" decision still holds: nothing non-essential is stored.

**Why:** Nothing was being collected, so keeping the code and the disclosure was both dead weight and inaccurate.

**How to apply:** If page-view analytics are wanted later, pick one that works on EC2 (cookieless, e.g. Plausible or Umami), add it with a Privacy-page sentence in both languages, and add its origin to `connect-src`/`script-src` in `src/lib/security/buildContentSecurityPolicy.ts`. Vercel preview deployments also lose analytics.

---

## 02/10/2026 — Replies on other users' posts survive account deletion; shown as "Deleted user"

**Problem:** Owner decision (server, 02/10/2026): when the 30-day purge deletes a user, their posts go but their replies on other users' posts stay (server `Reply.authorId` becomes nullable, `ON DELETE SET NULL`; the API returns a placeholder author `deleted-user` with empty names). The client assumed every reply has an author, and the deletion copy promised that personal information is removed.

**Decision:** Client shows a translated "Deleted user" label and a neutral `?` avatar for a reply whose `authorId` is null (`getReplyAuthorView`), and gives no owner or post-author treatment to it. The Privacy page (rights + retention), support FAQ and delete-account dialog now say replies on other people's posts are kept as written, without the name or picture.

**Why:** Keeps conversations readable for other users; the cost is that reply text stays verbatim after deletion, so the wording must not overpromise erasure.

**How to apply:** Any new client UI that shows a reply author must go through `getReplyAuthorView`, never `reply.author` directly. Reply text can still contain what the user wrote about themselves; if full erasure is ever promised, this decision has to be revisited.
