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
