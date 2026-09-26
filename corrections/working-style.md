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

## 23/09/2026 — Tied logout to network success

Fixed "offline logout does nothing, no error" by showing the banner but keeping the user signed in when the request failed. User: sign-out shouldn't depend on network — log out locally, then show the banner.

**Lesson:** logout is a local state change first (clear queries, navigate), server call is best-effort; network failure adds the banner, never blocks the sign-out.

---

## 23/09/2026 — Used `refactor` commit type instead of `rfc`

Committed `refactor(auth)`, `refactor(config)` ×2 (5a7e47b, 5fa3d98, 8f3d2df) despite `GIT_RULES.md`: "refactor job - always name `rfc` instead of `refactor`". User noticed; the commits are numerous/already made so they are **not** renamed.

**Lesson:** re-read the type rules in `GIT_RULES.md` before every commit message, not just the "ask before commit" part. Refactor = `rfc`. Never rename the existing `refactor(...)` commits; just use `rfc` going forward.

---

## 23/09/2026 — Pushed a branch without its tags

Pushed to `development` with `git push origin HEAD:development` and left the version-bump tags (local `v1.0.31`–`v1.0.33`; remote stuck at `v1.0.7`) unpushed, then argued for withholding them. User: "ALWAYS PUSH TAGS".

**Lesson:** every push includes `git push origin --tags`. Don't reason about whether tags are "meaningful" — the hook makes them, they go up. Added to `GIT_RULES.md`.

---

## 23/09/2026 — Ran Python scripts to edit files instead of the Edit tool

Used `python - <<EOF` string-replace scripts for small edits (one word in a JSON file, a line in TODO.md, config tweaks). User: "are you running python to edit one word?" Contradicts this repo's "Edit over Write" rule and the harness guidance to use dedicated tools; scripts also hide what changed, and a failed script half-applied a multi-file change (he-IL.json / layout.tsx ended up edited twice).

**Lesson:** edit files with the Edit tool, even Hebrew/UTF-8 JSON, even several files in a row (parallel Edit calls). Bash/Python only for things no dedicated tool does (running tests, git, bulk generation).

**Repeated 25/09/2026:** in a later session the correction files were never read at session start (CLAUDE.md requires `corrections/index.md` first), and Python string-replace scripts were used again for rule/doc edits. One script failed midway and half-applied a multi-file change (a `.sources` commit went out incomplete and needed a follow-up). User: "you should've read that correction to prevent that from happening - and here you got a live example to why it exists". Reading the index at session start is the fix; the rule is not optional.

---

## 25/09/2026 — Dead code is removed, not marked

Found unused components (`MainProgressCard` and its children) and offered to leave them alone and note them. User: "Dead code is dead, should be removed not marked. Remove on sep commit - cleanup commit (maybe do it with a complete dead-code run after the rfc)".

**Lesson:** never leave dead code in place with a note. Remove it in its own cleanup commit, separate from the feature/rfc, ideally with a full dead-code run after the rfc. (CLAUDE.md's "mention unrelated dead code, don't delete it" still governs deleting it inside an unrelated change.)

---

## 25/09/2026 — Branched and upgraded dependencies in the shared checkout while another session was working in it

Ran `git checkout -b chore/upgrade-next-react` and the Next/React upgrade (install + commit) directly in `pulse--client`, where the design session was live. That moved its branch (three design commits then landed on my upgrade branch) and changed its `node_modules` under it. The worktree was only created later, when the user asked for one for the follow-up work. User: "how did branch jumped if you worked on a different worktree" (it hadn't yet). The design commits were docs-only, so they were left where they are.

**Lesson:** before any work that switches branches or touches `package.json`/`node_modules` in a repo another session may be using, create a worktree first (`git worktree add ../<repo>-<topic> -b <branch> <base>`, then `npm ci` there). Never `checkout -b` in the shared checkout. If the user says another session is active, that applies to the whole task from the first command, not just the later steps.

---

## 25/09/2026 — Swapped "Claude routines" for a session cron, and never said where scheduled output lands

Asked for a weekly check "in a claude scheduled task" and later "claude routines"; described and offered the session-only cron tool (expires after 7 days) as if it were what was asked, then registered a Windows Task Scheduler job instead. User: "i didnt say session cron, i said claude routines". Separately, the scheduled job's reports go to `work/projects/.stack-updates/` and nothing tells the user; asked "did you say anywhere to check the reports" - no.

**Lesson:** use the user's own term for a mechanism ("routines" = the claude.ai routines / `RemoteTrigger`, not `CronCreate`). If it can't be created reliably with the tools available, say so and ask, rather than substituting a different scheduler. Whenever something is scheduled to run unattended, state in the same reply where its output appears and how the user will find out.

---

## 26/09/2026 — Merged into a branch another session was actively using, without coordinating first

Told to merge the `pulse--client-next163` worktree "into dev", I ran `git merge` in `pulse--client` on `chore/upgrade-next-react` while the `design` session was busy on that same branch, and left an unresolved merge in the shared tree for ~2 minutes. `design` was only told afterwards. User: "you shoul've coordinate with @design before doing that are u dumb???", then "ok dont do that again".

**Lesson:** before any merge, rebase, checkout, reset, or branch/worktree deletion in a checkout another session may be using, message that session first and wait for its reply. Path-scoped commits are fine; anything that moves the branch or leaves the tree in a mid-operation state is not. Check `ListAgents` for a busy session on the repo before starting.

---

## 26/09/2026 — Ran the whole design-system rfc series on the branch that happened to be checked out

The session started on `chore/upgrade-next-react` (the Next/React upgrade branch) and I made ten-plus rfc commits (buttons, badges, avatars, cards, AuthCard, inputs) there without noting it was the wrong branch or creating one. A peer session then merged unrelated work into it, mixing the two. User: "u shoul've done it by yourself. a separate branch for every separate work needed." The user renamed the branch to `rfc/design-system-components` afterwards.

**Lesson:** at the start of any new piece of work, check `git branch --show-current`; if it is not a branch for that work, create one (`rfc/<topic>`, `feat/<topic>`, etc.) before the first commit, without waiting to be asked. One branch per separate piece of work, never piled onto whatever is checked out.
