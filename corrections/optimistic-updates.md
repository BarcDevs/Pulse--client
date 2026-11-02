# Corrections — Optimistic Updates

⚠️ Load only when following a link from [[corrections/index]] for a specific entry, or scanning for a lesson in this topic — not routinely.

---

## 02/11/2026 — Use an optimistic update, not a saving status label

**Correct fact:** For a save or submit that waits on the server, apply the change optimistically (close or advance the UI at once, roll back with the error on failure, as the check-in submit does). Do not show an in-progress status such as "Saving..." or "שומרים...", and do not add a loading-label string for it.

**Lesson:** The guest save dialog was built with a "saving" label and a disabled button while waiting, instead of an optimistic update. The user flagged both the status text and the missing optimistic update.

**Source:** user, auto-recorded: "recorded by the session"
