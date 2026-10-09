# Error: ./src/styles/globals.css — Tailwind PostCSS failure

- **Sentry issue:** PULSE-CLIENT-3 (https://barcdevs.sentry.io/issues/PULSE-CLIENT-3)
- **Fingerprint / culprit:** `/_error` — PostCSS/Tailwind CSS processing failure
- **Environment:** development only (`localhost:5173`) — not production
- **First seen:** 2026-10-02
- **Root cause:** Downstream effect of PULSE-CLIENT-2. Tailwind's PostCSS plugin reads
  `package.json` to resolve the project; since `package.json` has unresolved merge conflict
  markers it is invalid JSON (`SyntaxError: Expected double-quoted property name in JSON at
  position 23`), causing PostCSS to fail when processing `globals.css`.
- **Fix:** not auto-applied, notify only (see confidence gate) — resolving PULSE-CLIENT-2
  (removing merge conflict from `package.json`) will also fix this issue.
- **Update 2026-10-03:** `package.json` conflict resolved (see PULSE-CLIENT-2 update). No further
  events expected.
