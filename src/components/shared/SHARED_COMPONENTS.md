# Shared Components

Reusable components that aren't raw shadcn primitives (those live in `src/components/ui/`,
read-only — see project `CLAUDE.md`). Check here before creating new UI, after confirming shadcn
has nothing that fits.

## Top-level

| File | Purpose |
|---|---|
| `ActionsMenu.tsx` | Dropdown/menu of row/item actions |
| `ConfirmationDialog.tsx` | Generic confirm/cancel modal |
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
| `ui/` | Small shared atoms not tied to shadcn — `Icon`, `FormError`, `RetryButton` |
| `bars/` | Progress bars (e.g. `GoalProgressBar`) |
| `brand/` | Logo/brand marks (`Logo`) |
| `charts/` | Chart cards, legends, tooltips, tabs, skeletons |
| `content/` | Small content-display atoms (e.g. `GuidelineItem`) |
| `error/` | Full error-page building blocks (illustrations, recovery/crisis cards, debug/health cards) + `network/`, `notFound/` subfolders |
| `footer/` | Footer sections (brand/legal/links/social) |
| `inputs/` | Form-adjacent controls beyond raw shadcn (toggles, date picker, dropdown, slider) |

## `buttons/`

Every button in the app comes from here. Never import `@/components/ui/button` (only this folder does) and never a raw `<button>`. Types are separate components; looks of the same element are variants (a style object on `Button`). Layout classes (`w-full`, `flex-1`, `mt-4`) may be passed as `className`; look overrides may not.

### `Button`

The design system's `.btn` element, wrapping `ui/button` (`docs/design/designsystem.html`). Variants: `primary` (default, gradient + glow), `secondary` (white, bordered), `ghost` (primary text), `destructive`, `onGradient` (white, for buttons on the gradient hero/card). Sizes: `default`, `sm`, `lg`, `xl` (h-11 form CTA). Other button types wrap this.

```tsx
<Button variant={'secondary'} size={'sm'} onClick={onCancel}>{label}</Button>
```

### `TextButton`

Text-style action with no padding or background (inline links like "see more", "view all", back link, retry). Wraps `Button` (`ghost`) with a `tone` prop (`'primary'` default with hover underline, `'muted'`, `'onDark'`, `'inherit'` when the caller sets the color) and a `size` prop (`'sm'` default, `'xs'`).

```tsx
<TextButton tone={'muted'} size={'xs'} onClick={onRetry}>{label}</TextButton>
```

### `IconButton`

Icon-only control (close X, menu, password toggle, bell, edit pencil). Wraps `Button` (`ghost`, `secondary` when `outlined`) with `size` (`'xs'` size-5, `'sm'` size-8, `'md'` size-9 default), `tone` (`'muted'` default, `'primary'`, `'destructive'`), `outlined` and `round` props. Positioning (`absolute`, `end-4`) goes in `className`.

```tsx
<IconButton size={'sm'} onClick={onToggle}><Eye className={'size-5'}/></IconButton>
```

### `FabButton`

Floating action button, mobile only (`sm:hidden`), fixed bottom-end, round 56px, primary gradient. Wraps `Button` (`primary`). Pass the icon as children and an `aria-label`.

```tsx
<FabButton onClick={onNew} aria-label={label}><Plus className={'size-6'}/></FabButton>
```

### `ChatSendButton`

Round send button for the chat input, icon included. Wraps `Button` (`primary`) at 32px. Position it with `className` (`absolute` inside the input).

```tsx
<ChatSendButton onClick={onSend} className={'absolute right-1.5 top-1/2 -translate-y-1/2'}/>
```

### `ChipButton`

Pill-shaped selectable option (suggestions, tags, filters, category pickers, topic chips). Wraps `Button` (`secondary`) with `isSelected` (soft primary tint), `solid` (filled primary when selected), `size` (`'sm'` default, `'md'`) and `selectedClassName` for data-driven selected colors (goal category, recovery identity).

```tsx
<ChipButton isSelected={value === id} onClick={() => onChange(id)}>{label}</ChipButton>
```

### `NavItemButton`

Navigation row (sidebar, settings tabs, drawer, user menu, mobile bar "more"). Wraps `Button` (`ghost`) with `isActive` (solid primary), `soft` (tinted active, drawer), `tone` (`'default'`, `'destructive'` for logout) and `layout` (`'row'` default, `'compact'` for menus, `'stacked'` for the mobile bar). Use `asChild` around a `Link`.

```tsx
<NavItemButton isActive={isActive} onClick={onNavigate}><Icon className={'size-5'}/>{label}</NavItemButton>
```

### `TabButton`

Tab/segment control button. Wraps `Button` (`ghost`) with `isActive` and `variant`: `'underline'` (default, list filter tabs with bottom border), `'segmented'` (pill segments inside a tinted track), `'side'` (vertical table-of-contents rows with a start border).

```tsx
<TabButton variant={'segmented'} isActive={tab === '7days'} onClick={onSelect}>{label}</TabButton>
```

### `OptionButton`

Selectable option in a list or group (category rows in a popover, theme choice). Wraps `Button` (`ghost`) with `isSelected` and `layout`: `'row'` (default, full-width borderless row with a tinted selected state) or `'bordered'` (compact bordered choice).

```tsx
<OptionButton layout={'bordered'} isSelected={theme === 'dark'} onClick={onDark}>{label}</OptionButton>
```

### `FieldButton`

Button that looks and sits like a form field (select and date-picker triggers, the reply prompt bar). Wraps `Button` (`secondary`) with `isPlaceholder` (muted text when nothing is chosen) and `size` (`'md'` default, `'lg'` for the larger prompt bar). Full width by default, content justified between; pass `w-auto` to shrink.

```tsx
<FieldButton isPlaceholder={!value}>{label}<ChevronDown className={'h-4 w-4 opacity-50'}/></FieldButton>
```

### `TileButton`

Whole-card clickable tile (profile settings tiles, support topic cards). Wraps `Button` (`ghost`, `secondary` when `outlined`) with `align` (`'center'` default, `'start'`) and `outlined`. The card content is the children; a per-item hover style may be passed in `className`.

```tsx
<TileButton outlined align={'start'} onClick={onOpen}>{content}</TileButton>
```

## `badges/`

Every badge comes from here. Never import `@/components/ui/badge` (only this folder does) and never restyle a badge with `bg-*`/`text-*` classes at the call site. Tinted colors are the `--color-*-light` / `-deep` tokens.

### `Badge`

The design system's `.badge`: pill, 11px / 600, tinted background. Wraps `ui/badge`. Variants: `primary` (default), `secondary`, `accent`, `success`, `warning`, `destructive`, `neutral`, `onGradient` (translucent white, for use on the gradient hero/card). `badgeVariantStyles` is exported so other badge types reuse the same colors.

```tsx
<Badge variant={'success'}>{label}</Badge>
```

## Convention

One `shared/` wrapper is the sole consumer of a given `ui/` (shadcn) primitive when that primitive
needs project-specific behavior — drive variation through the wrapper's props, not scattered
overrides at each call site. Full pattern and rules: `~/Claude/work/projects/RULES.md` §Frontend
Components.

Keep this index up to date — add a row here in the same turn a new file/subfolder is added.
