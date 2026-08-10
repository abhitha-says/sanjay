import { motion } from 'framer-motion'
import NavMenu from './NavMenu'

export default function Navbar() {
  return (
    <>
      {/* GTC GROUP — scrolls with the page, not fixed */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.92, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex h-[72px] w-full items-center px-8 md:px-14"
      >
        <div className="relative top-[6px] leading-[1.05]">
          <div className="font-sans text-[22px] font-extrabold tracking-tight" style={{ color: '#2d7a3a' }}>
            GTC GROUP
          </div>
          <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary">
            Right People&hellip;Better Results
          </div>
        </div>
      </motion.header>

      {/* NavMenu button — always fixed in top-right */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.92, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-8 top-5 z-[60] md:right-14"
      >
        <NavMenu />
      </motion.div>
    </>
  )
}

