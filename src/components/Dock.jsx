import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { useTransition } from '../context/TransitionContext'

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
    label: 'Leadership',
    to: '/leadership',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    label: 'Media',
    to: '/media',
    img: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=100&h=100&fit=crop',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.68, ease }}
      className="dock-root relative z-30 mx-4 mb-4 flex h-[140px] items-stretch overflow-hidden rounded-dock bg-glass shadow-soft backdrop-blur-[20px] md:mx-8 md:mb-8 lg:mx-14"
      style={{ pointerEvents: isTransitioning ? 'none' : undefined }}
    >
      {/* Discover more button */}
      <motion.button
        onClick={() => go('/discover-more')}
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ duration: 0.25, ease }}
        className="flex w-[124px] shrink-0 cursor-pointer items-center justify-between gap-1 bg-ink px-4 font-sans text-white sm:w-[250px] sm:gap-0 sm:px-8"
        aria-label="Discover more"
      >
        <span className="text-[13px] font-medium leading-tight sm:text-[18px]">Discover more</span>
        <span className="relative top-0 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-[13px] sm:top-[6px] sm:ml-4 sm:h-9 sm:w-9 sm:text-[17px]">
          &#8599;
        </span>
      </motion.button>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex min-w-0 flex-1 items-center justify-between gap-[10px] overflow-x-auto px-4 py-[6px] sm:gap-[14px] sm:px-6 lg:px-10"
      >
        {items.map((item) => {
          const active = pathname === item.to
          return (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease }}
              onClick={() => go(item.to)}
              className="flex shrink-0 cursor-pointer items-center gap-[6px] whitespace-nowrap"
              role="button"
              aria-label={`Go to ${item.label}`}
            >
              <img
                src={item.img}
                alt=""
                className="h-[48px] w-[48px] shrink-0 rounded-full object-cover"
              />
              <div>
                <div
                  className={`font-sans text-[16px] font-medium ${active ? 'text-brand' : 'text-ink'}`}
                >
                  {item.label}
                </div>
                <span
                  className="flex items-center gap-1 font-sans text-[14px] text-secondary transition-colors hover:text-ink"
                >
                  View <span aria-hidden="true">&#8599;</span>
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {canScrollRight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end bg-gradient-to-l from-glass from-40% to-transparent pr-2 sm:hidden"
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

