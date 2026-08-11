# RESPONSIVE AUDIT — Dr. Sanjay Goel Website
### Senior UI/UX & Responsive Design Review
**Audited:** 2026-08-11  
**Method:** Full source-code analysis across all breakpoints (browser CDP unavailable; conducted via component-level static analysis of all JSX, CSS classes, and Tailwind breakpoint logic)  
**Stack:** React + Vite + Tailwind CSS v3 + Framer Motion  
**Breakpoints in use:** `sm 640px` · `md 768px` · `lg 1024px` · `xl 1280px`

---

## VIEWPORT CATEGORY MAP

| # | Category | Width | Height | Tailwind Tier |
|---|----------|-------|--------|---------------|
| 1 | Large Desktop | 2560px | 1440px | xl+ |
| 2 | Standard Desktop | 1920px | 1080px | xl |
| 3 | Laptop | 1440px | 900px | xl |
| 4 | Small Laptop | 1280px | 800px | xl |
| 5 | Tablet | 768px | 1024px | md |
| 6 | Large Mobile | 430px | 932px | < sm |
| 7 | Standard Mobile | 390px | 844px | < sm |
| 8 | Small Mobile | 360px | 780px | < sm |

---

## GLOBAL ISSUES (affect every page)

---

### ISSUE G-01
**PAGE:** All pages  
**VIEWPORT:** All mobiles (360–430px) and Tablet (768px)  
**PROBLEM:** Dock bar — "Discover more" button takes up too much width on narrow viewports  
**WHY IT LOOKS WRONG:**  
The Dock's left section is a fixed `w-[250px]` dark button. On a 360px screen the button alone is **69% of the total width**, leaving only ~76px for the scrollable dock links (4 items). Each dock item is a 48px avatar + label + "View ↗" text needing ~130px. Scrolling 4 items in 76px creates an almost invisible UX. No scroll affordance is visible (scrollbar hidden via `.scrollbar-hide`). At 430px, remaining width is ~116px — still far too small.  
**CURRENT IMPLEMENTATION:**  
```jsx
// Dock.jsx L49
className="flex w-[250px] shrink-0 cursor-pointer items-center justify-between bg-ink px-8 font-sans text-white"
// L58
className="scrollbar-hide flex min-w-0 flex-1 items-center justify-between gap-[14px] overflow-x-auto px-6 py-[6px] lg:px-10"
```
**RECOMMENDED SOLUTION:**  
- At `< md`: Reduce button to `w-[160px]` or collapse to icon-only `w-[52px]`  
- Or: Stack Dock into two rows below `md` — top row = "Discover more", bottom row = 4 nav items spread equally  
- Or: Replace Dock with a minimal bottom tab bar on mobile  
**PRIORITY:** 🔴 Critical

---

### ISSUE G-02
**PAGE:** All pages  
**VIEWPORT:** Large Desktop (2560px), Standard Desktop (1920px)  
**PROBLEM:** Dock bar spans edge-to-edge with no max-width, causing extreme horizontal stretch  
**WHY IT LOOKS WRONG:**  
`mx-4 mb-4 md:mx-8 md:mb-8 lg:mx-14` — at 2560px the Dock is ~2503px wide. `justify-between` spaces 4 dock items so far apart they look isolated. The "Discover more" button stays 250px while the content area balloons to ~2200px+.  
**CURRENT IMPLEMENTATION:** No `max-width` on the Dock container.  
**RECOMMENDED SOLUTION:**  
Add `max-w-[1680px] mx-auto` to the Dock's outer wrapper. Switch inner items from `justify-between` to `gap-10 lg:gap-14`.  
**PRIORITY:** 🟡 Medium

---

### ISSUE G-03
**PAGE:** All pages  
**VIEWPORT:** Small Mobile (360px), Standard Mobile (390px)  
**PROBLEM:** NavMenu panel overflows the mobile viewport  
**WHY IT LOOKS WRONG:**  
Panel is `right-4 top-4 w-[300px]`. On 360px: `300px + 4px right = 304px` of right-aligned content, leaving only 56px left gap. The panel reads as a flat sheet rather than a floating card.  
**CURRENT IMPLEMENTATION:**  
```jsx
// NavMenu.jsx L99
className="fixed right-4 top-4 z-[58] w-[300px] ... md:right-8 md:top-8 md:w-[320px]"
```
**RECOMMENDED SOLUTION:**  
`w-[calc(100vw-32px)] sm:w-[300px]` — the panel never exceeds viewport minus 16px per side.  
**PRIORITY:** 🟠 High

---

### ISSUE G-04
**PAGE:** All pages  
**VIEWPORT:** Large Desktop (2560px)  
**PROBLEM:** NavMenu button and GTC GROUP brand have no max-width — extreme span on huge screens  
**WHY IT LOOKS WRONG:**  
Brand at `px-8 md:px-14` from left; NavMenu button at `right-8 md:right-14` from right. At 2560px they span almost the full width between them. The header reads as a banner bar stretched impossibly wide.  
**CURRENT IMPLEMENTATION:** `Navbar.jsx L12`: `px-8 md:px-14` (no container constraint)  
**RECOMMENDED SOLUTION:**  
Wrap both in a `max-w-[1680px] mx-auto` container so at 2560px they're anchored to the design grid.  
**PRIORITY:** 🟡 Medium

---

### ISSUE G-05
**PAGE:** All pages  
**VIEWPORT:** Standard Mobile (390px), Small Mobile (360px)  
**PROBLEM:** Horizontal padding inconsistency — sections use `px-6` but hero containers use `pl-6 md:pl-20`, creating mismatched left margins  
**WHY IT LOOKS WRONG:**  
At tablet breakpoint (768px), hero containers shift to `pl-20 = 80px` but adjacent content sections still use `px-14 = 56px`. The margin difference is jarring.  
**RECOMMENDED SOLUTION:** Standardise on a spacing scale: `px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20` used consistently across all sections and hero containers.  
**PRIORITY:** 🟡 Medium

---

## PAGE: HOME (`/`)

---

### ISSUE H-01
**PAGE:** Home  
**VIEWPORT:** Small Mobile (360px), Standard Mobile (390px), Large Mobile (430px)  
**PROBLEM:** Hero portrait image is only `h-[300px]` on mobile — severely crops the subject  
**WHY IT LOOKS WRONG:**  
At 300px height on a 390px-wide screen, the portrait is compressed into a shallow strip. `object-contain object-bottom` shows the subject but tiny, weakening the hero's editorial impact.  
**CURRENT IMPLEMENTATION:**  
```jsx
// HeroImage.jsx L53
className="relative h-[300px] w-full sm:h-[380px] md:absolute md:bottom-0 md:right-[-2%] ..."
```
**RECOMMENDED SOLUTION:**  
Increase mobile portrait height: `h-[420px] sm:h-[480px]`. Or switch to full-bleed portrait with translucent text overlay on mobile.  
**PRIORITY:** 🟠 High

---

### ISSUE H-02
**PAGE:** Home  
**VIEWPORT:** Tablet (768px)  
**PROBLEM:** Quote component at `md:` becomes `absolute md:right-[-1%] md:top-[30%]` overlapping the portrait mid-body  
**WHY IT LOOKS WRONG:**  
At 768px the portrait is `md:h-[82%]` and `md:w-[62%]`. The Quote box sits at `top: 30%` over the portrait image with no background, making both illegible.  
**CURRENT IMPLEMENTATION:**  
```jsx
// Quote.jsx L27
className="mt-8 w-full px-6 text-left md:absolute md:right-[-1%] md:top-[30%] md:z-20 md:mt-0 md:w-[200px] md:px-0 ..."
```
**RECOMMENDED SOLUTION:**  
Add `md:bg-bg/80 md:backdrop-blur-sm md:rounded-xl md:p-4` to the Quote wrapper. Push `md:top-[55%]` where portrait fades out via the bottom gradient mask.  
**PRIORITY:** 🟠 High

---

### ISSUE H-03
**PAGE:** Home  
**VIEWPORT:** Large Desktop (2560px)  
**PROBLEM:** Hero h1 hits clamp ceiling (108–138px); portrait takes 70% width — massive dead space in left column  
**WHY IT LOOKS WRONG:**  
At 2560px the portrait spans `lg:w-[70%]` = ~1792px. Left column gets ~768px but text max-width is `lg:max-w-[580px]`. ~188px dead horizontal space right of the text. Min-height is `h-screen = 1440px` which exaggerates vertical emptiness.  
**RECOMMENDED SOLUTION:**  
Raise clamp ceiling: `clamp(52px, 6vw, 140px)`. Add `2xl:max-w-[680px]` to text column.  
**PRIORITY:** 🟡 Medium

---

### ISSUE H-04
**PAGE:** Home  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** BackgroundText watermark ("Dr. Sanjay / Goel") overflows horizontally on small screens  
**WHY IT LOOKS WRONG:**  
`fontSize: clamp(80px, 18vw, 270px)` with `left: 25%`. On 360px: floor kicks in at 80px. "Dr. Sanjay" at 80px Cormorant ≈ 400px wide. Starting at `left: 25%` = 90px, it extends to 490px — **130px past the right edge**. The glyph is chopped mid-letter, looking broken not decorative.  
**CURRENT IMPLEMENTATION:**  
```jsx
// BackgroundText.jsx L28
fontSize: 'clamp(80px, 18vw, 270px)', left: '25%'
```
**RECOMMENDED SOLUTION:**  
`clamp(48px, 14vw, 270px)`. At 360px: `14vw = 50.4px → floor 48px`. "Dr. Sanjay" at 48px ≈ 240px wide — comfortably within 360px.  
**PRIORITY:** 🟡 Medium

---

### ISSUE H-05
**PAGE:** Home  
**VIEWPORT:** Tablet (768px)  
**PROBLEM:** Hero layout switches from `flex-col` to `md:contents` at 768px — abrupt multi-element reflow  
**WHY IT LOOKS WRONG:**  
`Hero.jsx L34`: The hero goes from a vertical stack to CSS `contents`, which instantly activates absolute positioning on the portrait and repositions the text. Portrait jumps right, text jumps left, Quote appears floating — instantaneous layout shift with no smooth transition.  
**RECOMMENDED SOLUTION:**  
Add a 640px (`sm:`) intermediate layout where the portrait goes right at `sm:w-[50%]` using grid, so the shift is gradual and not jarring.  
**PRIORITY:** 🟡 Medium

---

### ISSUE H-06
**PAGE:** Home  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** HeroContent text block has only `py-4 = 16px` above the "01" label — insufficient separation from portrait above  
**WHY IT LOOKS WRONG:**  
16px between a 300px portrait and the giant h1 headline makes the portrait and text look fused into one merged block.  
**RECOMMENDED SOLUTION:**  
`pt-8 sm:pt-10` for the HeroContent wrapper on mobile.  
**PRIORITY:** 🟡 Medium

---

### ISSUE H-07
**PAGE:** Home  
**VIEWPORT:** All mobiles  
**PROBLEM:** HeroContent subtitle is fixed `text-[18px]` — no responsive scaling down on small screens  
**CURRENT IMPLEMENTATION:** `HeroContent.jsx L38`: `font-sans text-[18px] leading-[1.6]`  
**RECOMMENDED SOLUTION:** `text-[15px] sm:text-[16px] md:text-[18px]`  
**PRIORITY:** 🟢 Low

---

## PAGE: DISCOVER MORE (`/discover-more`)

---

### ISSUE D-01
**PAGE:** Discover More  
**VIEWPORT:** All mobiles (360–430px), Tablet (768px), Small Laptop (1024px)  
**PROBLEM:** ManBehindWork section — right portrait column is `hidden lg:block`, leaving a sticky `h-screen` section completely image-free below `lg`  
**WHY IT LOOKS WRONG:**  
Below `lg = 1024px` (all mobiles, tablets, and 768–1023px laptops), the right portrait column disappears. The `sticky top-0 h-screen` section shows only the left text column floating on a blank right half. A cinematic sticky scroll with no visual anchor is just a tall text block.  
**CURRENT IMPLEMENTATION:**  
```jsx
// DiscoverMore.jsx L258
<div className="absolute inset-0 grid lg:grid-cols-2">
  <div className="...">...</div>
  <div className="relative hidden lg:block overflow-hidden">...</div>
```
**RECOMMENDED SOLUTION:**  
- `md`: Show a compressed portrait in the right half (`md:block lg:block`)  
- Mobile: Show a faint full-bleed background portrait at `opacity-[0.12]` with gradient overlay  
- Remove sticky behavior on mobile since it has no visual payoff without the parallax image  
**PRIORITY:** 🟠 High

---

### ISSUE D-02
**PAGE:** Discover More  
**VIEWPORT:** Large Desktop (2560px), Standard Desktop (1920px)  
**PROBLEM:** Hero h1 `clamp(46px, 8vw, 118px)` capped at 118px — feels undersized on ultrawide within 840px container  
**WHY IT LOOKS WRONG:**  
At 2560px, `8vw = 204px` but is capped at 118px. The three-line headline fills ~60% of the 840px column. Excessive whitespace above/below makes the page feel half-finished.  
**RECOMMENDED SOLUTION:**  
Raise ceiling: `clamp(46px, 8vw, 160px)`.  
**PRIORITY:** 🟡 Medium

---

### ISSUE D-03
**PAGE:** Discover More  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** Hero h1 at clamp floor 46px — "One continuing journey." is ~94% of 360px viewport width  
**WHY IT LOOKS WRONG:**  
On 360px with `px-6 = 24px` padding, available width is 312px. "One continuing journey." at 46px Cormorant with `tracking-[-3px]` measures ~340px — **overflows or sits flush to the right edge with zero margin**.  
**RECOMMENDED SOLUTION:**  
Lower the minimum: `clamp(38px, 8vw, 118px)`. Or add `<br className="md:hidden" />` after "journey." to force a wrap.  
**PRIORITY:** 🟠 High

---

### ISSUE D-04
**PAGE:** Discover More  
**VIEWPORT:** All viewports (most visible on mobile)  
**PROBLEM:** Ideas & Perspectives word cloud — orphan "& Logistics", "& Culture", "& Sustainability" words wrap to their own lines disconnected from parent words  
**WHY IT LOOKS WRONG:**  
Free `flex-wrap` allows "Supply Chain" (xl size, ~350px at 44px) to fill a row while "& Logistics" (md size, ~96px at 24px) wraps to the next — appearing as a standalone fragment. Creates hierarchy confusion between what's a compound phrase and what's a standalone idea.  
**CURRENT IMPLEMENTATION:**  
```jsx
// DiscoverMore.jsx L366
className="flex flex-wrap items-baseline gap-x-4 gap-y-3"
```
**RECOMMENDED SOLUTION:**  
Wrap compound phrases in div containers: `<div className="flex items-baseline gap-3"><Word>Supply Chain</Word><Word>& Logistics</Word></div>` so they always wrap together.  
**PRIORITY:** 🟠 High

---

### ISSUE D-05
**PAGE:** Discover More  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** LifeOfContribution section — absolute parallax portrait `w-[52%]` encroaches on mobile text area  
**WHY IT LOOKS WRONG:**  
At 360px, 52% width = 187px portrait panel. The left text column gets the remaining 48% = 173px. With `px-6 = 24px` padding, the actual text area is 173px — barely enough for 15px body text. The scroll-driven opacity may also fail if the section is fully above the fold on short mobile screens.  
**CURRENT IMPLEMENTATION:**  
```jsx
// DiscoverMore.jsx L531
className="pointer-events-none absolute right-0 top-0 h-full w-[52%]"
```
**RECOMMENDED SOLUTION:**  
`hidden md:block` on the parallax portrait for mobile. On mobile, show a simple full-bleed background portrait at `opacity-[0.10]` via a separate element.  
**PRIORITY:** 🟠 High

---

### ISSUE D-06
**PAGE:** Discover More  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** ClosingCTA section has `pb-44 pt-40` = 336px of vertical padding — 40% of a mobile viewport's height  
**WHY IT LOOKS WRONG:**  
On an 844px screen, 160px top padding + 176px bottom padding = 336px of whitespace before/after the actual content. The first headline word doesn't appear until ~200px down the viewport.  
**RECOMMENDED SOLUTION:**  
Scale for mobile: `pt-24 pb-20 md:pt-40 md:pb-44`.  
**PRIORITY:** 🟠 High

---

### ISSUE D-07
**PAGE:** Discover More — Archive Modal  
**VIEWPORT:** All mobiles (360–430px), Tablet (768px)  
**PROBLEM:** BooksShowcase WebGL/Three.js canvas inside Archive Modal — mobile responsiveness untested  
**WHY IT LOOKS WRONG:**  
The BooksShowcase component uses Three.js rendering. If canvas dimensions are hardcoded or computed on mount without resize listeners, the modal will not scale correctly on mobile. Touch interactions for 3D book browsing may also be non-functional.  
**RECOMMENDED SOLUTION:**  
Audit `BooksShowcase.tsx` for fixed canvas dimensions. Ensure Three.js renderer calls `renderer.setSize(container.clientWidth, container.clientHeight)` and listens to `ResizeObserver`. Add `touch-action: none` to the canvas for touch drag parity with mouse.  
**PRIORITY:** 🟡 Medium

---

## PAGE: JOURNEY (`/journey`)

---

### ISSUE J-01
**PAGE:** Journey  
**VIEWPORT:** All mobiles (360–430px), Tablet (768px)  
**PROBLEM:** Journey hero has NO portrait image on mobile — `JourneyImage` is `hidden md:block`. The hero is a full-viewport text-only block.  
**WHY IT LOOKS WRONG:**  
```jsx
// Journey.jsx L255
className="absolute bottom-0 right-0 z-0 hidden md:block ..."
```
The `min-h-[calc(100svh-72px)]` hero section at 844px height shows only: Back link + "03" + "The Journey" h1 + accent line + paragraph + 3 stat pills — floating on empty cream. No visual anchor, no editorial presence.  
**RECOMMENDED SOLUTION:**  
Add mobile portrait: a full-bleed background image at `opacity-[0.15]` visible only on `< md`. Or show a portrait thumbnail circle beside the "03" pill.  
**PRIORITY:** 🟠 High

---

### ISSUE J-02
**PAGE:** Journey  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** BgWatermark "Journey" at `clamp(70px, 16vw, 250px)` — 70px floor causes overflow on 360–430px  
**WHY IT LOOKS WRONG:**  
On 360px: `16vw = 57.6px → floor 70px`. "Journey" at 70px Cormorant ≈ 380px wide. At `left: 3%` = 11px, extends to 391px on a 360px screen — **31px of overflow**, clipped mid-glyph. Looks broken, not decorative.  
**RECOMMENDED SOLUTION:**  
`clamp(48px, 14vw, 250px)`. At 360px: `14vw → floor 48px`. "Journey" at 48px ≈ 260px — contained within 360px.  
**PRIORITY:** 🟡 Medium

---

### ISSUE J-03
**PAGE:** Journey  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** RowMilestone 3-column grid `[36px_1fr_auto]` on mobile — the `1fr` text column is squeezed aggressively  
**WHY IT LOOKS WRONG:**  
On 360px with `px-6`: available = 312px. `36px icon + 5px gap + period(~80px) + 5px gap = 126px fixed`. Text column gets 186px. Long org names like "St. Xavier's College, Calcutta" at 14px wrap to 3–4 lines in 186px, making rows very tall.  
**RECOMMENDED SOLUTION:**  
Below `md:`, move the period inside the text column as a secondary line. Use `grid-cols-[36px_1fr] md:grid-cols-[40px_1fr_160px]`.  
**PRIORITY:** 🟡 Medium

---

### ISSUE J-04
**PAGE:** Journey  
**VIEWPORT:** Small Mobile (360px), Standard Mobile (390px)  
**PROBLEM:** Hero description paragraph at `text-[17px]` on 312px width creates 10+ wrapped lines, pushing stat pills far below the fold  
**CURRENT IMPLEMENTATION:** `Journey.jsx L352`: `text-[17px] leading-[28px]`  
**RECOMMENDED SOLUTION:** `text-[15px] md:text-[17px]`. Consider capping at 3 lines with a toggle.  
**PRIORITY:** 🟡 Medium

---

### ISSUE J-05
**PAGE:** Journey  
**VIEWPORT:** Large Desktop (2560px)  
**PROBLEM:** Journey hero text column `lg:max-w-[560px]` on a 2560×1440px canvas — enormous dead space  
**RECOMMENDED SOLUTION:**  
Add `2xl:max-w-[680px]`. Cap hero height: `max-h-[1080px]` so 1440px screens don't show excessive vertical void.  
**PRIORITY:** 🟡 Medium

---

## PAGE: LEADERSHIP (`/leadership`)

---

### ISSUE L-01
**PAGE:** Leadership  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** Leadership hero text block has `mt-28 = 112px` top margin — designed for desktop (clears navbar when image is absolute), but on mobile the image is in-flow, making this margin wasteful  
**WHY IT LOOKS WRONG:**  
On mobile: `LeadershipImage h-[340px]` + `mt-28 (112px)` + content = 452px+ before any readable text appears on a 844px screen. The stat pills and Back link are pushed below the fold.  
**CURRENT IMPLEMENTATION:**  
```jsx
// Leadership.jsx L296
className="mb-8 mt-28 md:mt-32"
```
**RECOMMENDED SOLUTION:**  
`mt-6 md:mt-28 lg:mt-32`.  
**PRIORITY:** 🟠 High

---

### ISSUE L-02
**PAGE:** Leadership  
**VIEWPORT:** All mobiles, Tablet  
**PROBLEM:** Leadership h1 has `whitespace-nowrap` — adds fragile overflow risk without any practical benefit  
**WHY IT LOOKS WRONG:**  
"Leadership" is a single word that won't wrap anyway. `whitespace-nowrap` only adds risk: if font metrics differ slightly (heavier optical size, different fallback), the word could overflow without the browser having a break opportunity.  
**CURRENT IMPLEMENTATION:** `Leadership.jsx L316`: `className="mt-2 whitespace-nowrap font-serif ..."`  
**RECOMMENDED SOLUTION:** Remove `whitespace-nowrap` entirely.  
**PRIORITY:** 🟡 Medium

---

### ISSUE L-03
**PAGE:** Leadership  
**VIEWPORT:** Tablet (768px)  
**PROBLEM:** Enterprise Leadership card grid `sm:grid-cols-2 xl:grid-cols-4` — at 768px shows 2×2 grid of `aspect-[4/3]` cards ≈ 960px of card height alone  
**WHY IT LOOKS WRONG:**  
With no intermediate `md:` step between 2 and 4 columns, the 768px tablet shows 4 tall cards in a 2-column layout that is disproportionately heavy compared to the clean 4-column desktop layout.  
**RECOMMENDED SOLUTION:**  
`sm:grid-cols-2 lg:grid-cols-4` (move to `lg` instead of `xl`). Or use `aspect-[16/9]` cards at `md:`: `aspect-[4/3] md:aspect-[16/9] xl:aspect-[4/3]`.  
**PRIORITY:** 🟡 Medium

---

### ISSUE L-04
**PAGE:** Leadership  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** ChamberRow 4-column grid `[28px_80px_1fr_auto]` on mobile — text column is squeezed to ~170px  
**WHY IT LOOKS WRONG:**  
Fixed cols consume: `28 + 5 + 80 + 5 + ~72(period) = 190px`. On 360px with 48px padding, text column gets `360 - 48 - 190 = 122px`. "Co-Chairman, Supply Chain & Logistics Committee" wraps extremely aggressively at 18px in 122px.  
**CURRENT IMPLEMENTATION:**  
```jsx
// Leadership.jsx L481
className="grid grid-cols-[28px_80px_1fr_auto] items-start gap-x-5 py-5 md:grid-cols-[32px_90px_1fr_140px]"
```
**RECOMMENDED SOLUTION:**  
Mobile: `grid-cols-[1fr_auto]` where the left column stacks icon, badge, and title vertically. Period goes in the auto column. `md:grid-cols-[28px_80px_1fr_auto]` restores the 4-column layout.  
**PRIORITY:** 🟠 High

---

### ISSUE L-05
**PAGE:** Leadership  
**VIEWPORT:** Large Desktop (2560px)  
**PROBLEM:** BgWatermark "Leadership" at `clamp(80px, 17vw, 280px)` ceiling 280px and `opacity: 0.04` — at 2560px the watermark becomes very visually dominant  
**RECOMMENDED SOLUTION:**  
Lower `opacity` to `0.025` above 1920px via a CSS variable or media query.  
**PRIORITY:** 🟢 Low

---

## PAGE: INITIATIVES (`/initiatives`)

---

### ISSUE I-01
**PAGE:** Initiatives  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** InitiativeCard decorative number `clamp(48px,6vw,72px)` — floors at 48px on mobile, sits right-aligned in a narrow card creating extreme top-row contrast  
**WHY IT LOOKS WRONG:**  
A 48px ghost number (opacity 0.10) with a 12px label on the left. `justify-between` on a ~260px inner width card spreads them maximally. The imbalance feels accidental on narrow screens.  
**RECOMMENDED SOLUTION:**  
`clamp(36px, 4vw, 56px)`. Or move the number to `absolute top-4 right-4` to remove it from the flex layout.  
**PRIORITY:** 🟡 Medium

---

### ISSUE I-02
**PAGE:** Initiatives  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** Aryavarta Heritage Foundation card has `p-10 = 40px` inner padding on mobile — combined with `rounded-[32px]`, the card's inner content area is only ~232px wide on 360px, forcing the "Aryavarta Heritage Foundation" headline to wrap to 3 lines at 36px  
**WHY IT LOOKS WRONG:**  
The card becomes 700–750px tall on mobile (text + 300px image + stats grid) — nearly full viewport height. Feels overwhelming rather than impactful.  
**RECOMMENDED SOLUTION:**  
`p-6 md:p-10 lg:p-14`. On mobile, show the image as a background at low opacity rather than in-flow, reducing total card height.  
**PRIORITY:** 🟡 Medium

---

### ISSUE I-03
**PAGE:** Initiatives  
**VIEWPORT:** All mobiles  
**PROBLEM:** Philosophy pull-quote (two full paragraphs of 17px italic) creates excessive scroll on mobile  
**RECOMMENDED SOLUTION:**  
Show only the first paragraph on mobile with a "Read more" toggle.  
**PRIORITY:** 🟢 Low

---

### ISSUE I-04
**PAGE:** Initiatives  
**VIEWPORT:** Tablet (768px)  
**PROBLEM:** ServiceCard grid `sm:grid-cols-2 lg:grid-cols-3` has no `md:` step — 768px stays at 2 columns  
**RECOMMENDED SOLUTION:**  
`sm:grid-cols-2 md:grid-cols-3` to show 3 columns from tablet upwards.  
**PRIORITY:** 🟢 Low

---

## PAGE: MEDIA (`/media`)

---

### ISSUE M-01
**PAGE:** Media  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** MediaHero is `h-screen` but the hero image is `hidden md:block` — mobile sees a full-viewport blank cream page with only text  
**WHY IT LOOKS WRONG:**  
```jsx
// MediaHero.jsx L69
className="absolute inset-0 z-0 hidden md:block"
// Media.jsx L157
<main className="relative z-20 -mt-[72px]">
```
No image, no pattern, no visual texture. The `h-screen` hero with nothing behind the text looks like an unfinished loading state.  
**RECOMMENDED SOLUTION:**  
Show a mobile portrait at low opacity visible only at `< md` via `md:hidden` in-flow above the text, or as a full-bleed background at `opacity-[0.15]`.  
**PRIORITY:** 🟠 High

---

### ISSUE M-02
**PAGE:** Media  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** `-mt-[72px]` on `<main>` pulls hero behind the navbar — Back home button and content may be obscured  
**WHY IT LOOKS WRONG:**  
The hero text `justify-center` vertical alignment is thrown off by the -72px offset. The Back home link (first interactive element) may appear partially under the fixed navbar.  
**CURRENT IMPLEMENTATION:**  
```jsx
// Media.jsx L157
<main className="relative z-20 -mt-[72px]">
// MediaHero text container: no top padding offset
```
**RECOMMENDED SOLUTION:**  
Add `pt-[72px] md:pt-0` inside the MediaHero text container to ensure content clears the navbar on mobile.  
**PRIORITY:** 🟠 High

---

### ISSUE M-03
**PAGE:** Media  
**VIEWPORT:** Large Desktop (2560px), Standard Desktop (1920px)  
**PROBLEM:** BgWatermark "Dr. Sanjay / Goel" at `left: 22%` on 2560px starts at 563px and extends ~1400px — well into the portrait image area  
**RECOMMENDED SOLUTION:**  
Use a vw-based `left` that scales with viewport, or add a CSS `max-width` to the watermark text container.  
**PRIORITY:** 🟢 Low

---

### ISSUE M-04
**PAGE:** Media  
**VIEWPORT:** Small Mobile (360px)  
**PROBLEM:** Languages section is `grid-cols-2 gap-x-12` — on 360px each column is only 132px. "Bihari languages" + "Full professional" level label with `shrink-0 ml-4` may overflow  
**WHY IT LOOKS WRONG:**  
`shrink-0` prevents the level label from compressing. "Full professional" at 11px + tracking ≈ 90px needs 90 + 16px margin = 106px in a 132px column, leaving only 26px for the language name — impossible for "Bihari languages."  
**RECOMMENDED SOLUTION:**  
`grid-cols-1 sm:grid-cols-2` — full width rows on mobile for clear readability.  
**PRIORITY:** 🟠 High

---

### ISSUE M-05
**PAGE:** Media  
**VIEWPORT:** Tablet (768px)  
**PROBLEM:** Moments gallery — middle and bottom rows are `sm:grid-cols-2 lg:grid-cols-3/4` — at 768px all remain 2-column. 10 photos in 2 columns = 5 rows of tall cards. Gallery section becomes extremely long.  
**RECOMMENDED SOLUTION:**  
Add `md:grid-cols-3` for middle and bottom rows: `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.  
**PRIORITY:** 🟡 Medium

---

## CROSS-PAGE: ANIMATIONS & PERFORMANCE

---

### ISSUE A-01
**PAGE:** All pages  
**VIEWPORT:** All mobiles  
**PROBLEM:** `window.mousemove` parallax listeners attached on all pages — no touch equivalent, wasteful on mobile  
**WHY IT LOOKS WRONG:**  
`HeroImage`, `JourneyImage`, `LeadershipImage`, `MediaImage`, `BackgroundText`, `Quote`, `BgWatermark` all add `mousemove` listeners. On touch devices these fire only during active touch (not hover). `ImageTrail` correctly checks `(hover: hover)` — other components don't.  
**RECOMMENDED SOLUTION:**  
Apply the same guard: `if (!window.matchMedia('(hover: hover)').matches) return` at the top of each `mousemove` useEffect.  
**PRIORITY:** 🟡 Medium

---

### ISSUE A-02
**PAGE:** All pages  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** Entry animations have delays up to 1.92s (navbar) and 0.84s (h1) — on slower mobile devices this feels like a broken page  
**WHY IT LOOKS WRONG:**  
`Navbar.jsx L11`: `delay: 1.92`. Combined with React hydration on a 3G connection, the page may be visually blank for 2–3 seconds. This is intentionally cinematic but on mobile reads as a loading failure.  
**RECOMMENDED SOLUTION:**  
Detect mobile at runtime and halve delays. At minimum: navbar should appear immediately (`delay: 0`) — only hero content elements should be delayed.  
**PRIORITY:** 🟠 High

---

### ISSUE A-03
**PAGE:** All pages  
**VIEWPORT:** All mobiles  
**PROBLEM:** Dock navigation item tap targets rely on content size with no minimum enforced  
**WHY IT LOOKS WRONG:**  
```jsx
// Dock.jsx L67
className="flex shrink-0 cursor-pointer items-center gap-[6px] whitespace-nowrap"
```
Tap area = content width (~130px) × height (~48px). Meets height minimum but gap between items is `gap-[14px]`, creating minimal dead zone between adjacent targets.  
**RECOMMENDED SOLUTION:**  
Add `min-h-[48px] min-w-[48px] touch-manipulation` to each Dock item wrapper.  
**PRIORITY:** 🟡 Medium

---

## CROSS-PAGE: TYPOGRAPHY

---

### ISSUE T-01
**PAGE:** All pages  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** Section numbers "01"–"05" use `lining-nums` Tailwind class — may not apply in all fallback font scenarios  
**RECOMMENDED SOLUTION:**  
Add explicit CSS: `font-variant-numeric: lining-nums` in `index.css` for `.font-serif` elements.  
**PRIORITY:** 🟢 Low

---

### ISSUE T-02
**PAGE:** Discover More, Leadership, Initiatives, Journey  
**VIEWPORT:** Small Mobile (360px)  
**PROBLEM:** `leading-[0.93]` (sub-1 line height) on serif italic headlines risks ascender/descender collision  
**WHY IT LOOKS WRONG:**  
"and responsibilities." in Cormorant Garamond italic at 36px with `leading-[0.93]` creates line spacing of only 33px. Descenders from "p" and ascenders of the next line's letters may visually overlap.  
**RECOMMENDED SOLUTION:**  
`leading-[0.96]` minimum for italic serif headlines on mobile.  
**PRIORITY:** 🟢 Low

---

## CROSS-PAGE: SECTION HEIGHTS & WHITESPACE

---

### ISSUE S-01
**PAGE:** Discover More, Leadership, Journey  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** Sections use desktop-scale `py-32`, `py-44`, `pb-44 pt-40` — excessive on mobile  
**WHY IT LOOKS WRONG:**  

| Section | Mobile Vertical Padding | % of 844px Screen |
|---------|------------------------|-------------------|
| DiscoverMore ClosingCTA | `pt-40 pb-44` = 336px | 39.8% |
| DiscoverMore LifeOfContribution | `py-44` = 176px × 2 = 352px | 41.7% |
| DiscoverMore PhotoArchive | `py-32` = 256px total | 30.3% |

**RECOMMENDED SOLUTION:**  
Apply a consistent mobile-first scaling pattern across all sections:
```
py-16 md:py-24 lg:py-32        (standard sections)
py-20 md:py-32 lg:py-44        (dramatic/CTA sections)
```
**PRIORITY:** 🟠 High

---

### ISSUE S-02
**PAGE:** Discover More (ManBehindWork), Leadership (Hero)  
**VIEWPORT:** All mobiles (360–430px)  
**PROBLEM:** `min-h-screen` / `h-screen` sections with no mobile image create 300–400px of empty cream  
**WHY IT LOOKS WRONG:**  
Without a hero image (hidden on mobile), a full-viewport-height section with 450–500px of content leaves 300–400px of dead space. The ManBehindWork `sticky h-screen` section traps mobile scroll in a blank right half.  
**RECOMMENDED SOLUTION:**  
`min-h-screen md:h-screen` only when a visual justifies the full height. On mobile: `min-h-[auto]` with generous `py-` padding.  
**PRIORITY:** 🟠 High

---

## PRIORITY SUMMARY TABLE

| ID | Issue | Page | Priority |
|----|-------|------|----------|
| G-01 | Dock button takes 69% mobile width | All | 🔴 Critical |
| G-03 | NavMenu panel overflows viewport on small mobile | All | 🟠 High |
| A-02 | 1.92s animation delay feels broken on mobile | All | 🟠 High |
| H-01 | Hero portrait only 300px — too shallow | Home | 🟠 High |
| H-02 | Quote overlaps portrait at md: breakpoint | Home | 🟠 High |
| D-01 | ManBehindWork: no portrait on tablet/mobile | Discover More | 🟠 High |
| D-03 | DiscoverMore hero h1 overflows at 360px | Discover More | 🟠 High |
| D-04 | Orphan "&" words break Ideas section hierarchy | Discover More | 🟠 High |
| D-05 | LifeOfContribution portrait encroaches on mobile text | Discover More | 🟠 High |
| D-06 | 336px padding in ClosingCTA on mobile | Discover More | 🟠 High |
| J-01 | Journey hero: no portrait on mobile | Journey | 🟠 High |
| L-01 | `mt-28` pushes Back home btn below image fold | Leadership | 🟠 High |
| L-04 | ChamberRow 4-col grid crushes text on mobile | Leadership | 🟠 High |
| M-01 | Media hero: no image on mobile | Media | 🟠 High |
| M-02 | `-mt-[72px]` may hide content behind navbar | Media | 🟠 High |
| M-04 | Languages grid-cols-2 overflows at 360px | Media | 🟠 High |
| S-01 | Desktop-scale py-32/44 on mobile sections | Multi | 🟠 High |
| S-02 | Full-height sections with no mobile image | Multi | 🟠 High |
| G-02 | Dock stretches to 2503px on ultrawide | All | 🟡 Medium |
| G-04 | Navbar no max-width on ultrawide | All | 🟡 Medium |
| G-05 | Padding inconsistency hero vs sections | All | 🟡 Medium |
| H-03 | Home hero h1 capped; dead space at 2560px | Home | 🟡 Medium |
| H-04 | BackgroundText watermark 130px overflow on mobile | Home | 🟡 Medium |
| H-05 | Abrupt layout reflow at md: breakpoint | Home | 🟡 Medium |
| H-06 | Only 16px between portrait and text on mobile | Home | 🟡 Medium |
| D-02 | DiscoverMore hero h1 capped at 118px on ultrawide | Discover More | 🟡 Medium |
| D-07 | BooksShowcase 3D canvas mobile untested | Discover More | 🟡 Medium |
| J-02 | Journey watermark overflows at 360px | Journey | 🟡 Medium |
| J-03 | RowMilestone period col squeezes text | Journey | 🟡 Medium |
| J-04 | Hero paragraph too long on mobile | Journey | 🟡 Medium |
| J-05 | Journey hero dead space at 2560px | Journey | 🟡 Medium |
| L-02 | `whitespace-nowrap` adds fragile overflow risk | Leadership | 🟡 Medium |
| L-03 | EnterpriseCard 2-col on tablet is very tall | Leadership | 🟡 Medium |
| I-01 | InitiativeCard decorative number too large mobile | Initiatives | 🟡 Medium |
| I-02 | Heritage card p-10 squeezes to 232px on mobile | Initiatives | 🟡 Medium |
| A-01 | Unused mousemove listeners on touch devices | All | 🟡 Medium |
| A-03 | Dock touch target gap too tight | All | 🟡 Medium |
| M-05 | Media gallery 2-col on tablet too tall | Media | 🟡 Medium |
| L-05 | Watermark too prominent at 2560px | Leadership | 🟢 Low |
| M-03 | MediaHero watermark extends into image at 2560px | Media | 🟢 Low |
| H-07 | Hero subtitle 18px — no mobile size scaling | Home | 🟢 Low |
| I-03 | Philosophy quote overly long on mobile | Initiatives | 🟢 Low |
| I-04 | ServiceCard stays 2-col at 768px | Initiatives | 🟢 Low |
| T-01 | lining-nums may not apply in fallback scenarios | All | 🟢 Low |
| T-02 | Sub-1 line height risks descender collision | Multi | 🟢 Low |

**Total issues:** 45  
**Critical:** 1 · **High:** 17 · **Medium:** 19 · **Low:** 8

---

## QUICK WINS — Implement First (Lowest Risk, Highest Impact)

1. **G-03** — NavMenu panel: `w-[calc(100vw-32px)] sm:w-[300px]` — *1 class change*
2. **H-04** — BackgroundText clamp floor: `clamp(80px→48px, 18vw→14vw, 270px)` — *1 line*
3. **J-02** — Journey watermark clamp floor: `clamp(70px→48px, 16vw→14vw, 250px)` — *1 line*
4. **L-02** — Remove `whitespace-nowrap` from Leadership h1 — *1 word*
5. **L-01** — `mt-28` → `mt-6 md:mt-28 lg:mt-32` on Leadership hero text — *1 class*
6. **M-02** — Add `pt-[72px] md:pt-0` to MediaHero text container — *1 class*
7. **M-04** — Languages: `grid-cols-2` → `grid-cols-1 sm:grid-cols-2` — *1 class*
8. **G-01** — Dock button: add `md:w-[250px] w-[160px]` — *1 class*
9. **S-01** — Scale all `py-32/44` sections to `py-16 md:py-32` pattern — *systematic*
10. **D-06** — ClosingCTA: `pt-40 pb-44` → `pt-24 pb-20 md:pt-40 md:pb-44` — *2 classes*

---

*Audit conducted by full JSX/CSS source analysis. All pixel calculations derived from Tailwind class values and `clamp()` math at each viewport width. Browser visual verification recommended after fixes are applied.*
