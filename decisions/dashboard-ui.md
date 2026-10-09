# Decisions — Dashboard UI

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 09/10/2026 — The dashboard insight card lists insights in full

**Problem:** `DashboardInsightItem` clamps each insight to one line (`line-clamp-1`) and the card ends with a "read more" button that opens a popup, so the dashboard shows almost none of the feedback.

**Decision (owner):** the card uses its full height and lists the latest insights in full: a small title label above the full text, no clamp, no "read more" button on the dashboard card. The server now creates two insights for a good check-in (a weekly summary and a motivational one), so the card has real content to fill.

**Why over alternatives:** the structure shown in the landing-page demo screenshot read better than the real card; a popup hides the one thing the card exists for.

**How to apply:** tracked as row 5 in `TODO.md` ("AI / Reflective Insights"). It needs longer, data-based insight text from the backend (see the server decision "AI insight prompts"), and the popup (`showInsights`) must stay reachable from the insights page if the dashboard button goes away.

---

## 09/10/2026 — The dashboard trend chart plot is taller

**Problem:** the plot in `TrendChart` is a fixed `h-40` (160px) with a fixed 0-10 y axis, so real data in the 2-8 band looks flat and trends are hard to see.

**Decision (owner):** make the plot taller, about `h-56` (224px), as a prop on `TrendChart` so only the dashboard card (`HistoryChart.tsx`) changes and the progress page charts keep their size. `HistoryChartSkeleton` gets the same height so nothing jumps.

**Why over alternatives:** changing the y-axis range would hide that 10 is the maximum; height alone makes the lines clearer without changing what the numbers mean.

**How to apply:** requested from the pulse session on 09/10/2026, not implemented when this was written. The landing-page screenshot already uses a 224px plot.

---

## 09/10/2026 — Product screenshots for outside use come from the real UI with a mocked API

**Decision (owner):** an image of the dashboard for marketing or the landing page is a capture of the real running app, with the API intercepted in the browser (Playwright `page.route`, the same mechanism as `e2e/helpers/mockApi.ts`). No fixture account, no production data, no standalone HTML copy of the UI. The demo data is fictional and lives in one JSON file that feeds both the mocked UI and the AI prompts, so the numbers, the chart and the insight text can never disagree. Display name "ישראל ישראלי". The sidebar is left out: the menu is not final and it shows features that do not all exist yet. Insight text is produced by running the real server prompts on that same data, and any picking between samples is disclosed.

**Why over alternatives:** a fixture account or seeded database could leak into normal sessions and drifts from the code; a drawn mock would invent UI. Mocking the API leaves the app untouched.

**How to apply:** the capture script was a session scratch file, not in the repo; rebuild it from `e2e/helpers/mockApi.ts` (`/auth/me`, `/check-in`, `/check-in/stats`, `/recovery-goals/stats`, `/insight/observation`) and hide the Next dev badge (`nextjs-portal`) before the screenshot. For phone-width use a tighter crop (stat cards and chart at tablet width), because the full desktop shot shrinks to about 38% on a phone.
