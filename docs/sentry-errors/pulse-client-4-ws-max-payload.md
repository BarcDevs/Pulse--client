# RangeError: Max payload size exceeded
- **Sentry issue:** PULSE-CLIENT-4 (https://barcdevs.sentry.io/issues/PULSE-CLIENT-4)
- **Fingerprint / culprit:** `Receiver.haveLength(next.dist.compiled.ws:index)`
- **First seen:** 2026-10-10 (1 event, 0 users)
- **Environment:** development, host `blackhole`, Node v24.14.0, Windows, turbopack, `level: fatal`, `mechanism: auto.node.onuncaughtexception`, `handled: no`

## Investigated
- Pulled issue + latest event (0afb1119...): every frame is Node internals or `node_modules/next/dist/compiled/ws/index.js` (`Receiver.getPayloadLength64` -> `haveLength` -> `Socket.socketOnData`). Release/route/breadcrumbs: none in the event.
- Event path is the local dev checkout (`C:\...\pulse--client\node_modules`), app started 2026-10-09T19:39 and ran ~14h: this is the long-running `next dev` process, not a deployed build.
- Grepped `src/`, `next.config.mjs`, `package.json` for `ws`/WebSocket/socket.io/HMR/maxPayload: no first-party WebSocket server or client. Only `sentry.server.config.ts` / `sentry.edge.config.ts` (plain `Sentry.init`).
- Read `next@16.3.6` compiled ws: it enforces `maxPayload` and throws `RangeError` when a frame header declares a larger payload.

## Root cause
Hypothesis (unverified): a peer (browser tab, extension, or other local tool) sent an oversized or malformed frame to Next's dev HMR WebSocket after a long idle session; the Next-compiled ws Receiver threw, and with no handler it surfaced as an uncaught exception that Sentry's `onUncaughtException` integration captured as fatal. No first-party code is in the path.

## Options
1. Leave alone (recommended): dev-only, single event, no users, no first-party code involved.
2. Filter in Sentry (inbound filter on `environment:development` or this message): hides dev noise; suppression only.
3. Set `environment` for local dev to something excluded from reporting, or disable Sentry server init when `NODE_ENV=development`: removes all dev noise but also real dev signal.

## Fix
not auto-applied, notify only (see confidence gate). Gate failure: no first-party code on the failing path (checked `src/`, `next.config.mjs`, `package.json`, sentry configs), so there is nothing localized to fix.

## Verification
n/a (no fix)
