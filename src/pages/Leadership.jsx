import { useState, useEffect } from 'react'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionConfig } from 'framer-motion'
import leadershipHero from '../assets/leadership-hero.png'
import cscmpNewsletter from '../assets/gallery/cscmp-newsletter-launch-2011.jpg'
import felicitatedMinisterKhot from '../assets/gallery/felicitated-minister-khot.jpg'
import moderatorCscmpEvent from '../assets/gallery/moderator-cscmp-event.jpg'
import speakingConference from '../assets/gallery/speaking-conference-2012.jpg'
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
    description: 'Leading a dynamic business network with a vision for collaborative growth.',
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
    title: 'Co-Chairman, Supply Chain & Logistics Committee',
    org: 'Maharashtra Chamber of Commerce, Industry & Agriculture',
    period: '2015 – 2020',
    category: 'Industry',
    image: felicitatedMinisterKhot,
    caption: 'Felicitated by Shri Sada Bhau Khot, Hon. Minister, Govt of Maharashtra',
    imagePosition: '50% 30%',
  },
  {
    title: 'Country Representative – India',
    org: 'Supply Chain Asia',
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
    title: 'Hon. Secretary, Mumbai Round Table',
    org: 'Council of Supply Chain Management Professionals',
    period: '2012 – 2014',
    category: 'Supply Chain',
    image: cscmpNewsletter,
    caption: 'Launch of the CSCMP (USA) Newsletter in India, 2011',
    imagePosition: '50% 40%',
  },
  {
    title: 'Vice President, Programs',
    org: 'CSCMP Mumbai Round Table',
    period: '2014 – 2015',
    category: 'Supply Chain',
    image: speakingConference,
    caption: 'Speaking at an international supply chain conference — 2012',
    imagePosition: '50% 18%',
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

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      // 3.png is landscape — we show the full image but shifted right so Dr. Goel's
      // face dominates; the text column on the left naturally overlaps the building half.
      className="relative h-[340px] w-full sm:h-[440px] md:absolute md:bottom-0 md:right-0 md:z-10 md:h-[88%] md:w-[72%] lg:h-[100%] lg:w-[78%]"
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
            // Left fade so the page background shows through and text is readable
            // Bottom fade merges with the page at the footer edge
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
          // object-position: show the right portion of 3.png (where Dr. Goel is)
          className="h-full w-full object-cover object-[65%_15%]"
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
  )
}

function LeadershipHero() {
  return (
    <section className="relative min-h-screen w-full md:h-screen md:overflow-hidden">
      <BgWatermark />

      <div className="flex flex-col md:contents">
        {/* Photo — right half */}
        <LeadershipImage />

        {/* Text content — left half */}
        <div className="relative z-20 flex h-auto flex-col justify-start px-6 py-4 md:h-full md:justify-center md:px-0 md:pl-20 md:pt-0 md:translate-x-[30px] lg:max-w-[540px]">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mb-8 mt-28 md:mt-32"
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
            className="mt-4 max-w-[440px] font-sans text-[17px] leading-[28px] tracking-[-0.026em] text-secondary"
          >
            Governance and stewardship across a diversified group, industry chambers, and the boards of a dozen companies.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {[
              { num: '4+', label: 'Group Companies' },
              { num: '12', label: 'Directorships' },
              { num: '28+', label: 'Years' },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="rounded-[14px] [corner-shape:squircle] border border-border bg-white/60 backdrop-blur-sm px-4 py-2.5 text-center [@media(prefers-reduced-transparency:reduce)]:bg-white"
              >
                {/* Cormorant runs light and small on the body; the stat needs
                    a size bump at a real 700 to carry the same weight the
                    synthetic 900 was faking. */}
                <div
                  className="font-serif text-[30px] leading-none tabular-nums lining-nums text-ink"
                  style={{ fontWeight: 700, letterSpacing: '-0.5px' }}
                >
                  {num}
                </div>
                <div className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll cue — fills the lower-left composition and signals depth */}
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
      {/* Clean 4-col grid: index | category | title+org | period + toggle */}
      <div className="grid grid-cols-[28px_80px_1fr_auto] items-start gap-x-5 py-5 md:grid-cols-[32px_90px_1fr_140px]">

        {/* Col 1: row index */}
        <div className="pt-[3px] font-sans text-[12px] font-semibold text-secondary/40 tabular-nums lining-nums">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Col 2: category badge */}
        <div className="pt-[4px]">
          <span className="inline-block rounded-[6px] bg-brand/10 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-brand leading-[1.6]">
            {role.category}
          </span>
        </div>

        {/* Col 3: title + org */}
        <div className="min-w-0">
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
              Issued by the Oriental College of Management in recognition of achievements and progressive work with GTC Group — acknowledging four decades of leadership, vision, and consistent contribution to business and society.
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
  return (
    <MotionConfig reducedMotion="user">
    <main className="relative z-20">
      {/* HERO — exactly like Media page */}
      <LeadershipHero />

      {/* ── Enterprise Leadership ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20">
        <SectionLabel
          eyebrow="Group"
          title="Enterprise Leadership"
          description="Four leadership roles that together form the backbone of the GTC Group — steering vision, operations, real estate, and network strategy."
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
          description="Active governance across national and international industry bodies — advocating, building, and representing."
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
          description="Serving as director and independent director across a broad portfolio of companies — from logistics to fintech to infrastructure."
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
              description="Long-standing affiliations with the chambers, councils and associations that shape Indian commerce and industry."
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
