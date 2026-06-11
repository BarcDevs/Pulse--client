# Dev-Server Memory Leak — Report

## Issue

`next dev` (Next.js 16.2.9, Turbopack default) crashes mid-session:

```
Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

Happens even with `NODE_OPTIONS=--max-old-space-size=8192`. No user interaction
needed — idle dev server with HMR active over a long session is enough. Browser
tab then shows "unable to connect" (server process died, not the browser).

## Steps to identify core issue

1. **Wrong-process dead end.** Initial DevTools heap snapshots were of the
   **browser** renderer (~100MB, GC'd, 40 detached nodes, `Map` <0.2MB) — all
   negligible. OOM is the **Node dev-server** V8 heap, a different process.
   `--max-old-space-size` only governs Node, not the browser tab.

2. **Isolate the trigger.** Ran dev server idle with no client — flat memory.
   Opened a tab — one-time jump (route compile), then flat. Growth only occurs
   on **recompiles** (file saves triggering HMR).

3. **Bundler A/B.** Ran identical 12-recompile test (toggling `src/app/layout.tsx`)
   on Turbopack vs `next dev --webpack`. Both leak; webpack leaked *more* →
   ruled out Turbopack-specific bug.

4. **Measured growth curve** (Turbopack, post-GC `heapUsed`):

   ```
   baseline      105 MB
   recompile 10  249 MB
   recompile 20  291 MB
   recompile 30  405 MB
   recompile 40  499 MB
   recompile 50  591 MB
   ```

   ~+10MB retained per recompile, not RSS noise → ~800 recompiles to hit 8GB.

5. **Node-heap diff via CDP.** Attached to dev server with `--inspect`, took a
   post-GC heap snapshot (A), fired 50 recompiles, took a second snapshot (B),
   diffed constructor histograms (byte-scan, sidestepping V8's 536MB max string
   length). Smoking gun:

   - `module.hot.*` HMR API method-name strings (`status`, `dispose`,
     `invalidate`, `check`, `accept`, `decline`, `addStatusHandler`,
     `addDisposeHandler`, `removeStatusHandler`, `removeDisposeHandler`):
     **+57,320 over 50 recompiles ≈ 1,146/recompile** — one set per module in
     the graph.
   - `Object` +1.28M (+75.7MB), `synthetic` module wrappers +462k (+57.3MB),
     `(object properties)` +117k (+48.5MB), `(object elements)` +355k
     (+36.4MB), `system / Context` closures +180k (+10.4MB), `WeakRef` +245k
     (+7.5MB), retained module **source text** +14.6MB.

## Core issue

**Next.js dev-server HMR module-instance retention.** Every recompile
re-instantiates the entire module graph (with its HMR handler API, closure
contexts, feedback cells, source text) and the **prior generation is never
released**. Linear, unbounded growth — confirmed on both bundlers, Next 16.2.9.

## Fix

No fix available from app side — this is an upstream Next dev-server bug.
Mitigations applied to reduce/delay (do not eliminate):

1. **`experimental.optimizePackageImports: ['radix-ui']`** in `next.config.mjs`
   — applied. The `radix-ui` umbrella barrel is imported by 18 `ui/*`
   primitives used on nearly every screen and was the one heavy barrel not
   covered by Next's default optimize list (which already covers
   `lucide-react`, `date-fns`, `recharts`). Shrinks modules-per-recompile for
   the most common edit paths.
2. **Edit leaf components, not shared roots** (`layout.tsx`, `globals.css`,
   top-level providers/barrels) — fewer modules recompiled per save, less
   leaked per save.
3. **Periodic `next dev` restart** — resets the leaked graph to zero. Currently
   the only full mitigation for long sessions.
4. Upgraded `next` 16.2.3 → 16.2.9 (also patches unrelated CVEs) — leak
   persists unchanged.

Repro tooling kept in `.devtools-snapshots/` (`cdp.mjs`, `diff.mjs`,
`analyze.mjs`).
