import { motion } from 'framer-motion'
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.68, ease }}
      className="relative z-30 mx-4 mb-4 flex h-[140px] items-stretch overflow-hidden rounded-dock bg-glass shadow-soft backdrop-blur-[20px] md:mx-8 md:mb-8 lg:mx-14"
      style={{ pointerEvents: isTransitioning ? 'none' : undefined }}
    >
      {/* Discover more button */}
      <motion.button
        onClick={() => go('/discover-more')}
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ duration: 0.25, ease }}
        className="flex w-[250px] shrink-0 cursor-pointer items-center justify-between bg-ink px-8 font-sans text-white"
        aria-label="Discover more"
      >
        <span className="text-[18px] font-medium">Discover more</span>
        <span className="relative top-[6px] ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-[17px]">
          &#8599;
        </span>
      </motion.button>

      <div className="scrollbar-hide flex min-w-0 flex-1 items-center justify-between gap-[14px] overflow-x-auto px-6 py-[6px] lg:px-10">
        {items.map((item) => {
          const active = pathname === item.to
          return (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease }}
              className="flex shrink-0 items-center gap-[6px] whitespace-nowrap"
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
                <button
                  onClick={() => go(item.to)}
                  className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-sans text-[14px] text-secondary transition-colors hover:text-ink"
                  aria-label={`Go to ${item.label}`}
                >
                  View <span aria-hidden="true">&#8599;</span>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

