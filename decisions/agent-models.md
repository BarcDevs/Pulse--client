# Decisions — Agent Models

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 26/09/2026 — style-enforcer runs on Sonnet, not Haiku

The `style-enforcer` agent edits code (Edit + Bash) against a long, strict rule set (arrow functions, single quotes, no semicolons, `prop={'value'}`, ~40-line components, one component per file). A wrong edit costs more than the Haiku→Sonnet price delta, and the global rule is that all subagents run on Sonnet. Changed `model:` in `work/projects/.claude/agents/style-enforcer.md` to `sonnet`; "style enforcement" moved from the Haiku to the Sonnet/Opus line of Model Selection in every project CLAUDE.md and the `.sources` skeletons; `work/docs/skills_and_agents.md`, `work/docs/TOKEN_EFFICIENCY_SUMMARY.md` and `.resources/skills_and_agents.md` updated to match.
