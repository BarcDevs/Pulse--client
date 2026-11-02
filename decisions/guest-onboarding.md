# Decisions — Guest Onboarding

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for a lesson in this topic — not routinely.

---

## 02/11/2026 — Guest onboarding: server-side guest account, email+password at save step

**Decision:** Visitors land on a public /start check-in as a server-side guest account (cookie session), see the real chart and AI insight, then are asked for email and password to save. Upgrade converts the same user row. Guest sees only check-in then result; capped at 3 check-ins; unconverted guests deleted after 30 days.

**Why over alternatives:** Cuts first-visit friction: value shown before signup. A server guest keeps the real insight pipeline working with no data migration. The Launch Mailer lm token carries no email, so everyone gets email+password.

**Rejected:** LocalStorage plus a public stateless insight endpoint (history-based insights would not work); full app as guest (too wide, conflicts with the 30/09 sign-in-for-community decision); asking only for a password using the lm token (token has no email).

**Source:** user, auto-recorded: "recorded by the session"
