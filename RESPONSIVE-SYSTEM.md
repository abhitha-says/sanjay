# RESPONSIVE SYSTEM — Dr. Sanjay Goel Website
### Design System Specification · Pre-Implementation Reference
**Based on:** RESPONSIVE-AUDIT.md (45 issues, 2026-08-11)  
**Stack:** React + Vite + Tailwind CSS v3 + Framer Motion  
**Status:** Specification only — no code changes made

---

## 1. BREAKPOINTS

The existing Tailwind tier map is retained. One new tier (`2xl`) is added to address ultrawide overflow issues surfaced by G-02, G-03, G-04, H-03, D-02, J-05.

| Token | px value | Use case |
|-------|----------|----------|
| *(default)* | 0 – 639px | Mobile (small + standard + large) |
| `sm` | 640px | Large mobile / small tablet transition |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Small laptop |
| `xl` | 1280px | Standard laptop / desktop |
| `2xl` | 1536px | Large desktop / ultrawide |

> **Rule:** Design mobile-first. Every layout decision starts at the default (0px) tier and is overridden upward. No layout should be defined only at `lg` or `xl` without a mobile fallback.

---

## 2. PAGE GUTTERS

Gutters are the horizontal padding applied to every section and container. They must be **consistent across all sections on the same page** (Issue G-05: hero containers used different values than adjacent content sections, causing jarring margin shifts).

### Gutter Scale

| Breakpoint | Tailwind class | px value | Comment |
|------------|---------------|----------|---------|
| default | `px-4` | 16px | Minimum breathing room on 360px |
| `sm` | `px-6` | 24px | Large mobile |
| `md` | `px-10` | 40px | Tablet |
| `lg` | `px-14` | 56px | Laptop |
| `xl` | `px-20` | 80px | Desktop |

### Utility class (add to `index.css`)
```css
.section-gutter {
  @apply px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20;
}
```

### Max-width Container
Every full-width section must be constrained at ultrawide viewports (Issue G-02, G-04):

```
max-w-[1680px] mx-auto
```

This constraint applies to: Navbar inner wrapper, Dock outer wrapper, all section content wrappers.

---

## 3. TYPOGRAPHY SCALE

The project uses two font families:
- **Serif:** Cormorant Garamond (display / editorial)
- **Sans:** DM Sans (UI / body / labels)

### Body Text Scale

| Role | Mobile | Tablet (md) | Desktop (lg) |
|------|--------|-------------|--------------|
| Body copy | `text-[15px]` | `text-[16px]` | `text-[17px]` |
| Secondary / meta | `text-[13px]` | `text-[13px]` | `text-[14px]` |
| Labels / overlines | `text-[11px]` | `text-[11px]` | `text-[12px]` |
| Caption | `text-[11px]` | `text-[11px]` | `text-[11px]` |

### Line Height Rules

| Context | Value | Note |
|---------|-------|------|
| Body sans | `leading-[1.65]` | Comfortable reading |
| Serif display | `leading-[1.1]` | Tight but not collapsed |
| Serif italic mobile | `leading-[0.96]` minimum | Prevents ascender/descender collision (Issue T-02) |
| Serif italic desktop | `leading-[0.93]` | Acceptable at large sizes |

### Font Variant Numerics

Section numbers ("01"–"05") must render as lining numerals in all fallback scenarios (Issue T-01). Add to `index.css`:
```css
.font-serif {
  font-variant-numeric: lining-nums;
}
```

---

## 4. HEADING SCALE

All headings use `font-serif` (Cormorant Garamond). The `clamp()` function handles fluid scaling between breakpoints. Rules derived from audit findings H-03, D-02, D-03, J-02, J-05.

### Hero H1 — Primary Page Titles

```css
font-size: clamp(38px, 8vw, 140px);
```

| Breakpoint | Effective size | Rationale |
|------------|---------------|-----------|
| 360px | 38px (floor) | Prevents overflow within 312px content width (Issue D-03) |
| 768px | ~61px | Proportionate tablet headline |
| 1280px | ~102px | Strong desktop presence |
| 2560px | 140px (ceiling) | Raised from 118px to reduce ultrawide dead space (Issue D-02) |

### Section H2 — Sub-page / Section Titles

```css
font-size: clamp(28px, 4vw, 80px);
```

### Section H3 — Card / Component Headings

```css
font-size: clamp(20px, 2.5vw, 36px);
```

### Background Watermark Text

```css
font-size: clamp(48px, 14vw, 270px);
```

| Breakpoint | Effective size | Rationale |
|------------|---------------|-----------|
| 360px | 48px (floor) | "Dr. Sanjay" at 48px ≈ 240px — fits within 360px (Issue H-04) |
| 360px (old) | 80px (floor) | Was 400px+ wide, clipped mid-glyph |
| 1920px+ | ~268px → 270px (ceiling) | Visual impact at large sizes |

> **Watermark `left` positioning:** Must be expressed as a `vw`-relative value or percentage that keeps the text within the viewport at all breakpoints. Fixed `left: 22%` or `left: 25%` is forbidden on mobile compositions.

---

## 5. SECTION SPACING

Vertical padding (top/bottom) for all sections. Desktop-only values (`py-32`, `py-44`) are the source of 40%+ viewport-height whitespace on mobile (Issues S-01, S-02, D-06).

### Standard Section

```
py-16 md:py-24 lg:py-32
```
px values: 64px → 96px → 128px

### Dramatic / CTA Section

```
py-20 md:py-32 lg:py-44
```
px values: 80px → 128px → 176px

### Hero Section Minimum Height

| Context | Rule |
|---------|------|
| Mobile | `min-h-[auto]` — never `h-screen` without a visible image anchor |
| Tablet | `min-h-[600px]` |
| Desktop | `min-h-screen` or `min-h-[calc(100svh-72px)]` |

> **Rule (Issue S-02):** `h-screen` or `min-h-screen` is permitted only when a visual element (portrait, image, gradient) fills the space. A section that hides its image on mobile must drop to `min-h-[auto]` at that breakpoint.

### Navbar Clearance

Any section that uses negative top margin to bleed under the navbar (`-mt-[72px]`) must offset this with inner padding on mobile:

```
pt-[72px] md:pt-0
```
(Issue M-02)

---

## 6. IMAGE BEHAVIOR

### Rules for Hidden Images on Small Viewports

Several pages hide portrait images on mobile (`hidden md:block`), leaving blank cream sections (Issues J-01, M-01, D-01). This is forbidden.

**When a foreground portrait is hidden on mobile:**
- Provide a full-bleed background version at `opacity-[0.10]–opacity-[0.15]` via a separate `<div>` with `md:hidden`
- Apply a gradient overlay (`from-bg/0 via-bg/60 to-bg`) so text remains legible
- The background image element must use `object-cover` and `absolute inset-0`

### Hero Portrait Height

| Breakpoint | Minimum height | Class |
|------------|---------------|-------|
| Mobile (default) | 420px | `h-[420px]` |
| `sm` | 480px | `sm:h-[480px]` |
| `md`+ | Absolute / auto | Positioned via layout |

Raised from the current `h-[300px]` floor (Issue H-01).

### Parallax Portrait Columns

An absolute/sticky parallax image column that is `hidden` on mobile must be replaced by a background treatment (Issue D-05). Rule:

```
hidden md:block   → OK for layout column
[mobile fallback] → required background element with md:hidden
```

### `object-fit` Defaults

| Image type | Rule |
|------------|------|
| Portrait / editorial | `object-cover object-top` |
| Product / full-body | `object-contain object-bottom` |
| Gallery / card | `object-cover object-center` |

### Sticky Scroll Sections

Sticky scroll with `h-screen` is permitted only at `md` and above. On mobile, remove sticky:

```
md:sticky md:top-0 md:h-screen
```

---

## 7. NAVIGATION BEHAVIOR

### Navbar

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Fixed top, full width, inner content constrained to `max-w-[1680px] mx-auto` |
| Desktop | Same, but `px-14 xl:px-20` |

Navbar height: `72px` (token `spacing-18 = 72px`, already defined). No change.

### NavMenu Panel (Flyout)

The panel must never exceed the viewport width (Issue G-03):

```
w-[calc(100vw-32px)] sm:w-[300px] md:w-[320px]
```

- Always positioned `right-4 top-4`
- `sm:right-8 sm:top-8` for larger screens

### Dock Bar

**Width constraint** (Issue G-01 — Critical):

| Breakpoint | "Discover more" button | Behavior |
|------------|----------------------|----------|
| Mobile (default) | `w-[52px]` icon-only | Collapses to icon to free scrollable width |
| `md` | `w-[160px]` | Short label |
| `lg`+ | `w-[250px]` | Full label |

**Max-width** (Issue G-02):
```
max-w-[1680px] mx-auto
```

**Dock items** — touch target minimum (Issue A-03):
```
min-h-[48px] touch-manipulation
```

**Dock items spacing:** `gap-10 lg:gap-14` (replaces `justify-between` which spreads items too far at 2560px)

---

## 8. CARD BEHAVIOR

### Inner Padding

Cards must scale padding for mobile. Fixed `p-10` on mobile (40px per side) is forbidden on narrow viewports (Issue I-02):

```
p-6 md:p-8 lg:p-10
```

For large showcase cards (e.g., Aryavarta Heritage Foundation):
```
p-6 md:p-10 lg:p-14
```

### Card Aspect Ratios

| Card type | Mobile | Tablet (md) | Desktop (lg+) |
|-----------|--------|-------------|---------------|
| Enterprise leadership | `aspect-[4/3]` | `aspect-[16/9]` | `aspect-[4/3]` |
| Media / gallery | `aspect-[3/4]` | `aspect-[3/4]` | `aspect-[3/4]` |
| Service card | `aspect-auto` | `aspect-auto` | `aspect-auto` |

### Decorative Numbers on Cards

Decorative ghost numbers must scale down on mobile (Issue I-01):

```css
font-size: clamp(36px, 4vw, 56px);
```

Or positioned absolutely (`absolute top-4 right-4`) to remove from flex flow.

### Card Border Radius

```
rounded-2xl md:rounded-3xl lg:rounded-[32px]
```

---

## 9. GRID BEHAVIOR

All grids follow a mobile-first column progression. Gaps between breakpoints must never jump from 1→4 columns (Issue L-03 skipped `md` and `lg` entirely).

### Standard Content Grid

```
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

### Enterprise Leadership Cards

```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```
Moves from `xl` to `lg` to reduce the "2 tall cards on tablet" problem (Issue L-03).

### Service Cards

```
grid-cols-1 sm:grid-cols-2 md:grid-cols-3
```
Issue I-04: currently stays 2-col on 768px.

### Media Gallery (Moments)

Middle and bottom rows:
```
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```
Issue M-05: currently jumps from 2→4 with no `md:` step.

### Row-based Data Grids

#### RowMilestone (Journey page)
- Mobile: `grid-cols-[36px_1fr]` — period moves inside text column as secondary line
- `md`+: `grid-cols-[40px_1fr_160px]`

#### ChamberRow (Leadership page)
- Mobile: `grid-cols-[1fr_auto]` — icon + badge + title stack vertically in `1fr`; period in `auto` column
- `md`+: `grid-cols-[28px_80px_1fr_auto]`

Issues J-03, L-04.

### Languages Grid (Media page)

```
grid-cols-1 sm:grid-cols-2
```
Issue M-04: current `grid-cols-2` overflows at 360px.

### Grid Gaps

| Context | Gap |
|---------|-----|
| Card grids | `gap-4 md:gap-6 lg:gap-8` |
| Row data grids | `gap-x-3 md:gap-x-5` |
| Word cloud (Discover More) | Wrap compound phrases in `<div>` to prevent orphan `&` words (Issue D-04) |

---

## 10. ANIMATION BEHAVIOR

### Entry Animation Delays

Long entry delays (up to 1.92s) feel like loading failures on mobile (Issue A-02).

| Element | Mobile delay | Desktop delay |
|---------|-------------|---------------|
| Navbar | `0s` | `0s` |
| Hero label / section number | `0.1s` | `0.2s` |
| Hero H1 | `0.2s` | `0.42s` |
| Hero subtext | `0.3s` | `0.6s` |
| Hero CTA / stats | `0.4s` | `0.84s` |

**Implementation rule:** Detect mobile at runtime and use halved delays. Use `window.matchMedia('(max-width: 767px)').matches` or a hook.

### Mouse-move Parallax

Mouse-move listeners (`window.mousemove`) must not fire on touch devices (Issue A-01). Guard all `mousemove` useEffects with:

```js
if (!window.matchMedia('(hover: hover)').matches) return;
```

Affected components: `HeroImage`, `JourneyImage`, `LeadershipImage`, `MediaImage`, `BackgroundText`, `Quote`, `BgWatermark`.

### Touch Interactions

- All draggable / scrollable containers: `touch-action: pan-x` or `touch-action: pan-y` as appropriate
- 3D canvas elements (BooksShowcase): `touch-action: none`
- All interactive Dock items: `touch-manipulation` class

### `prefers-reduced-motion`

All Framer Motion variants should respect:

```js
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## 11. MOBILE COMPOSITION (0 – 767px)

This is the authoritative layout contract for all pages on mobile viewports.

### Layout principles
- Single column, stacked vertically, full width
- Gutters: `px-4 sm:px-6`
- Images: always present — either foreground in-flow or background at low opacity
- Sticky/parallax effects: disabled
- Animations: entry delays halved; mouse-move parallax off

### Navbar
- Fixed top, `h-[72px]`, full-bleed
- Inner: `max-w-[1680px] mx-auto px-4 sm:px-6`

### Dock
- Pinned bottom, full-bleed
- "Discover more" button: `w-[52px]` icon-only
- Dock scroll area: remaining full width
- Touch targets: `min-h-[48px]`

### NavMenu panel
- `w-[calc(100vw-32px)]` — 16px margin each side
- `right-4 top-4`

### Hero sections
- Layout: `flex-col` (not `contents`, not grid)
- Portrait: in-flow above text, `h-[420px] sm:h-[480px] w-full object-cover`
- Text block: `pt-8 sm:pt-10` (not `mt-28`)
- H1: `clamp(38px, 8vw, 140px)` — must not overflow within gutter-constrained width
- Subtitle: `text-[15px] sm:text-[16px]`
- Background watermark: `clamp(48px, 14vw, 270px)`, `left` must be vw-based

### Section spacing
- Standard: `py-16`
- Dramatic: `py-20`
- Sections with `h-screen` but no image: `min-h-[auto] py-20`

### Cards
- 1 column
- `p-6`, `rounded-2xl`

### Data rows (Milestone, ChamberRow)
- 2-column simplified grid
- Period / date moved to secondary line within text column

### Quote component
- In-flow below text (not absolutely positioned)
- `w-full px-4`

### Watermark / BgWatermark
- Present but scaled down (`clamp` floor ≤ 50px)
- `overflow-x: hidden` on `body` (already set)
- Must not clip mid-glyph at 360px

---

## 12. TABLET COMPOSITION (768px – 1023px)

### Layout principles
- Transition from single-column to two-column where editorial layout demands it
- Grid steps: 1→2 columns (never jump from 1→3 or 1→4)
- Gutters: `px-10`
- Portrait images: visible (either in-flow or right-column)
- Sticky scroll: permitted, but only when a portrait is visible in the right column

### Navbar
- Full-bleed, inner constrained with `max-w-[1680px] px-10`

### Dock
- "Discover more" button: `w-[160px]`
- Dock scroll area: remaining width
- Items: `gap-6`

### NavMenu panel
- `w-[300px] right-8 top-8`

### Hero sections
- Use `sm:` intermediate step (640px) where portrait shifts to right side using `grid`
- At 768px: 2-column grid, portrait right, text left
- Avoid instant `flex-col` → `contents` reflow (Issue H-05)
- Portrait: `md:h-[82%]` of hero height, right-aligned
- Quote: `md:bg-bg/80 md:backdrop-blur-sm md:rounded-xl md:p-4` — always has a background at tablet

### Section spacing
- Standard: `md:py-24`
- Dramatic: `md:py-32`

### Cards
- 2 columns, `gap-6`
- Enterprise leadership: 2 columns `aspect-[16/9]`
- Service cards: 3 columns `md:grid-cols-3`

### Data rows
- Milestone: `md:grid-cols-[40px_1fr_160px]`
- ChamberRow: `md:grid-cols-[28px_80px_1fr_auto]`

### Gallery
- `md:grid-cols-3`

### ManBehindWork (Discover More)
- Portrait column: `md:block` (shown in right column at tablet)
- Sticky scroll: `md:sticky md:top-0 md:h-screen`

---

## 13. DESKTOP COMPOSITION (1024px+)

### Layout principles
- Full editorial layout with side-by-side portrait + text columns
- Gutters: `px-14 xl:px-20`
- All images visible in designed positions
- All parallax, sticky scroll, and mouse-move effects active
- Max-width constraint: `max-w-[1680px] mx-auto` on all containers

### Navbar
- `px-14 xl:px-20`, inner `max-w-[1680px] mx-auto`

### Dock
- `max-w-[1680px] mx-auto`
- "Discover more" button: `lg:w-[250px]`
- Items: `gap-10 lg:gap-14` (not `justify-between`)

### Hero sections
- Full 2-column layout (text left, portrait right)
- Portrait: `lg:w-[70%]` of hero, `md:absolute md:bottom-0 md:right-[-2%]`
- H1: `clamp(38px, 8vw, 140px)`; at 2560px ceiling = `140px`
- Text column: `lg:max-w-[580px] 2xl:max-w-[680px]`
- Hero height: `min-h-screen` or `min-h-[calc(100svh-72px)]` + `max-h-[1080px]` (Issue J-05)

### Section spacing
- Standard: `lg:py-32`
- Dramatic: `lg:py-44`

### Cards
- Enterprise leadership: 4 columns `lg:grid-cols-4`, `aspect-[4/3]`
- Service: 3 columns `md:grid-cols-3`
- Gallery: 4 columns `lg:grid-cols-4`

### Data rows
- Milestone: `md:grid-cols-[40px_1fr_160px]`
- ChamberRow: `md:grid-cols-[28px_80px_1fr_auto]`

### Background watermark (ultrawide 1920px+)
- `opacity: 0.025` (down from `0.04`) to avoid dominance at 2560px (Issue L-05, M-03)
- Implement via `@media (min-width: 1920px)` in CSS

### Mouse-move parallax
- Active on all pointer-capable devices
- Guard: `window.matchMedia('(hover: hover)').matches`

---

## APPENDIX A — DESIGN TOKEN REFERENCE

Existing tokens from `tailwind.config.js` — no changes proposed:

| Token | Value |
|-------|-------|
| `bg` | `#F5F2ED` (cream) |
| `ink` | `#111111` (near-black) |
| `accent` | `#E45A49` (red) |
| `brand` | `#2d7a3a` (green) |
| `secondary` | `#5E5E5E` (grey) |
| `border` | `rgba(0,0,0,.08)` |
| `glass` | `rgba(255,255,255,.65)` |
| `font-serif` | Cormorant Garamond |
| `font-sans` | DM Sans |
| `rounded-hero` | 40px |
| `rounded-dock` | 32px |
| `rounded-pill` | 999px |
| `max-w-container` | 1680px |
| `shadow-soft` | `0 10px 25px rgba(0,0,0,.04)` |

---

## APPENDIX B — ISSUE CROSS-REFERENCE

| System Rule | Resolves Audit Issues |
|-------------|----------------------|
| Gutter scale standardised | G-05 |
| Max-width container added | G-02, G-04 |
| NavMenu panel width | G-03 |
| Dock button collapse | G-01 |
| Dock max-width + gap | G-02 |
| Hero H1 clamp floor lowered | D-03 |
| Hero H1 clamp ceiling raised | H-03, D-02 |
| Watermark clamp floor lowered | H-04, J-02 |
| Background image fallback rule | J-01, M-01, D-01 |
| Portrait min-height raised | H-01 |
| Quote backdrop at tablet | H-02 |
| Hero mt-28 removed on mobile | L-01 |
| Section py scale | S-01, D-06 |
| h-screen gating on image | S-02 |
| Milestone grid collapse | J-03 |
| ChamberRow grid collapse | L-04 |
| Language grid 1-col mobile | M-04 |
| Enterprise card aspect ratio | L-03 |
| Service grid md step | I-04 |
| Gallery grid md step | M-05 |
| Card padding scale | I-02 |
| Decorative number clamp | I-01 |
| Word cloud compound grouping | D-04 |
| Parallax column hidden fix | D-05 |
| Navbar clearance (pt-[72px]) | M-02 |
| Mouse-move guard | A-01 |
| Animation delay halving | A-02 |
| Touch targets min-h-48px | A-03 |
| lining-nums CSS rule | T-01 |
| Italic leading-[0.96] min | T-02 |
| whitespace-nowrap removed | L-02 |
| Watermark opacity at 1920px | L-05, M-03 |
| Hero text column 2xl max-w | H-03, J-05 |

---

*Ready for implementation. Apply rules by component in the order: global tokens → layout containers → navigation → hero sections → content sections → cards → data rows → animations.*
