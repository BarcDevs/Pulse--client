# Claude Code Preferences — Pulse

Pulse — Recovery support platform. Next.js 16, React 19, TypeScript, TanStack Query.
Server: `../pulse--server`.

## Production
Live at https://pulserehab.app — AWS EC2+Docker, separate instance from the server. Client is the sole public front door (`next.config.mjs` proxies `/api/:path*` to the server over private VPC). Push to `main` passing CI auto-deploys via `.github/workflows/deploy.yml` (blue/green swap over SSM, see `scripts/deploy/ec2-redeploy.sh`). Vercel deploy still runs in parallel for preview/staging — not production.

## MCP Servers
`.mcp.json` (this repo only, not shared with sibling projects) has:
- Sentry MCP (`mcp.sentry.dev`) — query real Sentry issues/events for this project instead of guessing from source/SDK-init checks alone. Requires an OAuth login on first use.
- `chrome-devtools` (official Chrome DevTools MCP, stdio via `npx chrome-devtools-mcp@latest`) — copied from the shared `work/projects/.mcp.json` so it's available even outside `work/projects/`.

## Scheduled Routines (claude.ai)
Two routines watch this project. List/manage at https://claude.ai/code/routines.
- **Pulse Sentry Error Watch (local)** — **Local** routine (runs only while this machine is on and the app is open), every 6h, steps in `.claude/routines/sentry-error-monitor.md`, uses this repo's project `sentry` MCP (needs a one-time OAuth via `/mcp`). Replaced the cloud routine `trig_01ShV1zJC3hdsQPD1TQiRFak` (paused, not deleted) on 2026-09-30 so the `claude.ai Sentry` connector isn't needed. Checks Sentry org `barcdevs` / project `pulse-client` for new or regressed issues, cross-checks `docs/sentry-errors/` + `corrections/` for a known fix before reinventing one, for clear low-risk fixes (explicit confidence gate) runs the full `/code-review`, and only on a clean review merges directly into `development` (no PR, same as the server's AWS watcher; merge is skipped if another session is active on the checkout), and records only when it found something: `docs/sentry-errors/` (index + one file per issue) on the local `monitor/records` branch, one amended commit merged and pushed only together with a fix — this implements the "Monitor agent for production errors" item from `../pulse--server/TODO.md`.
- **Pulse Feedback Watch** (`trig_01Ue4TBymyq5EP6WWEQeMprK`) — daily at 8am UTC. Reads the public CSV export of the beta-feedback Google Form's response sheet, diffs against `feedback/seen-responses.md`, and reports + commits only when there's genuinely new feedback (quiet pre-launch runs are expected). Sheet: `docs.google.com/spreadsheets/d/1UZgy7IuWmd513BuAFW8m2ewaCYoJWPLTv5QEF9e-N6A` (public, view-only).

## Model Selection
- **Sonnet**: default for execution and all sub-agents: file lookups, search queries, edits, refactors, tests, style enforcement, code explanation
- **Opus** (via `/opusplan`): planning, architecture decisions, complex debugging, reasoning-heavy tasks

## Token Efficiency
- Grep/Glob over Bash find/ls/grep. Read with offset+limit when line known.
- Edit over Write. Write only for new files or full rewrites.
- Parallel independent tool calls. Sequential only when output feeds next.
- Sub-agents for >3 searches, large scans, slow multi-call tasks. **Don't sub-agent tasks <100 lines.**
- Don't re-read files in context. Don't read full file to confirm small detail.
- No preamble/postamble. No restating request. No summarizing visible diffs.
- No speculative refactors. No "just in case" error handling.

## Behavior
**Before coding:** State assumptions. Ask when uncertain (95% rule). Surface tradeoffs. Don't implement until 95% confident — ask until there.
**Simplicity:** Minimum code that solves the problem. No extra features, abstractions, flexibility, or impossible-scenario handling. 200 lines that could be 50 → rewrite.
**Surgical:** Touch only what you must. Don't improve adjacent code. Match existing style. Mention unrelated dead code — don't delete it. Remove only imports/vars YOUR changes made unused.
**Goal-driven:** Define success criteria before starting. For multi-step tasks, state a plan: `1. [step] → verify: [check]`. Loop until verified.

## Shared Checkouts & Other Sessions
Another Claude session may be working in this repo, on the same branch or in a sibling worktree. Check `ListAgents` for a busy session before touching git state.
**Before any merge, rebase, checkout, reset, stash, or branch/worktree deletion in a checkout another session may be using, message that session first and wait for its reply.** Never leave the shared tree mid-operation (unresolved merge, mid-rebase). Path-scoped commits (`git commit -- <paths>`) of files you changed are fine without asking. The user naming a session to coordinate with is not the same as it owning the work: confirm who actually owns a worktree before merging or pruning it.
**Close out worktrees when done:** when the work in a worktree is finished, merge its branch into the integration branch per the project's branch flow (`development`, or `main` where there is none), then `git worktree remove` it and delete the merged branch (`git branch -d`) in the same session — never leave a finished worktree or an unmerged branch behind. Treat a branch as merged only when `git cherry <integration-branch> <branch>` shows no `+` lines.

## Repo-Visible Decisions & Corrections Log
Alongside auto-memory (cross-session, not repo-visible), this repo tracks two parallel logs any
collaborator/agent can read: `decisions/` (architecture/technical decisions, with reasoning) and
`corrections/` (corrections or confirmed preferences given to Claude during sessions). Each is
shaped `index.md` + per-topic files + `archive/<topic>.md` for superseded entries.
**Read both `decisions/index.md` and `corrections/index.md` at the start of every new session** —
they are load-bearing context, same tier as this file. **Write immediately, same turn as the correction/decision** — don't wait to be asked, and commit the record right away as its own `docs` commit (records exception under Git & Commits). Load a topic file only when the task
matches it.

## Docs Sync
New feature added → update client README, server PRD, AND server README same time, every time.

## Design Files
`docs/design/` — design system, JSX screen specs and OTP emails from Claude Design (reference when building UI). Older sessions/skills may still say `.claude/design/`; same content.
Design-system elements with their own reusable look (buttons, badges; even one variant) get one base in `src/components/shared/<group>/` (look variants like primary/secondary/ghost are a variant style object on it) plus a separate component per distinct type (e.g. `TextButton`, `IconButton`), built from tokens. Every button uses a type, even with no `className` today. Primitives the design does not style stay a direct `ui/` import, no wrapper. Read `workflow/12-design-system-variants.md` before adding one.

## Code Style
Rules in `CORE_RULES.md`. Non-negotiable — follow exactly.

### Quick Checklist
Arrow functions | Single quotes | No semicolons | 4-space indent | Nested content on new lines
JSX props: `prop={'value'}` | Keep components ~40 lines
Use `api` from `@/api` | Access env via config | Use shadcn/ui components
Avoid prop drilling | Clean imports | Delete unused code
SOLID principles | Industry standards | Type-safe forms

**Never:** `React.*` types | Function declarations | Double quotes | `import.meta.env` outside config
**Never:** Direct fetch/axios | Commented code | `window.location` for navigation
**Never:** Multiple components per file | NEXT_PUBLIC_ prefix | Server directives

## Git & Commits
**Read `GIT_RULES.md` before committing or when instructed to commit.** Do not skip it.
Full rules there. Key constraint: never invoke `/commit` skill on small fixes, formatting, or docs changes — use plain `git commit` for those.

**Exception - records (user decision 2026-09-21):** a record of a correction or decision (files under `corrections/` or `decisions/` and their `index.md` rows) is committed in the same turn as the correction, as its own `docs` commit, WITHOUT asking and without waiting for a "commit" instruction. Saying "I will commit those from now on" in chat is worthless - this rule is what makes it stick. It applies to every session and does not extend to any other change.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

**`graphify` is not a bare PATH command in this environment.** The CLI is a Python package installed to a uv/pipx venv, not on PATH here. `graphify query ...` will fail with "command not found" if invoked directly — that failure is not a signal that the graph is unavailable, it just means the wrong invocation was used. Before concluding graphify isn't available, always try:

```bash
$(cat graphify-out/.graphify_python) -m graphify query "<question>"
```

`graphify-out/.graphify_python` holds the absolute path to the Python interpreter that has graphify installed (saved by the graphify skill itself). Same pattern for `path`/`explain`/`update`. Only fall back to inline NetworkX traversal of `graphify-out/graph.json` (see the graphify skill's `references/query.md`) if that invocation itself errors.

Rules:
- For codebase questions and searches, first run the query above when graphify-out/graph.json exists. Use `path "<A>" "<B>"` for relationships and `explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- **Do not spawn an Explore/general-purpose subagent for a codebase question until graphify has been tried (with the correct invocation above) and either failed or come up short.** Spawning an agent to do raw file exploration when the graph could have answered directly wastes tokens for nothing — try graphify first, every time, no exceptions for "seems faster to just delegate."
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- `explain "<name>"` needs a bare node name with no file extension (e.g. `explain "forumRoute"`, not `explain "forumRoute.ts"`) — extension-qualified names reliably fail with "no node matching." `path "<A>" "<B>"` accepts either form fine.
- After modifying code, run `$(cat graphify-out/.graphify_python) -m graphify update .` to keep the graph current (AST-only, no API cost).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
