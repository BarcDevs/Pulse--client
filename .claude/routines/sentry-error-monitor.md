# Sentry Error Monitor Routine

Runs every 6h as a **Local** routine ("Pulse Sentry Error Watch (local)" at
claude.ai/code/routines), replacing the cloud routine `trig_01ShV1zJC3hdsQPD1TQiRFak`. Deliberate:
a cloud routine needs Sentry attached as a claude.ai account-level connector, which then shows up
in `/mcp` in every session. Locally it uses this repo's project-scoped `sentry` MCP server
(`.mcp.json`) instead. Same workflow as the server's AWS watcher
(`../pulse--server/.claude/routines/prod-error-monitor.md`): confidence gate, full `/code-review`
before merging into `development` and opening a `development` -> `main` PR (the
routine never merges a PR), records on an amended branch merged together with the fix. Working
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
5. **First notification, before diagnosing anything:** send a Claude Code notification that
   issues were found: how many, and for each its id, title, event count and environment. Then,
   for each issue found:
   a. **Known-fix check.** Read `$WT/docs/sentry-errors/index.md` (it includes records not
      shipped yet) and the linked `<slug>.md`, plus `corrections/index.md` and relevant topic
      files. If this issue (or a clear variant) is already recorded, bump its row (runs seen +1,
      last seen = today, event count) and branch on what the record's **Fix** says:
      - a **merged fix** (commit link) → don't reinvent it; if the issue recurs despite it, flag
        explicitly (old fix incomplete or regressed) and re-diagnose from (b);
      - **anything else** (`notify only`, `blocked by review`, an unverified hypothesis) → the
        issue is still OPEN. A record is not a resolution: do NOT carry the old verdict forward.
        Redo (b) and (c) from scratch, treating the recurrence (more events, new culprit/route,
        new environment) as new evidence, and re-record only what you can now support.
   b. **Diagnose — investigation is mandatory, and happens BEFORE the confidence gate.** You may
      not reach (c) until all of these are done and written down for the record:
      1. Pull the latest event, not just the issue summary: stack frames, URL/route, breadcrumbs,
         release, browser, environment (`get_sentry_resource` on the issue and its latest event).
      2. Find the first-party code involved. If the stack is all third-party frames, that is the
         START of the investigation, not the end of it: Grep `$MAIN/src` (and config) for the
         library API/component named in the frames, and open the page/route code behind the
         culprit URL. Read what you find (e.g. a `<ViewTransition>` wrapper that triggers a React
         internals error).
      3. Verify any claim about the environment before relying on it (e.g. read the file to
         confirm "unresolved merge conflict markers"; check `git log` for when it changed).
      4. State the root cause only if the evidence supports it, citing `file:line` and what you
         saw. If it is a guess, label it `Hypothesis (unverified)`; never write a guess under
         "Root cause".
      5. List the realistic options (e.g. guard in app code, remove/disable the feature, filter in
         Sentry, leave alone) with the trade-off of each, and pick a recommendation.
   c. **Confidence gate.** Evaluated only on the evidence from (b). Only proceed to (d) if BOTH
      hold: the root cause is traced to first-party code you read (the stack frame itself, OR the
      first-party code that triggers the library path, found in (b)2), AND the fix is a small,
      localized change (no cross-cutting refactor, no product/design judgment, no ambiguity about
      which of >1 plausible causes is correct). "Every stack frame is third-party" alone is NOT a
      reason to fail the gate: it is only valid together with the result of the (b)2 search
      ("looked in X, Y; first-party code Z triggers it but cannot be changed safely because …").
      If the gate fails: skip to (f) as notify-only, and the record must say which criterion
      failed and what you checked.
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
      in the index, with one of: fix + commit link, `not auto-applied, notify only (see confidence
      gate)`, or `blocked by review, branch <name> left unmerged`. Every record needs an
      **Investigated** section (what you pulled and read in (b): event details, files/lines
      opened, greps run), a **Root cause** (evidence-backed with `file:line`, or `Hypothesis
      (unverified)`), and **Options** with a recommendation. A record without an Investigated
      section means (b) was skipped: go back and do it. For a recurrence, append a dated
      "recurrence" note with what you re-checked, not just the bumped count.
6. **Amend the records commit** in `$WT` (`git -C "$WT" add docs/sentry-errors`): no records commit
   yet (`N=0` after step 4) → `git commit -m "docs(sentry-errors): monitor records"`; otherwise
   `git commit --amend --no-edit`. Never a second commit.
7. **Ship, only if at least one fix passed (5e).** Merge into `development`, push it, then open the release PR; never
   merge that PR. In the shared checkout (`$MAIN`): first run `ListAgents` and `git status`. If
   another session is active there or the tree is dirty, don't merge: leave the fix branches and
   records unmerged, say "merge blocked: checkout busy" in the notification, and open no PR.
   Otherwise, on `development` (all via `git -C "$MAIN"`): first `pull --ff-only origin
   development` (GIT_RULES.md: always pull before pushing; if it can't fast-forward, merge nothing
   and notify), then `merge --no-ff` each passing fix branch,
   then `merge --no-ff monitor/records -m "Merge branch 'monitor/records' into development"`, then
   `git push origin development`. Remove each merged fix worktree (`git -C "$MAIN" worktree
   remove`) and delete its branch. The next run fast-forwards `monitor/records` (it is then 0
   commits ahead). Then open the PR that carries it to `main` (flow: local -> development -> main):
   if `gh pr list --base main --head development --state open` shows one, add a comment to it
   listing the new fixes; otherwise `gh pr create --base main --head development` with a title in
   the repo's commit convention and a body listing each fix (issue link, evidence-backed root cause
   with `file:line`, what changed, typecheck/test results, `/code-review` result) plus the line
   "This PR carries everything on `development` not yet on `main`." NEVER merge a PR, enable
   auto-merge, or push `main`. If the push or `gh` fails, notify with the error (the fixes stay
   merged on `development`). If no fix passed, nothing is merged, pushed or opened; the records
   wait on the branch for the next fix.
8. **Final notification** (the second of the run) with a summary: N issues found (M merged to `development`, K notify-only,
   J blocked by review or busy checkout), the `development` -> `main` PR link, commit links, and
   the new records (quote them). For each notify-only issue include the recommendation from
   (b)5, and flag any issue that has now been notify-only for 2+ runs as "needs a human
   decision", with its event count trend.

## Guardrails

- Never push `main`, never force-push, never merge a PR, never enable auto-merge. The only branch
  this routine pushes is `development` (step 7), and the only PR it opens is `development` -> `main`.
- Never commit records on `development` directly (they arrive via the `monitor/records` merge),
  never push `monitor/records` on its own, and keep it at most one commit ahead of `development`
  (amend, don't add).
- Never invent a fix for an error whose cause isn't clearly localized (see confidence gate) — a
  wrong guess in prod is worse than a delayed manual fix.
- Recording is not handling. Every issue must end a run as a merged fix, blocked-by-review, or a
  notify-only backed by an actual investigation (5b). Never stop at the Sentry issue summary and
  never write a guess as a root cause. Never carry a previous run's notify-only verdict forward
  without re-checking it (5a).
- Never merge a fix that hasn't cleanly passed the full `/code-review` (step 5e) — that review is
  the actual safety gate on unsupervised code reaching `development`, since this routine may run on
  a smaller/cheaper model whose own judgment of "safe to merge" isn't trusted alone.
- Never switch branches, stash, or reset in the shared checkout.
- If the Sentry MCP is unauthenticated or unreachable, notify and stop rather than failing silently.
