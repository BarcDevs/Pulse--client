# Corrections — Code Placement

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for
a lesson in this topic — not routinely.

---

## 23/09/2026 — Put a tunable delay (`networkRetryMs`) in `src/constants/time.ts` instead of `src/config/timings.ts`

Needed one shared 10s network-retry value. Added `networkRetryMs = 10 * secondInMs` to `src/constants/time.ts`, without first looking at where this repo keeps delays. `src/config/timings.ts` already holds the delay/duration values (`TOAST_DURATION`, `DEBOUNCE_DELAY`, ...). User: "networkRetryMs DOESNT belong to `src/constants/time.ts`. it belongs in configs."

**Lesson:** `src/constants/time.ts` is for unit conversions (`secondInMs`, `minuteInMs`, ...), not tunable values. Tunable timings/delays go in `src/config/timings.ts`. Before adding a new constant, look at the sibling `config/` and `constants/` files for an existing home for that kind of value.

---

## 23/09/2026 — Wrote a magic-number delay (`10000`) in `config/timings.ts` and left the file's other magic numbers in place

After moving the retry delay into `src/config/timings.ts`, added it as `NETWORK_RETRY_DELAY: 10000`, copying the file's existing style. The file used bare ms literals (`3000`, `300`, `500`) instead of the repo's `*InMs` constants. User: "the timings inside timings.ts uses pure magic numbers instead of using *inms." This is the same class as the older "use existing time constants instead of hardcoding ms math" correction.

**Lesson:** an existing file's style isn't a reason to repeat a convention violation. Express every duration through `secondInMs` / `minuteInMs` (e.g. `10 * secondInMs`, `0.3 * secondInMs`), and when touching a file that already violates the convention, fix the values you touch and the file's siblings if trivial.

## 02/11/2026 — Check SHARED_COMPONENTS.md and use BaseDialog, never raw ui/dialog

**Correct fact:** Before building any UI, read src/components/shared/SHARED_COMPONENTS.md and build on the shared component that exists. Every dialog is built on shared/BaseDialog (or ConfirmationDialog); never import the raw shadcn ui/dialog parts into a feature component.

**Lesson:** The guest save dialog was written straight on ui/dialog (Dialog, DialogContent, DialogHeader, DialogTitle) and a hand-rolled layout, although BaseDialog existed and is documented as the base for dialogs. The user called it a pure violation of the rules in src/components/CLAUDE.md (shadcn first, then check SHARED_COMPONENTS.md; ui/ is reached only through shared wrappers).

**Source:** user, auto-recorded: "recorded by the session"
