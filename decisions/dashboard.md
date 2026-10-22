# Decisions — Dashboard

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 10/10/2026 — Sidebar insight card shows a check-in prompt, never the previous check-in's insights

Bug report from a phone (S24 Ultra, Hebrew): the sidebar insight card showed old feedback, and its content touched the card edges.

**Cause (both from one place):** `DashboardChartSidebar` rendered `<DashboardAIInsight/>` whenever today's check-in did not exist. That card shows the insights of the newest check-in (`useCheckIns(1)`), i.e. an earlier day's, with no date. Commit `5876ebe` had also set the card's header and content to `px-0` on phones, assuming the caller supplies `px-4`; only the main-slot caller does, so the sidebar caller had 0px side padding. Reproduced at 412px: 0px inset before, 20px after.

**Decision (user, 10/10/2026):** with no check-in today the sidebar shows a short prompt card (`DashboardInsightPrompt`, `p-5` as in the design's AI Insight card) with text asking for a check-in, not an empty card and not old insights. Insights appear only in the main slot once today's check-in exists. The design has no block for the prompt state. Rejected: keeping old insights with a date label (needs new copy, and still shows old feedback).

**Server side (same day, user approved):** insights are stored per `(checkInId, type)` and were never removed, so editing a check-in left insight types from its previous version (e.g. an old bad-day message beside a new one). `generateInsightForCheckIn` now deletes the check-in's types it did not produce, only after generation succeeded (pulse--server branch `fix/stale-insights-on-regenerate`). Rows already stored stay until that check-in is next regenerated.

**Note:** `DashboardAIInsight` still relies on its caller for horizontal padding on phones (`px-0 lg:px-6` inside). The main-slot caller passes `px-4`; any new caller must too.
