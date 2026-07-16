# Real-server e2e suite

Drives the app through the real UI (no mocks) against an actual running
`pulse--server`, to catch client/server contract drift that the mocked e2e
suite structurally can't (see DECIDE #1 in `docs/review/01-fix-plan.md`).

- `smoke.spec.ts` — signup → login → check-in → dashboard
- `goals.spec.ts` — create a recovery goal
- `profile.spec.ts` — edit and save profile fields

**Community is not covered yet.** Creating a post requires an existing forum
tag, and a fresh test DB has none — see the `TODO.md` entry on seeding forum
tags via a `pulse--server` Prisma seed script.

Not run by `npm run test:e2e` — `playwright.config.ts` ignores `**/real/**`.
Not wired into CI yet (needs cross-repo checkout + a Postgres service
container — tracked as a follow-up, not done here).

If `pulse--server` isn't reachable, `global-setup.ts` fails the whole run
immediately with one clear error instead of every spec failing separately
with a raw network error.

## Running locally

```bash
# from pulse--server/
docker compose -f docker-compose.test.yml up -d
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/pulse_test npm run prisma:deploy
NODE_ENV=test PORT=4001 DATABASE_URL=postgresql://postgres:postgres@localhost:5433/pulse_test npm run start:dev
```

Use `prisma:deploy` (applies existing migrations, non-interactive) — not
`db:dev:migrate`/`prisma:migrate`, which can prompt for a new migration name.

```bash
# from pulse--client/, in another terminal
# make sure .env.local has NEXT_PUBLIC_SERVER_URL=http://localhost:4001
npm run test:e2e:real
```

## Debugging a failure

A failed run keeps a trace (`trace: 'on-first-retry'`) — open it with
`npx playwright show-trace <path>` and check the network tab first:

- Request never fired / malformed body → UI/interaction bug (bad selector,
  validation blocking submit).
- Request fired, response shape is unexpected → client/server contract bug
  (the class of bug this suite exists to catch).
- Request and response both look right but the UI still shows the wrong
  thing → the component/api layer is misusing a correct response.

If the equivalent mocked spec (e.g. `daily-checkin.spec.ts`) still passes,
the UI mechanics are proven fine against a well-shaped response, so a
real-server-only failure is almost certainly a contract mismatch.

## Teardown

```bash
docker compose -f ../pulse--server/docker-compose.test.yml down -v
```
