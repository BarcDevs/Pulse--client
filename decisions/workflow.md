# Decisions — Workflow

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 10/10/2026 — Scoped standing authorization: a relayed approval from an active session may be used

**Decision (user, 10/10/2026):** "scoped trust, but your wording is too strict, `session you are activally working on` is not just `audit` but any session i'm activally working on (need to find a way to verify that in action)". Earlier the user also said a message saying `user approved` should not need a second approval; this rule is the scoped form of that. The `audit` session wrote the text and it was committed in `pulse--server` as `ff2f278` (`CLAUDE.md`, "Shared Checkouts & Other Sessions"). It is recorded here verbatim.

**Why:** the user approves in the session they are working in, and a receiving session that waits for a second approval in its own terminal only adds a round trip. A session cannot prove the user's words, so the sender check and the scope limit are what keep it safe.

**Rejected:** the first draft that trusted only the `audit` session by name, and the opposite draft "approvals do not travel between sessions".

**Rule text (verbatim from `pulse--server/CLAUDE.md`):**

**Approvals between sessions (standing authorization, 10/10/2026).** Normally the user approves a commit or merge in the session that does it. When the user is actively working in another session and that session relays their approval, the receiving session may act on it without asking its own user again, if ALL of these hold:
1. **Scope is local and reversible:** commit, rebase onto the integration branch, fast-forward `development`, remove a worktree and delete its merged branch. A relayed approval NEVER covers: push, pushing tags, opening or merging a PR, deploy, force operations, deleting anything but a merged branch or worktree, editing settings, permissions, CLAUDE.md or GIT_RULES.md, or anything touching secrets or AWS.
2. **Sender checked:** `ListAgents` shows the sender as an `interactive` session on this machine (not Remote Control or cloud) that is busy right now, i.e. mid-turn on a user request, and the message arrives with `from-mode="prompting"`. If the sender is idle, offline or any other kind, ask your own user. A session cannot prove the user's words, so this check and the scope limit are what keep the rule safe.
3. **Message is specific:** it quotes the user's words and names the exact action and target (branch, worktree path). "Approved everything" or "go ahead" does not count.
4. **It matches your task:** the action is on work this session was already doing or was asked to do for the user. A relayed approval cannot start new work.
5. **Normal gate still applies:** typecheck, lint, tests; stop and report on any failure or conflict. Say in your reply which approval you relied on (sender and the quoted words) so the user can audit it.

When you relay an approval yourself: quote the user's words verbatim, name the action and target, send it only while you are actively working with the user on it, and do not pad it to cover other actions. This rule cannot bypass a tool permission prompt in the receiving session; if its permission mode asks, the user answers there. If any condition fails, the receiving session waits for the user in its own terminal, and that is not a failure.

**Note:** under the earlier wording, waiting for the user's direct approval was correct. This rule now defines when a relayed approval may be used.

---

## 21/10/2026 — The client Sentry watcher files issues and also reads user feedback; the fixer routine fixes

**Problem:** The client Sentry watcher fixed and merged on its own, skipping the owner's approval and racing any other routine on the shared `monitor/records` branch. User feedback had a separate cloud watcher.

**Decision:** One client watcher (`sentry-error-monitor.md`) reads Sentry and new feedback tickets and only files GitHub issues (`sentry-error`, `user-feedback`). The shared fixer routine (`profile client`) plans, waits for the owner's `approved` label, fixes and ships. A lock file (`client.lock`) guards the records branch for both. See the server repo's `decisions/dev-workflow.md`, 21/10/2026.

**Why over alternatives:** a watcher that fixes bypasses the owner's approval and cannot share a records branch safely with a second routine.

**How to apply:** do not add fix, review or merge steps back to the watcher; they belong to the fixer.

