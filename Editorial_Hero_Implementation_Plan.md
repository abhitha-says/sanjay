# Pixel-Perfect Editorial Hero Section Implementation Plan

## Goal

Recreate the supplied editorial hero section with extremely high visual
fidelity.

-   Do **not** redesign or reinterpret the layout.
-   Treat the supplied screenshot as the single source of truth.
-   Match:
    -   Typography
    -   Spacing
    -   Colors
    -   Shadows
    -   Image composition
    -   Layering
    -   Animations
    -   Responsiveness

------------------------------------------------------------------------

# Phase 0 -- Analyze the Reference

Before writing code, reverse engineer the screenshot.

Measure and document:

-   Margins
-   Padding
-   Grid
-   Typography hierarchy
-   Font sizes
-   White space
-   Image proportions
-   Border radius
-   Shadows
-   Opacity
-   Gradients
-   Z-index stacking
-   Overall visual balance

------------------------------------------------------------------------

# Phase 1 -- Design Tokens

Create reusable variables.

``` text
Background: #F5F2ED
Primary Text: #111111
Accent: #E45A49
Secondary: #5E5E5E
Border: rgba(0,0,0,.08)
Glass: rgba(255,255,255,.65)
Shadow: 0 30px 80px rgba(0,0,0,.08)

Radius:
40px Hero
32px Dock
999px Pills

Spacing:
8 / 16 / 24 / 32 / 48 / 64 / 72 / 96

Container:
1680px
```

Never hardcode values.

------------------------------------------------------------------------

# Phase 2 -- Typography

-   Heading: Canela (fallback: Cormorant Garamond)
-   Body: Inter
-   Match line-height, tracking, weight, and hierarchy to the reference.

------------------------------------------------------------------------

# Phase 3 -- Layout

Use CSS Grid.

-   Container: max-width 1680px, centered, 32px padding.
-   Hero columns: 45% / 55%.

------------------------------------------------------------------------

# Phase 4 -- Structure

1.  Navbar
2.  Hero
3.  Bottom Dock

No extra sections.

------------------------------------------------------------------------

# Phase 5 -- Background

Warm cream background with extremely subtle radial gradients.

------------------------------------------------------------------------

# Phase 6 -- Navbar

Left: - Logo - Tagline

Center: - Scroll indicator

Right: - Menu - Circular action button

Height: 90px.

------------------------------------------------------------------------

# Phase 7 -- Background Typography

Render giant HTML text behind the hero.

    Dr
    Sanjay
    Goel

-   Font size: 280--320px
-   Opacity: 0.04
-   Absolute positioning
-   Negative letter spacing

------------------------------------------------------------------------

# Phase 8 -- Left Content

Stack:

1.  Section number
2.  Name
3.  Designation
4.  Divider
5.  Description
6.  Previous / Next navigation

------------------------------------------------------------------------

# Phase 9 -- Portrait

-   Transparent PNG
-   Absolute positioned
-   Bottom aligned
-   Right aligned
-   No visible rectangle
-   Approx. 58% hero width

------------------------------------------------------------------------

# Phase 10 -- Image Processing

-   Brightness: 102%
-   Contrast: 104%
-   Saturation: 96%

Keep lighting soft.

------------------------------------------------------------------------

# Phase 11 -- Quote

Absolute positioned beside the portrait.

-   Red quote mark
-   Serif text
-   Premium spacing

------------------------------------------------------------------------

# Phase 12 -- Bottom Dock

Floating glass card.

-   Height: 125px
-   Radius: 32px
-   Blur: 20px

Items: - Discover More - Journey - Initiatives - Leadership - Media -
Menu

------------------------------------------------------------------------

# Phase 13 -- Micro Interactions

-   Button lift
-   Portrait mouse parallax
-   Animated scroll indicator
-   Quote fade
-   Dock slide-up
-   Background text fade-in

------------------------------------------------------------------------

# Phase 14 -- Animations

Use Framer Motion.

Sequence: 1. Background 2. Typography 3. Portrait 4. Quote 5. Bottom
dock

Use premium easing.

------------------------------------------------------------------------

# Phase 15 -- Responsiveness

Desktop: - Match screenshot.

Tablet: - Preserve composition.

Mobile: - Portrait first - Text below - Scrollable dock

------------------------------------------------------------------------

# Phase 16 -- Components

-   Navbar
-   Hero
-   HeroImage
-   HeroContent
-   BackgroundText
-   Quote
-   Dock
-   DockItem
-   ScrollIndicator
-   Button

------------------------------------------------------------------------

# Phase 17 -- Code Quality

-   React
-   Tailwind CSS
-   Framer Motion
-   Semantic HTML
-   Reusable components
-   No duplicated styles

------------------------------------------------------------------------

# Phase 18 -- Pixel Review

Compare against the reference:

-   Margins
-   Padding
-   Typography
-   Image position
-   Radius
-   Colors
-   Shadows
-   Opacity
-   Hover states
-   Animation timing

Iterate until differences are visually negligible.

------------------------------------------------------------------------

# Phase 19 -- Final Polish

The result should feel like a premium editorial/Awwwards-style hero.

Prioritize visual accuracy over implementation convenience.

Work iteratively until the output closely matches the supplied
reference.
