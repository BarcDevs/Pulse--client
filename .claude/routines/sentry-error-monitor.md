# Sentry Error Monitor Routine

Runs every 6h as a **Local** routine ("Pulse Sentry Error Watch (local)" at
claude.ai/code/routines), replacing the cloud routine `trig_01ShV1zJC3hdsQPD1TQiRFak`. Deliberate:
a cloud routine needs Sentry attached as a claude.ai account-level connector, which then shows up
in `/mcp` in every session. Locally it uses this repo's project-scoped `sentry` MCP server
(`.mcp.json`) instead. Same workflow as the server's AWS watcher
(`../pulse--server/.claude/routines/prod-error-monitor.md`): confidence gate, full `/code-review`
before merge, merge directly into `development`, no PR. Working directory:
`C:\Users\66bar\Claude\work\projects\pulse\pulse--client`.

Sentry org: `barcdevs`, project: `pulse-client`.

## Steps

1. `cd` into `pulse--client` repo root (this file's `../../`).
2. Use the `sentry` MCP tools (project `.mcp.json` server; if it reports unauthenticated, stop and
   notify — do not attempt OAuth unattended) to search `pulse-client` for issues with activity in
   the last ~8h (6h interval plus buffer), e.g. `search_issues` with `firstSeen:-8h` or unresolved
   issues sorted by date. Also check for issues that regressed/reappeared in that window.
3. If there are no new/regressed issues, report that plainly and STOP. Do NOT add a
   `decisions/observability.md` entry, do NOT commit, do NOT notify — a quiet run leaves no trace.
4. For each issue found:
   a. **Known-fix check.** Read `decisions/observability.md` and `corrections/index.md` + relevant
      topic files. If this exact error (or a clear variant) was already seen and fixed, DON'T
      reinvent a fix: reference the prior fix, and if it recurs despite it, flag that explicitly
      (old fix incomplete or regressed) — then skip to (f) with notify-only.
   b. **Diagnose.** Read the relevant source (the stack gives the file). Form a root-cause
      hypothesis and a minimal fix.
   c. **Confidence gate.** Only proceed to (d) if BOTH hold: the stack trace points to a specific
      line/function in this repo (not a third-party/node_modules/browser-extension frame as the
      sole location), AND the fix is a small, localized change (no cross-cutting refactor, no
      product/design judgment, no ambiguity about which of >1 plausible causes is correct). If
      either fails: skip to (f) as notify-only.
   d. **Fix.** In a **worktree** so this shared checkout is never disturbed
      (`git worktree add ../pulse--client-monitor-<slug> -b fix/monitor-<slug> development`), make
      the minimal fix. Run `npm run typecheck`, `npm run lint:check` and the relevant tests — do
      not proceed if any fail; fall back to notify-only. Commit per `GIT_RULES.md`.
   e. **Full review before merge.** Invoke the local `code-review` skill (via the Skill tool) on the
      branch's diff — the one that runs code-reviewer, architecture-auditor, duplication-eliminator
      and security-scanner in parallel, then style-enforcer, i.e. `/commit`'s review without the
      typecheck/lint/commit steps. NOT the cloud multi-agent `/code-review ultra` (`/ultrareview`):
      never pass `ultra`, it is user-triggered and billed. Any HIGH/CRITICAL finding, or an
      ESCALATE line → do NOT merge; fall back to notify-only with the review findings, and leave
      the branch unmerged (and pushed) for manual review instead of deleting it. Only a clean
      review (or one whose own auto-fixes were applied and tests/typecheck still pass) proceeds.
      This is the actual gate against shipping unsafe autonomous code — the confidence gate only
      decides whether to *attempt* a fix, not whether it's safe to land.
   f. **Merge.** Before touching the shared checkout, run `ListAgents` and `git status` there. If
      another session is active on it, or its tree is dirty, do NOT merge: push the fix branch,
      leave it unmerged, and treat it as notify-only ("merge blocked: checkout busy"). Otherwise
      merge into `development` (`git merge --no-ff`, no PR — feature→development needs none; PR
      only exists for `development`→`main`, and this routine never touches `main`), push
      `development`, delete the fix branch, and `git worktree remove` the worktree.
   g. **Record.** Append a new dated entry to `decisions/observability.md`: issue title/fingerprint,
      root cause if found, and one of: fix + commit link, `not auto-applied — notify only (see
      confidence gate)`, `blocked by review — branch <name> left unmerged, see review findings`, or
      `merge blocked — checkout busy, branch <name> left unmerged`.
5. Commit the `decisions/observability.md` update as its own small `docs` commit on `development`
   directly (records exception in `GIT_RULES.md`), separate from any fix-branch commits. This only
   happens when step 4 ran, i.e. at least one issue was found.
6. Send a Claude Code notification summarizing the run: N issues found (M merged, K notify-only,
   J blocked by review or busy checkout), with commit links and the updated observability entries.

## Guardrails

- Never touch `main`, never force-push, never open or merge a PR.
- Never invent a fix for an error whose cause isn't clearly localized (see confidence gate) — a
  wrong guess in prod is worse than a delayed manual fix.
- Never merge a fix that hasn't cleanly passed the full `/code-review` (step 4e) — that review is
  the actual safety gate on unsupervised code reaching `development`, since this routine may run on
  a smaller/cheaper model whose own judgment of "safe to merge" isn't trusted alone.
- Never switch branches, stash, or reset in the shared checkout while another session is active.
- If the Sentry MCP is unauthenticated or unreachable, notify and stop rather than failing silently.
