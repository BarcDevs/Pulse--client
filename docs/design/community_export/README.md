# Pulse — Community (standalone export)

A minimal, runnable bundle of just the Community feature from the Pulse prototype.

## Run
Open `index.html` in any modern browser (or serve the folder with any static server). The Community screen boots directly; the sidebar still shows the full app navigation, but other pages show a small "not included in this export" placeholder.

## What's included
- `index.html` — entry point (loads React + Babel + the files below, mounts directly into the Community screen)
- `community.jsx` — the Community feature: feed, post composer (category + tags + validation), category filter, tag filter, post detail view with replies, Share/Save buttons with toasts
- `sidebar.jsx` — provides the `C` color tokens, `Icon` component (full lucide-style set), and the `Sidebar` nav component
- `app_chrome.jsx` — provides the `TopBar` page header
- `pulse-logo.webp` — wordmark, used in the sidebar header

## Community feature surface
- **List view:** category pills, tag chips, "X showed support" indicator, replies count, **Share** (copies a permalink + toast), **Save** (bookmarks the post + toast)
- **Filtering:** click any tag to filter (toast confirms), or pick a category from the dropdown above the list; a clear-filter pill appears when active
- **Composer:** title, body, required category dropdown, 1–5 tags with autocomplete suggestions, field-level validation
- **Post detail:** full post body + Like / Share / Save row, reply composer, threaded reply list
- **Right rail:** Recovery Mentors widget
