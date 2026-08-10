import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { useLocation } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

const NAV_ITEMS = [
  { label: 'Home',          to: '/',              num: '01' },
  { label: 'Discover More', to: '/discover-more', num: '02' },
  { label: 'Journey',       to: '/journey',       num: '03' },
  { label: 'Experience',    to: '/leadership',    num: '04' },
  { label: 'Initiatives',   to: '/initiatives',   num: '05' },
  { label: 'Media',         to: '/media',         num: '06' },
]

export default function NavMenu() {
  const [open, setOpen] = useState(false)
  const go             = useTransitionNavigate()
  const { pathname }   = useLocation()

  function navigate(to) {
    setOpen(false)
    setTimeout(() => go(to), 260)
  }

  return (
    <>
      {/* Grid-dots trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.18, ease }}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-ink shadow-md"
        style={{ flexShrink: 0 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.22, ease }}
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <line x1="2" y1="2" x2="12" y2="12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="2" x2="2" y2="12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="dots"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ duration: 0.22, ease }}
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="2"  cy="2"  r="1.4" fill="#fff" />
              <circle cx="7"  cy="2"  r="1.4" fill="#fff" />
              <circle cx="12" cy="2"  r="1.4" fill="#fff" />
              <circle cx="2"  cy="7"  r="1.4" fill="#fff" />
              <circle cx="7"  cy="7"  r="1.4" fill="#fff" />
              <circle cx="12" cy="7"  r="1.4" fill="#fff" />
              <circle cx="2"  cy="12" r="1.4" fill="#fff" />
              <circle cx="7"  cy="12" r="1.4" fill="#fff" />
              <circle cx="12" cy="12" r="1.4" fill="#fff" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(17,17,17,0.55)', backdropFilter: 'blur(6px)' }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.97 }}
              transition={{ duration: 0.38, ease }}
              className="fixed right-4 top-4 z-[58] w-[300px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)] md:right-8 md:top-8 md:w-[320px]"
            >
              {/* Header */}
              <div className="border-b border-border px-7 py-5">
                <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary">
                  Navigation
                </div>
                <div className="mt-0.5 font-serif text-[20px] font-black leading-tight text-ink">
                  GTC Group
                </div>
              </div>

              {/* Nav items */}
              <nav className="px-4 py-4">
                {NAV_ITEMS.map((item, i) => {
                  const active = pathname === item.to
                  return (
                    <motion.button
                      key={item.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32, delay: 0.06 + i * 0.05, ease }}
                      onClick={() => navigate(item.to)}
                      className={`group flex w-full cursor-pointer items-center gap-4 rounded-[16px] px-4 py-3.5 text-left transition-colors duration-150 ${
                        active ? 'bg-ink' : 'hover:bg-ink/5'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-[10px] font-black transition-colors ${
                          active ? 'bg-white/15 text-white' : 'bg-ink/8 text-ink'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span
                        className={`font-sans text-[15px] font-semibold tracking-[-0.2px] transition-colors ${
                          active ? 'text-white' : 'text-ink group-hover:text-ink'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`ml-auto font-sans text-[16px] transition-transform duration-200 group-hover:translate-x-0.5 ${
                          active ? 'text-white/50' : 'text-secondary'
                        }`}
                      >
                        ↗
                      </span>
                    </motion.button>
                  )
                })}
              </nav>

              {/* Footer tagline */}
              <div className="border-t border-border px-7 py-4">
                <div className="font-sans text-[10px] tracking-[0.2em] text-secondary/60 uppercase">
                  Right People&hellip;Better Results
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
