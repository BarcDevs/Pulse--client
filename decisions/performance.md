# Decisions — Performance

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
context in this topic — not routinely.

---

## 11/06/2026 — Dev-server OOM root cause: Next.js dev-server HMR module-instance retention, not Turbopack

`next dev` OOM'd ("JavaScript heap out of memory") mid-session despite 8GB, on Next 16.2.9. Each recompile re-instantiates the whole module graph and retains every prior generation — ~1,150 module records leaked per recompile (proven via node-heap diff: `module.hot.*` API strings + `synthetic`/`Context`/`FeedbackCell`/module source all grow linearly), ~+10MB retained/recompile. Confirmed NOT Turbopack (webpack leaks worse) and NOT browser DOM/Maps (wrong process — browser heap ~100MB, OOM is the Node process). Leak rate scales with modules recompiled, so editing shared roots (`layout.tsx`, globals, providers) leaks far more than editing leaf components. This is an upstream Next dev HMR bug; app-side changes only buy headroom. Highest-leverage fix applied: `experimental.optimizePackageImports: ['radix-ui']` in `next.config.mjs` (the `radix-ui` umbrella barrel across 18 `ui/*` primitives was the one heavy barrel not in Next's default optimize list — lucide-react/date-fns/recharts were already covered). Otherwise: avoid frequent shared-file edits, restart periodically, report upstream. Full writeup: `docs/memory-leak-findings.md`; repro tooling: `.devtools-snapshots/{cdp,diff,analyze}.mjs`.
