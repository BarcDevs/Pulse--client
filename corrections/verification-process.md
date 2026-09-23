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
