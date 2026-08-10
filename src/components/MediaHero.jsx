import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import heroImage from '../assets/media-hero.png'

const ease = [0.22, 1, 0.36, 1]

// ── Ghost background watermark text (same as home BackgroundText) ────────────
function BgWatermark() {
  const mx = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 25 })
  const x = useTransform(sx, [-1, 1], [-3, 3])

  useEffect(() => {
    function handle(e) { mx.set((e.clientX / window.innerWidth) * 2 - 1) }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [mx])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      <motion.div
        style={{
          x,
          position: 'absolute',
          left: '22%',
          top: '4%',
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 900,
          lineHeight: 0.86,
          letterSpacing: '-4px',
          opacity: 0.05,
          fontSize: 'clamp(70px, 16vw, 250px)',
          color: '#111111',
        }}
      >
        <div className="whitespace-nowrap">Dr. Sanjay</div>
        <div className="whitespace-nowrap" style={{ color: '#2d7a3a' }}>Goel</div>
      </motion.div>
    </motion.div>
  )
}

// ── The photo — right side, same technique as HeroImage ─────────────────────
function MediaImage() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const x = useTransform(sx, [-1, 1], [-8, 8])
  const y = useTransform(sy, [-1, 1], [-5, 5])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      // Identical positioning to HeroImage
      className="relative h-[320px] w-full sm:h-[400px] md:absolute md:bottom-0 md:right-[-3%] md:z-10 md:h-[82%] md:w-[65%] lg:right-[-3%] lg:h-[100%] lg:w-[74%] lg:-translate-y-[10px]"
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 1.08, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.24, ease }}
      >
        <motion.img
          src={heroImage}
          alt="Dr. Sanjay Goel speaking at a conference"
          fetchpriority="high"
          style={{
            x,
            y,
            // Very gradual left + bottom fade — no sharp edges
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 8%, rgba(0,0,0,0.18) 18%, rgba(0,0,0,0.50) 30%, rgba(0,0,0,0.82) 42%, black 58%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 8%, rgba(0,0,0,0.18) 18%, rgba(0,0,0,0.50) 30%, rgba(0,0,0,0.82) 42%, black 58%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 100%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
          className="h-full w-full object-cover object-[55%_18%]"
        />
      </motion.div>

      {/* Signature bottom-right over the image */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.5, ease }}
        aria-hidden="true"
        className="absolute bottom-8 right-6 z-20 md:bottom-10 md:right-10 lg:right-14"
      >
        <span
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(20px, 2.4vw, 34px)',
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'rgba(17,17,17,0.45)',
            letterSpacing: '0.3px',
          }}
        >
          Sanjay Goel
        </span>
      </motion.div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
function BackHomeBtn() {
  const go = useTransitionNavigate()
  return (
    <button
      onClick={() => go('/')}
      className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-sans text-[13px] text-secondary transition-colors hover:text-ink"
      aria-label="Back home"
    >
      <span aria-hidden="true">←</span> Back home
    </button>
  )
}

export default function MediaHero({ index, title, accent, subtitle }) {
  return (
    /* Same container structure as <Hero> on home page */
    <section className="relative min-h-screen w-full md:h-screen md:overflow-hidden">
      <BgWatermark />

      <div className="flex flex-col md:contents">
        {/* Photo — right half */}
        <MediaImage />

        {/* Text content — left half */}
        <div className="relative z-20 flex h-auto flex-col justify-start px-6 py-4 md:h-full md:justify-center md:px-0 md:pl-20 md:pt-0 md:translate-x-[30px] lg:max-w-[540px]">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mb-6 mt-20 md:mt-24"
          >
            <BackHomeBtn />
          </motion.div>

          {/* Index */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 1.03 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.72, ease }}
            className="font-sans text-[20px] font-semibold text-ink"
          >
            {index}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 1.03 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.84, ease }}
            className="mt-2 font-serif font-black leading-[0.92] text-ink"
            style={{ letterSpacing: '-2px', fontWeight: 900, fontSize: 'clamp(52px, 6.5vw, 110px)' }}
          >
            {title}
            <br />
            <span style={{ color: '#2d7a3a' }}>{accent}</span>
          </motion.h1>

          {/* Red accent line */}
          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
            className="mt-4 block h-[2px] w-10 origin-left bg-accent"
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 1.1, ease }}
              className="mt-4 max-w-[440px] font-sans text-[17px] leading-[28px] text-secondary"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
