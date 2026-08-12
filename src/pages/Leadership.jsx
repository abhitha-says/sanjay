import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence, MotionConfig } from 'framer-motion'
import leadershipHero from '../assets/leadership-hero.png'
import cscmpNewsletter from '../assets/gallery/cscmp-newsletter-launch-2011.jpg'
import felicitatedMinisterKhot from '../assets/gallery/felicitated-minister-khot.jpg'
import moderatorCscmpEvent from '../assets/gallery/moderator-cscmp-event.jpg'
import mhadaCeo from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'
import withSanjivSanyal from '../assets/gallery/with-sanjiv-sanyal.jpg'
import stXaviers from '../assets/gallery/st-xaviers-150-years.jpg'
import withSudhirMungantiwar from '../assets/gallery/with-sudhir-mungantiwar.jpg'
import withSunilPal from '../assets/gallery/with-sunil-pal.jpg'
import withAshaBhosle from '../assets/gallery/with-asha-bhosle.jpg'

const ease = [0.22, 1, 0.36, 1]

// Touch devices never fire hover, so anything revealed on hover alone is
// unreachable there. Used to keep hover-revealed copy permanently visible.
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)')
    const sync = () => setCoarse(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return coarse
}

// ── Data ─────────────────────────────────────────────────────────────────────

const groupLeadership = [
  {
    title: 'Chairman',
    org: 'GTC Group',
    period: '2006 – Present',
    description: 'Group vision and direction, with an eye on growth, employee welfare and social acceptance.',
    color: '#2d7a3a',
    image: felicitatedMinisterKhot,
    imageCaption: 'Felicitated by Shri Sada Bhau Khot, Hon. Minister, Govt of Maharashtra',
    imagePosition: '50% 30%',
  },
  {
    title: 'President',
    org: 'GTC Corporation',
    period: '1997 – Present',
    description: 'All management operations and decisions across the group.',
    color: '#1a5c7a',
    image: moderatorCscmpEvent,
    imageCaption: 'Moderator at a Council of Supply Chain Management Professionals (USA) event',
    imagePosition: '50% 30%',
  },
  {
    title: 'Managing Partner',
    org: 'GTC Enterprises',
    period: '2012 – Present',
    description: 'Development of low-cost housing for the Mumbai Metropolitan Region.',
    color: '#7a4f1a',
    image: mhadaCeo,
    imageCaption: 'With MHADA CEO, Shri Sanjiv Jaiswal, IAS at a housing policy roundtable',
    imagePosition: '50% 28%',
  },
  {
    title: 'Chief Executive Officer',
    org: 'Agrawal Business Network LLP',
    period: '2025 – Present',
    description: 'A network for member enterprises to trade with each other. Started 2025.',
    color: '#5a2d7a',
    image: withSanjivSanyal,
    imageCaption: 'With Shri Sanjiv Sanyal, Economic Adviser to the Prime Minister of India',
    imagePosition: '50% 30%',
  },
]

const chambers = [
  {
    title: 'Vice Chairman',
    org: 'Navi Mumbai Chamber of Commerce, Business and Industry',
    period: '2016 – Present',
    category: 'Commerce',
  },
  {
    title: 'Vice President — Maharashtra',
    org: 'Akhil Bhartiya Agrawal Sammelan',
    period: 'Present',
    category: 'Community',
  },
  {
    title: 'Past President',
    org: 'Agarwal Samaj, Kharghar, Navi Mumbai',
    period: 'Former',
    category: 'Community',
  },
  {
    // 'Former' rather than a year range — the exact tenure isn't confirmed.
    title: 'Governing Council Member',
    org: 'Maharashtra Chamber of Commerce, Industry and Agriculture',
    period: 'Former',
    category: 'Industry',
    image: felicitatedMinisterKhot,
    caption: 'Felicitated by Shri Sada Bhau Khot, Hon. Minister, Govt of Maharashtra',
    imagePosition: '50% 30%',
  },
  {
    title: 'Vice President — India',
    org: 'Council of Supply Chain Management Professionals, USA',
    period: 'Former',
    category: 'Supply Chain',
    image: cscmpNewsletter,
    caption: 'Launch of the CSCMP (USA) Newsletter in India, 2011',
    imagePosition: '50% 40%',
  },
  {
    title: 'India Partner',
    org: 'Supply Chain Asia, Singapore',
    period: '2006 – 2025',
    category: 'Global',
  },
  {
    title: 'Country Reviewer – Bangladesh',
    org: 'International Pet Animal Transport Association',
    period: '2013 – 2025',
    category: 'International',
  },
  {
    title: 'Secretary, West Zone',
    org: "St. Xavier's College Calcutta Alumni Association",
    period: '2006 – Present',
    category: 'Alumni',
    image: stXaviers,
    caption: "St. Xavier's College Calcutta — 150-year anniversary celebration",
    imagePosition: '50% 35%',
  },
]

const boards = [
  { title: 'Independent Director', org: 'Suvidhaa.com', period: '2020 – 2021' },
  { title: 'Director', org: 'Disha Loharuka Infratech Pvt Ltd', period: '2011 – 2025' },
  { title: 'Director', org: 'Pet Travel Private Limited', period: '2012 – 2025' },
  { title: 'Director', org: 'Hamilton Greens Pvt. Ltd.', period: '2008 – 2015' },
  { title: 'Director', org: 'GTC Cargo Pvt Limited', period: '2006 – 2012' },
  { title: 'Director', org: 'Prakash Packers & Movers Pvt Ltd', period: '2009 – 2011' },
  { title: 'Director', org: 'Ideal Insurance Brokers Pvt. Ltd.', period: '2010 – 2011' },
  { title: 'Director', org: 'HR Invent Pvt. Ltd.', period: '2006 – 2011' },
]

const memberships = [
  'Confederation of Indian Industry',
  "Indian Merchants' Chamber",
  'Bombay Chamber of Commerce & Industry',
  'Council of Supply Chain Management Professionals (USA)',
  'All India Goods Transport Congress',
  'Bombay Goods Transport Association',
  'Lions Clubs International',
]

// ── HERO (exactly modelled on MediaHero) ─────────────────────────────────────

function BgWatermark() {
  const coarse = useCoarsePointer()

  // Desktop: spring-based mouse parallax
  const mx    = useMotionValue(0)
  const sx    = useSpring(mx, { stiffness: 40, damping: 25 })
  const mouseX = useTransform(sx, [-1, 1], [-3, 3])

  // Mobile/touch: gentle scroll-driven drift — replaces the mouse movement
  const { scrollY } = useScroll()
  const scrollX = useTransform(scrollY, [0, 400], [0, -8])

  // Use scroll-based x on touch, mouse-based x on desktop
  const x = coarse ? scrollX : mouseX

  useEffect(() => {
    if (coarse) return  // mousemove listener not needed on touch devices
    function handle(e) { mx.set((e.clientX / window.innerWidth) * 2 - 1) }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [mx, coarse])

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
          left: '3%',
          top: '9%',
          fontFamily: '"Cormorant Garamond", serif',
          // Cormorant Garamond ships 300–700 only; asking for 900 makes the
          // browser synthesize a smeared fake bold.
          fontWeight: 700,
          lineHeight: 0.86,
          letterSpacing: '-4px',
          opacity: 0.04,
          fontSize: 'clamp(80px, 17vw, 280px)',
          color: '#111111',
        }}
      >
        <div className="whitespace-nowrap">Leadership</div>
      </motion.div>
    </motion.div>
  )
}

function LeadershipImage() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const x = useTransform(sx, [-1, 1], [-6, 6])
  const y = useTransform(sy, [-1, 1], [-4, 4])

  // Mobile: scroll-driven vertical parallax — adapts the desktop mouse-y drift
  // (±4px from cursor position) to a scroll-driven equivalent on touch devices.
  const { scrollY } = useScroll()
  const mobileImgY = useTransform(scrollY, [0, 400], ['0%', '-5%'])

  function handleMouseMove(e) {
    // Guard: skip on touch/coarse-pointer devices — mousemove can still fire
    // on some touch browsers and would produce jarring jumps without hover intent.
    if (!window.matchMedia('(hover: hover)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <>
      {/* ── Mobile full-bleed backdrop (< md) ───────────────────────────────────
          On mobile the image becomes an absolute layer behind the whole hero,
          exactly like Journey's portrait treatment. Face sits in the upper
          portion; the bottom gradient eases into the text area.
      */}
      <div className="absolute inset-0 z-0 md:hidden" aria-hidden="false">
        <motion.img
          src={leadershipHero}
          alt="Dr. Sanjay Goel — Chairman, GTC Group"
          fetchpriority="high"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease }}
          style={{ y: mobileImgY, objectPosition: '82% 15%' }}
          className="h-full w-full object-cover"
        />
        {/* Two-stop gradient: light vignette at top, heavy fade at bottom so
            text sits cleanly over the image just like Journey. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/30 to-bg/90" />

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease }}
          aria-hidden="true"
          className="absolute bottom-[28%] right-5 z-20"
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(16px, 4.2vw, 22px)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'rgba(100,70,30,0.55)',
              letterSpacing: '0.3px',
            }}
          >
            Sanjay Goel
          </span>
        </motion.div>
      </div>

      {/* ── Desktop / Tablet panel (≥ md) — unchanged ───────────────────────── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0) }}
        className="hidden md:absolute md:bottom-0 md:right-0 md:z-10 md:block md:h-[100%] md:w-[78%]"
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, scale: 1.06, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease }}
        >
          <motion.img
            src={leadershipHero}
            alt="Dr. Sanjay Goel — Chairman, GTC Group"
            fetchpriority="high"
            style={{
              x,
              y,
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 6%, rgba(0,0,0,0.12) 15%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.85) 42%, black 56%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, black 20%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 6%, rgba(0,0,0,0.12) 15%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.85) 42%, black 56%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, black 20%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
            className="h-full w-full object-cover object-[50%_15%]"
          />
        </motion.div>

        {/* Elegant signature bottom-right */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease }}
          aria-hidden="true"
          className="absolute bottom-8 right-6 z-20 md:bottom-10 md:right-10 lg:right-16"
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(18px, 2.2vw, 32px)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'rgba(100,70,30,0.55)',
              letterSpacing: '0.3px',
            }}
          >
            Sanjay Goel
          </span>
        </motion.div>
      </div>
    </>
  )
}

function LeadershipHero() {
  return (
    /*
      Mobile  (< md) — Portrait-led editorial matching Journey's composition.
        h-[calc(100svh-72px)] subtracts the 72px in-flow header, exactly like
        Journey. The image is an absolute full-bleed backdrop; justify-end +
        pb-16 anchors all content at the bottom so the eye reads:
        face → back-link → number → title → line → description → stats.

      Desktop (≥ md) — Cinematic: full h-screen, image panel on the right,
        content column on the left. Unchanged from original.
    */
    <section className="relative h-[100svh] w-full overflow-hidden">
      <BgWatermark />

      {/* Image — mobile: absolute backdrop; desktop: right panel */}
      <LeadershipImage />

      {/* Text content */}
      {/*
        Mobile  — flex-col justify-end pb-16 px-5: content stacks at the
          bottom over the image, left-aligned, same rhythm as Journey.
        Desktop — md:absolute left column, vertically centred.
      */}
      <div className="relative z-20 flex h-full flex-col justify-end px-5 pb-10 pt-24 md:absolute md:inset-y-0 md:left-0 md:flex md:h-full md:w-auto md:justify-center md:px-0 md:pb-0 md:pt-0 md:pl-20 md:translate-x-[30px] lg:max-w-[540px]">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mb-5 md:mb-8"
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
          04
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.84, ease }}
          className="mt-2 whitespace-nowrap font-serif leading-[1.02] text-ink"
          style={{ letterSpacing: '-2px', fontWeight: 700, fontSize: 'clamp(44px, 6vw, 96px)' }}
        >
          Leader<span style={{ color: '#2d7a3a' }}>ship</span>
        </motion.h1>

        {/* Red accent line */}
        <motion.span
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease }}
          className="mt-4 block h-[2px] w-10 origin-left bg-accent"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease }}
          className="mt-4 max-w-[420px] font-sans text-[14.5px] leading-[23px] text-secondary sm:text-[15px] sm:leading-[25px] md:max-w-[440px] md:text-[17px] md:leading-[28px] md:tracking-[-0.026em]"
        >
          Chairman of one group, vice chairman of a chamber, and a seat on the boards of a dozen companies.
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease }}
          className="mt-4 flex flex-nowrap gap-2 md:mt-8 md:gap-3"
        >
          {[
            { num: '4+', label: 'Group Companies' },
            { num: '12', label: 'Directorships' },
            { num: '28+', label: 'Years' },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="flex-1 rounded-[14px] border border-border bg-white/60 backdrop-blur-sm px-2 py-2 text-center md:flex-none md:px-4 md:py-2.5"
            >
              <div
                className="font-serif text-[22px] leading-none tabular-nums lining-nums text-ink md:text-[30px]"
                style={{ fontWeight: 700, letterSpacing: '-0.5px' }}
              >
                {num}
              </div>
              <div className="mt-0.5 font-sans text-[8px] font-semibold uppercase tracking-[0.08em] text-secondary md:text-[10px] md:tracking-[0.1em]">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9, ease }}
          className="mt-10 hidden items-center gap-3 md:flex md:mt-16"
          aria-hidden="true"
        >
          <span className="h-[26px] w-px bg-border" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary/70">
            Scroll for the full record
          </span>
        </motion.div>
      </div>
    </section>
  )
}

// ── Enterprise Leadership Card ────────────────────────────────────────────────

function EnterpriseCard({ role, index }) {
  const [hovered, setHovered] = useState(false)
  const coarse = useCoarsePointer()
  const showDescription = hovered || coarse

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-[24px] [corner-shape:squircle] aspect-[4/3]">
        <motion.img
          src={role.image}
          alt={role.imageCaption}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.8, ease }}
          className="h-full w-full object-cover"
          style={{ objectPosition: role.imagePosition ?? '50% 50%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-5 right-5">
          <span className="rounded-[999px] bg-black/40 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tabular-nums lining-nums tracking-[0.1em] text-white/90 backdrop-blur-md">
            {role.period}
          </span>
        </div>

        <div
          className="absolute top-5 left-5 h-2.5 w-2.5 rounded-full"
          style={{ background: role.color }}
        />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-1">
            {role.org}
          </div>
          <h3 className="font-serif text-[clamp(22px,2.5vw,30px)] font-bold text-white leading-tight">
            {role.title}
          </h3>
          <motion.p
            animate={{ opacity: showDescription ? 1 : 0, y: showDescription ? 0 : 10 }}
            transition={{ duration: 0.35 }}
            className="mt-2 font-sans text-[13.5px] leading-[21px] tracking-[-0.006em] text-white/75"
          >
            {role.description}
          </motion.p>
        </div>
      </div>

      <p className="mt-3 font-sans text-[12.5px] italic leading-[19px] text-secondary px-1">
        {role.imageCaption}
      </p>
    </motion.div>
  )
}

// ── Chambers Row ─────────────────────────────────────────────────────────────

function ChamberRow({ role, index }) {
  const [expanded, setExpanded] = useState(false)
  const hasImage = !!role.image

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.35), ease }}
      className={`group border-b border-border ${hasImage ? 'cursor-pointer' : ''}`}
      onClick={() => hasImage && setExpanded(!expanded)}
      {...(hasImage && {
        role: 'button',
        tabIndex: 0,
        'aria-expanded': expanded,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded((v) => !v)
          }
        },
      })}
    >
      {/* Mobile  : 3-col  [20px index | 1fr content | auto period+toggle]
           ≥ md    : 4-col  [32px | 90px category | 1fr | 140px]
           The category col is hidden on mobile; the badge moves into the
           content cell so INTERNATIONAL never bleeds into the title col. */}
      <div className="grid grid-cols-[20px_1fr_auto] items-start gap-x-3 py-5 md:grid-cols-[32px_90px_1fr_140px] md:gap-x-5">

        {/* Col 1: row index */}
        <div className="pt-[3px] font-sans text-[12px] font-semibold text-secondary/40 tabular-nums lining-nums">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Col 2: category badge — desktop only.
             display:none removes it from mobile grid flow entirely so it
             doesn't consume a column slot at narrow widths. */}
        <div className="hidden pt-[4px] md:block">
          <span className="inline-block rounded-[6px] bg-brand/10 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-brand leading-[1.6]">
            {role.category}
          </span>
        </div>

        {/* Col 3 (mobile col 2): title + org.
             Badge is injected here on mobile so it sits above the title
             with full 1fr width available — no column collision possible. */}
        <div className="min-w-0">
          <div className="mb-1.5 md:hidden">
            <span className="inline-block rounded-[6px] bg-brand/10 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-brand leading-[1.6]">
              {role.category}
            </span>
          </div>
          <h3 className="font-serif text-[18px] font-bold leading-snug text-ink group-hover:text-brand transition-colors duration-200">
            {role.title}
          </h3>
          <div className="mt-0.5 font-sans text-[13px] tracking-[-0.006em] text-secondary leading-snug">{role.org}</div>
        </div>

        {/* Col 4: period + toggle */}
        <div className="flex items-center justify-end gap-3 pt-[3px] shrink-0">
          <span className="font-sans text-[11px] font-bold uppercase tabular-nums lining-nums tracking-[0.1em] text-brand whitespace-nowrap">
            {role.period}
          </span>
          {hasImage && (
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="h-[22px] w-[22px] shrink-0 rounded-full border border-border bg-white/70 flex items-center justify-center text-secondary text-[14px] leading-none"
            >
              +
            </motion.div>
          )}
        </div>
      </div>

      {/* Expandable image panel */}
      <AnimatePresence>
        {expanded && role.image && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="pl-0 md:pl-[162px] pb-6 flex gap-5 items-start">
              <div className="relative overflow-hidden rounded-[18px] [corner-shape:squircle] w-full max-w-[400px] aspect-[4/3] shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <img
                  src={role.image}
                  alt={role.caption}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: role.imagePosition ?? '50% 30%' }}
                />
              </div>
              <p className="hidden md:block font-sans text-[13.5px] italic leading-[22px] tracking-[-0.006em] text-secondary max-w-[240px] mt-3">
                {role.caption}
              </p>
            </div>
            <p className="pb-4 font-sans text-[13px] italic tracking-[-0.006em] text-secondary md:hidden">{role.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Spotlight Photos (BIG 2-column) ───────────────────────────────────────────

function SpotlightPhotoCard({ src, caption, pos, index, aspectClass = 'aspect-[4/3]' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.figure
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.12, ease }}
      className="group relative m-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-[20px] [corner-shape:squircle] shadow-[0_6px_32px_rgba(0,0,0,0.1)] transition-shadow duration-500 group-hover:shadow-[0_16px_56px_rgba(0,0,0,0.18)] ${aspectClass}`}
      >
        <motion.img
          src={src}
          alt={caption}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease }}
          className="h-full w-full object-cover"
          style={{ objectPosition: pos }}
        />

        {/* Gradient bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Caption: always visible, lifts on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <motion.p
            animate={{ opacity: hovered ? 1 : 0.75, y: hovered ? 0 : 3 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-[12.5px] leading-[19px] text-white font-medium"
          >
            {caption}
          </motion.p>
        </div>
      </div>
    </motion.figure>
  )
}

function SpotlightGrid() {
  // All three images are near-square group shots — use aspect-[4/3] landscape
  // so full figures are visible. object-position tuned per image.
  const photos = [
    {
      src: withAshaBhosle,
      caption: 'With the late Asha Bhosle Tai — a moment of warmth and admiration',
      // Square image, faces in upper half
      pos: '50% 20%',
      aspect: 'aspect-[4/3]',
    },
    {
      src: withSudhirMungantiwar,
      caption: 'With Shri Sudhir Bhau Mungantiwar, former Finance Minister, Govt. of Maharashtra',
      // Portrait, people in centre — show upper body
      pos: '50% 28%',
      aspect: 'aspect-[4/3]',
    },
    {
      src: withSunilPal,
      caption: 'With comedian and social activist Shri Sunil Pal',
      // Square, faces fill upper 60%
      pos: '50% 22%',
      aspect: 'aspect-[4/3]',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {photos.map(({ src, caption, pos, aspect }, i) => (
        <SpotlightPhotoCard
          key={caption}
          src={src}
          caption={caption}
          pos={pos}
          index={i}
          aspectClass={aspect}
        />
      ))}
    </div>
  )
}

// ── Board Grid ────────────────────────────────────────────────────────────────

function BoardCell({ board, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.4), ease }}
      className="group relative rounded-[18px] [corner-shape:squircle] border border-border bg-white/50 p-5 transition-all duration-300 hover:border-brand/20 hover:bg-white/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-[18px] bg-brand origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
      <div className="font-sans text-[11px] font-bold uppercase tabular-nums lining-nums tracking-[0.12em] text-brand mb-2">
        {board.period}
      </div>
      <h3 className="font-serif text-[17px] font-bold leading-snug tracking-[-0.026em] text-ink">{board.title}</h3>
      <div className="mt-1 font-sans text-[13.5px] tracking-[-0.006em] text-secondary leading-snug">{board.org}</div>
    </motion.div>
  )
}

// ── Membership Tags ───────────────────────────────────────────────────────────

function MembershipTag({ name, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      whileHover={{ scale: 1.04, y: -2 }}
      className="inline-block cursor-default rounded-[12px] [corner-shape:squircle] border border-border bg-white/60 px-4 py-2.5 font-sans text-[13.5px] tracking-[-0.006em] font-medium text-ink shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      {name}
    </motion.span>
  )
}

// ── Award Banner ─────────────────────────────────────────────────────────────

function AwardBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease }}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-[1px] rounded-[29px] opacity-60"
        style={{ background: 'linear-gradient(135deg, #2d7a3a 0%, #1a5c7a 50%, #2d7a3a 100%)' }}
      />
      <div className="relative rounded-[28px] [corner-shape:squircle] bg-ink overflow-hidden px-8 py-10 md:px-14 md:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full opacity-20 blur-[80px]" style={{ background: '#1a5c7a' }} />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="m9 13.5-1.5 7 4.5-2.5 4.5 2.5-1.5-7" />
            </svg>
          </div>
          <div className="flex-1">
            <span className="font-sans text-[11px] font-bold uppercase lining-nums tracking-[0.18em] text-brand/90">Recognition · May 2015</span>
            <h3 className="mt-2 font-serif font-bold text-white leading-tight" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              Super Achiever Award
            </h3>
            <p className="mt-4 max-w-[520px] font-sans text-[15px] leading-[27px] tracking-[-0.016em] text-white/60">
              Issued by the Oriental College of Management for progressive work with GTC Group.
            </p>
          </div>
          <div className="shrink-0 lg:w-[180px] lg:border-l lg:border-white/10 lg:pl-10">
            <p className="font-serif text-[17px] italic leading-[28px] tracking-[-0.026em] text-white/35">
              "Acknowledging leadership, vision and consistent contribution."
            </p>
            <span className="mt-4 block h-[2px] w-10 bg-brand/60" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section Label ─────────────────────────────────────────────────────────────

function SectionLabel({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease }}
      className="mb-12"
    >
      <span className="font-sans text-[12px] font-bold uppercase lining-nums tracking-[0.16em] text-brand">{eyebrow}</span>
      <h2 className="mt-2 font-serif font-bold leading-tight text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', letterSpacing: '-0.5px' }}>
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-[480px] font-sans text-[15px] leading-[26px] tracking-[-0.016em] text-secondary">{description}</p>
      )}
    </motion.div>
  )
}

// ── Back-home button (transition-aware) ───────────────────────────────────────
function BackHomeBtn() {
  const go = useTransitionNavigate()
  return (
    <button
      onClick={() => go('/')}
      className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-sans text-[13px] tracking-[-0.006em] text-secondary transition-colors hover:text-ink"
      aria-label="Back home"
    >
      <span aria-hidden="true">←</span> Back home
    </button>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Leadership() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative z-20 -mt-[72px]">
      {/* HERO — exactly like Media page */}
      <LeadershipHero />

      {/* ── Enterprise Leadership ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20">
        <SectionLabel
          eyebrow="Group"
          title="Enterprise Leadership"
          description="Four roles inside the group: the operating company since 1997, the chairmanship since 2006, the housing arm since 2012, and a business network started in 2025."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {groupLeadership.map((role, i) => (
            <EnterpriseCard key={role.title + role.org} role={role} index={i} />
          ))}
        </div>
      </section>

      {/* ── Chambers & Bodies ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20">
        <SectionLabel
          eyebrow="Industry"
          title="Chambers & Bodies"
          description="Eight posts, from Kharghar to Calcutta to Singapore — and a stint reviewing Bangladesh for the international pet transport association."
        />

        {/* BIG spotlight photos first */}
        <div className="mb-14">
          <SpotlightGrid />
        </div>

        {/* Chamber rows below */}
        <div className="max-w-[860px]">
          {chambers.map((role, i) => (
            <ChamberRow key={role.title + role.org} role={role} index={i} />
          ))}
        </div>
      </section>

      {/* ── Board Directorships ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20">
        <SectionLabel
          eyebrow="Governance"
          title="Board Directorships"
          description="Eight directorships since 2006 — cargo, insurance broking, movers, infrastructure, and one payments company."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {boards.map((board, i) => (
            <BoardCell key={board.title + board.org} board={board} index={i} />
          ))}
        </div>
      </section>

      {/* ── Memberships ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
          <div className="lg:w-[300px] shrink-0 mb-10 lg:mb-0">
            <SectionLabel
              eyebrow="Since 1988"
              title="Professional Memberships"
              description="Seven bodies, the earliest joined in 1988 — from the Bombay Goods Transport Association to Lions Clubs International."
            />
          </div>
          <div className="flex flex-wrap gap-3 content-start pt-1">
            {memberships.map((name, i) => (
              <MembershipTag key={name} name={name} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Award ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20 pb-28 md:pb-40">
        <SectionLabel eyebrow="Recognition" title="Super Achiever Award" />
        <AwardBanner />
      </section>
    </main>
    </MotionConfig>
  )
}
