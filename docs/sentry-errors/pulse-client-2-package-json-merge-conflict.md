# Error: ./package.json:3:1 — Unresolved merge conflict

- **Sentry issue:** PULSE-CLIENT-2 (https://barcdevs.sentry.io/issues/PULSE-CLIENT-2)
- **Fingerprint / culprit:** `/_error` — `package.json` parse failure
- **Environment:** development only (`localhost:5173`) — not production
- **First seen:** 2026-10-02
- **Root cause:** `package.json` contains unresolved git merge conflict markers (`<<<<<<< HEAD`).
  Versions in conflict: `1.12.20` (HEAD) vs `1.12.17` (incoming). Next.js/Turbopack fails to parse
  it as valid JSON (position 23, line 3). Downstream: also causes PULSE-CLIENT-3 (Tailwind/PostCSS
  error on `globals.css`).
- **Fix:** not auto-applied, notify only (see confidence gate) — merge conflict must be resolved
  manually by the user. Resolution: pick the correct version in `package.json` and remove the
  conflict markers.
- **Update 2026-10-03:** `package.json` has no conflict markers in the current checkout — root
  cause was resolved manually between 2026-10-02 and 2026-10-03. No further events expected.
