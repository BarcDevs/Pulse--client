# Corrections — Hebrew Copy

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 24/09/2026 — Hebrew term for "check-in" is דיווח יומי, never צ'ק-אין

While writing Hebrew copy for the support page I used the transliteration "צ׳ק-אין" (and also "צ'ק אין" in the Terms file). User: "צק אן = דיווח יומי. תשנה בכל הקובץ של התרגום בעברית". I replaced all 7 occurrences in `messages/he-IL.json`, adjusting the grammar per sentence (דיווח יומי / דיווחים יומיים / בדיווחים היומיים), and regenerated the legal PDFs since the Terms text changed.

**Lesson:** in Hebrew copy write "דיווח יומי" for a check-in; don't transliterate English product terms ("צ'ק-אין") when a Hebrew term is established. Before writing new Hebrew copy, grep `messages/he-IL.json` for how the same concept is already worded. Note: the file still has ~12 older strings that say "עדכון יומי" for the same concept (e.g. `dailyCheckIn`, `saveCheckIn`, `checkInSaved`) — not changed unless the user asks to unify them. Anything in `messages/he-IL.json` that lands in the Terms/Privacy text means `npm run legal:pdf` must be rerun.
