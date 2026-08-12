import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/utils'

/**
 * Animated Tooltip — bouncy SVG bubbles with spring entrances.
 * Ported to JSX from the framer-motion rebuild of Codrops' "Tooltip Animations".
 *
 * Two things were added for this site:
 *  • Fluid size. The bubbles were fixed pixel boxes; here the width is
 *    `min(design width, maxVw)` and the height follows from aspect-ratio, so a
 *    240px bubble becomes ~230px on a phone instead of overflowing it.
 *  • Edge clamping. A bubble centred on an icon near the viewport edge would
 *    hang off-screen, so on open it measures the trigger's centre against the
 *    viewport and shifts itself back inside (see `shift`).
 */

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1]
const EASE_IN = [0.55, 0, 1, 0.45]

const VARIANTS = {
  // Blobby heart — scales up while un-rotating.
  cora: {
    width: 232,
    height: 174,
    bottom: 'calc(100% + 0.5rem)',
    transformOrigin: '50% 100%',
    shape: (fill) => (
      <path
        d="M 199,21.9 C 152,22.2 109,35.7 78.8,57.4 48,79.1 29,109 29,142 29,172 45.9,201 73.6,222 101,243 140,258 183,260 189,270 200,282 200,282 200,282 211,270 217,260 261,258 299,243 327,222 354,201 371,172 371,142 371,109 352,78.7 321,57 290,35.3 247,21.9 199,21.9 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scale: 0, rotate: -180, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_QUINT } },
      exit: { scale: 0, opacity: 0, transition: { duration: 0.18, ease: EASE_IN } },
    },
    content: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.25, ease: EASE_OUT_QUINT } },
      exit: { y: 20, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
    contentStyle: { marginBottom: '0.75em' },
  },

  // Rounded pill with a downward pointer — tips in with a slide.
  smaug: {
    width: 240,
    height: 180,
    bottom: 'calc(100% - 0.25rem)',
    transformOrigin: '50% 100%',
    shape: (fill) => (
      <path
        d="M 314,100 C 313,100 312,100 311,100 L 89.5,100 C 55.9,100 29.1,121 29.1,150 29.1,178 53.1,201 89.5,201 L 184,201 200,223 217,201 311,201 C 344,201 371,178 371,150 371,122 346,99 314,100 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { rotate: 35, opacity: 0 },
      animate: { rotate: 0, opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
      exit: { rotate: -35, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
    content: {
      initial: { x: 50, rotate: 6, opacity: 0 },
      animate: {
        x: 0,
        rotate: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 260, damping: 12, delay: 0.05 },
      },
      exit: { x: -30, rotate: -6, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
  },

  // Banner ribbon with a pointer — drops in with elastic bounce.
  dori: {
    width: 240,
    height: 180,
    bottom: 'calc(100% - 0.25rem)',
    transformOrigin: '50% 0%',
    shape: (fill) => (
      <path
        d="M 22,108 22,236 C 22,236 64,216 103,212 142,208 184,212 184,212 L 200,229 216,212 C 216,212 258,207 297,212 336,217 378,236 378,236 L 378,108 C 378,108 318,83.7 200,83.7 82,83.7 22,108 22,108 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { y: -60, scale: 0.5, opacity: 0 },
      animate: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', bounce: 0.5, duration: 0.8 } },
      exit: { y: -60, scale: 0.5, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
    content: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.1, ease: EASE_OUT_QUINT } },
      exit: { y: 20, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
    contentStyle: { marginBottom: '0.75em' },
  },

  // Wavy blob — squashes horizontally on entry.
  gram: {
    width: 240,
    height: 180,
    bottom: 'calc(100% - 0.25rem)',
    transformOrigin: '50% 100%',
    shape: (fill) => (
      <path
        d="M 92.4,79 C 136,79 154,115 200,116 246,117 263,80.4 308,79 353,77.6 381,111 381,150 381,189 346,220 308,221 270,222 236,188 200,188 164,188 130,222 92.4,221 54.4,220 19,189 19,150 19,111 48.6,79 92.4,79 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scaleX: 1.2, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: EASE_OUT_QUINT } },
      exit: { scaleX: 1.1, scaleY: 0.9, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
    content: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.1, ease: EASE_OUT_QUINT } },
      exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
  },

  // Rounded rectangle — rises from below with a spring.
  indis: {
    width: 240,
    height: 180,
    bottom: 'calc(100% + 0.25rem)',
    transformOrigin: '50% 100%',
    shape: (fill) => (
      <path
        d="M 44.5,24 C 148,24 252,24 356,24 367,24 376,32.9 376,44 L 376,256 C 376,267 367,276 356,276 252,276 148,276 44.5,276 33.4,276 24.5,267 24.5,256 L 24.5,44 C 24.5,32.9 33.4,24 44.5,24 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { y: 100, scaleX: 0.3, scaleY: 1.3, opacity: 0 },
      animate: {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        transition: { type: 'spring', bounce: 0.45, duration: 0.9 },
      },
      exit: { y: 100, scaleX: 0, scaleY: 1.5, opacity: 0, transition: { duration: 0.25, ease: EASE_IN } },
    },
    content: {
      initial: { y: 10, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.08, ease: 'easeOut' } },
      exit: { y: -20, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
  },

  // Spiky starburst — pops in with a jiggle.
  malva: {
    width: 220,
    height: 165,
    bottom: 'calc(100% + 0.25rem)',
    transformOrigin: '50% 100%',
    shape: (fill) => (
      <path
        d="M 94.9,90.2 101,30.7 163,72.3 229,17.7 263,68.2 319,55.9 315,102 375,144 316,175 340,228 265,220 251,263 180,233 143,282 98.9,218 57.5,236 82,189 25,170 82.8,141 48.7,93.7 Z"
        fill={fill}
      />
    ),
    base: {
      initial: { scale: 0, rotate: -20, opacity: 0 },
      animate: {
        scale: [0, 1.15, 1],
        rotate: [-20, 6, 0],
        opacity: 1,
        transition: { duration: 0.7, ease: EASE_OUT_QUINT, times: [0, 0.6, 1] },
      },
      exit: { scale: 0, opacity: 0, transition: { duration: 0.18, ease: EASE_IN } },
    },
    content: {
      initial: { scale: 0.7, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.25, ease: EASE_OUT_QUINT } },
      exit: { scale: 0.7, opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    },
    contentStyle: { width: '55%' },
  },

  // Outlined speech bubble — springs up from the trigger.
  sadoc: {
    width: 240,
    height: 180,
    bottom: 'calc(100% + 0.5rem)',
    transformOrigin: '50% 100%',
    shape: (fill, stroke) => (
      <path
        d="M 32.1,42.7 54.5,257 185,257 193,269 200,282 207,269 214,257 342,257 368,23.9 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    ),
    base: {
      initial: { y: -40, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.5, duration: 0.8 } },
      exit: { y: -40, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } },
    },
    content: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.8, delay: 0.2 } },
      exit: { y: 20, opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
    },
    contentStyle: { marginBottom: '1.25em' },
  },
}

// prefers-reduced-motion: keep the shape, drop the choreography.
const CALM = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const EDGE_MARGIN = 12

export default function AnimatedTooltip({
  children,
  content,
  variant = 'cora',
  // Optional controlled open — lets a parent (e.g. a whole card) drive the
  // bubble instead of the trigger's own hover.
  open: openProp,
  shapeColor = '#111111',
  textColor = '#F5F2ED',
  strokeColor = 'rgba(255,255,255,0.35)',
  // Widest the bubble may get on small screens, as a % of viewport width.
  maxVw = 72,
  // Fill the parent instead of hugging the trigger content. Use this when the
  // bubble should centre over a whole card rather than over the small element
  // it visually decorates — `left: 50%` is relative to this wrapper.
  block = false,
  className,
  triggerClassName,
}) {
  const [hovered, setHovered] = useState(false)
  const [shift, setShift] = useState(0)

  const triggerRef = useRef(null)
  const bubbleRef = useRef(null)

  const reduce = useReducedMotion()
  const cfg = VARIANTS[variant] ?? VARIANTS.cora
  const id = useId().replace(/:/g, '')
  const open = openProp ?? hovered

  // Pull the bubble back inside the viewport when the trigger sits near an
  // edge. Derived from the trigger's centre, never from the bubble's current
  // position, so it settles in one pass instead of chasing itself.
  useLayoutEffect(() => {
    if (!open) return

    const clampToViewport = () => {
      const trigger = triggerRef.current
      const bubble = bubbleRef.current
      if (!trigger || !bubble) return

      const rect = trigger.getBoundingClientRect()
      const centre = rect.left + rect.width / 2
      const half = bubble.offsetWidth / 2

      let next = 0
      if (centre - half < EDGE_MARGIN) next = EDGE_MARGIN - (centre - half)
      else if (centre + half > window.innerWidth - EDGE_MARGIN) {
        next = window.innerWidth - EDGE_MARGIN - (centre + half)
      }
      setShift(next)
    }

    clampToViewport()
    window.addEventListener('resize', clampToViewport)
    return () => window.removeEventListener('resize', clampToViewport)
  }, [open, variant, maxVw])

  useEffect(() => {
    if (!open) setShift(0)
  }, [open])

  const base = reduce ? CALM : cfg.base
  const inner = reduce ? CALM : cfg.content

  return (
    <span
      className={cn('relative', block ? 'block w-full' : 'inline-block', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        ref={triggerRef}
        className={cn(block ? 'block w-full' : 'inline-block', triggerClassName)}
      >
        {children}
      </span>

      {/* Static anchor keeps the bubble centred over the trigger; the inner
          motion element only handles the entrance transforms. */}
      <span
        ref={bubbleRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: cfg.bottom,
          left: '50%',
          width: `min(${cfg.width}px, ${maxVw}vw)`,
          aspectRatio: `${cfg.width} / ${cfg.height}`,
          transform: `translateX(calc(-50% + ${shift}px))`,
          pointerEvents: 'none',
          zIndex: 50,
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.span
              key="base"
              id={id}
              variants={base}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformOrigin: cfg.transformOrigin,
              }}
            >
              <svg
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid meet"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                aria-hidden="true"
              >
                {cfg.shape(shapeColor, strokeColor)}
              </svg>

              <motion.span
                variants={inner}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  position: 'relative',
                  width: '68%',
                  textAlign: 'center',
                  fontSize: 'clamp(11px, 3vw, 13.5px)',
                  lineHeight: 1.35,
                  color: textColor,
                  ...cfg.contentStyle,
                }}
              >
                {content}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  )
}
