# CLAUDE.md — Dr. Sanjay Goel / GTC Group Website

> This file is the canonical reference for this project. Read it at the start of every session.

---

## 1. Overall Purpose

A cinematic, editorial-portfolio website for **Dr. Sanjay Goel** — Founder of Aryavarta Heritage Foundation, Chairman of GTC Group, and speaker across supply chain, real estate, and heritage sectors. The site presents four decades of career, community work, and personal philosophy through an immersive, scroll-driven visual narrative.

---

## 2. Visual Identity

- **Tone**: Warm editorial luxury — think high-end magazine profile meets architectural monograph.
- **Background**: `#F5F2ED` (warm cream/linen). Never pure white.
- **Overlays**: Two fixed background layers in App.jsx:
  - A subtle radial vignette (`rgba(120,72,40,0.035)`) creating warm edge darkening.
  - A procedural noise texture (SVG feTurbulence) at `opacity: 0.018` with `mix-blend-overlay`.
- **Glass effects**: Used on the Dock (`bg-glass`, `backdrop-blur-[20px]`, `shadow-soft`).
- **Borders**: Subtle `border-border` (light warm gray) throughout; rounded corners are generous (`rounded-[20px]` to `rounded-[32px]`).
- **Shadows**: Soft (`shadow-soft`) — low spread, low opacity.

---

## 3. Color System

| Token | Value | Usage |
|---|---|---|
| `#F5F2ED` | Warm cream/linen | Page background |
| `#111111` | Near-black | Primary text (`text-ink`) |
| `#5E5E5E` | Warm mid-gray | Secondary body text |
| `#2d7a3a` | Forest green | **Brand/accent color** — headings accent, badges, links |
| `#E45A49` | Terracotta red | Leadership chapter color |
| `#1a5c7a` | Deep teal | Secondary accent |
| `#7a4f1a` | Warm brown | Tertiary accent |
| `#5a2d7a` | Deep plum | Quaternary accent |
| `text-brand` | `#2d7a3a` | Tailwind class for brand green |
| `text-accent` | `#2d7a3a` | Accent green (same as brand) |
| `text-secondary` | `#5E5E5E` | Secondary text |
| `text-ink` | `#111111` | Primary text |
| `bg-glass` | `rgba(255,255,255,0.28)` | Dock background |
| `border-border` | Light warm gray | Section borders |

**Key design rule**: Green `#2d7a3a` is used sparingly for emphasis — accent words in headings, numbered badges, divider lines, active states. The rest of the palette stays warm neutral.

---

## 4. Typography

| Font | Weights Used | Role |
|---|---|---|
| **Cormorant Garamond** (serif) | 300, 400, 500, 600, 700, 900 (synthetic) | Display headings, large editorial type, quotes |
| **DM Sans** (sans-serif) | 400, 500, 600, 700 | Body text, UI labels, metadata, navigation |
| **Font-sans** (Tailwind) | — | Alias for DM Sans |

### Critical typography rules

- **Hero headings**: `clamp(52px, 7.8vw, 138px)`, `font-black` (900), `leading-[0.92]`, `letter-spacing: -2px` or `-3px`.
- **Section headings**: `clamp(28px, 3.8vw, 48px)` to `clamp(44px, 7vw, 104px)`, `font-black`.
- **Body text**: 14–18px, `leading-[24px]` to `leading-[30px]`, `text-secondary` (`#5E5E5E`).
- **Tabular/lining figures**: Use `tabular-nums lining-nums` for statistics (periods, year counts). Cormorant defaults to old-style figures which causes baselines to jump.
- **Font weights**: Cormorant ships only 300–700. `font-black` (900) is **synthetically bolded by the browser** — this is intentional and used for oversized hero text.
- **Italic**: Used for contrast emphasis within headings (e.g., "and responsibilities.") and philosophical pull-quotes.

---

## 5. Page Structure & Routes

| Route | Component | Type |
|---|---|---|
| `/` | `Home.jsx` | Landing — hero + BooksShowcase |
| `/discover-more` | `DiscoverMore.jsx` | Editorial long-form narrative |
| `/journey` | `Journey.jsx` | Career timeline, milestones |
| `/initiatives` | `Initiatives.jsx` | Heritage, water, community work |
| `/leadership` | `Leadership.jsx` | Group roles, chambers, boards, awards |
| `/media` | `Media.jsx` | Speaking topics, recognition, photo gallery |

### Page order (for transition direction logic)
```
'/' → '/journey' → '/initiatives' → '/leadership' → '/media' → '/discover-more'
```
Defined in `PAGE_ORDER` in `TransitionContext.jsx`. Forward = toward `/discover-more`, backward = toward `/`.

---

## 6. Reusable Components

| Component | Location | Purpose |
|---|---|---|
| `Navbar` | `components/Navbar.jsx` | Fixed header with hamburger menu |
| `NavMenu` | `components/NavMenu.jsx` | Full-screen overlay navigation |
| `Dock` | `components/Dock.jsx` | Bottom dock — "Discover more" button + nav pills |
| `Hero` | `components/Hero.jsx` | Home page hero section |
| `HeroContent` | `components/HeroContent.jsx` | Text side of hero (index, name, tagline) |
| `HeroImage` | `components/HeroImage.jsx` | Photo with crossfade/slide + parallax tilt |
| `MediaHero` | `components/MediaHero.jsx` | Reusable full-screen hero for sub-pages (Journey, Leadership, Media) |
| `PageHeader` | `components/PageHeader.jsx` | Standard page header (back button + title) |
| `PageTransition` | `components/PageTransition.jsx` | Cinematic full-screen curtain between routes |
| `Reveal` | `components/Reveal.jsx` | Generic scroll-triggered fade+slide-up wrapper |
| `SectionHeading` | `components/SectionHeading.jsx` | Eyebrow + H2 section heading |
| `SectionMotif` | `components/SectionMotif.jsx` | SVG abstract dividers (heritage/water variants) |
| `Quote` | `components/Quote.jsx` | Floating pull-quote with mouse parallax |
| `HeritageFeature` | `components/HeritageFeature.jsx` | Expandable heritage org detail card |
| `MomentsGrid` | `components/MomentsGrid.jsx` | 4-column photo grid with hover scale |
| `Recognition` | `components/Recognition.jsx` | Award/recognition entry with decorative SVG |
| `SpeakingTopics` | `components/SpeakingTopics.jsx` | Pill-shaped topic tags with icons |
| `WordField` | `components/WordField.jsx` | Interactive word selector with animated description |
| `BackgroundText` | `components/BackgroundText.jsx` | Large ghost watermark text |
| `ScrollToTop` | `components/ScrollToTop.jsx` | Scrolls to top on route change |
| `BooksShowcase` | `components/BooksShowcase.tsx` | **Three.js WebGL** interactive book carousel |
| `HeroToManTransition` | `components/HeroToManTransition.jsx` | Sticky scroll-driven hero→content transition |
| `icons.jsx` | `components/icons.jsx` | 11 inline SVG icon components |

---

## 7. Animation Architecture

### Two-layer system: Framer Motion + manual RAF loop

1. **Framer Motion** handles:
   - Entrance animations (`initial` → `animate`)
   - Scroll-triggered reveals (`whileInView`, `useInView`)
   - `AnimatePresence` transitions (lightbox, expandable panels)
   - Interactive hover states (`whileHover`)
   - Scroll-linked transforms (`useScroll`, `useTransform`, `useMotionValue`)

2. **BooksShowcase.tsx** uses its own:
   - Custom `Spring` class (spring physics: k=120, d=14 by default)
   - Manual `requestAnimationFrame` game loop
   - Three.js for 3D book rendering with page-turning physics

### Standard easing curve
```js
const ease = [0.22, 1, 0.36, 1]  // Smooth cubic-bezier — used everywhere
```

### Page transition (curtain)
- Full-screen cream div slides up from bottom (520ms), covers screen, route changes, then slides up to reveal (580ms).
- Backward = slides down from top.
- z-index: 9999
- Reduced motion: simple 180ms opacity crossfade.

### Mouse parallax pattern (repeated)
```js
const mx = useMotionValue(0)
const my = useMotionValue(0)
const sx = useSpring(mx, { stiffness: 60, damping: 20 })
const sy = useSpring(my, { stiffness: 60, damping: 20 })
const x = useTransform(sx, [-1, 1], [-8, 8])
const y = useTransform(sy, [-1, 1], [-5, 5])
```
Applied to hero images for subtle tilt-on-hover. Also used for background watermark text (gentler: stiffness 40).

---

## 8. Navigation Architecture

### Dual navigation system

1. **Navbar** (`Navbar.jsx` + `NavMenu.jsx`):
   - Fixed header with logo/title + hamburger button.
   - Hamburger opens full-screen overlay menu.
   - The hamburger button itself is `fixed` positioned in the top-right.

2. **Dock** (`Dock.jsx`):
   - Bottom-of-screen floating dock bar.
   - Left: "Discover more" CTA button (cream bg, dark text).
   - Right: scrollable nav pills for Journey, Initiatives, Leadership, Media (with Unsplash thumbnails).
   - z-index: 30 (below PageTransition at 9999, above page content at 20).

### Navigation hook
All navigation goes through `useTransitionNavigate()` which calls `TransitionContext.navigateTo()`. This:
- Computes direction (forward/backward) from `PAGE_ORDER`.
- Runs the PageTransition curtain animation.
- Calls `navigate()` at curtain full-cover.
- Prevents double-navigation via `isTransitioning` guard.

### Back-home buttons
Every sub-page has a "← Back home" button (reused pattern). Some use `PageHeader` component, others inline.

---

## 9. Responsive Architecture

- **Mobile-first** with Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px).
- **Hero images**: Hidden on mobile (`hidden md:block` or positioned differently at each breakpoint).
- **Dock**: Fixed height 140px, scrollable on mobile.
- **Font sizes**: Heavy use of `clamp()` for fluid typography.
- **Touch devices**: `useCoarsePointer()` hook in Leadership.jsx detects `(hover: none)` and keeps hover-revealed content always visible.
- **Reduced motion**: Checked via `prefers-reduced-motion: reduce` — affects PageTransition (opacity crossfade) and BooksShowcase (slower/simpler animations).

---

## 10. Image Handling

### Assets (all in `src/assets/`)

**Portraits (used across multiple pages):**
- `portrait.png` — Original portrait (currently unused in visible pages)
- `portrait-2.png` — Square 500x500, used in Journey and DiscoverMore
- `portrait-3.png` — Main portrait, used in DiscoverMore hero and archive
- `leadership-hero.png` — Landscape, used in Leadership page
- `media-hero.png` — Used in Media page

**Gallery (10 images in `assets/gallery/`):**
- `moderator-cscmp-event.jpg`
- `felicitated-minister-khot.jpg`
- `speaking-conference-2012.jpg`
- `with-sanjiv-sanyal.jpg`
- `st-xaviers-150-years.jpg`
- `with-sunil-pal.jpg`
- `with-sudhir-mungantiwar.jpg`
- `with-asha-bhosle.jpg`
- `mhada-ceo-sanjiv-jaiswal.jpg`
- `cscmp-newsletter-launch-2011.jpg`
- `heritage-bg.png` — Used as book cover back image

### Image techniques
- **CSS Mask gradients**: Used extensively to fade image edges into the page background (left fade, bottom fade, right fade). Two gradients are composited with `maskComposite: 'intersect'` for precise edge control.
- **Parallax tilt**: Mouse-tracking spring transform on hero images (±8px x, ±5px y).
- **Crossfade slideshow**: `AnimatePresence` with directional variants (HeroImage.jsx).
- **Lightbox**: Full-screen overlay with `clipPath` animation.
- **External images**: Dock nav pills use Unsplash URLs (hardcoded in Dock.jsx).

---

## 11. Important Design Decisions

1. **No CSS modules or styled-components** — all styling is Tailwind utility classes + inline `style` objects for dynamic values (font sizes, masks, colors).
2. **Inline styles for fonts**: Cormorant Garamond and DM Sans are referenced via `fontFamily: '"Cormorant Garamond", serif"` inline styles because Tailwind config doesn't define them as utility classes.
3. **Scroll-linked animations**: `useScroll` + `useTransform` from Framer Motion is used for scroll-progress-driven transforms (HeroToManTransition, LifeOfContribution, ClosingCTA).
4. **Sticky sections**: Used for the Man Behind the Work sections in both DiscoverMore and HeroToManTransition — a `260vh` or `130vh` container with `position: sticky; top: 0` inner div.
5. **BooksShowcase uses Three.js**: A full WebGL book carousel with procedural textures, page-turning physics, and floating leaf particles. This is a self-contained sub-system.
6. **Portal for close button**: The BooksShowcase archive modal close button is rendered via `createPortal` directly to `document.body` to escape z-index stacking context above the WebGL canvas.
7. **Page background gradients are set on the root div in App.jsx** — they need to remain warm and subtle.

---

## 12. Things That Must NOT Be Changed

1. **Background color `#F5F2ED`** — Every section, gradient, mask, and overlay is calibrated to this specific cream. Changing it will break every mask gradient, vignette, and text legibility.
2. **The two fixed background layers in App.jsx** (radial vignette + noise) — these are the atmospheric foundation.
3. **The easing curve `[0.22, 1, 0.36, 1]`** — this defines the site's smooth, luxurious feel. Don't replace with standard easings.
4. **The PageTransition curtain choreography** — timing (520ms enter, 580ms exit), direction logic, and the GTC GROUP label in the center.
5. **`PAGE_ORDER` in TransitionContext** — determines forward/backward transition direction. Changing route order without updating this will flip transitions.
6. **Cormorant Garamond font weights** — the intentional synthetic bold (font-black/900) is relied upon for oversized hero headings.
7. **The `useTransitionNavigate` hook** — all navigation must go through this for the cinematic transition to work. Never use `<Link>` directly for internal navigation.
8. **`DiscoverMore.jsx` hero section** — explicitly marked "PRESERVED EXACTLY" in comments.
9. **The mask gradients on hero images** — these are precisely tuned for edge blending. Changing them will cause hard edges or washed-out images.
10. **The noise SVG data URL** in App.jsx — procedural and lightweight, no separate file.

---

## 13. Known Visual Problems

1. **Navbar overlap on sub-pages**: The Navbar is `position: fixed` at z-50. Some pages (Journey, Media) compensate with `-mt-[72px]` or `min-h-[calc(100svh-72px)]`. The Home page and DiscoverMore page do NOT need this compensation. Be careful when adjusting navbar height.
2. **Cormorant Garamond weight 900 is synthetic**: The browser fakes bold for weights above 700. This causes slightly thicker/smeared characters at very large sizes. This is accepted as the design aesthetic.
3. **Portrait-2.png upscaling**: It's a 500x500 square image stretched across the viewport. Journey.jsx has a comment noting this — the image is constrained to `md:w-[58%]` to mitigate.
4. **HeroImage crossfade key bug**: `key={current.src}` on the AnimatePresence motion.div — if two images happen to have the same src (unlikely), the crossfade breaks.
5. **Dock on very small screens**: The 140px dock with horizontal scroll may feel cramped below 360px width.
6. **BooksShowcase WebGL dependency**: No fallback for browsers without WebGL beyond a text message. The entire sub-section is non-functional on those devices.
7. **Unpinned Unsplash images in Dock**: The Unsplash thumbnail URLs in Dock.jsx may break if those specific photo IDs are removed from Unsplash.

---

## 14. Current Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.11.17",   // All animations, scroll effects, AnimatePresence
    "react": "^18.3.1",             // React 18
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.18.2",  // Routing + transition direction logic
    "three": "^0.185.1"             // WebGL book carousel (BooksShowcase only)
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^5.4.11"
  }
}
```

### Build toolchain
- **Vite** with `@vitejs/plugin-react`
- **Tailwind CSS 3** with PostCSS + Autoprefixer
- **Path alias**: `@` → `./src`
- **No TypeScript** (except `BooksShowcase.tsx` which uses its own TS config)

---

## 15. Architecture Notes

### State management
- **No global state library**. State is local to components + React Context for transitions.
- `TransitionContext` provides: `navigateTo`, `isTransitioning`, `direction`, `registerAnimator`.

### Key data files
- `src/data/chapters.js` — Book data for the BooksShowcase carousel
- `src/data/initiatives.js` — Initiatives page content (heritage, water, public service)

### Component conventions
- All animation components use the same ease curve and timing patterns.
- `Reveal` is the universal scroll-trigger wrapper — use it for any content that should fade in on scroll.
- `SectionMotif` provides SVG dividers between sections (heritage tree or water wave variants).
- All "Back home" buttons are styled identically.

### Z-index stack
```
9999 — PageTransition curtain
200   — Archive modal
 50   — Navbar (fixed)
 40   — Background overlay layers (App.jsx)
 30   — Dock
 21   — HeroToManTransition content
 20   — Page content (main sections)
 10   — Hero text/content within sections
  2   — Gradient overlays within sections
```
