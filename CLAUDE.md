# Claude Code Preferences — Pulse

Pulse — Recovery support platform. Next.js 16, React 19, TypeScript, TanStack Query.
Server: `../pulse--server`.

## Production
Live at https://pulserehab.app — AWS EC2+Docker, separate instance from the server. Client is the sole public front door (`next.config.mjs` proxies `/api/:path*` to the server over private VPC). Push to `main` passing CI auto-deploys via `.github/workflows/deploy.yml` (blue/green swap over SSM, see `scripts/deploy/ec2-redeploy.sh`). Vercel deploy still runs in parallel for preview/staging — not production.

## Model Selection
- **Haiku**: sub-agents, file lookups, search queries, simple edits (<50 lines), code explanation, formatting fixes, style enforcement
- **Sonnet/Opus**: complex debugging, architecture decisions, multi-file refactors, reasoning-heavy tasks

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
**Learn from mistakes:** Save feedback memory on any correction or confirmed non-obvious choice. User should never repeat the same correction. Check memory before similar work.
**Goal-driven:** Define success criteria before starting. For multi-step tasks, state a plan: `1. [step] → verify: [check]`. Loop until verified.

## Docs Sync
New feature added → update client README, server PRD, AND server README same time, every time.

## Design Files
`.claude/design/` — JSX design files from Claude Design (reference when building UI).

## Code Style
Rules in `CORE_RULES.md`. Non-negotiable — follow exactly.

### Quick Checklist
Arrow functions | Single quotes | No semicolons | 4-space indent | Nested content on new lines
JSX props: `prop={'value'}` | Export at bottom | Keep components ~40 lines
Use `api` from `@/api` | Access env via config | Use shadcn/ui components
Avoid prop drilling | Clean imports | Delete unused code
SOLID principles | Industry standards | Type-safe forms

**Never:** `React.*` types | Function declarations | Double quotes | `import.meta.env` outside config
**Never:** Direct fetch/axios | Inline exports | Commented code | `window.location` for navigation
**Never:** Multiple components per file | NEXT_PUBLIC_ prefix | Server directives

## Git & Commits
**Read `GIT_RULES.md` before committing or when instructed to commit.** Do not skip it.
Full rules there. Key constraint: never invoke `/commit` skill on small fixes, formatting, or docs changes — use plain `git commit` for those.

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
