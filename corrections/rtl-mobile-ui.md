# Corrections — RTL & Mobile UI

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 12/09/2026 — Mobile/RTL UI conventions

Set in the responsive layout pass, commit `3b5a8e5`. App supports Hebrew (RTL, he-IL) + iOS Safari, so physical-direction classes and zoom-based scaling break on both.
- Mobile form inputs/textareas must avoid iOS Safari zoom-on-focus — keep `font-size >= 16px`, don't rely on CSS zoom.
- ShareProgressCard/Modal scale via `em` units, not CSS `zoom` (unreliable cross-browser).
- Floating action buttons (NewGoalFloatingButton, NewPostFloatingButton) use `end-4` not `right-4` — use logical positioning (`start`/`end`, `ps`/`pe`) for any new fixed/absolute-positioned UI.

## 30/09/2026 — shadcn `Switch` always wrapped in `dir="ltr"`

shadcn's `Switch` (`src/components/ui/switch.tsx`, Radix-based) mirrors its thumb position under `dir="rtl"`, so the "on" state renders visually wrong in Hebrew (thumb on the wrong side, looks broken/off). Root-caused after it went unexplained for a long time.

Fixed in the shared wrapper `src/components/shared/inputs/ControlSwitch.tsx` — every usage in the app already goes through it (nothing imports `ui/switch` directly elsewhere), so wrapping there covers the whole app in one place.

**Rule: any new direct usage of shadcn's `Switch` must be forced to LTR.** Prefer the existing `ControlSwitch` wrapper over importing `ui/switch` directly.

Correction (same day): don't wrap in an extra `<div dir="ltr">` — Radix's `Switch` (and its underlying primitive) already accepts a `dir` prop directly, so pass `dir={'ltr'}` straight on the `<Switch>` element. A wrapper div is redundant DOM for something the component itself supports natively.
