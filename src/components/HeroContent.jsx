import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function HeroContent() {
  return (
    <div className="relative z-20 flex h-auto flex-col justify-start px-6 py-4 md:h-full md:justify-center md:px-0 md:pl-20 md:pt-0 md:translate-x-[30px] lg:max-w-[580px]">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 1.03 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.72, ease }}
        className="font-sans text-[20px] font-semibold text-ink"
      >
        01
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30, scale: 1.03 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.84, ease }}
        className="mt-2 font-serif font-black leading-[0.92] text-ink"
        style={{ letterSpacing: '-2px', fontWeight: 900 }}
      >
        <span style={{ fontSize: 'clamp(52px, 6.2vw, 108px)', fontWeight: 900 }}>Dr. </span>
        <span style={{ fontSize: 'clamp(64px, 7.8vw, 138px)', fontWeight: 900 }}>Sanjay</span>
        <br />
        <span
          style={{ fontSize: 'clamp(60px, 7.2vw, 128px)', fontWeight: 900, color: '#2d7a3a' }}
        >
          Goel
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 1.03 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.96, ease }}
        className="mt-3 font-sans text-[18px] leading-[1.6] text-secondary"
      >
        <div>Founder &ndash; Aryavarta Heritage Foundation</div>
        <div>Chairman &ndash; GTC Group</div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 1.08, ease }}
        className="mt-4 block h-[2px] w-10 origin-left bg-accent"
      />

      <motion.p
        initial={{ opacity: 0, y: 30, scale: 1.03 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 1.2, ease }}
        className="mt-3 max-w-[480px] font-sans text-[18px] leading-[30px] text-secondary"
      >
        A visionary leader with a deep commitment to heritage, education, and
        ethical leadership. Driving impact through values and vision.
      </motion.p>
    </div>
  )
}
