# Corrections — log

**Why this file exists:** corrections and confirmed preferences given to Claude during sessions in
this repo — Claude's mistakes and the user's corrections to Claude's behavior/claims.

Single log file for now — split into `index.md` + topic files once this grows large enough to need
it (see `~/Claude/work/projects/.sources/RULES.md` § Context Log for the full split format).

---

## 18/09/2026 — Claimed a Firefox font-fallback CSS change "fixed" the issue without ever being able to test in Firefox

`mcp__claude-in-chrome` browser automation is Chrome-only. User reported a Hebrew-locale font rendering issue that only reproduces in Firefox (initially suspected `privacy.resistFingerprinting` / Enhanced Tracking Protection blocking custom webfonts — turned out later to be stale local state, unrelated). Added `Arial, Helvetica` to the `--font-sans` CSS fallback stack and described it to the user as "improves the fallback" — implying a verified fix — when it was an untested guess about how Firefox resolves font-family fallback order. User pushed back ("font still the same" → "so why did u tell me it fixed?"). The claim was unverifiable from this environment at all: no way to open Firefox and check computed styles/rendering directly.

**How to apply:** when a bug is browser/environment-specific and outside what available tooling can actually load (e.g. Firefox-only repro with Chrome-only automation), say so explicitly up front and ask the user to verify in-session (console command, screenshot) rather than presenting a source-level guess as a fix. Never say "fixed" or "should fix this" for a change that hasn't been run against the actual repro environment.

---

## 18/09/2026 — Removed a data-driven chart feature (bridge from off-screen anchor day) outright instead of confirming the fix first

User reported a specific visual bug (dashed bridge line drawing from an invisible off-screen anchor point into a single visible data point, looking like it "goes to a void"). Response was to jump straight into editing `enrichWithBridges` in `TrendChart.tsx`, deleting the entire `seriesPrevious`/virtual-anchor bridging mechanism — not just suppressing the void-drawing visual case. User interrupted mid-edit ("wtf????? didnt allowed you to do that"). Same pattern as an earlier correction in this session ("you should wait for my confirmation") — jumping to the broadest-interpretation code change instead of proposing the fix (or asking) first.

**How to apply:** for a reported visual/behavioral bug with more than one possible fix shape (suppress the specific bad case vs. remove the underlying feature), state the proposed fix in one line before editing, or ask — especially right after this exact feedback was already given once in the same session.

---

## 18/09/2026 — Referred corrections/decisions logging to `pulse--server` instead of building this repo's own

`pulse--client` had no `corrections/`/`decisions/` dirs of its own. Rather than creating them here, entries were written into `pulse--server/corrections/` and `pulse--server/decisions/` (the only place the pattern existed in this project pair) — moving the "have to go elsewhere" problem from one repo to another instead of fixing it. User: *"you should build one here not refer to other project AGAIN you moved that refer problem from one place to the other, no fix at all."* Also separately claimed a corrections dir "already existed" here without verifying — it didn't; had to actually run `find` to confirm before responding, twice.

**How to apply:** `pulse--client` and `pulse--server` are separate repos with independent context — a cross-cutting rule that says "log corrections in the repo you're working in" means *this* repo, not whichever sibling repo happens to already have the directory. Build the log here if it doesn't exist rather than pointing at another project's copy. Don't assert a file/directory exists without checking first, even when it "should" per some established pattern.
