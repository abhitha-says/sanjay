import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import heroImage from '../assets/media-hero.png'

const ease = [0.22, 1, 0.36, 1]

// ── Ghost background watermark text ────────────────────────────────────────────
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
    <>
      {/* ── Mobile backdrop (< md) — same cinematic treatment as Journey ──────
          Image fills the full section; face/subject sits in upper 60% so the
          eye reads: person → back-link → typography → subtitle, travelling down.
          Two-stop gradient keeps the subject as a presiding presence while the
          text block below stays clean.
      */}
      <div className="absolute inset-0 z-0 md:hidden" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover opacity-[0.32]"
          style={{ objectPosition: '80% 15%' }}
        />
        {/* from-transparent: warm golden image colour dominates at the top,
            seamlessly matching the page background behind the navbar. */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg/90" />
      </div>

      {/* ── Desktop / Tablet image panel (≥ md) — unchanged ─────────────────── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0) }}
        className="absolute inset-0 z-0 hidden md:block"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06, x: 30 }}
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
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 6%, rgba(0,0,0,0.12) 16%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.80) 40%, black 54%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 6%, rgba(0,0,0,0.12) 16%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.80) 40%, black 54%)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              objectPosition: '50% 15%',
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        {/* Signature bottom-right over the image */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease }}
          aria-hidden="true"
          className="absolute bottom-10 right-10 z-20 lg:bottom-14 lg:right-16"
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'rgba(17,17,17,0.55)',
              letterSpacing: '0.5px',
            }}
          >
            Sanjay Goel
          </span>
        </motion.div>
      </div>
    </>
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
    /*
      Mobile  (< md) — Portrait-led editorial matching Journey's composition.
        Media.jsx uses -mt-[72px] so the section starts behind the navbar;
        h-[100svh] therefore fills the full viewport correctly.
        justify-end + pb-16 anchors the text at the bottom;
        the subject's face/conference scene occupies the upper area.

      Desktop (≥ md) — Cinematic: full h-screen, content vertically centred
        on the left, image covers the right half with a mask fade.
    */
    <section className="relative h-[100svh] w-full overflow-hidden md:h-screen">

      <BgWatermark />

      {/* Full-bleed image — mobile backdrop + desktop panel */}
      <MediaImage />

      {/* Text content */}
      <div className="relative z-20 flex h-full flex-col justify-end px-5 pb-16 pt-20 md:justify-center md:pb-0 md:pt-0 md:pl-20 lg:max-w-[540px] lg:pl-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mb-5 md:mb-6"
        >
          <BackHomeBtn />
        </motion.div>

        {/* Index */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.72, ease }}
          className="font-sans text-[20px] font-semibold tabular-nums lining-nums tracking-[-0.023em] text-ink"
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

        {/* Accent line */}
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
            className="mt-4 max-w-[420px] font-sans text-[14.5px] leading-[23px] text-secondary sm:text-[15px] sm:leading-[25px] md:max-w-[440px] md:text-[17px] md:leading-[28px]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
