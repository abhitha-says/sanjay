# PIXEL-PERFECT HERO REFINEMENT SPECIFICATION

## Objective

Current implementation is **\~80--85%** matched.

Your task is **NOT** to redesign anything.

Your task is to **iteratively refine** the current implementation until
it visually matches the supplied reference as closely as possible.

The reference image is the source of truth.

------------------------------------------------------------------------

# 1. HERO PORTRAIT SCALE (Highest Priority)

## Current Issues

-   Portrait is **18--22% too small**
-   Head sits too low
-   Face is too far right
-   Shoulder does not dominate the composition
-   Too much whitespace surrounds the portrait

## Target

-   Portrait should occupy **≈55--58% of the hero width**
-   Head should end **30--40px below the navbar**
-   Shoulder should finish **10--20px above the bottom dock**
-   Face should begin **80--100px closer to the center**
-   Portrait should visually dominate the right half

## Claude Prompt

``` text
The hero portrait is significantly undersized.

Increase the overall portrait scale by approximately 20%.

Scale proportionally (not width only).

Anchor the portrait to the bottom-right.

Translate the portrait 70px toward the center.

The head should nearly touch the navigation.

The shoulder should almost touch the bottom dock.

The portrait should dominate the entire right side exactly like the reference.

Do not crop the face.

Reduce surrounding whitespace.

Use object-fit: contain.
```

------------------------------------------------------------------------

# 2. PORTRAIT QUALITY

## Current Issues

-   Artificial softness
-   Beautified appearance
-   Lost facial texture

## Target

Natural documentary photo.

Keep every wrinkle, pore and facial contour.

## Claude Prompt

``` text
Remove every blur effect from the portrait.

Remove any beautification.

Remove skin smoothing.

Do not apply AI face enhancement.

Do not sharpen aggressively.

Keep the portrait looking exactly like the original photograph.

Preserve all natural facial texture.
```

------------------------------------------------------------------------

# 3. PORTRAIT POSITION

## Target

Move portrait:

-   Left: **70px**
-   Up: **10px**

Bottom alignment remains identical.

------------------------------------------------------------------------

# 4. TYPOGRAPHY

Increase all typography approximately **6--8%**.

Target sizes:

  Element                 Target
  ----------------------- ------------
  Section Number          20px / 600
  Dr.                     92px
  Sanjay                  118px
  Goel                    110px
  Designation             19px
  Paragraph               19px
  Paragraph Line Height   34px

## Claude Prompt

``` text
Increase all typography by approximately 6–8%.

Maintain the hierarchy.

Do not alter spacing rhythm.

Only increase sizes until they visually match the reference.

Typography should feel oversized, premium and editorial.
```

------------------------------------------------------------------------

# 5. BACKGROUND TYPOGRAPHY

Increase by **20%**

Target

-   Font Size: **300--320px**
-   Opacity: **0.04**
-   Letter Spacing: **-6px**

Prompt

``` text
Increase the background typography by approximately 20%.

Opacity remains 0.04.

Extend behind portrait and text.

It should feel monumental.

Do not reduce opacity.
```

------------------------------------------------------------------------

# 6. QUOTE

Move:

-   Up **45px**
-   Left **15px**

Align with forehead.

------------------------------------------------------------------------

# 7. HERO COMPOSITION

Current issue:

Everything has been resized independently.

Target:

Treat the page as ONE composition.

Prompt

``` text
Treat the hero as one composition.

Do not resize isolated elements.

Adjust the overall visual proportions until the relationship between portrait, typography, whitespace, quote, background text and dock matches the reference.
```

------------------------------------------------------------------------

# 8. BOTTOM DOCK

Target

Height: **118px**

Radius: **32px**

Blur: **20px**

Shadow:

0 18px 40px rgba(0,0,0,.05)

Prompt

``` text
Reduce dock height by approximately 12%.

Maintain internal padding.

Keep the radius identical.

Reduce shadow intensity.
```

------------------------------------------------------------------------

# 9. DOCK ITEMS

Avatar

Reduce **10%**

Gap

Reduce **12px**

Text spacing

Reduce **6px**

------------------------------------------------------------------------

# 10. DISCOVER CARD

Reduce height **6%**

Arrow

Move down **6px**

------------------------------------------------------------------------

# 11. SCROLL INDICATOR

Reduce

-   Line thickness
-   Dot size
-   Label size

Approximately **15%**

------------------------------------------------------------------------

# 12. NAVBAR

Move logo down **6px**

Move menu down **6px**

------------------------------------------------------------------------

# 13. SHADOWS

Reduce opacity by **30%**

Avoid floating appearance.

------------------------------------------------------------------------

# 14. BACKGROUND

Reduce radial gradient intensity by **40%**

Keep nearly flat.

------------------------------------------------------------------------

# 15. ANIMATIONS

Use Framer Motion only.

Sequence

1.  Background Typography
2.  Portrait
3.  Heading
4.  Paragraph
5.  Quote
6.  Bottom Dock
7.  Navbar

Portrait

Scale 1.05 → 1

Heading

Y 40 → 0

Duration

900--1400ms

Delay

120ms stagger

Bezier

cubic-bezier(0.22,1,0.36,1)

Mouse

Portrait

X 8px

Y 5px

Background

X 3px

Buttons

translateY(-3px)

scale(1.02)

Dock Cards

translateY(-4px)

No bounce.

Luxury motion only.

------------------------------------------------------------------------

# FINAL MASTER PROMPT

``` text
This implementation is approximately 80–85% accurate.

Do NOT redesign any section.

Perform a meticulous pixel-refinement pass using the supplied reference image as the single source of truth.

Continuously compare your rendered output against the reference after every refinement.

Iteratively adjust typography, portrait scale, portrait position, whitespace, background typography, quote placement, dock dimensions, gradients, shadows, navbar alignment, icon sizes, spacing, hover effects and animations until the remaining visual differences are negligible.

Prioritize visual fidelity over implementation convenience.

Maintain React, Tailwind CSS and Framer Motion architecture while achieving the closest possible recreation of the supplied reference.
```
