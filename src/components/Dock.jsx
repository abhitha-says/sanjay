import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { useTransition } from '../context/TransitionContext'
import { Mail } from './icons'
import portrait2 from '../assets/portrait-2.png'

const items = [
  {
    label: 'Journey',
    to: '/journey',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100&h=100&fit=crop',
  },
  {
    label: 'Initiatives',
    to: '/initiatives',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=100&h=100&fit=crop',
  },
  {
    // Dr. Goel's own headshot rather than a stock portrait of a stranger —
    // it's already square, so it crops cleanly into the circle.
    label: 'Leadership',
    to: '/leadership',
    img: portrait2,
  },
  {
    label: 'Media',
    to: '/media',
    img: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=100&h=100&fit=crop',
  },
  {
    // An action, not a chapter — so it carries a glyph instead of a
    // photograph, which is also the only honest thumbnail for "write to him".
    label: 'Contact',
    to: '/contact',
    icon: Mail,
  },
]

const ease = [0.22, 1, 0.36, 1]

export default function Dock() {
  const { pathname } = useLocation()
  const go = useTransitionNavigate()
  const { isTransitioning } = useTransition()
  const scrollRef = useRef(null)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const el = scrollRef.current
    if (!el) return

    function updateHint() {
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8)
    }

    updateHint()
    el.addEventListener('scroll', updateHint, { passive: true })
    window.addEventListener('resize', updateHint)
    return () => {
      el.removeEventListener('scroll', updateHint)
      window.removeEventListener('resize', updateHint)
    }
  }, [])

  // Cinematic focus: when the current page changes, smoothly bring that
  // chapter's chip to the center of the scroll strip rather than leaving it
  // wherever it happens to sit. On desktop all four chips already fit without
  // scrolling, so this is a no-op there.
  //
  // Deliberately NOT scrollIntoView(): that scrolls every scrollable ancestor,
  // the document included. The dock is in normal flow at the very bottom of
  // the page, so scrolling it into view dragged the whole window to the page
  // bottom on every route change — the "new page opens scrolled to the
  // bottom" bug, most visible on mobile where the strip actually overflows.
  // Driving scrollLeft on the strip itself can only ever move the strip.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const maxLeft = el.scrollWidth - el.clientWidth
    if (maxLeft <= 1) return // no horizontal overflow (desktop) — nothing to do
    const activeEl = el.querySelector('[data-active="true"]')
    if (!activeEl) return

    // Offset of the chip's center from the strip's center, in strip
    // coordinates. Measured from live rects so it stays correct regardless of
    // which ancestor happens to be the chips' offsetParent.
    const stripRect = el.getBoundingClientRect()
    const chipRect = activeEl.getBoundingClientRect()
    const delta =
      chipRect.left - stripRect.left - (stripRect.width - chipRect.width) / 2

    // Instant, never 'smooth': the strip is scroll-snap-mandatory, and
    // browsers cancel a programmatic smooth scroll on such a container and
    // revert it to the previous snap point — so a smooth scroll here simply
    // never arrives. It costs nothing visually either, since this always runs
    // while the page-transition curtain covers the screen.
    el.scrollTo({
      left: Math.min(Math.max(el.scrollLeft + delta, 0), maxLeft),
      behavior: 'auto',
    })
  }, [pathname])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.68, ease }}
      className="dock-root relative z-30 mx-4 mb-[calc(14px+env(safe-area-inset-bottom))] flex h-[clamp(72px,19vw,88px)] items-stretch overflow-hidden rounded-[34px] bg-glass shadow-soft backdrop-blur-[20px] sm:mx-8 sm:mb-8 sm:h-[140px] sm:rounded-dock lg:mx-14"
      style={{ pointerEvents: isTransitioning ? 'none' : undefined }}
    >
      {/* Discover more button */}
      <motion.button
        onClick={() => go('/discover-more')}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease }}
        className="flex w-[30%] shrink-0 cursor-pointer flex-row items-center justify-start gap-2 bg-ink pl-[3%] pr-[3%] text-white sm:w-[250px] sm:justify-between sm:gap-0 sm:pl-8 sm:pr-8"
        aria-label="Discover more"
      >
        <span className="relative top-0 order-1 flex h-[clamp(24px,6.2vw,28px)] w-[clamp(24px,6.2vw,28px)] shrink-0 items-center justify-center rounded-full bg-white text-[clamp(11px,3vw,13px)] text-ink shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-transform sm:order-2 sm:top-[6px] sm:ml-4 sm:h-9 sm:w-9 sm:bg-transparent sm:border sm:border-white/25 sm:text-[17px] sm:text-white sm:shadow-none">
          &#8599;
        </span>
        <span className="order-2 font-sans text-[clamp(12px,3.4vw,15px)] font-semibold leading-[1.15] sm:order-1 sm:text-[18px] sm:font-medium sm:leading-normal">
          <span className="block sm:inline">Discover</span><span className="block sm:inline"> more</span>
        </span>
      </motion.button>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex min-w-0 flex-1 snap-x snap-mandatory items-center gap-[4%] overflow-x-auto px-[4%] py-[6px] sm:snap-none sm:justify-between sm:gap-[14px] sm:px-6 lg:px-10"
      >
        {items.map((item) => {
          const active = pathname === item.to
          return (
            <motion.div
              key={item.label}
              data-active={active}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease }}
              onClick={() => go(item.to)}
              className={`flex shrink-0 snap-start cursor-pointer items-center gap-[8px] whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 transition-colors duration-300 sm:gap-[6px] sm:rounded-none sm:p-0 ${
                active ? 'bg-brand/10 sm:bg-transparent' : ''
              }`}
              role="button"
              aria-label={`Go to ${item.label}`}
              aria-current={active ? 'page' : undefined}
            >
              {item.icon ? (
                <span
                  aria-hidden="true"
                  className={`flex h-[clamp(38px,10vw,48px)] w-[clamp(38px,10vw,48px)] shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-[48px] sm:w-[48px] ${
                    active ? 'bg-brand text-white ring-2 ring-brand sm:ring-0' : 'bg-ink/[0.06] text-ink'
                  }`}
                >
                  <item.icon className="h-[clamp(17px,4.4vw,20px)] w-[clamp(17px,4.4vw,20px)] sm:h-5 sm:w-5" />
                </span>
              ) : (
                <img
                  src={item.img}
                  alt=""
                  className={`h-[clamp(38px,10vw,48px)] w-[clamp(38px,10vw,48px)] shrink-0 rounded-full object-cover transition-shadow duration-300 sm:h-[48px] sm:w-[48px] ${
                    active ? 'ring-2 ring-brand sm:ring-0' : ''
                  }`}
                />
              )}
              <div>
                <div
                  className={`font-sans text-[clamp(13px,3.6vw,16px)] font-medium sm:text-[16px] ${active ? 'text-brand' : 'text-ink'}`}
                >
                  {item.label}
                </div>
                <span
                  className="flex items-center gap-1 font-sans text-[clamp(11px,3vw,14px)] text-secondary transition-colors hover:text-ink sm:text-[14px]"
                >
                  View <span aria-hidden="true">&#8599;</span>
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {canScrollRight && (
        // Not sm:hidden any more: with five chips the strip can overflow on
        // mid-size screens too, and the hint only renders when there is
        // actually somewhere to scroll to.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end bg-gradient-to-l from-glass from-40% to-transparent pr-2"
        >
          <motion.span
            animate={reducedMotion ? undefined : { x: [0, 5, 0] }}
            transition={{ duration: 1.3, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
            className="text-[17px] text-ink/40"
          >
            &#8250;
          </motion.span>
        </div>
      )}
    </motion.div>
  )
}
