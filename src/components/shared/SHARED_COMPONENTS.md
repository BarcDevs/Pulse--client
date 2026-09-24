# Shared Components

Reusable components that aren't raw shadcn primitives (those live in `src/components/ui/`,
read-only — see project `CLAUDE.md`). Check here before creating new UI, after confirming shadcn
has nothing that fits.

## Top-level

| File | Purpose |
|---|---|
| `ActionsMenu.tsx` | Dropdown/menu of row/item actions |
| `ConfirmationDialog.tsx` | Generic confirm/cancel modal |
| `DeleteButton.tsx` | Button that triggers a delete action |
| `DeleteMenu.tsx` | Menu variant of the delete action |
| `EmptyState.tsx` | Placeholder for an empty list/section |
| `ErrorBanner.tsx` | Dismissible inline error banner |
| `ErrorBannerWrapper.tsx` | Wraps `ErrorBanner` with state/positioning |
| `ErrorDisplay.tsx` | Generic error message display |
| `ErrorStateCard.tsx` | Card-shaped error state |
| `LanguageSwitcher.tsx` | i18n locale switcher |
| `PageHeader.tsx` | Page-level header (title/actions/tabs) |
| `PageHeaderTabs.tsx` | Tab strip used inside `PageHeader` |
| `SavingBanner.tsx` | "Saving..." status banner |
| `UserAvatar.tsx` | User avatar image/initials |

## Subfolders

| Folder | Purpose |
|---|---|
| `ui/` | Small shared atoms not tied to shadcn — `CloseButton`, `Icon`, `FormError`, `RetryButton` |
| `bars/` | Progress bars (e.g. `GoalProgressBar`) |
| `brand/` | Logo/brand marks (`Logo`) |
| `charts/` | Chart cards, legends, tooltips, tabs, skeletons |
| `content/` | Small content-display atoms (e.g. `GuidelineItem`) |
| `error/` | Full error-page building blocks (illustrations, recovery/crisis cards, debug/health cards) + `network/`, `notFound/` subfolders |
| `footer/` | Footer sections (brand/legal/links/social) |
| `inputs/` | Form-adjacent controls beyond raw shadcn (toggles, date picker, dropdown, slider) |
| `lists/` | List-item/tag renderers |
| `nav/` | Navigation menus (e.g. `SidebarNavMenu`) |

## Convention

One `shared/` wrapper is the sole consumer of a given `ui/` (shadcn) primitive when that primitive
needs project-specific behavior — drive variation through the wrapper's props, not scattered
overrides at each call site. Full pattern and rules: `~/Claude/work/projects/RULES.md` §Frontend
Components.

Keep this index up to date — add a row here in the same turn a new file/subfolder is added.
