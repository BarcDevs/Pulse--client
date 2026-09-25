# Decisions — Design System Components

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 25/09/2026 — Every design-system element is a component: base + a component per type, variants as a style object

Adopted from pantry's wrapper approach, scoped to design-system elements only (not one wrapper per `ui/` primitive). Each element gets one base in `src/components/shared/<group>/`; look variants (primary/secondary/ghost/destructive) are a variant style object on the base, while structurally distinct types (`TextButton`, `IconButton`, `FabButton`, `ChipButton`) are separate components. Every instance uses a type, even with no `className` today, so a design change is one edit, not one per call site. Colors are tokens (`--color-x`). Buttons go first, one `rfc` commit per type, then every other design element; dead code found along the way is removed in a separate cleanup commit via `/dead-code`.

Rule lives in `CORE_RULES.md`, `CLAUDE.md` and `workflow/12-design-system-variants.md` (audit and button type map inside). Cross-project copy in `~/Claude/work/projects/.sources/` (`RULES.md`, frontend-nextjs templates).
