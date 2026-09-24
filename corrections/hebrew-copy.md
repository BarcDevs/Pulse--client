# Corrections — Hebrew Copy

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 24/09/2026 — Hebrew term for "check-in" is דיווח יומי, never צ'ק-אין

While writing Hebrew copy for the support page I used the transliteration "צ׳ק-אין" (and also "צ'ק אין" in the Terms file). User: "צק אן = דיווח יומי. תשנה בכל הקובץ של התרגום בעברית". I replaced all 7 occurrences in `messages/he-IL.json`, adjusting the grammar per sentence (דיווח יומי / דיווחים יומיים / בדיווחים היומיים), and regenerated the legal PDFs since the Terms text changed.

**Lesson:** in Hebrew copy write "דיווח יומי" for a check-in; don't transliterate English product terms ("צ'ק-אין") when a Hebrew term is established. Before writing new Hebrew copy, grep `messages/he-IL.json` for how the same concept is already worded. Note: the file still has ~12 older strings that say "עדכון יומי" for the same concept (e.g. `dailyCheckIn`, `saveCheckIn`, `checkInSaved`) — not changed unless the user asks to unify them. Anything in `messages/he-IL.json` that lands in the Terms/Privacy text means `npm run legal:pdf` must be rerun.

---

## 24/09/2026 — Copy uses plain keyboard punctuation, no typographic quotes or em-dashes

In the support/legal copy I wrote em-dashes (—), curly quotes (“ ”, ‘ ’), Hebrew gershayim (״) and low quotes („), and even after being told to "humanise" them I swapped one fancy character for another (״ → “ ”, then ' → ’). User: "remove em-dashes", "replace ״ „ with proper humanised quotes", then "those curly singlequotes are exactly like the curly quotes, should be gone too". End state in `messages/*.json`: plain `'` and `"` (escaped `\"` in JSON, as in the existing `בדוא\"ל`), acronyms written ער"ן / מד"א, and no em-dashes (sentence split or comma instead).

**Root cause:** `CORE_RULES.md` already said "never use `—`, only the hyphen" (em-dash only); I did not re-read it before writing copy. Rule widened 24/09/2026 in client + server `CORE_RULES.md` and both `.sources` templates: all user-facing code, em/en dashes and typographic quotes, docs exempt.

**Lesson:** in `messages/*.json` and other user-facing copy use only what a person types on a keyboard: `'`, `"`, `-`, commas and periods. Never emit em-dashes, en-dashes as punctuation, curly quotes/apostrophes, gershayim/geresh, or low-9 quotes. When told to fix "fancy" characters, remove them, don't substitute a different typographic one. Known leftover: the legal pages render list items as "Label — text" (separator in `LegalBlockList.tsx`, from the design) — pending the user's call.
