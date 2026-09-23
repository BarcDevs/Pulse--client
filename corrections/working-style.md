# Corrections — Working Style

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 18/09/2026 — Jumped to a broad code change on a bug report instead of stating the fix first

User reported a dashed chart bridge line drawing from an invisible off-screen anchor into a single visible point ("goes to a void"). Response was to immediately delete the whole `seriesPrevious`/virtual-anchor bridging mechanism in `TrendChart.tsx` — the broadest reading — rather than suppressing only the void-drawing case. User interrupted ("wtf????? didnt allowed you to do that"). Same pattern already flagged earlier that session ("you should wait for my confirmation").

**Lesson:** when a bug report has more than one possible fix shape (suppress the bad case vs. remove the feature), state the intended fix in one line before editing. Once stated and clearly low-risk, proceed — don't then also ask permission (user: "you shouldn't have to wait for me to tell you").

---

## 18/09/2026 — Wrote corrections/decisions into the sibling repo, and asserted the local log didn't exist without checking all branches

Corrections were logged into `pulse--server/corrections/` instead of this repo, moving the "have to go elsewhere" problem rather than fixing it. Root cause of the confusion: this repo's `corrections/` + `decisions/` index schema lived on `development`/other branches but not on the checked-out `fix/final-fixes-for-mvp`, so `find` on that branch came up empty — while the user (correctly) said they existed. A stray single-file `log.md` pair was then created here, duplicating the real structure.

**Lesson:** log in the repo you're working in, never the sibling. Before concluding a file/dir "doesn't exist," check other branches (`git ls-tree -r development --name-only`, `git log --all -- <path>`), not just the working tree. Also: `pulse--client/CLAUDE.md`'s old line "save feedback memory" contradicted the vault-not-agent-memory rule and was a contributing cause of missed logging — now points at these logs.

---

## 23/09/2026 — Built new MCP wiring instead of checking why an existing shared server wasn't loading; ignored the working example and the "symlink it" instruction

Asked to get the shared `chrome-devtools` MCP working in this repo, then told twice to "set it like the skills and agents" / symlink it. Instead created a standalone `.mcp.json`, then a hard link, then a `.gitignore` entry, and explained that Claude Code has no `.claude/mcp`. The real cause was in `.claude/settings.local.json`: `chrome-devtools` sat in `disabledMcpjsonServers` (disabled overrides enabled). The parent `work/projects/.mcp.json` already provides the server, and the working sibling `claude-rtl-extention` uses no link at all, only `enabledMcpjsonServers` in its own settings. The user had to point at that project by name.

**Lesson:** when a shared resource "isn't loading" in one project, diff that project's config against a sibling where it works (settings, disabled/enabled lists) before creating files. If the user names a working reference, read it first. `enabledMcpjsonServers` / `disabledMcpjsonServers` in `.claude/settings.local.json` are the per-project MCP switches.

---

## 23/09/2026 — Tied logout to network success

Fixed "offline logout does nothing, no error" by showing the banner but keeping the user signed in when the request failed. User: sign-out shouldn't depend on network — log out locally, then show the banner.

**Lesson:** logout is a local state change first (clear queries, navigate), server call is best-effort; network failure adds the banner, never blocks the sign-out.
