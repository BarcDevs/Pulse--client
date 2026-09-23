# Corrections — Code Placement

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 23/09/2026 — Put a tunable delay (`networkRetryMs`) in `src/constants/time.ts` instead of `src/config/timings.ts`

Needed one shared 10s network-retry value. Added `networkRetryMs = 10 * secondInMs` to `src/constants/time.ts`, without first looking at where this repo keeps delays. `src/config/timings.ts` already holds the delay/duration values (`TOAST_DURATION`, `DEBOUNCE_DELAY`, ...). User: "networkRetryMs DOESNT belong to `src/constants/time.ts`. it belongs in configs."

**Lesson:** `src/constants/time.ts` is for unit conversions (`secondInMs`, `minuteInMs`, ...), not tunable values. Tunable timings/delays go in `src/config/timings.ts`. Before adding a new constant, look at the sibling `config/` and `constants/` files for an existing home for that kind of value.
