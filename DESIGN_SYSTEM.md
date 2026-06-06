# Pulse Design System Reference

Handoff from Claude Design (2026-05-27). **These are prototypes, not production code.** Adapt structure to project's React/TypeScript patterns.

## Color System

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#005da7` | Action, active state, primary accent |
| Primary Start | `#4A90E2` | Gradient start (primary → #005da7) |
| Secondary | `#10b981` (emerald) | Completed, positive states |
| Warning | `#a35e0a` (amber) | Paused, secondary actions |
| Danger | `#ba1a1a` (red) | Delete, abandon, destructive |
| Neutral BG | `#f5f7fa` | Page background |
| Card BG | `#fff` | Card/panel background |
| Border | `#e2e8f0` | Default borders |
| Text Primary | `#1a2b3c` | Headings, body text |
| Text Muted | `#64748b` | Secondary text, labels |
| Text Disabled | `#94a3b8` | Disabled state |

## Goal Category Palette

```javascript
const CATEGORIES = {
  physical:  { label: 'Physical',  pill: '#7cf8dd', pillText: '#005144', bar: '#005da7' },
  mental:    { label: 'Mental',    pill: '#f8d8ff', pillText: '#662e7e', bar: '#7d4495' },
  lifestyle: { label: 'Lifestyle', pill: '#e5e9eb', pillText: '#414751', bar: '#10b981' },
  social:    { label: 'Social',    pill: '#e5e9eb', pillText: '#414751', bar: '#10b981' },
}
```

## Status State Tokens

Each goal/task has 4 visual treatments:

### Active (Blue)
- **Background:** `#eaf3ff` (hover: `#dde9fb`)
- **Border:** `1px solid #a8c7ec`
- **Status Stripe:** gradient blue `#2976c7` → `#005da7`
- **Accent:** `#005da7`
- **Soft Accent:** `#c6dcf3` (background for progress)
- **Shadow:** `0 1px 6px rgba(0,93,167,0.12)` (hover: `0 8px 22px rgba(0,93,167,0.22)`)
- **Title Color:** `#0a2f50`
- **Body Color:** `#345477`
- **Ribbon:** "Active" + activity icon on `#005da7`

### Paused (Amber)
- **Background:** `#fff5e6` (hover: `#ffeed1`)
- **Border:** `1.5px dashed #e9b87a`
- **Status Stripe:** repeating amber `#c97f1a` 6px on/off
- **Accent:** `#a35e0a`
- **Soft Accent:** `#fbe1bb`
- **Shadow:** none (hover: `0 6px 18px rgba(163,94,10,0.14)`)
- **Title Color:** `#5c3508`
- **Body Color:** `#7a5021`
- **Ribbon:** "Paused" + pause icon on `#a35e0a`

### Completed (Green)
- **Background:** `#e8faf2` (hover: `#d8f4e8`)
- **Border:** `1px solid #9ddcc1`
- **Status Stripe:** gradient green `#00a888` → `#006b5b`
- **Accent:** `#006b5b`
- **Soft Accent:** `#bce8d6`
- **Shadow:** `0 1px 6px rgba(0,107,91,0.12)` (hover: `0 8px 22px rgba(0,107,91,0.22)`)
- **Decorative:** subtle radial glow (corner) when completed
- **Title Color:** `#0a3d35`
- **Body Color:** `#2e5a4e`
- **Ribbon:** "Completed" + check icon on `#006b5b`

### Abandoned (Grey)
- **Background:** `#f3f4f6` (hover: `#eceef2`)
- **Border:** `1px solid #d4d8de`
- **Status Stripe:** gradient grey `#b4b9c1` → `#717783`
- **Accent:** `#5b616b`
- **Soft Accent:** `#dee1e6`
- **Shadow:** none (hover: `0 4px 14px rgba(0,0,0,0.07)`)
- **Opacity:** 0.78
- **Title Color:** `#414751`
- **Body Color:** `#717783`
- **Ribbon:** "Abandoned" + x-circle icon on `#5b616b`

## Goal Card Structure

**Dimensions:** min-height 200px, padding 24px, 14px border-radius

**Layout:**
1. **Status Stripe** (5px wide, left edge, full height)
2. **Header** (flex row, space-between)
   - Category pill + status ribbon (left)
   - 3-dot menu (right)
3. **Title** (Manrope 700, 18px, status titleColor)
4. **Description** (Inter 400, 13px, status bodyColor, flex-grow)
5. **Status Footer** (margin-top 18px, position: relative)

**Hover State:**
- Background → hoverBg
- Shadow upgrade
- Transform: `translateY(-2px)`
- Transition: 0.15s all

## Status-Specific Footers

### Active
- Line: "Now: [active phase title]" (blue accent)
- Progress bar: segmented by phase (6px height, rounded)
  - Completed phases: colored
  - Active phase: colored at lower opacity
  - Pending: transparent
- Label: "Phase X of Y" + percentage

### Paused
- Icon + text box: "Paused since [date]"
- Subtitle: "X of Y phases done · resume any time"
- Percentage display (16px, bold)

### Completed
- Icon + text box: "All X phases done"
- Subtitle: "[completion date]" or "Tap to celebrate"
- Percentage: "100%" (18px, bold)
- Background: statusColor soft accent

### Abandoned
- Icon + text box: "Abandoned [date]"
- Subtitle: "X of Y phases done"
- Restore button prominence

## Typography

| Element | Font | Weight | Size | Case |
|---------|------|--------|------|------|
| Page Title | Manrope | 700 | 28-32px | Title case |
| Card Title | Manrope | 700 | 18px | Title case |
| Heading | Inter | 700 | 14-16px | Sentence case |
| Body | Inter | 400 | 13-14px | — |
| Label | Inter | 600 | 10-12px | UPPERCASE |
| Small | Inter | 400 | 11-12px | — |

**Font Stack:** `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
(Manrope for headlines only)

## Spacing Scale

| Purpose | Value |
|---------|-------|
| Micro gap | 2-4px |
| Tight gap | 6-8px |
| Normal gap | 12-16px |
| Section gap | 18-24px |
| Card padding | 24px |
| Container margin | 32px |

## Interactive Patterns

**Button Hover:** subtle background shift, no outline
**Focus:** light background, no dotted outline
**Menu Dropdown:** absolute, `right: 0, top: 110%`, shadow `0 8px 24px rgba(0,0,0,0.12)`
**Transitions:** 0.12-0.15s for background, shadow, transform

## Icons (SVG)

Used as inline SVGs (stroke-based, 2px stroke, round caps/joins):
- `edit` — pencil
- `pause` — two vertical rects
- `play` — triangle (filled)
- `check` — checkmark
- `xCircle` — circle + X
- `trash` — trash bin
- `copy` — overlap rectangles
- `uTurn` — U-turn arrow
- `activity` — pulse/activity chart

## Page-Specific Notes

**Goals** (`pages/goals/design.jsx`)
- Goal card grid layout (responsive)
- Status-grouped accordion sections (Active, Paused, Completed, Abandoned)
- Only Active expanded by default
- Create goal modal
- Inline edit mode for title/description

**Dashboard** (`pages/dashboard/design.jsx`)
- Bento card grid layout
- "Milestones" stat (completion count)
- Wellness chart (circular or bar)
- Quick actions sidebar

**Progress** (`pages/progress/design.jsx`)
- Timeline or milestone list
- Phase progression visualization
- Segmented progress bars

**Community** (`pages/community/design.jsx`)
- Feed-style layout
- User cards with progress indicators
- Comment/reaction patterns

**Profile** (`pages/profile/design.jsx`)
- Goal summary cards
- Stats grid
- Wellness badges

**Check-In** (`pages/check-in/design.jsx`)
- Form-based modal
- Phase selector
- Wellness input (mood, energy, etc.)

## Notes for Implementation

- **Don't copy HTML structure.** Extract the design intent and visual hierarchy.
- **Use design tokens.** Create CSS variables or TypeScript constants for all colors.
- **Responsive behavior not shown.** Add breakpoints for mobile/tablet.
- **Animations.** Prototypes use basic CSS transitions; adapt to Framer Motion if needed.
- **Accessibility.** Ensure icon buttons have `aria-label`, use semantic HTML.
- **Status tokens.** Consider deriving from a single source (enum or type system).
