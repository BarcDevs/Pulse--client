# Decisions — Error Handling

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 23/09/2026 — Network errors never redirect to `/network-error`; use the gentle network bar

**Problem:** `app/error.tsx` did `redirect('/network-error')` for network-like errors ("Failed to fetch" / "NetworkError"). Offline, the `/network-error` page can throw the same error, the same boundary redirects to it again, and the app loops until RAM balloons (reported in Chrome and Firefox on `/login`).

**Decision:** a full-page redirect for a network problem hurts UX. The error boundary now shows the existing `ErrorBanner` (via `useAuth().setNetworkError`) and renders nothing else, then calls `reset` every 10s and when the browser fires `online`. The 10s lives in one place, `timings.NETWORK_RETRY_DELAY` in `src/config/timings.ts`, and is shared by `error.tsx`, `useQueryWithNetworkError` (was 1 min) and `AuthProvider` (was 2 min). Login/signup network failures also raise this bar (`setNetworkError`) instead of showing inline text. User: "shouldn't fully redirect to /network-error ... just the gentle network error bar we already have."

**How to apply:** don't add new redirects to `/network-error`. The route and its page still exist but are no longer reached from `error.tsx`.
