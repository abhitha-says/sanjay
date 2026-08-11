import { motion } from 'framer-motion'
import NavMenu from './NavMenu'

export default function Navbar() {
  return (
    <>
      {/* GTC GROUP brand — back to scrolling with the page. It sits at the top
          of each page's own content, so it's visible in that page's hero and
          scrolls away with it, not a bar that persists everywhere. */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex h-[72px] w-full items-center"
      >
        {/*
          max-w-[1680px] mx-auto constrains the brand on ultrawide viewports.
          section-gutter applies the standardised horizontal padding.
        */}
        <div className="flex w-full max-w-[1680px] mx-auto items-center section-gutter">
          <div className="relative top-[6px] leading-[1.05]">
            <div className="font-sans text-[22px] font-extrabold tracking-tight" style={{ color: '#2d7a3a' }}>
              GTC GROUP
            </div>
            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Right People&hellip;Better Results
            </div>
          </div>
        </div>
      </motion.header>

      {/* Nav trigger — fixed independently of the brand header above, so the
          menu icon stays reachable on every page at every scroll position,
          even after the brand has scrolled out of view. */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] md:top-6">
        <div className="mx-auto flex max-w-[1680px] justify-end section-gutter">
          <div className="pointer-events-auto">
            <NavMenu />
          </div>
        </div>
      </div>
    </>
  )
}
