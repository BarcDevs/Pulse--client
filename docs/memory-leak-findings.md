# Dev-Server Memory Leak — Diagnosis & Findings

Investigated 2026-06-11. Symptom: `next dev` process crashes mid-session with
`Ineffective mark-compacts near heap limit — JavaScript heap out of memory`, even
with `--max-old-space-size=8192`. Browser tab then shows "unable to connect"
(collateral — the server is gone, not the browser).

## TL;DR

**Root cause: Next.js dev-server HMR module-instance retention.** Every recompile
re-instantiates the whole module graph and the dev server keeps *every prior
generation* alive. ~1,150 module records leaked per recompile → linear, unbounded →
8GB OOM over a long session of saves.

- **Not Turbopack.** Both Turbopack and webpack leak per-recompile (webpack was
  worse in our test). Switching bundlers does not fix it.
- **Not the browser / DOM / app Maps / listeners.** The original DevTools browser
  snapshots were the wrong process and a dead end.
- **Leak rate = modules-per-recompile.** Editing a *shared* file (root `layout.tsx`,
  globals, providers, barrels) recompiles the whole graph → big leak. Editing a
  *leaf* component → tiny leak.

## How we got here (and the wrong turns corrected)

| Earlier theory | Verdict | Evidence |
|---|---|---|
| Detached DOM nodes | ✗ | 40 nodes total in browser snapshot — negligible |
| Uncleaned Maps/Objects | ✗ | `Map` < 0.2MB in browser snapshot |
| Turbopack-specific | ✗ | webpack leaked *more* on identical test |
| Browser heap was the leak | ✗ | browser heap ~100MB & shrinking; OOM is the **Node** process |

The `Heap-*.heapsnapshot` files (since deleted) were **browser renderer** heaps
(~100MB, GC'd). The 8GB OOM is the **Node dev-server V8 heap** — a different process.
`--max-old-space-size=8192` only governs Node, not the browser tab.

## Method

1. **Isolate the process.** Confirmed pure idle (no client) = flat memory, both
   bundlers. Confirmed idle-with-tab = flat after a one-time route-compile jump.
   → growth only happens on **recompiles**.
2. **Bundler A/B.** Same 12-recompile test (toggle `src/app/layout.tsx`, in every
   route's graph) on Turbopack vs `next dev --webpack`. Both ratchet up with partial
   GC reclaim; webpack retained more. → not bundler-specific.
3. **Node-heap diff.** Ran Turbopack with `--inspect=9229`. Dev server is the
   `start-server.js` target (port 9230). Took a post-GC heap snapshot (A), fired 50
   recompiles, took a second (B), diffed constructor histograms.

Tooling (kept in `.heap-diagnostics/`):
- `cdp.mjs` — CDP client (Node 24 global `WebSocket`/`fetch`). `info <port>` prints
  heapUsed/rss/argv; `snap <port> <out>` streams a heap snapshot to disk.
- `diff.mjs` — byte-scans two heapsnapshots (no full-file stringify; sidesteps V8's
  ~536MB max-string-length) and prints constructor growth B−A.
- `analyze.mjs` — single-snapshot constructor/type breakdown.

## Measured growth (Turbopack, post-warmup, V8 `heapUsed`)

```
baseline      105 MB
recompile 10  249 MB
recompile 20  291 MB
recompile 30  405 MB
recompile 40  499 MB
recompile 50  591 MB
```
~+10 MB **retained** per recompile (post-GC; not RSS noise). ~800 recompiles → 8GB.

## Node-heap diff (B = +50 recompiles)

Smoking gun — the `module.hot.*` HMR API method-name strings, each +~57,320 over 50
recompiles ≈ **1,146 per recompile** (= one per module in the graph):

```
status  dispose  invalidate  check  accept  decline
addStatusHandler  addDisposeHandler  removeStatusHandler  removeDisposeHandler
```

Everything else in the diff is that retained graph:

| grew by | constructor | ~per recompile |
|---|---|---|
| +1.28M / 75.7MB | `Object` | ~25k |
| +462k / 57.3MB | `synthetic` (module wrappers) | ~9k |
| +117k / 48.5MB | `(object properties)` | ~2.3k |
| +355k / 36.4MB | `(object elements)` | ~7k |
| +180k / 10.4MB | `system / Context` (closures) | ~3.6k |
| +474k / 10.9MB | `system / FeedbackCell` | ~9.5k |
| +245k / 7.5MB | `WeakRef` | ~4.9k |
| +100 / 14.6MB | retained **module source text** (`LoaderTree`, runtime-utils…) | ~2 |

Interpretation: each recompile creates a fresh copy of every module record (with its
HMR handler API, closure context, feedback cells, and **source string**), and the
prior generation is never released.

## Barrel-import audit (leak amplifier)

Leak rate scales with modules-per-recompile, so a smaller graph = proportional
headroom. Next's **default** `optimizePackageImports` already covers `lucide-react`,
`date-fns`, `recharts`. The gap:

- **`radix-ui` umbrella barrel** (`^1.4.3`) — imported in **18** `src/components/ui/*`
  primitives (`import { Dialog as DialogPrimitive } from 'radix-ui'`), which are used
  by nearly every screen. The umbrella re-exports all of Radix and is **not**
  optimized by default → every recompile of any UI screen drags the full Radix barrel
  graph through HMR.

Fix in `next.config.mjs`:
```js
const nextConfig = {
    // ...existing...
    experimental: {
        optimizePackageImports: ['radix-ui']
    }
}
```

## Mitigations (ranked)

It's fundamentally an upstream Next dev-server HMR leak; app-side changes buy headroom.

1. **`optimizePackageImports: ['radix-ui']`** — shrinks modules-per-recompile for the
   18 ubiquitous UI primitives. Highest-leverage app-side change.
2. **Avoid frequent edits to shared roots** (`layout.tsx`, `globals.css`, top
   providers, barrel files). Prefer editing leaf components — far fewer modules
   recompiled, far less leaked per save.
3. **Periodic dev restart** / bump to `--max-old-space-size=12288` — band-aids.
4. **Report upstream** (vercel/next.js) with this diff — reproducible per-recompile
   module-instance retention on Next 16.2.9, both bundlers.

## Status

- Upgraded `next` 16.2.3 → **16.2.9** (also patches May-2026 CVEs); leak persists.
- `optimizePackageImports: ['radix-ui']` — **recommended, not yet applied.**
