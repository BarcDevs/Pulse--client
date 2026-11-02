# Decisions — Guest Onboarding

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for a lesson in this topic — not routinely.

---

## 02/11/2026 — Guest onboarding: server-side guest account, email+password at save step

**Decision:** Visitors land on a public /start check-in as a server-side guest account (cookie session), see the real chart and AI insight, then are asked for email and password to save. Upgrade converts the same user row. Guest sees only check-in then result; capped at 3 check-ins; unconverted guests deleted after 30 days.

**Why over alternatives:** Cuts first-visit friction: value shown before signup. A server guest keeps the real insight pipeline working with no data migration. The Launch Mailer lm token carries no email, so everyone gets email+password.

**Rejected:** LocalStorage plus a public stateless insight endpoint (history-based insights would not work); full app as guest (too wide, conflicts with the 30/09 sign-in-for-community decision); asking only for a password using the lm token (token has no email).

**Source:** user, auto-recorded: "recorded by the session"

## 02/11/2026 — Guest accounts live about a week, not 30 days

**Decision:** The server deletes unconverted guests once they are older than the token lifetime plus one day (8 days in production). The privacy page says guests are kept "up to a week" instead of a fixed number, and the README states the exact server rule. This supersedes the 30 days in the guest-onboarding decision.

**Why over alternatives:** The server's review pass shortened guest retention. A fixed "30 days" on the privacy page would state a longer retention than the server applies, and "up to a week" stays true if the exact lifetime shifts by a day or two.

**Rejected:** "Up to 8 days" (exact today but wrong again if the token lifetime changes); keeping "30 days" (inaccurate).

**Source:** user, auto-recorded: "recorded by the session"
