# Decisions — Dependency Security

⚠️ Load only when following a link from [[decisions/index]] for a specific entry, or scanning for
a decision in this topic — not routinely.

---

## 02/10/2026 — `quill` XSS (GHSA-v3m3-f69x-jf25) accepted, not force-downgraded

`npm audit --omit=dev` flags `quill@2.0.3` (pulled in by `react-quill-new`, the post/reply rich-text
editor) for "XSS via HTML export feature" (CWE-79/CWE-74 — a downstream-component sanitization
issue, not a claim that Quill itself executes injected script). `npm audit fix --force` offers
downgrading `react-quill-new` to `3.7.0` as the only "fix," flagged semver-major.

**Verified before accepting, not just assumed:**
- `react-quill-new@3.7.0`'s own `package.json` still depends on `quill: '~2.0.2'` — the downgrade
  doesn't remove the vulnerable `quill` version at all. It's not a real fix, just what npm's
  resolver found as a possible version bump.
- `npm view quill versions` shows no release past `2.0.3` — there is currently no patched `quill`
  to move to, upstream or otherwise.
- Every place the editor's HTML output is rendered back to a user already runs it through
  `sanitizeHtml` (DOMPurify) first: `PostDetailCard` (via `PostDetailContent.tsx`), `ReplyCard`,
  and `PostItem` (via `stripHtml`, which strips all tags for the list preview). `src/utils/sanitizeHtml.ts`
  calls `DOMPurify.sanitize` with its default safe tag/attribute list, which neutralizes whatever
  unescaped markup Quill's export might produce — the CWE-74 framing ("downstream component") is
  exactly what that render-time pass covers.

**Decision:** accept the advisory as mitigated rather than force a downgrade that doesn't fix
anything and would be a breaking version bump for no benefit. Revisit if/when `quill` ships an
actual patched version upstream.
