# Estrela Studio–Inspired Page Transition & Scroll Animation Implementation Plan

## 0. Objective

This document is a **motion-only implementation specification for Claude**.

Use the official Estrela Studio website as the animation reference:

https://estrela.studio/

The goal is to reproduce the **feel and behavior of the page transitions and scroll motion** in the existing Dr. Sanjay Goel website.

Do **NOT** copy Estrela's branding, colors, typography, content, imagery, layout, or visual identity.

Keep the existing website exactly as its own product:

- warm cream/light background
- editorial serif typography
- black typography
- GTC green accent
- restrained warm red accent
- premium personal archive / biography aesthetic
- existing navigation
- existing Journey / Initiatives / Leadership / Media pages

Only borrow the **motion language**.

---

# 1. WHAT WE ARE TAKING FROM THE REFERENCE

The Estrela Studio site presents itself as a highly interactive scrolling digital experience. Its homepage explicitly invites users to "Scroll to discover our world", then moves through featured work, studio information, services, testimonials and a long-form page structure.

A current technical/visual scan of the reference identifies the site with:

- GSAP-style animation
- parallax
- 3D / depth interaction
- interaction design
- `mask/clip-path`
- CSS transitions and animation
- custom properties

Treat these as implementation clues, not as permission to copy the site's source code.

The target experience is:

> **The user should feel that the website is continuously transforming as they move through it, rather than jumping between static screens.**

---

# 2. MOST IMPORTANT REQUIREMENT

I want the **page-to-page transition behavior to be extremely close to the reference's motion character**.

Do NOT interpret this as:

- simple fade
- simple slide
- generic Framer Motion page transition
- loading spinner
- abrupt route replacement

The transition must feel:

- smooth
- layered
- spatial
- continuous
- cinematic
- fast enough to remain usable
- driven by masks/transforms rather than heavy blur

The existing site's content must remain intact.

---

# 3. BUILD A GLOBAL MOTION SYSTEM FIRST

Do not implement separate random animations on every page.

Create a reusable motion architecture.

Recommended structure:

```text
src/
  components/
    motion/
      PageTransition.jsx
      TransitionOverlay.jsx
      RouteTransition.jsx
      ScrollReveal.jsx
      MaskReveal.jsx
      ParallaxMedia.jsx
      StaggerText.jsx
      MotionLink.jsx
      MotionConfig.js
```

If the project uses TypeScript, use `.tsx` instead.

Create one central motion configuration:

```js
export const motionConfig = {
  pageTransition: {
    duration: 0.85,
  },

  reveal: {
    duration: 0.75,
  },

  stagger: {
    amount: 0.08,
  },

  parallax: {
    strength: 0.08,
  }
}
```

Do not hard-code different animation timings everywhere.

---

# 4. PAGE-TO-PAGE TRANSITION

This is the highest priority.

Current problem:

```text
Click link
↓
Old page disappears
↓
New page appears
```

Desired behavior:

```text
Click link
↓
Current page begins transforming
↓
A visual transition layer takes over
↓
Route changes
↓
New page is revealed through the same motion
↓
New page settles
```

The user should never feel like the browser simply replaced one document with another.

---

# 5. TRANSITION STYLE

Use a **full-viewport masked transition**.

Do not use a plain opacity fade as the primary effect.

Preferred technologies:

- CSS `clip-path`
- SVG masks
- transforms
- opacity
- GSAP timeline if already compatible with the project

The transition layer should use the website's existing cream background.

Example conceptual sequence:

```text
CURRENT PAGE
     ↓
content subtly moves / scales
     ↓
CREAM MASK expands
     ↓
ROUTE CHANGE
     ↓
CREAM MASK retracts
     ↓
DESTINATION PAGE reveals
```

The mask should feel like the entire website is turning into the next chapter.

---

# 6. EXIT ANIMATION

When a user clicks a navigation item:

Duration target:

`500–750ms`

Current page:

```text
opacity: 1 → 0.92
scale: 1 → 0.985
translateY: 0 → -10px
```

Do NOT make the entire page fly away.

The movement should be extremely subtle.

Large hero imagery can move slightly more than text.

---

# 7. TRANSITION MASK

After the exit begins:

Create a full-screen cream layer.

Preferred:

```css
clip-path: inset(...)
```

or SVG mask.

Suggested sequence:

```text
clip-path:
inset(100% 0 0 0)
→
inset(0)
```

Then after the route changes:

```text
clip-path:
inset(0)
→
inset(0 0 100% 0)
```

This creates a vertical curtain-like reveal.

However, Claude should test alternate directions and choose the one that visually matches the reference's motion character most closely.

The transition should be smooth rather than mechanical.

---

# 8. DESTINATION PAGE ENTRANCE

The incoming page should not appear fully formed.

Use a coordinated entrance.

Order:

```text
1. background
2. hero image / primary visual
3. section number
4. main heading
5. supporting text
6. secondary UI
```

Suggested animation:

### Image

```text
opacity: 0 → 1
scale: 1.04 → 1
clip-path: masked → full
```

### Heading

```text
opacity: 0 → 1
translateY: 35px → 0
```

### Supporting content

```text
opacity: 0 → 1
translateY: 20px → 0
```

Use staggered timing.

---

# 9. IMPORTANT: SHARED NAVIGATION

Do not destroy and recreate the navigation during every route transition.

Keep:

- GTC Group logo
- top navigation
- menu
- bottom Discover More navigation

persistent whenever possible.

Only the page content should transition.

This is critical to creating a premium continuous experience.

---

# 10. NAVIGATION DIRECTION

Transitions should know whether the user is moving:

```text
Home → Journey
Journey → Home
Journey → Initiatives
Initiatives → Leadership
Leadership → Media
```

For forward movement:

```text
outgoing content:
translateY(-10px)

incoming content:
translateY(20px) → 0
```

For reverse movement:

```text
outgoing content:
translateY(10px)

incoming content:
translateY(-20px) → 0
```

Keep this subtle.

---

# 11. SCROLL EXPERIENCE

The Estrela reference is not simply a page with isolated reveal animations.

Its experience is based around discovering content through scrolling.

The existing site should therefore use:

- scroll-linked transforms
- parallax
- sticky sections
- masked reveals
- staggered typography
- progressive content activation

The visitor should feel that scrolling is part of the storytelling.

---

# 12. GLOBAL SCROLL REVEAL

Every major section should have a reusable reveal.

Initial:

```text
opacity: 0
transform: translateY(40px)
```

When entering viewport:

```text
opacity: 1
transform: translateY(0)
```

Use IntersectionObserver or an equivalent animation system.

Do not attach expensive continuous JavaScript to every element.

---

# 13. MASKED IMAGE REVEAL

Use this particularly for:

- Journey images
- Leadership portrait
- Initiatives imagery
- Media photographs

Instead of:

```text
fade in
```

use:

```text
clip-path / mask
+
scale
+
opacity
```

Example:

```text
image:
scale 1.05 → 1

clip:
inset(0 0 100% 0)
→
inset(0)
```

This should become a recurring visual signature.

---

# 14. PARALLAX

Use restrained parallax inspired by the reference.

For large images:

```text
translateY:
0 → -5% / -8%
```

For background visuals:

```text
scale:
1.03 → 1
```

The effect should be tied to scroll progress.

Do not use excessive parallax.

Do not make people look like they are floating.

---

# 15. HERO SCROLL TRANSFORMATION

The Home hero should have the strongest scroll behavior.

As the user scrolls:

### Hero image

- subtly moves vertically
- slightly scales
- gradually loses dominance

### Hero heading

- moves slightly slower
- remains readable
- begins to transition out

### Background typography

- moves at a different speed
- creates depth

### Bottom Discover More bar

- can subtly move/reposition as the hero leaves
- should remain usable

The entire hero should feel like one coordinated composition.

---

# 16. STICKY STORYTELLING

Use sticky positioning for important sections.

Especially:

### Journey

Keep:

```text
year / portrait / chapter title
```

sticky while the journey content changes.

### Initiatives

Keep:

```text
foundation visual
```

sticky while the foundation details progress.

### Leadership

Keep:

```text
portrait / leadership identity
```

anchored while roles and statistics change.

This creates the feeling of an interactive editorial story.

---

# 17. IMAGE + TEXT SYNCHRONIZATION

When text changes, do not instantly replace the image.

Use a coordinated sequence:

```text
Current text exits
        ↓
Current image begins mask-out
        ↓
New image mask-in
        ↓
New text enters
```

The image and text should feel like parts of the same transition.

---

# 18. SECTION NUMBER ANIMATION

The site uses:

```text
01
02
03
04
05
```

Make the numbers part of the motion system.

When changing section:

```text
old:
translateY(0) → -100%

new:
translateY(100%) → 0
```

Use a small mask around the number.

Do not simply replace the number.

---

# 19. TYPOGRAPHY MOTION

Use the existing editorial serif typography.

For large headings:

Split by word or meaningful line.

Example:

```text
The
Journey
```

Animate:

```text
The:
opacity 0 → 1
translateY 30px → 0

Journey:
opacity 0 → 1
translateY 30px → 0
```

Stagger:

`50–90ms`

Do not animate individual letters unless there is a strong reason.

The site should remain elegant.

---

# 20. BACKGROUND TYPOGRAPHY PARALLAX

The oversized pale words already used in the site are perfect for depth.

Example:

```text
Dr. Sanjay Goel
Journey
Leadership
Initiatives
```

Move them at a slower scroll rate than foreground content.

Example:

```text
foreground: normal
background typography: 0.3–0.5x movement
```

Keep opacity extremely subtle.

---

# 21. HOME → JOURNEY

Create a transition that feels like:

> "The homepage is opening the first chapter."

Sequence:

```text
Home hero image subtly recedes
↓
cream mask expands
↓
section number changes 01 → 02
↓
Journey hero title enters
↓
timeline image reveals
```

The Journey page should feel connected to Home rather than unrelated.

---

# 22. HOME → INITIATIVES

Feeling:

> "Moving from personal journey into contribution."

Use:

- horizontal or diagonal mask variation
- image reveal
- title stagger
- subtle parallax

The Initiatives page should feel slightly more documentary.

---

# 23. HOME → LEADERSHIP

Feeling:

> "Entering institutional leadership."

Use:

- portrait-led reveal
- subtle scale
- warm background expansion
- typography stagger

Do not use flashy transitions here.

The subject should remain authoritative.

---

# 24. HOME → MEDIA

Feeling:

> "Entering the public archive."

Use:

- photographic mask
- subtle horizontal movement
- image-grid reveal
- staggered title

---

# 25. DISCOVER MORE → PAGE

The Discover More page should feel like an archive gateway.

When a destination is selected:

```text
selected thumbnail expands slightly
↓
background shifts
↓
transition mask
↓
destination page
```

Do not make it feel like a normal hyperlink.

---

# 26. SCROLL-TO-NAVIGATION TRANSITION

When the user clicks a navigation item while currently halfway down a page:

Do not immediately teleport them visually.

The transition system should:

1. freeze the current visual frame briefly
2. begin the exit animation
3. transition route
4. reveal the destination hero
5. reset scroll position
6. play the destination entrance

This prevents the browser's scroll jump from being visible.

---

# 27. TECHNICAL IMPLEMENTATION

Use the existing project's framework.

Preferred:

### CSS

For:

- transforms
- clip-path
- opacity
- simple transitions

### GSAP

Use GSAP if it is already present or if complex coordinated timelines genuinely require it.

Recommended GSAP modules:

- `gsap.timeline()`
- `ScrollTrigger`

Do not add GSAP to every component.

### Router integration

The page transition must be integrated with the existing router.

Do not use `window.location.href`.

Do not cause full browser reloads for internal navigation.

---

# 28. CREATE A SINGLE ROUTE TRANSITION CONTROLLER

Conceptually:

```js
async function navigateWithTransition(destination) {
    await playExitAnimation();

    navigate(destination);

    await waitForRouteReady();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    await playEnterAnimation();
}
```

The actual implementation must integrate correctly with the project's router rather than blindly copying this pseudocode.

---

# 29. TRANSITION STATES

Use explicit states:

```text
idle
→ exiting
→ covered
→ route-changing
→ entering
→ settled
```

This prevents:

- double clicks
- animation overlap
- route race conditions
- broken transitions

Disable repeated navigation clicks while a transition is in progress.

---

# 30. PERFORMANCE

Use GPU-friendly properties:

Prefer:

```text
transform
opacity
clip-path
```

Avoid continuous animation of:

```text
top
left
width
height
```

Do not use massive blur filters.

Do not run unnecessary `requestAnimationFrame` loops.

Lazy-load below-the-fold images.

Use responsive image sizes.

---

# 31. MOBILE

The desktop animation should not simply be scaled down.

On mobile:

- disable custom cursor
- reduce parallax
- reduce movement distance
- keep mask transitions
- simplify complex multi-layer effects
- preserve touch scrolling
- keep transitions fast

The website must still feel premium.

---

# 32. REDUCED MOTION

Implement:

```css
@media (prefers-reduced-motion: reduce)
```

For reduced motion:

- disable large parallax
- remove complex scale effects
- shorten route transitions
- preserve simple opacity/mask transitions
- keep navigation fully usable

---

# 33. IMPLEMENTATION ORDER

Claude MUST implement in this order.

## Phase 1

Audit existing routing and page structure.

Do not modify visual design.

## Phase 2

Build:

```text
PageTransition
TransitionOverlay
MotionConfig
```

## Phase 3

Implement global Home → Page transitions.

## Phase 4

Implement destination page entrance choreography.

## Phase 5

Add reusable:

```text
ScrollReveal
MaskReveal
ParallaxMedia
StaggerText
```

## Phase 6

Apply to:

- Home
- Journey
- Initiatives
- Leadership
- Media

## Phase 7

Add sticky storytelling.

## Phase 8

Add micro-interactions.

## Phase 9

Optimize performance and mobile behavior.

---

# 34. DO NOT CHANGE

While doing this work, do NOT change:

- existing content
- authentic photographs
- person's facial appearance
- website color palette
- existing typography choices unless required for animation
- page information architecture
- existing routes
- working components unrelated to animation

This task is specifically about **motion and transitions**.

---

# 35. QUALITY BAR

After implementation, test:

### Route transitions

- Home → Journey
- Home → Initiatives
- Home → Leadership
- Home → Media
- Journey → Initiatives
- Initiatives → Leadership
- Leadership → Media
- every page → Home

### Interaction

- repeated clicks
- back button
- forward button
- mobile navigation
- keyboard navigation

### Scroll

- fast scroll
- slow scroll
- scrolling upward
- scrolling downward
- jumping between sections

### Performance

- desktop
- mobile
- reduced motion
- slow network

---

# 36. FINAL INSTRUCTION TO CLAUDE

Do not simply add "animations" to the website.

Rebuild the website's **motion language**.

The final experience should communicate:

> **One continuous story, with every page behaving like another chapter.**

The Estrela reference should influence:

- transition choreography
- scroll rhythm
- parallax depth
- masking
- timing
- interaction smoothness
- spatial continuity

It should NOT influence:

- branding
- colors
- content
- typography
- images
- page layout
- copy
- visual identity

The existing Dr. Sanjay Goel website must remain recognizable.

The result should feel like:

**Dr. Sanjay Goel's editorial archive + Estrela-level motion design.**

---

## Reference verification notes

The official Estrela homepage currently exposes the following structure and interaction-oriented content: "Scroll to discover our world", a showreel, featured work, "Who we are", services, testimonials, FAQs and a contact section.

A current technical/visual dataset entry for `https://estrela.studio/` categorizes the site with **Parallax, GSAP, 3D and Interaction Design**, and identifies CSS `mask/clip-path`, `animation`, `transition`, and related motion primitives. Treat those technical labels as implementation evidence rather than as an exact source-code description.

Source:
https://estrela.studio/
