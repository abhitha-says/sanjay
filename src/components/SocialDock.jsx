import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/utils'
import { useCoarsePointer } from '../hooks/useCoarsePointer'
import { socials } from '../data/social'

const ease = [0.22, 1, 0.36, 1]

// ── Dock geometry ─────────────────────────────────────────────────────────────
// Every dimension is fluid: the row is ~257px wide at 320px and ~304px at
// desktop, so it never overflows the hero gutter and never looks undersized on
// a large screen. The icon floor is 40px because these are the touch targets —
// the glyph inside is allowed to shrink further, the hit area is not.
// The tooltip does NOT derive its position from these numbers; it measures the
// laid-out DOM (see `centers`), so the two can never drift apart.
const dockVars = {
  '--dock-icon': 'clamp(40px, 11.5vw, 44px)',
  '--dock-gap': 'clamp(6px, 2.6vw, 12px)',
  '--dock-pad': 'clamp(12px, 3.4vw, 18px)',
  '--dock-glyph': 'clamp(18px, 5vw, 21px)',
}

// Squash-then-pop. Stands in for the GSAP MorphSVG keyframes of the original
// design — same beat (collapse fast, overshoot, settle), no extra dependency,
// and it works on every icon regardless of path shape.
const POP = {
  scale: [1, 0.55, 1.18, 1],
  rotate: [0, -10, 6, 0],
}
const POP_TIMING = { duration: 0.66, times: [0, 0.16, 0.5, 1], ease: ['easeIn', ease, ease] }

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  // Pointer devices: fires on hover, immediately.
  pop: { ...POP, transition: POP_TIMING },
  // Touch devices: the same animation, run once as a stagger when the dock
  // scrolls into view. Without this the icons would simply never animate on a
  // phone, since there is no hover to trigger them.
  cascade: (i) => ({ ...POP, transition: { ...POP_TIMING, delay: 0.15 + i * 0.08 } }),
}

export default function SocialDock({ className, dockClassName }) {
  const dockRef = useRef(null)
  const iconRefs = useRef([])
  const [hovered, setHovered] = useState(null)
  // -1 / 1 — which way the label slides in from, so moving left along the row
  // reads as the label travelling left too.
  const [direction, setDirection] = useState(0)
  // Icon centre offsets, measured rather than computed: the dock is fluid, so
  // the only reliable source for "where is icon i" is the laid-out element.
  const [centers, setCenters] = useState([])

  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()
  const inView = useInView(dockRef, { once: true, margin: '-40px' })

  // The touch cascade is a one-shot: it has to switch back off once played,
  // otherwise a tap (variant → 'pop') returning to rest would land back on
  // 'cascade' and replay the whole stagger for no reason.
  const [cascade, setCascade] = useState(false)
  const tapTimer = useRef(null)

  useEffect(() => {
    if (!coarse || !inView || reduce) return
    setCascade(true)
    // 0.15 lead-in + 4 × 0.08 stagger + 0.66 pop, rounded up.
    const id = setTimeout(() => setCascade(false), 1300)
    return () => clearTimeout(id)
  }, [coarse, inView, reduce])

  useEffect(() => () => clearTimeout(tapTimer.current), [])

  const measure = useCallback(() => {
    setCenters(iconRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0)))
  }, [])

  useLayoutEffect(() => {
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    // Re-measure on any reflow of the dock itself — viewport resize, font swap
    // (Cormorant/DM Sans land late), or a container that changes width.
    const ro = new ResizeObserver(measure)
    ro.observe(dockRef.current)
    return () => ro.disconnect()
  }, [measure])

  function enter(i) {
    if (hovered !== null && i !== hovered) setDirection(i > hovered ? 1 : -1)
    setHovered(i)
  }

  function leave() {
    setHovered(null)
    setDirection(0)
  }

  // The tooltip is a hover affordance, so it is pointer-only. On touch the
  // icons carry an aria-label and the brand marks are self-identifying.
  const showTooltip = !coarse && hovered !== null && centers[hovered] != null

  return (
    <nav aria-label="Social profiles" className={cn('w-max max-w-full', className)}>
      <div
        ref={dockRef}
        onMouseLeave={leave}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) leave()
        }}
        className={cn(
          'relative flex items-center rounded-[24px] border border-border bg-glass shadow-soft backdrop-blur-[20px]',
          dockClassName,
        )}
        style={{
          ...dockVars,
          gap: 'var(--dock-gap)',
          padding: 'calc(var(--dock-pad) * 0.62) var(--dock-pad)',
        }}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: -46, x: centers[hovered] }}
              exit={{ opacity: 0, scale: 0.92, y: 4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="pointer-events-none absolute left-0 top-0 z-30"
            >
              <div className="-translate-x-1/2 rounded-[12px] bg-ink px-3.5 py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
                {/* Fixed height + overflow-hidden: the outgoing and incoming
                    labels are stacked during the swap, so the tooltip must not
                    resize or leak while they cross. */}
                <div className="relative flex h-4 min-w-[76px] items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={socials[hovered].title}
                      custom={direction}
                      initial={{ x: direction > 0 ? 30 : -30, opacity: 0, filter: 'blur(6px)' }}
                      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ x: direction > 0 ? -30 : 30, opacity: 0, filter: 'blur(6px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="whitespace-nowrap font-sans text-[12px] font-medium tracking-[0.02em] text-white"
                    >
                      {socials[hovered].title}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {socials.map((s, i) => {
          const isActive = hovered === i
          const isMail = s.href.startsWith('mailto:')

          return (
            <motion.a
              key={s.title}
              ref={(el) => (iconRefs.current[i] = el)}
              href={s.href}
              target={isMail ? undefined : '_blank'}
              rel={isMail ? undefined : 'noreferrer noopener'}
              aria-label={`${s.title} — ${s.handle}`}
              onMouseEnter={() => enter(i)}
              onFocus={() => enter(i)}
              // Touch has no hover, so a tap plays the same pop as feedback
              // before the link opens, then releases itself — nothing on a
              // phone would ever fire the mouseleave that clears it.
              onTouchStart={() => {
                setHovered(i)
                clearTimeout(tapTimer.current)
                tapTimer.current = setTimeout(() => setHovered(null), 800)
              }}
              whileTap={{ scale: 0.94 }}
              animate={{ scale: isActive && !coarse ? 1.1 : 1, y: isActive && !coarse ? -3 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="flex shrink-0 items-center justify-center rounded-full outline-none ring-brand/40 focus-visible:ring-2"
              style={{ height: 'var(--dock-icon)', width: 'var(--dock-icon)' }}
            >
              <motion.svg
                viewBox={s.viewBox}
                aria-hidden="true"
                fill="currentColor"
                style={{ height: 'var(--dock-glyph)', width: 'var(--dock-glyph)' }}
                custom={i}
                variants={reduce ? undefined : iconVariants}
                animate={isActive ? 'pop' : cascade ? 'cascade' : 'rest'}
                className={cn(
                  'transition-colors duration-200',
                  isActive ? 'text-brand' : 'text-secondary',
                )}
              >
                <path d={s.d} />
              </motion.svg>
            </motion.a>
          )
        })}
      </div>
    </nav>
  )
}
