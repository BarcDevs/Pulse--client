# Sentry Error Monitor Routine

Runs every 6h as a **Local** routine ("Pulse Sentry Error Watch (local)" at
claude.ai/code/routines), replacing the cloud routine `trig_01ShV1zJC3hdsQPD1TQiRFak`. Deliberate:
a cloud routine needs Sentry attached as a claude.ai account-level connector, which then shows up
in `/mcp` in every session. Locally it uses this repo's project-scoped `sentry` MCP server
(`.mcp.json`) instead. Same workflow as the server's AWS watcher
(`../pulse--server/.claude/routines/prod-error-monitor.md`): confidence gate, full `/code-review`
before merge, merge directly into `development`, no PR, records on an amended branch. Working
directory: `C:\Users\66bar\Claude\work\projects\pulse\.watchers` (dedicated, so run sessions are
saved outside the repo's `/resume` list; the routine does not start in the repo). Because of that,
the repo's `.mcp.json` does not load: the `sentry` server must also be defined in
`.watchers/.mcp.json` (and approved once there) or step 2 will find no Sentry tools.

Sentry org: `barcdevs`, project: `pulse-client`.

## Where records live

Records are `docs/sentry-errors/index.md` (one row per Sentry issue) plus one
`docs/sentry-errors/<slug>.md` per diagnosed issue. The routine never writes them in the shared
checkout. It keeps them on the local branch `monitor/records`, in its own worktree
`../pulse--client.wt/monitor-records`, as **exactly one commit on top of `development`, amended
every run**. That commit reaches `development` (and origin) only in a run that merges a fix.

Below, define absolute paths and never rely on the current directory:
`MAIN=C:/Users/66bar/Claude/work/projects/pulse/pulse--client`,
`WT=C:/Users/66bar/Claude/work/projects/pulse/pulse--client.wt/monitor-records`. Every git command
takes `-C "$MAIN"` (shared checkout), `-C "$WT"` (records worktree) or `-C` of a fix worktree.
Before committing anything, read `$MAIN/GIT_RULES.md` (the repo's `CLAUDE.md` does not auto-load
from here).

## Steps

1. Nothing to `cd` into yet: the routine starts in `.watchers`. Steps 2-3 need no repo access.
2. Use the `sentry` MCP tools (project `.mcp.json` server; if it reports unauthenticated, stop and
   notify — do not attempt OAuth unattended) to search `pulse-client` for issues with activity in
   the last ~8h (6h interval plus buffer), e.g. `search_issues` with `firstSeen:-8h` or unresolved
   issues sorted by date. Also check for issues that regressed/reappeared in that window.
3. If there are no new/regressed issues, report that plainly and STOP. No records, no commit, no
   notification: a quiet run leaves no trace.
4. **Prepare the records worktree.**
   - If `$WT` doesn't exist: `git -C "$MAIN" worktree add "$WT" -B monitor/records development`.
   - `N=$(git -C "$WT" rev-list --count development..monitor/records)`.
     `N=0`: `git -C "$WT" merge --ff-only development`. `N=1`: `git -C "$WT" rebase development`
     (on conflict: `git -C "$WT" rebase --abort`, notify, stop). `N>1`: the one-commit rule is
     broken; notify and stop without touching anything.
5. For each issue found:
   a. **Known-fix check.** Read `$WT/docs/sentry-errors/index.md` (it includes records not
      shipped yet) and the linked `<slug>.md`, plus `corrections/index.md` and relevant topic
      files. If this issue (or a clear variant) is already recorded, bump its row (runs seen +1,
      last seen = today) and DON'T reinvent a fix: if it recurs despite a recorded fix, flag that
      explicitly (old fix incomplete or regressed), then treat it as notify-only and move on.
   b. **Diagnose.** Read the relevant source under `$MAIN/` (the stack gives the file). Form a root-cause
      hypothesis and a minimal fix.
   c. **Confidence gate.** Only proceed to (d) if BOTH hold: the stack trace points to a specific
      line/function in this repo (not a third-party/node_modules/browser-extension frame as the
      sole location), AND the fix is a small, localized change (no cross-cutting refactor, no
      product/design judgment, no ambiguity about which of >1 plausible causes is correct). If
      either fails: skip to (f) as notify-only.
   d. **Fix** in its own worktree so the shared checkout is never disturbed
      (`git -C "$MAIN" worktree add "$MAIN/../pulse--client.wt/monitor-fix-<slug>" -b fix/monitor-<slug> development`),
      then `cd` into that worktree for everything below (tests, review and commit act on the
      current directory), make the minimal fix. Run `npm run typecheck`, `npm run lint:check` and the relevant tests —
      do not proceed if any fail; fall back to notify-only. Commit per `GIT_RULES.md`.
   e. **Full review before merge.** From inside the fix worktree, invoke the local `code-review`
      skill (via the Skill tool) on the branch's diff — the one that runs code-reviewer, architecture-auditor, duplication-eliminator
      and security-scanner in parallel, then style-enforcer, i.e. `/commit`'s review without the
      typecheck/lint/commit steps. NOT the cloud multi-agent `/code-review ultra` (`/ultrareview`):
      never pass `ultra`, it is user-triggered and billed. Any HIGH/CRITICAL finding, or an
      ESCALATE line → the fix is not merged; notify-only with the review findings, and leave the
      branch unmerged for manual review instead of deleting it. Only a clean review (or one whose
      own auto-fixes were applied and tests/typecheck still pass) counts as a fix ready to merge.
      This is the actual gate against shipping unsafe autonomous code — the confidence gate only
      decides whether to *attempt* a fix, not whether it's safe to land.
   f. **Record** in `$WT`: add a row to `docs/sentry-errors/index.md` (issue id, title, runs seen =
      1, first/last seen = today, link) and write `docs/sentry-errors/<slug>.md` from the template
      in the index, with the root cause if found and one of: fix + commit link, `not auto-applied,
      notify only (see confidence gate)`, or `blocked by review, branch <name> left unmerged`.
6. **Amend the records commit** in `$WT` (`git -C "$WT" add docs/sentry-errors`): no records commit
   yet (`N=0` after step 4) → `git commit -m "docs(sentry-errors): monitor records"`; otherwise
   `git commit --amend --no-edit`. Never a second commit.
7. **Ship, only if at least one fix passed (5e).** In the shared checkout (`$MAIN`): first run
   `ListAgents` and `git status`. If another session is active there or the tree is dirty, don't
   merge: leave the fix branches and records unmerged, and say "merge blocked: checkout busy" in
   the notification. Otherwise, on `development` (all via `git -C "$MAIN"`): `merge --no-ff` each
   passing fix branch, then `merge --no-ff monitor/records -m "Merge branch 'monitor/records' into
   development"`, then push `development`. Remove each merged fix worktree
   (`git -C "$MAIN" worktree remove`) and delete its branch. The next run's
   step 4 fast-forwards `monitor/records` (it is then 0 commits ahead).
   If no fix passed, nothing is merged or pushed; the records wait on the branch for the next fix.
8. **Notify** with a summary of the run: N issues found (M merged, K notify-only, J blocked by
   review or busy checkout), commit links, and the new records (quote them, since unshipped
   records aren't on origin yet).

## Guardrails

- Never touch `main`, never force-push, never open or merge a PR.
- Never commit records on `development` directly, never push `monitor/records` on its own, and
  keep it at most one commit ahead of `development` (amend, don't add).
- Never invent a fix for an error whose cause isn't clearly localized (see confidence gate) — a
  wrong guess in prod is worse than a delayed manual fix.
- Never merge a fix that hasn't cleanly passed the full `/code-review` (step 5e) — that review is
  the actual safety gate on unsupervised code reaching `development`, since this routine may run on
  a smaller/cheaper model whose own judgment of "safe to merge" isn't trusted alone.
- Never switch branches, stash, or reset in the shared checkout.
- If the Sentry MCP is unauthenticated or unreachable, notify and stop rather than failing silently.
