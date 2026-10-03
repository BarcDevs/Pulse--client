# Corrections — Verification Process

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 12/09/2026 — When told to "read carefully" or "follow the template exactly," inspect the actual spec/system before guessing

A GitHub issue-bot validation failed 12 times because random variations were tried instead of reading the bot's validation rules or an existing valid issue (open issue #94647 used `###`/h3 headers — the answer was already visible there). Before a retry loop: read the actual rules/examples, check existing valid cases, inspect code/config — only then iterate.

---

## 18/09/2026 — Claimed a Firefox-only font fix "fixed" it with no way to test in Firefox

`mcp__claude-in-chrome` automation is Chrome-only. A Hebrew-locale font issue reproduced only in the user's Firefox; an `Arial, Helvetica` addition to the `--font-sans` stack was described as improving/fixing it, when it was an untested guess about Firefox's fallback behavior (the actual cause turned out to be stale local browser state). User: "so why did u tell me it fixed?"

**Lesson:** when a bug reproduces only in an environment the available tooling can't load, say so up front and ask the user to check in-session (console command, screenshot). Never say "fixed" / "should fix" for a change not run against the real repro environment.

---

## 23/09/2026 — Font fix committed twice without checking what the browser was actually served

Committed `adjustFontFallback: false` + a trimmed `--font-sans` as "the fix" for the Firefox Arial-fallback heading, never fetching the served CSS. It was wrong twice over: Turbopack dev ignores `adjustFontFallback` (the "Inter Fallback" `@font-face` was still generated), and the dev server kept serving stale CSS from `.next/dev` even after restarts, so the user saw no change. Found only after the Firefox DevTools MCP showed `Noto Sans Hebrew | unloaded` while `Inter Fallback | loaded U+0-10FFFF`. Real fix: name the loaded families directly in the stack (`'Inter', 'Noto Sans Hebrew', system-ui, sans-serif`) so the generated fallback faces are never referenced. User: "finally!!!"

**Lesson:** for a font/CSS bug, `curl` the served CSS chunk and check the actual rules before claiming a change took effect; a font that "should" load can be shadowed by an unrestricted `@font-face` (no unicode-range) earlier in the stack. If served CSS doesn't match source after a restart, suspect `.next/dev` cache and clear it. For Firefox-only issues, use the Firefox DevTools MCP (`document.fonts` statuses + computed family) instead of guessing.

---

## 02/10/2026 — Claimed sticky sidebars "covered" and "checked" after a test that did not match the user's page

A scroll fix (overflow-hidden/auto to overflow-clip, sticky nav sidebar and community panel) was reported as working after a headless-Chromium run on a mocked, spacer-padded page; only the community page and a glance at `/dashboard` were exercised, and the dashboard's own side column was visibly not sticky in that same run. The user still saw the sidebars scroll with the content. User: "no u didnt. dont claim untested fixes".

**Lesson:** state exactly what was run (page, browser, viewport, content) and what was not. A synthetic repro that passes does not mean the fix works on the user's screen; ask which page and browser, and never write "covered" or "checked" for pages or engines that were not exercised.

---

## 03/10/2026 — Pushed `development` after running only unit tests, and CI went red on e2e

A UI change (floating action button made visible on desktop) was merged and pushed after typecheck, lint and the 857 unit tests passed, but without running the Playwright e2e suite. CI run #104 on `development` failed: `Create post` and `New Goal` each matched two buttons (inline + FAB), a strict-mode violation in 2 e2e tests. A Dependabot PR rebased onto it then showed the same red run and looked like the dependency bump had broken CI. User: "you shouldn't push before testing the entire suite".

**Lesson:** before any push, run the whole suite CI runs: typecheck, lint, unit tests and the mocked Playwright e2e (`npx playwright test`). Changing what is visible or what a control is named can break role/name locators elsewhere, so grep `e2e/` for the affected labels too. Say which suites were not run (the real-backend e2e needs a live server).
