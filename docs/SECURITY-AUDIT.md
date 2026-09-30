# Client Security & Privacy Audit — 30/09/2026

Read-only audit of `pulse--client` only. Server findings belong to `pulse--server` (tracked in its own
`docs/SECURITY-AUDIT.md`, owned by the `sec-audit` session) and are deliberately not listed here.
Process: `/security-audit` skill, run on Opus. The audit read every sink and flow-relevant component; the
purely presentational components were covered by grep for sinks and dynamic `href`/`src` only. It also
made a few harmless GET/HEAD requests to `https://pulserehab.app` (headers, bundle, rewrite) and read the
GitHub repo settings with `gh api`. Nothing was changed.

**Verdict:** needs security fixes before continuing. The one serious problem is in CI/CD, not the app.
The repo is PUBLIC and the deploy workflow can be triggered by a fork PR.

## Fix progress (30/09/2026)

- **Also landed on `development` by the `sec-audit` session:** L2 (drafts), M1 (headers, see leftovers below), I3
  (image allowlist), L4 (logout as POST).
- **Landed on `development` by this audit session:** H1 guard `37fd96a`, L1, L5, L3 (2 commits), L8, L7 deps, I7, and the CSP enforcement `d46b021`.
- **Merged into `development` 30/09 (not pushed, not deployed; worktrees and branches removed; typecheck + full test suite green on the merged result, 826 tests):** H1 guard `37fd96a` (`fix/h1-deploy-fork-guard`), L1 `6c7830a` (`fix/l1-encode-path-params`), L5
  `3de1f7e` (`fix/l5-oauth-redirect-validation`), L3 `96c7699` + `3ef1046` (`fix/l3-reset-email-telemetry`),
  L8 `fe71ab2` (`fix/l8-drop-client-server-url`), L7 deps `f2e564d` (`chore/deps-axios-dompurify`), I7
  `1d064dc` (`chore/i7-env-ignore`).
- **Not fixed, needs an owner decision or information:** H1's `production` environment with required
  reviewers and the IAM OIDC trust policy (AWS), L6 (answered: dev DB only), I1 (remove
  `ignoreBuildErrors` or require CI on `workflow_dispatch`), I6 (is the standalone design HTML used?), I8
  (SHA-pin actions), I10 (Privacy page wording), (M1 is fully done: CSP enforced).

- **Decisions 30/09:** `/community` now requires sign-in (pages only; the server forum read endpoints and the Privacy wording about forum visibility are handed to the server side — see `decisions/privacy-and-consent.md`). Client deploys are not held back for the server's delete-account OTP until the 4/10 launch, since no users exist before then; the server change must still be applied.

Status legend: **OPEN** · **FIXED** · **DECIDED** (owner decision recorded, work pending) · **ACCEPTED**
(risk accepted for now). Items marked **BLOCKER** are tracked in `TODO.md` → *Finalising / Deployment*.

## Findings status

| ID | Sev | Finding | Status |
|---|---|---|---|
| H1 | High | Fork PR can trigger a production deploy (`deploy.yml` `workflow_run` never checks event or repo) | FIXED — job guard merged 30/09, plus the deploy job now targets the `aws-production` GitHub environment (required reviewer: the owner, self-review allowed, `main` only) and the IAM role `pulse-client-gh-deploy-role` trust `sub` is pinned to `repo:BarcDevs/Pulse--client:environment:aws-production` (was `ref:refs/heads/main`). The pin is live in AWS; the workflow change ships with the next push to `main`, so a manual deploy from an older `main` would fail until then. Rollback: previous policy kept in the session scratchpad (`trust-before.json`) |
| M1 | Med | No security headers / CSP / `frame-ancestors` / HSTS on HTML pages; `x-powered-by: Next.js` | MOSTLY FIXED — `6126c37` (merged `5b31b2b`, by `sec-audit`): HSTS, enforced `frame-ancestors 'none'`, X-Frame-Options, nosniff, Referrer-Policy, full CSP in Report-Only. **CSP now enforced** (nonce + strict-dynamic, Sentry report-uri; verified in Chromium on a production build, no violations on 13 pages) — merged into `development` 30/09, not yet deployed |
| L1 | Low | Unencoded path params in `ENDPOINTS` builders → client-side path traversal | FIXED — merged into `development` 30/09 (branch  deleted; not pushed/deployed). Encodes every ID segment (forum, goals, milestones, and the check-in paths in `checkIn.ts`, which the `security-scanner` check caught as a gap in the first version) and rejects bare `.`/`..` (encoding alone leaves those resolvable). Test fails on the old code |
| L2 | Low | localStorage drafts not per-user, hold health data, survive logout/deactivate | FIXED — `adab236` (merged `ea62e44`, by `sec-audit`): per-user keys, DOB/care provider/recovery type no longer written, cleared on logout and deactivate, expired drafts swept on start |
| L3 | Low | Reset email in URL (`/reset-password?email=`) reaches Sentry traces + Vercel Analytics | FIXED — merged into `development` 30/09 (branch  deleted; not pushed/deployed). Email moves to `sessionStorage` (cleared on success); Sentry `beforeBreadcrumb`/`beforeSend`/`beforeSendTransaction` strip query strings. Vercel Analytics scrubbing not needed once the email left the URL. Verify a real Sentry event after deploy |
| L4 | Low | Logout was `GET` without CSRF (client half; server route owned by `sec-audit`) | FIXED — `72fbec2` (merged `4dd6b19`): `logout` is now a CSRF-protected `POST`. The audit read a pre-merge tree; re-checked on `development` |
| L5 | Low | Google OAuth `redirect` param passed unvalidated (server callback validates it, so not an open redirect today) | FIXED — merged into `development` 30/09 (branch  deleted; not pushed/deployed). `redirectToGoogleAuth` now forwards only a `getSafeRedirectUrl`-approved path; hostile forms are dropped. Test fails on the old code |
| L6 | Low | `src/mocks/test-credentials.md`: seed users + shared password in a public repo | PARTLY ANSWERED — owner confirmed 30/09 that the seed users exist in the **dev database only**, not production, so the account-takeover path on the live site does not exist. Still open: the file itself in a public repo (taken by the `sec-audit` session: move it out of the repo) and whether the dev database is reachable from the internet (if so, rotate the shared dev password) |
| L7 | Low | 12 `npm audit` advisories (none hit as used); unused `@sentry/react`; tooling in `dependencies` | FIXED — merged into `development` 30/09 (branch  deleted; not pushed/deployed). axios 1.17.0→1.20.0, dompurify 3.4.0→3.4.16, unused `@sentry/react` removed, 4 build/lint tools moved to `devDependencies`. Audit 12→7 (remaining: build-tool transitives + `quill`, which has no fix and is already on the latest `react-quill-new`). `npm ci --dry-run`, typecheck, lint, all tests and a production build pass |
| L8 | Low | Private VPC address `172.31.16.100` baked into the live client bundle (`config.serverUrl`, unused) | FIXED — merged into `development` 30/09 (branch  deleted; not pushed/deployed). `serverUrl` removed from client config; deploy build arg is now the non-public `SERVER_URL` (Dockerfile, `deploy.yml`, `docker-compose.prod.yml`, `.env.example`). Verified with a real build: 0 occurrences in `.next/static`, `/api` rewrite still targets the backend. **First deploy after merge should confirm `/api/status` through the site** |
| L11 | Low | `getSafeRedirectUrl` accepted `/\evil.com` | FIXED (`32b964e`) — re-verified: `/\evil.com`, `//evil.com`, `%2F%2F`, `%5C`, double-encoded, tab/CR/LF all rejected |
| I1 | Info | `typescript.ignoreBuildErrors: true`; push deploys are gated by CI typecheck, `workflow_dispatch` deploys are not | FIXED — `ignoreBuildErrors` removed (merged into `development` 30/09); the tree type-checks clean |
| I2 | Info | DOMPurify returns input unchanged with no DOM; latent (no SSR path renders post/reply HTML) | CORRECTED, NO FIX NEEDED — verified in plain Node: with no `window`, `DOMPurify.sanitize` is **undefined**, so calling `sanitizeHtml` on the server throws a `TypeError` (fails loudly, not open). The pass-through at `purify.cjs.js:1244` only applies where a DOM exists but is judged unsupported (browsers React 19 cannot run on). A guard would only swap a crash for a silent blank, so none was added |
| I3 | Info | `author.image` loaded as-is into `<img src>` (viewer IP leak if external URL); needs CSP `img-src` | MOSTLY FIXED — `630e6fc` (merged `5d205eb`, `sec-audit`): images only render from trusted hosts; `img-src` is in the now-enforced CSP (merged to `development`) |
| I4 | Info | Route protection and ownership checks are UI-only; `/recovery-goals`, `/daily-checkin` missing from protected list | OPEN |
| I5 | Info | Client IP forwarding for rate limiting: rewrite passes Cloudflare `X-Forwarded-For` / `CF-Connecting-IP` unchanged | OPEN (verify server `trust proxy`) |
| I6 | Info | Design-tool page `public/assets/Pulse OG Image (Standalone).html` served publicly (352 KB, inline script) | OPEN |
| I7 | Info | `.gitignore` / `.dockerignore` only cover `*.local` env files; `COPY . .` in builder | FIXED — merged into `development` 30/09 (branch  deleted; not pushed/deployed). `.gitignore` now `.env*` + `!.env.example`; `.dockerignore` adds `.env*`. Checked with `git check-ignore` |
| I8 | Info | GitHub Actions pinned by tag not SHA; public repo exposes account ID, instance ID, role ARN, private IP | FIXED — all 12 `uses:` pinned to commit SHAs (tag kept as a comment) plus `.github/dependabot.yml` (weekly github-actions PRs); CI ran green on the pins. The public-repo exposure of account/instance IDs is informational and stays |
| I9 | Info | Locale server action writes any string to `NEXT_LOCALE` (allowlisted on read; harmless) | ACCEPTED |
| I10 | Info | Location search sends typed text + IP to OpenStreetMap Nominatim from the browser; mention on Privacy page | FIXED — Privacy page (en-US, he-IL) and the downloadable Privacy PDFs now name OpenStreetMap (Nominatim) as receiving the typed text and IP. The PDFs were also truncated to one page (page shell clipped them); fixed and all four regenerated |
| I11 | Info | `.mcp.json` `chrome-devtools-mcp --autoConnect` attaches to the developer's running Chrome (dev tooling only) | ACCEPTED |

## Finding details

### H1 — Fork PR can deploy to production (confirmed in code and repo settings)
`.github/workflows/deploy.yml:3-8,27,30,36,38-42,47-77`. Trigger is `workflow_run: workflows:[CI],
types:[completed], branches:[main]`. `ci.yml` also runs on `pull_request`, fork PRs included. For
`workflow_run` the `branches` filter matches the triggering run's `head_branch`, and a fork's branch can
be named `main`. The job `if:` (line 27) checks only `conclusion == 'success'`. The job then checks out
`workflow_run.head_sha` (the fork's commit), assumes `pulse-client-gh-deploy-role` via OIDC, pushes that
commit's image to ECR as `:latest`, and sends that commit's `scripts/deploy/ec2-redeploy.sh` to the host
through SSM `AWS-RunShellScript` (root). The host also holds the Cloudflare tunnel token.

Repo is PUBLIC (`BarcDevs/Pulse--client`), fork-PR approval policy is `first_time_contributors` (both
re-checked with `gh api` / `gh repo view` in the second pass). Precondition: one approval click on a
first-time contributor's CI run, or any earlier merged contribution. The `branches` filter matching a
fork's `head_branch` is GitHub's documented `workflow_run` behaviour and was **not tested**. The IAM
OIDC trust policy was **not inspected** (verify in AWS).

Fix:
1. Job `if:` requires `github.event.workflow_run.event == 'push'` and
   `github.event.workflow_run.head_repository.full_name == github.repository` and
   `github.event.workflow_run.head_branch == 'main'`. `workflow_dispatch` keeps its own branch.
2. Better: deploy on `push: branches:[main]` with CI as a `needs:` job in the same workflow.
3. Put the job in a GitHub `environment: production` with required reviewers.
4. Restrict the IAM OIDC trust `sub` to `repo:BarcDevs/Pulse--client:environment:production`, or to
   `ref:refs/heads/main` plus `job_workflow_ref`.

### M1 — Missing security headers (confirmed in code and live)
`next.config.mjs:12-35` has no `headers()` and no `poweredByHeader: false`; `src/proxy.ts:5-12` sets no
headers. Live `curl -I https://pulserehab.app/` returns no CSP, no `X-Frame-Options`/`frame-ancestors`, no
`Strict-Transport-Security`, no `X-Content-Type-Options`, no `Referrer-Policy`, and does return
`x-powered-by: Next.js`. `/api/*` responses carry helmet headers, but those come from the server. Effect:
any page can be framed (clickjacking of deactivate/delete/change-email flows) and there is no CSP backstop
for the two `dangerouslySetInnerHTML` sinks (`PostDetailContent.tsx:79`, `ReplyCard.tsx:77`).

Fix: `headers()` for `/:path*` with `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Strict-Transport-Security: max-age=31536000; includeSubDomains`, `Permissions-Policy`; set
`poweredByHeader: false`. Roll CSP out in `Content-Security-Policy-Report-Only` first: `script-src 'self'`
plus nonces from `proxy.ts`, `connect-src 'self' https://*.ingest.us.sentry.io
https://nominatim.openstreetmap.org`, `img-src 'self' data: blob: https:` (tighten once avatar sources are
known), `object-src 'none'`, `base-uri 'self'`. HSTS can also be set at Cloudflare.

### L1 — Client-side path traversal (confirmed in code; live exploit not tested)
`src/api/routes.ts:25-38,58-69` builds `post(postId)`, `likePost`, `savePost`, `sharePost`, `replies`,
`reply` and the goal/milestone paths without `encodeURIComponent`. Next decodes route params, so
`/community/post/..%2F..%2Fcheck-in%3F` makes the victim's browser call `GET /api/v2/check-in?`, and Like or
Save sends `POST /api/v2/check-in?/like` with the victim's cookies and CSRF header. Impact today is limited:
goal pages use the server-returned `goal.id` for mutations, and delete is gated on `authorId`. One real
effect at audit time: a link could reach `GET /auth/logout` (L4, since fixed). Fix: `encodeURIComponent` every path segment in the
`ENDPOINTS` builders; optionally reject IDs that don't match the expected ID format.

### L2 — Drafts not per-user and survive logout (confirmed in code)
- `src/utils/communityDraft.ts:16` — `community:draft:post`, one key for every user of the browser.
- `src/components/community/CommunityPageContent.tsx:56,64,130` and
  `src/components/progress/ProgressPageContent.tsx:43-52` with `src/lib/community/buildShareProgressDraft.ts`
  — "share progress" writes streak and average mood score into the shared key.
- `src/utils/profileDraft.ts:21-33` with `src/context/ProfileEditContext.tsx:167-170` — saved on every
  keystroke: DOB, `careProvider`, `recoveryType`, location, bio (30-minute TTL).
- `src/hooks/mutations/useLogout.ts` and `useDeactivateAccount.ts` clear none of them. Expired entries are
  deleted only when read.

Effect: on a shared device the next user who logs in within 5 minutes gets the previous user's draft or mood
stats pre-filled in the new-post form (`hasDraft && user`); health-related profile data stays in plaintext
localStorage after logout or deactivation. Fix: put the user id in the community keys; on logout and
deactivate delete every `community:draft:*` and `profile:draft:*` key; keep DOB, care provider and recovery
type out of the profile draft or move it to `sessionStorage`; sweep expired keys on app start.

### L3 — Email in URL reaches telemetry (confirmed in code; verify a real Sentry event)
`src/app/(auth)/forgot-password/page.tsx:32-34` navigates to `/reset-password?email=<email>`.
`src/instrumentation-client.ts:3-7` has `tracesSampleRate` 0.1 in prod and no
`beforeSend`/`beforeSendTransaction`/`beforeBreadcrumb`, so page URLs (with the email) go into pageload and
navigation spans and breadcrumbs. `<Analytics/>` (`src/app/layout.tsx:125`) records page URLs on Vercel
deployments. `src/lib/location/searchLocations.ts:9-10` fetch breadcrumbs contain what the user typed. Fix:
keep the reset email in component state or `sessionStorage`; add a Sentry `beforeBreadcrumb`/`beforeSend`
scrubber that strips query strings (at least `email=` and nominatim `q=`); use Vercel Analytics'
`beforeSend` to drop query strings.

### L4 — Logout was a GET — FIXED
As audited, `src/api/auth.ts:46-50` called `api.get('/auth/logout')`, a state-changing GET with no CSRF
token, so any site could log a user out (top-level link, or via L1). Fixed in `72fbec2` (merged into
`development` as `4dd6b19`): `logout` fetches a CSRF token if none is in memory, then `api.post`s. Server
side done by the `sec-audit` session (their L5). With this, the L1 path-traversal link can no longer force a
logout.

### L5 — Google OAuth `redirect` unvalidated on the client (client half confirmed)
`src/lib/auth.ts:100-109`, `src/components/auth/forms/GoogleLoginButton.tsx:19-21`,
`src/app/(auth)/login/page.tsx:28,64` pass the raw `?redirect=` to `/api/v2/auth/google?redirect=…`. The
email/password path validates it with `getSafeRedirectUrl`. Server-side check (read in the first pass): the
callback only accepts paths starting with `/` and not `//`, and prefixes the absolute client origin, so
this is not an open redirect today. Fix: pass `getSafeRedirectUrl(redirect, ROUTES.DASHBOARD)` from the
client so it does not depend on the server check.

### L6 — Seed credentials in a public repo (confirmed in repo; production DB not verifiable)
`src/mocks/test-credentials.md`: five seed users (alice@/bob@/… `example.com`) with one shared trivial
password, committed in `bc09317`. Not bundled or served. If any exist in the production database, anyone can
log in as them and post to the public community. Fix: confirm the production database has none of these
accounts; move the file out of `src/` (or delete it) and keep seed passwords in the server's seed env.

### L7 — Dependencies (confirmed in code; `npm audit --omit=dev`: 12 = 6 high, 3 moderate, 3 low)
None hits an API the client actually uses.

| Package | Advisory | Why it does not apply |
|---|---|---|
| axios 1.17.0 (direct) | Node HTTP adapter proxy, prototype-pollution gadgets, formToJSON DoS, `maxBodyLength` bypass, `NO_PROXY` | Client uses only the browser XHR adapter (`src/api/index.ts` is `'use client'`, relative `baseURL`); gadgets need a separate pollution bug |
| dompurify 3.4.0 (direct) | IN_PLACE, CUSTOM_ELEMENT_HANDLING, `setConfig`/hook pollution, Trusted Types, SAFE_FOR_TEMPLATES | `src/utils/sanitizeHtml.ts` uses none of these modes; its hook only sets `href`/`target`/`rel` |
| quill 2.0.3 via react-quill-new (low) | XSS in HTML export | Exported HTML is rendered only after DOMPurify; other consumers of stored HTML (e.g. emails) not verifiable; no fixed release yet |
| form-data | CRLF injection | Pulled in by axios's node adapter only |

Tooling-only hits (fast-uri, js-yaml, brace-expansion, browserslist, @babel/core, humanfs,
baseline-browser-mapping) count as production only because `@typescript-eslint/eslint-plugin`,
`autoprefixer`, `@next/bundle-analyzer` and `globals` sit in `dependencies` and `@sentry/nextjs` pulls in its
bundler plugin. `@sentry/react` is never imported. Fix: `npm i axios@^1.18 dompurify@latest`; move lint/build
tooling to `devDependencies`; remove `@sentry/react`; watch for a react-quill-new fix.

### L8 — Private VPC address in the client bundle (confirmed in code and live)
`src/config/index.ts:23` inlines the whole `config` object, including `serverUrl`, into client JS; the live
chunk `/_next/static/chunks/1wzfmom-8uac5.js` contains `serverUrl:"http://172.31.16.100:80"`. `serverUrl` is
unused in `src`. It discloses internal topology and that the client→server hop is plain HTTP inside the VPC.
Fix: delete `serverUrl` from `config`; use a non-public `SERVER_URL` only in `next.config.mjs` `rewrites`
(already supported at `next.config.mjs:24`); stop passing it as a `NEXT_PUBLIC_*` build arg
(`deploy.yml:54`).

### Informational notes
- **I1** `next.config.mjs:14-16`: `ignoreBuildErrors: true`. CI runs `npm run typecheck` before build, but
  `workflow_dispatch` (deploy.yml:8,27,30) deploys any ref without CI. Remove the flag or require CI on the
  dispatch path.
- **I2** `src/utils/sanitizeHtml.ts`: **corrected on re-check, no fix needed.** The audit said DOMPurify
  returns input unchanged without a DOM. Verified in plain Node: with no `window`, DOMPurify sets
  `isSupported = false` and returns before defining `sanitize`, so `DOMPurify.sanitize` is `undefined` and
  calling `sanitizeHtml` on the server throws a `TypeError` (loud and closed, not a bypass). The pass-through
  at `purify.cjs.js:1244-1246` only applies when a DOM exists but is judged unsupported. No SSR path renders
  post data today anyway. A guard would only turn a crash into a silent blank body.
- **I3** `src/components/shared/avatars/UserAvatar.tsx:41`, fed from `ReplyCard.tsx:123`, `UserMenu.tsx:43`.
  Image upload is feature-flagged off; where `image` values come from (e.g. Google profile pictures) not
  fully traced. Fix: CSP `img-src` allowlist.
- **I4** `src/constants/proxyRoutes.ts:1-8`, `src/context/AuthProvider.tsx:126-137`,
  `PostDetailActions.tsx:51`, `ReplyCard.tsx:59`: UI-only protection. Acceptable while the server enforces
  ownership (the first-pass server read confirmed it does for goals, milestones, check-ins and posts).
- **I5** `next.config.mjs:23-34`, Next 16.3.6 `proxy-request.js`: the rewrite copies headers verbatim and
  does not append its own `X-Forwarded-For` hop. So the server receives Cloudflare's XFF (real client IP
  last) plus `CF-Connecting-IP`. `trust proxy = 1` (rightmost) or keying on `CF-Connecting-IP` is correct;
  `trust proxy = true` would take the leftmost, spoofable entry. Direct access is closed (deploy script binds
  `127.0.0.1:80`, documented SG has no public HTTP). Live probes of rewrite traversal (`/api/%2e%2e/…`,
  `%252e`) found no escape outside `/api`. Server trust setting itself is owned by `sec-audit`.
- **I6** remove `public/assets/Pulse OG Image (Standalone).html` from `public/`.
- **I7** add `.env*` (keep `!.env.example`) to `.gitignore` and `.dockerignore`. No such files exist today;
  whether Next standalone output copies `.env*` files is unconfirmed.
- **I8** SHA-pin third-party actions.
- **I9** `src/lib/language/switchLocale.ts:1-8`, `src/middleware/locale.ts:10`: harmless.
- **I10** add a line on the Privacy page about the Nominatim lookup.
- **I11** dev tooling only.

## Positive findings
- CSRF token kept in memory only (`src/lib/csrf.ts`), sent on POST/PUT/PATCH/DELETE
  (`apiInterceptors.ts:32-45`), cleared in `initiateLogout`; no auth token in JS.
- Redirect validator fixed and tested against backslash, tab/CR/LF, `%5C`/`%2F` and double-encoded forms;
  `initiateLogout` only redirects to the same-origin current path.
- Both `dangerouslySetInnerHTML` sinks go through DOMPurify; links get `target=_blank rel="noopener noreferrer"`;
  Quill `image` is disabled and the editor mounts `ssr:false`; the post list uses `stripHtml` rendered as text.
- No `window.open`, `postMessage`, `eval`, `innerHTML` or `sessionStorage`; the one external `target=_blank`
  link has `rel`.
- Sentry: no replay integration (replay is off whatever the env var says), `sendDefaultPii` default false, no
  `setUser`, sourcemaps return 404 live.
- No route handlers, `images.unoptimized` (no image-optimizer SSRF), one harmless server action.
- Docker runner is multi-stage, non-root (`nextjs`), binds `127.0.0.1`; traffic only via Cloudflare Tunnel with
  the token from Secrets Manager; CI deploys with OIDC (no static keys); default workflow token permissions
  are `read`.
- Git history: only `.env.example` was ever committed; no AWS/GitHub/Google/private keys found (only the public
  Sentry DSN and a README placeholder `JWT_SECRET`).

## Data flow summary (client)
| Data | Where it goes |
|---|---|
| Credentials, OTPs, password changes | Axios JSON over same-origin `/api/v2`, then the Next rewrite over plain HTTP in the VPC to the server. Not stored client-side. |
| Session | HttpOnly cookies managed by the server (flags not verifiable from the client). CSRF token in JS memory. |
| Health data (check-ins, goals, profile DOB / care provider / recovery type / location) | Sent to the API; TanStack Query memory cache, cleared on logout via `removeQueries`. Profile edit draft and share-progress stats also go to **localStorage** (L2). |
| Community posts and replies | Quill HTML sent to the API, rendered after DOMPurify; drafts in localStorage (L2). Anonymity is enforced server-side; the anonymity toggle is hidden in the UI (`settingsPrivacy:false`). |
| Third parties | Sentry (errors + 10% traces with URLs/breadcrumbs, L3); Vercel Analytics (page URLs, only effective on Vercel); OpenStreetMap Nominatim (typed location + IP, I10); Google (OAuth redirect); Cloudflare (all traffic). |
| Share features | `navigator.share` / clipboard with the post URL; the progress card is rendered to PNG on-device with html2canvas, nothing uploaded. |

AI data flow: the client makes no direct AI calls. `src/api/insight.ts` `fetchTodayObservation` (GET
`/insight/observation`) sends nothing; the server builds the prompt (server audit). Chat is off
(`FEATURES.chat:false`, mocks only).

## Not covered
- Server-side behaviour (out of scope, owned by `sec-audit`): cookie flags, CSRF validation, authorization,
  anonymity enforcement, OAuth callback handling, `trust proxy`, AI prompt contents.
- AWS IAM trust policy for `pulse-client-gh-deploy-role` and security groups (not inspected).
- Purely presentational components (landing, legal, charts, most of goals/progress/insights, shadcn `ui/*`)
  covered by grep, not read line by line; `messages/*.json`, `docs/*`, `TODO.md`, `scaling-todo.md`,
  `workflow/*`, `presentation/*` and the rest of `e2e/` only skimmed.
- Not tested: live CSPT exploitation; what Sentry actually stores for a real event; where `author.image`
  values come from.

## Owner responses & recommendations
None yet. Add one `### <ID>` section per finding as decisions come in (see the skill's "After the report").

## Suggested order
1. **Now:** H1.
2. **Before production users (BLOCKERS in `TODO.md`):** M1, L1, L2, L3, L5, L6, L7.
3. **Post-MVP:** L8, I1–I8, I10.
