# Mobile/Tablet Scroll-Driven Parallax — Implementation Plan (Revised)

Replace mouse-position parallax with scroll-driven parallax on mobile/tablet (< 1024px).

**The golden rule: same animation, responsive implementation.**
Only the trigger mechanism and viewport-scaled coordinates may change.
Desktop code is read-only.

---

## User Review Required

> [!IMPORTANT]
> **Desktop is untouched.** All changes live exclusively in the `< lg` / `< md` branches.

> [!CAUTION]
> The previous plan made two incorrect design decisions that are reversed here:
> 1. ~~Mobile scatter is persistent~~ — **WRONG.** Mobile scatter must be ephemeral: items
>    appear, settle, then disappear — exactly like the desktop trail.
> 2. ~~Increase opacity to 0.72~~ — **WRONG.** Opacity is unchanged. Fix clipping first,
>    then verify whether opacity needs adjustment at all.

---

## Desktop Scatter — Exact Behaviour to Replicate

Understanding the desktop precisely is the prerequisite for the mobile adaptation.

```
mousemove detected (distance > 95px) →
  new trail item created with: opacity:0, scale:0.68, rotate:(rot-12)
    ↓ animate (0.3s ease)
  opacity:0.46, scale:1, rotate:rot      ← "scatter + positioning + fade/reveal"
    ↓ setTimeout 1500ms →  AnimatePresence exit
  opacity:0, scale:0.88, y:-22           ← "settling + disappearance"
```

**Key facts about the desktop trail:**
- Items are **ephemeral**: they exist for ~1.8s total (0.3s entry + 1.5s hold + short exit)
- Peak opacity: **0.46** (unchanged)
- Entry: `scale: 0.68 → 1` with `rotate: rot-12 → rot` — a "snap into place" feel
- Exit: `scale 0.88, y: -22` — item drifts slightly upward and shrinks as it disappears
- Up to 6 items can coexist simultaneously (`trails.slice(-5)` = max 5, but counter creates 6th before cleanup)
- Positions follow the cursor exactly — no predefined grid

---

## Root-Cause Analysis (Unchanged from previous plan, corrected priorities)

### DiscoverMore.jsx — Current Mobile Issues

| Issue | Root Cause | Fix Priority |
|---|---|---|
| **Clipping** | `<div overflow-hidden>` at the `ImageTrail` level clips all mobile scatter items. This is almost certainly the primary reason items appear invisible/static | **Fix first** |
| **Wrong `useScroll` offset** | `offset: ['start start', 'end start']` — on phones where the hero is `min-h-screen`, "end start" means the hero bottom must reach viewport top. On a 844px phone with a 844px hero, this never fires fully during normal scroll. Progress likely stays near `0` | **Fix second** |
| **Only 2 animation phases** | Current `MobileScatterItem` does: `[range[0]→range[1]]: opacity 0→0.42`. There is no **exit/disappear** phase. Items just stop moving once scroll stops and remain frozen, not ephemeral | **Fix third** |
| **No scatter choreography** | Entry is `y: 28→0, scale: 0.82→1`. This is a simple fade-up, not the "snap-rotate-into-place" of the desktop `scale:0.68→1, rotate:rot-12→rot` | **Fix fourth** |
| **Static positions** | Positions are hardcoded `top/left/right`. Desktop positions follow cursor. Mobile equivalent: positions should feel natural and distributed, tuned for narrow viewport | Verify after fixing above |

### Leadership.jsx — Mobile Issues (Unchanged)

| Issue | Root Cause |
|---|---|
| No scroll parallax on mobile image | `x/y` motion values exist but only applied in desktop branch |
| `BgWatermark` no mobile adaptation | `mousemove` handler fires but does nothing on touch |

---

## Proposed Changes

---

### 1. DiscoverMore.jsx — Fix Clipping

The `ImageTrail` container has `overflow-hidden` at the outermost level, which clips
**both** the desktop trail and the mobile scatter. For the desktop, items are positioned
inside the hero bounds (cursor coords) so clipping is acceptable. For mobile, the items
use `absolute` with `top/right/left` percentage values — some are near edges and get clipped
before they become visible.

**Fix:** Move `overflow-hidden` inside — only to the desktop trail sub-container.
The mobile scatter container gets `overflow-visible`.

```diff
- <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
-   <AnimatePresence>
-     {/* desktop trails */}
-   </AnimatePresence>
-   <div className="lg:hidden">
-     <MobileScatterTrail containerRef={containerRef} />
-   </div>
- </div>

+ <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }}>
+   {/* Desktop trail: keeps overflow-hidden to contain cursor-following items */}
+   <div className="hidden lg:block absolute inset-0 overflow-hidden">
+     <AnimatePresence>
+       {/* desktop trails — UNCHANGED */}
+     </AnimatePresence>
+   </div>
+   {/* Mobile scatter: overflow-visible so items near edges are not clipped */}
+   <div className="lg:hidden absolute inset-0 overflow-visible">
+     <MobileScatterTrail containerRef={containerRef} />
+   </div>
+ </div>
```

> [!NOTE]
> The desktop `AnimatePresence` block and all its contents are **copied as-is** into the
> `hidden lg:block` wrapper. Zero logic changes.

---

### 2. DiscoverMore.jsx — Fix `useScroll` Offset

**Current (broken on mobile):**
```js
useScroll({ target: containerRef, offset: ['start start', 'end start'] })
```

On a 390px phone, the hero is `min-h-screen ≈ 844px`. "end start" fires when the hero
**bottom** reaches the viewport **top** — i.e. after scrolling ~844px past the hero start.
During normal page load viewing, the user only scrolls ~200-400px through the hero before
the next section appears. `scrollYProgress` will only ever reach `~0.3–0.5`, so items in
`range: [0.48, 0.68]` never fire.

**Fix:**
```js
useScroll({ target: containerRef, offset: ['start start', 'end end'] })
// OR — more reliable:
useScroll({ offset: ['start start', 'start end'] })  // window scroll, not container
```

`'start end'` means: progress goes 0→1 as the container top moves from the viewport top
to the viewport bottom — a full scroll-through of the hero height. This gives a reliable
0→1 range regardless of screen height.

---

### 3. DiscoverMore.jsx — Rewrite MobileScatterItem: Ephemeral + Full Sequence

The mobile trigger mechanism that replaces `mousemove+setTimeout` is:
**scroll velocity detection via `useVelocity`**.

When the user scrolls, `scrollYProgress` changes. `useVelocity(scrollYProgress)` gives
the rate of change. When velocity exceeds a threshold, a scatter "event" fires — spawning
an ephemeral item in the same `AnimatePresence` pattern as desktop.

```
scrollVelocity exceeds threshold →
  new mobile scatter item created: opacity:0, scale:0.68, rotate:(rot-12)
    ↓ animate (same 0.3s ease as desktop)
  opacity:0.46, scale:1, rotate:rot      ← matches desktop peak appearance exactly
    ↓ setTimeout 1500ms →  AnimatePresence exit
  opacity:0, scale:0.88, y:-22           ← matches desktop exit exactly
```

This preserves:
- **Same opacity** (`0 → 0.46 → 0`)
- **Same entry transform** (`scale:0.68→1, rotate:rot-12→rot`)
- **Same exit transform** (`scale:0.88, y:-22`)
- **Same hold duration** (`1500ms`)
- **Same entry duration** (`0.3s`)
- **Ephemeral lifecycle** — items appear and disappear

The only things that change:
- **Trigger**: `scrollVelocity > threshold` instead of `mousemove distance > 95`
- **Position**: Predefined zones for mobile viewport instead of cursor coordinates
- **Image cycling**: Same `TRAIL_IMGS[id % TRAIL_IMGS.length]` — identical image set

**Position strategy for mobile:**
Items spawn within the hero bounds but away from the centre-left text column.
For a 390px screen, the right 35% and the far left margin are the safe scatter zones.
Positions are randomised within those zones on each trigger event (same as desktop
cursor-following behaviour, but within predefined safe zones).

**Velocity threshold calibration:**
`useVelocity` returns values roughly in `scrollYProgress/s`. A single "flick" scroll
produces velocity ~0.2–0.8. Threshold of `0.04` fires on intentional scroll, not
micro-adjustments.

---

### 4. Card count — Test 4, 5, 6

Desktop can show up to 6 concurrent images. The mobile implementation should aim for the
same density feel adapted to a smaller viewport.

**Test plan:**
- **4 items**: Current behaviour. One item per quadrant of the hero. Likely too sparse.
- **5 items**: Add one more item in the centre-right zone. Better density.
- **6 items**: Match the desktop max-concurrent-items count (`trails.slice(-5)` = 5 items
  max visible, but a 6th fires before a 1st expires). Six positions: 3 right-side +
  2 left-margin + 1 centre-top. Densest, most like desktop.

The final implementation will **try 6 first** and reduce to 5 if positions overlap badly
at 360px. Desktop uses `trails.slice(-5)`, so the mobile equivalent caps at 5 concurrent.

**Mobile position zones (6 items, preliminary):**
```
Item 0 — top-right corner:   top:~8%,  right:~4%
Item 1 — mid-right:          top:~38%, right:~2%
Item 2 — lower-right:        top:~65%, right:~5%
Item 3 — top-left margin:    top:~18%, left:~3%
Item 4 — mid-left:           top:~52%, left:~5%
Item 5 — centre-top:         top:~5%,  left:~28%
```

These will be validated against 360px and 430px viewport widths during implementation.

---

### 5. Leadership.jsx — Mobile Parallax (Unchanged from original plan)

**Mobile `LeadershipImage` — scroll-driven Ken Burns:**

```jsx
// heroRef passed from LeadershipHero
const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'start end'] })
const mobileScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14])
const mobileY     = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
```

Applied only to the `motion.img` in the `md:hidden` mobile branch.
Desktop motion values (`x`, `y` from spring) remain wired to the desktop branch exclusively.

**`BgWatermark` — scroll-driven drift on touch:**

```jsx
const { scrollYProgress } = useScroll({ offset: ['start start', 'end start'] })
const scrollX = useTransform(scrollYProgress, [0, 1], [0, -12])
// Applied only when coarse pointer (touch device)
const finalX = coarse ? scrollX : x
```

**Mouse guard on desktop handler:**
```jsx
function handleMouseMove(e) {
  if (!window.matchMedia('(hover: hover)').matches) return
  // existing logic unchanged
}
```

---

## What Does NOT Change

| Item | Status |
|---|---|
| Desktop `ImageTrail` — `mousemove` handler | **Untouched** |
| Desktop `AnimatePresence` item: `opacity:0→0.46`, `scale:0.68→1`, `exit y:-22` | **Untouched** |
| Desktop `setTimeout(1500ms)` ephemeral lifecycle | **Untouched** |
| Desktop `trails.slice(-5)` max-concurrent limit | **Untouched** |
| Desktop card visual: `116×145px`, `rounded-[8px]`, `shadow` | **Untouched** |
| All non-hero mobile code | **Untouched** |
| Peak opacity `0.46` | **Preserved on mobile** |

---

## Visual Parity Table (Corrected)

| Phase | Desktop | Mobile (after fix) |
|---|---|---|
| **Scatter trigger** | Mouse moves > 95px from last position | Scroll velocity exceeds threshold |
| **Entry** | `opacity:0→0.46, scale:0.68→1, rotate:rot-12→rot` in 0.3s | **Identical** — same framer-motion `animate` values |
| **Hold** | Item stays for 1500ms | **Identical** — same `setTimeout(1500)` |
| **Exit** | `AnimatePresence exit: opacity:0, scale:0.88, y:-22` | **Identical** — same `AnimatePresence` + `exit` props |
| **Concurrency** | Up to 5–6 items | Up to 5–6 items (test to find optimal) |
| **Card size** | `116×145px` | Same or ~10% smaller to fit narrow viewport |
| **Card style** | `rounded-[8px] shadow overflow-hidden` | **Identical** |
| **Image set** | `TRAIL_IMGS` cycle | **Identical** — same `TRAIL_IMGS[id % TRAIL_IMGS.length]` |
| **Peak opacity** | `0.46` | **Identical** — `0.46` (no change unless clipping fix proves it's still invisible) |

---

## Verification Plan

### Build check
```bash
npm run build
```

### Manual — DiscoverMore Hero
1. Chrome DevTools at 390px, 430px, 768px
2. Open `/discover-more` — scroll slowly through hero
3. **Verify:** As user scrolls, scatter items appear (entry animation), hold briefly, then exit (disappear) — exactly matching desktop ephemeral behaviour
4. **Verify:** Multiple items can coexist simultaneously
5. **Verify:** No clipping at viewport edges
6. **Verify:** Items do NOT remain permanently on screen
7. Resize to 1280px — **verify desktop behaviour is completely unchanged**

### Manual — Leadership Hero
1. At 390px, scroll the `/leadership` hero — verify portrait has parallax movement
2. Verify watermark drifts on scroll
3. At 1024px+, verify desktop mouse parallax is unchanged

### Opacity check (conditional)
Only if scatter items remain invisible after clipping fix AND scroll offset fix:
- Inspect computed opacity value during scroll using DevTools
- If opacity is correctly reaching 0.46 but items are still not visible, investigate z-index stacking
- Do NOT increase opacity without confirming the visual root cause
