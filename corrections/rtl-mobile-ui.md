# Corrections — RTL & Mobile UI

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 12/09/2026 — Mobile/RTL UI conventions

Set in the responsive layout pass, commit `3b5a8e5`. App supports Hebrew (RTL, he-IL) + iOS Safari, so physical-direction classes and zoom-based scaling break on both.
- Mobile form inputs/textareas must avoid iOS Safari zoom-on-focus — keep `font-size >= 16px`, don't rely on CSS zoom.
- ShareProgressCard/Modal scale via `em` units, not CSS `zoom` (unreliable cross-browser).
- Floating action buttons (NewGoalFloatingButton, NewPostFloatingButton) use `end-4` not `right-4` — use logical positioning (`start`/`end`, `ps`/`pe`) for any new fixed/absolute-positioned UI.
