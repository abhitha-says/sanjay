import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useVelocity,
  useMotionValueEvent,
} from 'framer-motion'
import { BooksShowcase } from '../components/BooksShowcase'

// ─── Assets ───────────────────────────────────────────────────────────────────
import portrait3Img    from '../assets/portrait-3.png'
import portrait2Img    from '../assets/portrait-2.png'
import portraitImg     from '../assets/portrait.png'
import leadershipImg   from '../assets/leadership-hero.png'
import mediaImg        from '../assets/media-hero.png'
import heritageImg     from '../assets/heritage-bg.png'

import moderatorImg    from '../assets/gallery/moderator-cscmp-event.jpg'
import felicitatedImg  from '../assets/gallery/felicitated-minister-khot.jpg'
import speakingImg     from '../assets/gallery/speaking-conference-2012.jpg'
import sanjivSanyalImg from '../assets/gallery/with-sanjiv-sanyal.jpg'
import stXaviersImg    from '../assets/gallery/st-xaviers-150-years.jpg'
import sunilPalImg     from '../assets/gallery/with-sunil-pal.jpg'
import sudhirImg       from '../assets/gallery/with-sudhir-mungantiwar.jpg'
import ashaBhosleImg   from '../assets/gallery/with-asha-bhosle.jpg'
import mhadaImg        from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'
import cscmpNewsImg    from '../assets/gallery/cscmp-newsletter-launch-2011.jpg'

// ─── Motion Config ─────────────────────────────────────────────────────────────────
const ease     = [0.22, 1, 0.36, 1]
const easeSlow = [0.16, 1, 0.3, 1]

// ─── Archive Books data (for BooksShowcase modal) ──────────────────────────────────
const ARCHIVE_BOOKS_GETTER = (imgs) => [
  {
    id: 'ch-01',
    title: 'The Beginning',
    author: 'Dr. Sanjay Goel',
    year: '1975',
    tag: 'Origins',
    desc: 'Born in Rajasthan and schooled at St. Xavier\'s College in Kolkata, Sanjay Goel\'s early years were shaped by two vastly different worlds — the warmth of Rajasthani heritage and the intellectual rigour of Bengal.',
    to: '/journey',
    cta: 'Explore the Journey',
    images: { front: imgs.portrait3, back: imgs.heritage },
    pages: [
      { period: '1975 – 1985', title: 'Rajasthan Roots', body: 'Growing up in Rajasthan, young Sanjay was immersed in the rich culture and traditions of the land. The values of family, community, and enterprise were instilled early.', image: imgs.portrait3 },
      { period: '1985 – 1992', title: 'The Bengal Chapter', body: 'St. Xavier\'s College, Kolkata, exposed him to a world of ideas, language, and civic spirit. He would later serve as Secretary of its Alumni Association, West Zone.', image: imgs.stXaviers },
    ],
  },
  {
    id: 'ch-02',
    title: 'Building GTC',
    author: 'Dr. Sanjay Goel',
    year: '1997',
    tag: 'Enterprise',
    desc: 'From a single logistics operation to a diversified group spanning cargo, real estate, and a dynamic business network — the GTC story is one of quiet, consistent ambition.',
    to: '/leadership',
    cta: 'View Leadership',
    images: { front: imgs.felicitated, back: imgs.moderator },
    pages: [
      { period: '1997 – 2006', title: 'GTC Corporation', body: 'As President of GTC Corporation, Dr. Goel oversaw all management operations and decisions across the group — laying the foundation for decades of growth.', image: imgs.moderator },
      { period: '2006 – Present', title: 'Chairman, GTC Group', body: 'Guiding group vision and direction — with an eye on growth, employee welfare and social acceptance. Felicitated for his contributions to industry.', image: imgs.felicitated },
    ],
  },
  {
    id: 'ch-03',
    title: 'The Supply Chain Decades',
    author: 'Dr. Sanjay Goel',
    year: '2006',
    tag: 'Industry',
    desc: 'As Country Representative for Supply Chain Asia and a leader at CSCMP, Dr. Goel helped shape the discourse on logistics and supply chain management in India.',
    to: '/leadership',
    cta: 'Read about Leadership',
    images: { front: imgs.speaking, back: imgs.cscmpNews },
    pages: [
      { period: '2006 – 2025', title: 'Supply Chain Asia', body: 'Serving as Country Representative for India, Dr. Goel connected Indian supply chain professionals with global best practices and international networks.', image: imgs.speaking },
      { period: '2011 – 2015', title: 'CSCMP Leadership', body: 'From launching the CSCMP Newsletter in India to moderating international events, his leadership shaped the supply chain community in Mumbai and beyond.', image: imgs.cscmpNews },
    ],
  },
  {
    id: 'ch-04',
    title: 'People & Connections',
    author: 'Dr. Sanjay Goel',
    year: '2010',
    tag: 'Community',
    desc: 'Across decades, the connections forged — with ministers, academics, artists, and activists — reflect a life lived at the intersection of business and society.',
    to: '/leadership',
    cta: 'See the Full Story',
    images: { front: imgs.sanjivSanyal, back: imgs.sudhir },
    pages: [
      { period: '2015 – Present', title: 'Civic & Political Connections', body: 'With Shri Sanjiv Sanyal, Economic Adviser to the PM, and Shri Sudhir Mungantiwar, former Finance Minister, Dr. Goel has engaged at the highest levels of governance.', image: imgs.sanjivSanyal },
      { period: 'Across Decades', title: 'Arts & Culture', body: 'From evenings with Asha Bhosle and Sunil Pal to academic celebrations at St. Xavier\'s — a life that valued culture as much as commerce.', image: imgs.ashaBhosle },
    ],
  },
  {
    id: 'ch-05',
    title: 'A Life of Contribution',
    author: 'Dr. Sanjay Goel',
    year: '2020',
    tag: 'Legacy',
    desc: 'Heritage preservation, clean water access, education, and housing for the underserved — these are not footnotes but chapters of equal weight in the story of Dr. Sanjay Goel.',
    to: '/initiatives',
    cta: 'Explore Initiatives',
    images: { front: imgs.portrait2, back: imgs.mhada },
    pages: [
      { period: '2012 – Present', title: 'Housing & MHADA', body: 'As Managing Partner of GTC Enterprises, Dr. Goel has been deeply involved in the development of low-cost housing for the Mumbai Metropolitan Region.', image: imgs.mhada },
      { period: '2006 – Present', title: 'Heritage & Humanity', body: 'Through the Aryavarta Heritage Foundation and humanitarian water projects, the belief that business must serve society is lived — not just stated.', image: imgs.portrait2 },
    ],
  },
]

// ─── Ideas & Perspectives data ────────────────────────────────────────────────
// `glue: true` keeps an item joined to the one that follows it (e.g. "Supply Chain" +
// "& Logistics") so the pair wraps together instead of the "&" word orphaning onto its own line.
const IDEAS = [
  { text: 'Leadership',               size: 'xl',  italic: false },
  { text: 'Entrepreneurship',         size: 'lg',  italic: true  },
  { text: 'Supply Chain',             size: 'xl',  italic: false, glue: true },
  { text: '& Logistics',              size: 'md',  italic: true  },
  { text: 'Heritage',                 size: 'lg',  italic: false, glue: true },
  { text: '& Culture',               size: 'md',  italic: true  },
  { text: 'Education',                size: 'lg',  italic: false },
  { text: 'Social Responsibility',    size: 'md',  italic: false },
  { text: 'Water',                    size: 'xl',  italic: true, glue: true },
  { text: '& Sustainability',         size: 'md',  italic: false },
]

const IDEA_GROUPS = (() => {
  const groups = []
  let idx = 0
  for (let i = 0; i < IDEAS.length; i++) {
    const item = { ...IDEAS[i], idx: idx++ }
    if (IDEAS[i].glue && IDEAS[i + 1]) {
      groups.push([item, { ...IDEAS[i + 1], idx: idx++ }])
      i++
    } else {
      groups.push([item])
    }
  }
  return groups
})()

// ─── Gallery data: People · Events · Work ─────────────────────────────────────
const ALL_PHOTOS = [
  { img: sanjivSanyalImg, caption: 'With Shri Sanjiv Sanyal, Principal Economic Adviser',  cat: 'People',  rot: -2.5, x: 2,  y: 2,  w: 160 },
  { img: sunilPalImg,     caption: 'An evening with Comedian Sunil Pal',                   cat: 'People',  rot:  2,   x: 22, y: 8,  w: 152 },
  { img: sudhirImg,       caption: 'With Shri Sudhir Mungantiwar, Cabinet Minister',       cat: 'People',  rot: -3,   x: 44, y: 3,  w: 148 },
  { img: felicitatedImg,  caption: 'Felicitated by Shri Sada Bhau Khot, MoS',             cat: 'People',  rot:  3.5, x: 63, y: 6,  w: 155 },
  { img: ashaBhosleImg,   caption: 'With the legendary Asha Bhosle',                      cat: 'People',  rot: -1.5, x: 10, y: 50, w: 150 },
  { img: mhadaImg,        caption: 'With MHADA CEO Shri Sanjiv Jaiswal, IAS',             cat: 'People',  rot:  2.5, x: 30, y: 53, w: 145 },
  { img: moderatorImg,    caption: 'Moderating at CSCMP USA Annual Event',                cat: 'Events',  rot: -2,   x: 51, y: 48, w: 165 },
  { img: speakingImg,     caption: 'Keynote speaker at a conference, 2012',               cat: 'Events',  rot:  3,   x: 72, y: 51, w: 150 },
  { img: stXaviersImg,    caption: "St. Xavier's College, Kolkata — 150th Anniversary",  cat: 'Events',  rot: -3.5, x: 55, y: 2,  w: 155 },
  { img: cscmpNewsImg,    caption: 'CSCMP Newsletter Launch, 2011',                       cat: 'Work',    rot:  1.5, x: 78, y: 5,  w: 148 },
]

const CATEGORIES = ['All', 'People', 'Events', 'Work']

// ─── CONTRIBUTION PILLARS ─────────────────────────────────────────────────────
const PILLARS = [
  { label: 'Heritage',           desc: 'Founded the Aryavarta Heritage Foundation to preserve India\'s intangible cultural memory.' },
  { label: 'Education',          desc: 'Decades of academic board memberships and institutional leadership at ITM College and beyond.' },
  { label: 'Humanitarian Work',  desc: 'Water treatment, clean water access, and community-level change in underserved regions.' },
  { label: 'Community',          desc: 'Constant participation in chambers, associations, and civic networks across India and the USA.' },
  { label: 'Sustainability',     desc: 'Championing responsible business that balances growth with environmental and social stewardship.' },
]

// ─── Trail images for hero ────────────────────────────────────────────────────
const TRAIL_IMGS = [speakingImg, moderatorImg, felicitatedImg, sanjivSanyalImg, stXaviersImg, sunilPalImg]

// ════════════════════════════════════════════════════════════════════════
// MOTION PRIMITIVES
// ════════════════════════════════════════════════════════════════════════

function MaskReveal({ children, className = '', delay = 0 }) {
  const ref  = useRef(null)
  const inVw = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        animate={inVw ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: easeSlow }}
      >{children}</motion.div>
    </div>
  )
}

function FadeUp({ children, className = '', delay = 0 }) {
  const ref  = useRef(null)
  const inVw = useInView(ref, { once: true, margin: '-5% 0px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inVw ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
    >{children}</motion.div>
  )
}

function StaggerWords({ text, className = '', delay = 0 }) {
  const ref  = useRef(null)
  const inVw = useInView(ref, { once: true, margin: '-5% 0px' })
  return (
    <div ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em' }}>
          <motion.span style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inVw ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.72, delay: delay + i * 0.055, ease: easeSlow }}
          >{word}</motion.span>
        </span>
      ))}
    </div>
  )
}

// ─── Mobile scatter — identical visual language to the desktop ImageTrail:
// same AnimatePresence lifecycle, same initial/animate/exit values
// (opacity 0→0.46→0, scale 0.68→1→0.88, rotate on entry, y:-22 on exit),
// same 1500ms ephemeral hold, same image set and cycling logic.
//
// Only the trigger changes: scroll-velocity threshold instead of mousemove-distance.
// Six predefined zones cover right-side, left-margin, and centre-top regions
// of the narrow viewport — matching the scatter density of the desktop trail.
const MOBILE_ZONES = [
  // Right side — primary scatter area (clear of the left-aligned text column)
  { xMin: 0.56, xMax: 0.65, yMin: 0.05, yMax: 0.20 }, // ① top-right
  { xMin: 0.58, xMax: 0.65, yMin: 0.33, yMax: 0.50 }, // ② mid-right
  { xMin: 0.54, xMax: 0.65, yMin: 0.60, yMax: 0.76 }, // ③ lower-right
  // Left margin — narrow strip beside the edge
  { xMin: 0.01, xMax: 0.08, yMin: 0.18, yMax: 0.35 }, // ④ left-upper
  { xMin: 0.01, xMax: 0.08, yMin: 0.52, yMax: 0.68 }, // ⑤ left-lower
  // Centre-high — above the headline text
  { xMin: 0.28, xMax: 0.50, yMin: 0.01, yMax: 0.10 }, // ⑥ centre-top
]

function MobileScatterTrail({ containerRef }) {
  const [mobileTrails, setMobileTrails] = useState([])
  const mobileCounter = useRef(0)
  const lastSpawnMs   = useRef(0)

  const { scrollY } = useScroll()
  const velocity    = useVelocity(scrollY)

  // Velocity-based spawn — mirrors the 95px distance gate used on desktop.
  // Fires when the user scrolls fast enough and the hero is still in the viewport.
  useMotionValueEvent(velocity, 'change', (v) => {
    if (Math.abs(v) < 80) return                  // velocity threshold (px/s)

    const now = Date.now()
    if (now - lastSpawnMs.current < 280) return   // rate-limit: ≈ desktop's 95px spacing

    // Only spawn while the hero section is visible
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) return

    lastSpawnMs.current = now
    const id   = ++mobileCounter.current
    const zone = MOBILE_ZONES[id % MOBILE_ZONES.length]
    const xPct = (zone.xMin + Math.random() * (zone.xMax - zone.xMin)) * 100
    const yPct = (zone.yMin + Math.random() * (zone.yMax - zone.yMin)) * 100
    const rot  = (Math.random() - 0.5) * 22  // same spread as desktop

    setMobileTrails(prev => [
      ...prev.slice(-5),
      { id, xPct, yPct, img: TRAIL_IMGS[id % TRAIL_IMGS.length], rot },
    ])
    // Same 1500ms ephemeral lifetime as desktop trail
    setTimeout(() => setMobileTrails(prev => prev.filter(t => t.id !== id)), 1500)
  })

  return (
    <AnimatePresence>
      {mobileTrails.map(t => (
        <motion.div
          key={t.id}
          // Identical entry / peak / exit as the desktop ImageTrail items
          initial={{ opacity: 0, scale: 0.68, rotate: t.rot - 12 }}
          animate={{ opacity: 0.46, scale: 1, rotate: t.rot }}
          exit={{ opacity: 0, scale: 0.88, y: -22 }}
          transition={{ duration: 0.3, ease }}
          className="absolute overflow-hidden rounded-[8px] shadow-[0_10px_36px_rgba(0,0,0,0.16)]"
          style={{ left: `${t.xPct}%`, top: `${t.yPct}%`, width: 110, height: 138 }}
        >
          <img src={t.img} alt="" className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

// ─── Hero Image Trail ──────────────────────────────────────────────────────────
function ImageTrail({ containerRef }) {
  const [trails, setTrails] = useState([])
  const lastPos = useRef({ x: -9999, y: -9999 })
  const counter = useRef(0)
  const handle = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = x - lastPos.current.x, dy = y - lastPos.current.y
    if (Math.sqrt(dx*dx + dy*dy) < 95) return
    lastPos.current = { x, y }
    const id  = ++counter.current
    const rot = (Math.random() - 0.5) * 22
    setTrails(p => [...p.slice(-5), { id, x, y, img: TRAIL_IMGS[id % TRAIL_IMGS.length], rot }])
    setTimeout(() => setTrails(p => p.filter(t => t.id !== id)), 1500)
  }, [containerRef])
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return
    el.addEventListener('mousemove', handle)
    return () => el.removeEventListener('mousemove', handle)
  }, [containerRef, handle])
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }}>
      {/* Desktop trail: scoped overflow-hidden — cursor coords are always inside hero
          bounds so this only prevents scroll-bar jitter on the section edge. */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {trails.map(t => (
            <motion.div key={t.id}
              initial={{ opacity: 0, scale: 0.68, rotate: t.rot - 12 }}
              animate={{ opacity: 0.46, scale: 1, rotate: t.rot }}
              exit={{ opacity: 0, scale: 0.88, y: -22 }}
              transition={{ duration: 0.3, ease }}
              className="absolute overflow-hidden rounded-[8px] shadow-[0_10px_36px_rgba(0,0,0,0.16)]"
              style={{ left: t.x - 58, top: t.y - 72, width: 116, height: 145 }}
            ><img src={t.img} alt="" className="h-full w-full object-cover" /></motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Mobile scatter: overflow-visible so items near edges are not clipped */}
      <div className="lg:hidden absolute inset-0 overflow-visible">
        <MobileScatterTrail containerRef={containerRef} />
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════
// 02 — THE MAN BEHIND THE WORK
// Sticky portrait + mask-reveal text blocks
// ════════════════════════════════════════════════════════════════════════
function ManBehindWork() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  return (
    <section ref={sectionRef} className="relative border-t border-border" style={{ minHeight: '130vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background portrait wash — below lg the dedicated portrait column is hidden, so give the text something to sit against */}
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <motion.div style={{ scale: imgScale, y: imgY }} className="h-full w-full">
            <img src={portrait3Img} alt="" className="h-full w-full object-cover object-top opacity-[0.16]" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/75 to-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/35 to-bg/70" />
        </div>
        <div className="absolute inset-0 grid lg:grid-cols-2">
          {/* Left: text */}
          <div className="relative flex flex-col justify-center px-5 py-16 sm:px-6 sm:py-24 md:px-14 lg:px-20" style={{ zIndex: 2 }}>
            <FadeUp className="mb-6 flex items-center gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-sans text-[11px] font-black text-white shrink-0">01</span>
              <div>
                <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-brand/60">Chapter</div>
                <div className="font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand leading-tight">The Man Behind the Work</div>
              </div>
            </FadeUp>

            <MaskReveal delay={0.05}>
              <div className="font-serif text-[clamp(36px,5.2vw,76px)] font-black leading-[0.93] tracking-[-2.5px] text-ink">
                Beyond titles
                <br />
                <em className="text-brand">and responsibilities.</em>
              </div>
            </MaskReveal>

            <FadeUp delay={0.18} className="mt-7 max-w-[460px] space-y-4">
              <p className="font-sans text-[15px] leading-[27px] text-secondary">
                Born in Rajasthan, schooled in Bengal, and shaped by four decades
                of commerce, community and culture — Dr. Sanjay Goel's story is
                not simply a professional one.
              </p>
              <p className="font-sans text-[15px] leading-[27px] text-secondary">
                It is a story of curiosity. Of building things — businesses,
                institutions, relationships — with the quiet conviction that
                people matter more than balance sheets.
              </p>
              <p className="font-sans text-[15px] leading-[27px] text-secondary">
                He speaks five languages. He preserves heritage. He finds meaning
                in service. And he believes, firmly, that true leadership is
                measured by what it leaves behind.
              </p>
            </FadeUp>

            {/* Values */}
            <FadeUp delay={0.3} className="mt-10 flex flex-wrap gap-2">
              {['Curiosity', 'Purpose', 'People', 'Integrity', 'Service'].map(v => (
                <span key={v}
                  className="rounded-full border border-border px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-secondary">
                  {v}
                </span>
              ))}
            </FadeUp>
          </div>

          {/* Right: portrait with parallax */}
          <div className="relative hidden lg:block overflow-hidden" aria-hidden="true">
            <motion.div style={{ scale: imgScale, y: imgY }} className="h-full w-full">
              <img src={portrait3Img} alt="Dr. Sanjay Goel"
                className="h-full w-full object-cover object-top" />
            </motion.div>
            {/* Gradient bleed */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/40" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════
// 03 — IDEAS & PERSPECTIVES
// Large animated words — two marquee rows + floating grid
// ════════════════════════════════════════════════════════════════════════
const IDEA_MARQUEE_A = 'Leadership  ·  Entrepreneurship  ·  Heritage & Culture  ·  Water & Sustainability  ·  '
const IDEA_MARQUEE_B = 'Supply Chain  ·  Education  ·  Social Responsibility  ·  Logistics  ·  People  ·  '

function IdeasPerspectives() {
  return (
    <section className="border-t-2 border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-20 pb-10 sm:px-6 sm:pt-36 sm:pb-16 md:px-14 lg:px-20">
        <FadeUp className="mb-6 flex items-center gap-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-sans text-[11px] font-black text-white shrink-0">02</span>
          <div>
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-brand/60">Chapter</div>
            <div className="font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand leading-tight">Ideas & Perspectives</div>
          </div>
        </FadeUp>
        <StaggerWords
          text="What he thinks about."
          className="font-serif text-[clamp(36px,5.5vw,80px)] font-black leading-[0.93] tracking-[-2.5px] text-ink"
        />
        <FadeUp delay={0.2} className="mt-4 max-w-[480px] font-sans text-[15px] leading-[26px] text-secondary">
          The subjects that shape his conversations, speeches, and the decisions
          that define his work.
        </FadeUp>
      </div>

      {/* Marquee Row A — large */}
      <div className="flex overflow-hidden border-t border-border py-5">
        <motion.div animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="flex shrink-0 whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-serif text-[clamp(28px,4vw,56px)] font-black tracking-[-1.5px] text-ink/10 px-6">
              {IDEA_MARQUEE_A}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Central ideas grid — staggered large words */}
      <div className="px-6 py-10 md:px-14 lg:px-20">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3">
          {IDEA_GROUPS.map((group) => (
            <div
              key={group.map((g) => g.text).join('+')}
              className="flex flex-wrap items-baseline gap-x-3"
            >
              {group.map((idea) => (
                <motion.div
                  key={idea.text}
                  initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                  whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ duration: 0.75, delay: idea.idx * 0.07, ease: easeSlow }}
                  whileHover={{ color: '#2d7a3a', x: 4, transition: { duration: 0.22 } }}
                  className={`cursor-default select-none font-serif font-black leading-[1.1] tracking-[-2px] text-ink ${
                    idea.size === 'xl' ? 'text-[clamp(44px,6.5vw,96px)]' :
                    idea.size === 'lg' ? 'text-[clamp(34px,4.5vw,68px)]' :
                                         'text-[clamp(24px,3.2vw,48px)] text-ink/40'
                  } ${idea.italic ? 'italic' : ''}`}
                >
                  {idea.text}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row B — reversed */}
      <div className="flex overflow-hidden border-t border-border py-5">
        <motion.div animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
          className="flex shrink-0 whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-serif text-[clamp(22px,3vw,42px)] font-black italic tracking-[-1px] text-ink/8 px-6">
              {IDEA_MARQUEE_B}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════
// 04 — PLACES, PEOPLE & MOMENTS
// Filterable scatter gallery with clip-path lightbox
// ════════════════════════════════════════════════════════════════════════
function PhotoArchive() {
  const [activeCat, setActiveCat] = useState('All')
  const [expanded, setExpanded]   = useState(null)

  const visible = activeCat === 'All'
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter(p => p.cat === activeCat)

  return (
    <>
      <section className="border-t border-border px-6 py-32 md:px-14 lg:px-20">
        {/* Header */}
        <div className="mb-10">
          <FadeUp className="mb-6 flex items-center gap-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-sans text-[11px] font-black text-white shrink-0">03</span>
            <div>
              <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-brand/60">Chapter</div>
              <div className="font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand leading-tight">Places, People & Moments</div>
            </div>
          </FadeUp>
          <StaggerWords text="Collected over a lifetime."
            className="font-serif text-[clamp(34px,5vw,72px)] font-black leading-[0.95] tracking-[-2px] text-ink mb-4" />
          <FadeUp delay={0.15} className="font-sans text-[14px] leading-[22px] text-secondary/60">
            An archive of the people, places and moments that have shaped the journey.
            Click any photograph to read its story.
          </FadeUp>
        </div>

        {/* Category tabs */}
        <FadeUp delay={0.2} className="mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCat(cat)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`rounded-full border px-5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                activeCat === cat
                  ? 'border-ink bg-ink text-white'
                  : 'border-border text-secondary hover:border-ink/40 hover:text-ink'
              }`}
            >{cat}</motion.button>
          ))}
        </FadeUp>

        {/* Scatter field */}
        <div className="relative" style={{ height: 'clamp(640px, 75vw, 820px)' }}>
          <AnimatePresence>
            {visible.map((p, i) => (
              <motion.button
                key={p.img + p.cat}
                layout
                initial={{ opacity: 0, scale: 0.82, y: 40, rotate: p.rot - 8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: p.rot }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: easeSlow }}
                whileHover={{ rotate: 0, scale: 1.08, zIndex: 30, transition: { duration: 0.28 } }}
                onClick={() => setExpanded(p)}
                aria-label={p.caption}
                className="absolute cursor-pointer overflow-hidden rounded-[6px] border border-border/50 bg-white shadow-[0_6px_28px_rgba(0,0,0,0.10)]"
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.w, aspectRatio: '3/4', zIndex: 1 }}
              >
                <img src={p.img} alt={p.caption} className="h-full w-full object-cover" />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-black/72 to-transparent p-3">
                  <div>
                    <div className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-brand/80 mb-0.5">{p.cat}</div>
                    <span className="font-sans text-[10px] leading-[14px] text-white">{p.caption}</span>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ clipPath: 'inset(10% 10% 10% 10% round 16px)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 10px)', opacity: 1 }}
              exit={{ clipPath: 'inset(10% 10% 10% 10% round 16px)', opacity: 0 }}
              transition={{ duration: 0.38, ease: easeSlow }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[10px]"
            >
              <img src={expanded.img} alt={expanded.caption} className="block w-full object-cover" />
              <div className="bg-ink px-5 py-4">
                <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-brand/70 mb-1">{expanded.cat}</div>
                <p className="font-sans text-[13px] leading-[20px] text-white/80">{expanded.caption}</p>
              </div>
              <button onClick={() => setExpanded(null)} aria-label="Close"
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 font-sans text-[16px] leading-none text-white hover:bg-black">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ════════════════════════════════════════════════════════════════════════
// 05 — A LIFE OF CONTRIBUTION
// Editorial statement + pillar items with mask reveal
// ════════════════════════════════════════════════════════════════════════
function LifeOfContribution() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const bgY  = useTransform(scrollYProgress, [0, 1], ['6%', '-2%'])
  const bgOp = useTransform(scrollYProgress, [0, 0.5], [0, 0.55])

  return (
    <section ref={ref} className="relative border-t border-border overflow-hidden">
      {/* Parallax portrait — full-bleed cinematic backdrop on mobile, original right-column treatment from md up */}
      <motion.div aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-full md:w-[52%]"
        style={{ y: bgY, opacity: bgOp }}>
        <img src={portrait2Img} alt="" className="h-full w-full object-cover object-top" />
        {/* Strong left-fade so text on the left stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/20 to-transparent" />
        {/* Top/bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg/40" />
      </motion.div>
      {/* Strong left guard so left text column is always crisp */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent" />

      <div className="relative px-5 py-16 sm:px-6 sm:py-24 md:px-14 md:py-44 lg:px-20" style={{ zIndex: 2 }}>
        {/* Eyebrow */}
        <FadeUp className="mb-8 flex items-center gap-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand font-sans text-[11px] font-black text-white shrink-0">04</span>
          <div>
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-brand/60">Chapter</div>
            <div className="font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand leading-tight">A Life of Contribution</div>
          </div>
        </FadeUp>

        {/* Main statement */}
        <div className="max-w-[680px] mb-16">
          {['Business creates value.', 'Contribution gives it meaning.'].map((line, i) => (
            <MaskReveal key={i} delay={i * 0.2}>
              <div className={`font-serif font-black leading-[0.93] tracking-[-2px] sm:tracking-[-3px] ${
                i === 0
                  ? 'text-[clamp(30px,5.5vw,82px)] text-ink'
                  : 'text-[clamp(30px,5.5vw,82px)] text-ink/35 italic'
              }`}>{line}</div>
            </MaskReveal>
          ))}
        </div>

        {/* Contribution pillars */}
        <div className="max-w-[660px]">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.62, delay: i * 0.1, ease }}
              className={`group flex gap-6 border-b border-border py-6 ${i === 0 ? 'border-t' : ''}`}
            >
              <motion.div
                animate={{ width: 3, background: '#2d7a3a' }}
                whileInView={{ height: '100%' }}
                className="shrink-0 rounded-full bg-brand/20 self-stretch"
                style={{ width: 3, minHeight: 48 }}
              />
              <div>
                <div className="font-serif text-[clamp(20px,2.5vw,30px)] font-black leading-none tracking-[-0.5px] text-ink mb-2">
                  {pillar.label}
                </div>
                <p className="font-sans text-[13px] leading-[22px] text-secondary">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════════════
// 06 — THERE IS MORE TO EVERY JOURNEY (Closing CTA)
// Cream-curtain animated CTA with parallax portrait ghost
// ════════════════════════════════════════════════════════════════════════
function ClosingCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const bgY   = useTransform(scrollYProgress, [0, 1], ['8%', '-4%'])
  const bgOp  = useTransform(scrollYProgress, [0, 0.5], [0, 0.08])
  const [hovered, setHovered] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)

  return (
    <>
      <ArchiveModal open={archiveOpen} onClose={() => setArchiveOpen(false)} />
      <section ref={ref} className="relative overflow-hidden border-t border-border px-5 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-14 md:pb-44 md:pt-40 lg:px-20">
      {/* Ghosted portrait parallax */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ y: bgY, opacity: bgOp }}>
        <img src={portrait3Img} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover object-center" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />

      <div className="relative max-w-[700px]" style={{ zIndex: 2 }}>
        {/* Mask-reveal headline */}
        <MaskReveal>
          <div className="font-serif text-[clamp(32px,6.5vw,100px)] font-black leading-[0.9] tracking-[-2px] sm:tracking-[-4px] text-ink">
            There is more
            <br />
            <em className="text-ink/30">to every journey.</em>
          </div>
        </MaskReveal>

        <FadeUp delay={0.24} className="mt-7 max-w-[480px]">
          <p className="font-sans text-[15px] leading-[27px] text-secondary">
            Explore the experiences, ideas and moments that continue to shape
            the work — and the life behind it.
          </p>
        </FadeUp>

        {/* Animated CTA — "Explore the Archive" */}
        <FadeUp delay={0.36} className="mt-14">
          <CTALink hovered={hovered} setHovered={setHovered} onClick={() => setArchiveOpen(true)} />
        </FadeUp>

        {/* Divider */}
        <FadeUp delay={0.5} className="mt-20">
          <div className="h-px w-full max-w-[300px] bg-border" />
        </FadeUp>

        {/* Quick links */}
        <FadeUp delay={0.6} className="mt-8">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'The Journey', to: '/journey' },
              { label: 'Initiatives', to: '/initiatives' },
              { label: 'Leadership',  to: '/leadership' },
              { label: 'Media',       to: '/media' },
            ].map((link, i) => (
              <TransitionNavLink key={link.to} link={link} index={i} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
    </>
  )
}

// ── Archive Modal (BooksShowcase full-screen overlay)
// The close button is rendered via React portal directly into document.body
// so it always sits above the BooksShowcase WebGL canvas.
function ArchiveModal({ open, onClose }) {
  const books = ARCHIVE_BOOKS_GETTER({
    portrait3:   portrait3Img,
    portrait2:   portrait2Img,
    heritage:    heritageImg,
    moderator:   moderatorImg,
    felicitated: felicitatedImg,
    speaking:    speakingImg,
    sanjivSanyal: sanjivSanyalImg,
    stXaviers:   stXaviersImg,
    sunilPal:    sunilPalImg,
    sudhir:      sudhirImg,
    ashaBhosle:  ashaBhosleImg,
    mhada:       mhadaImg,
    cscmpNews:   cscmpNewsImg,
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.documentElement.setAttribute('data-archive-open', '')
    } else {
      document.body.style.overflow = ''
      document.documentElement.removeAttribute('data-archive-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.removeAttribute('data-archive-open')
    }
  }, [open])

  // Keyboard Escape closes modal
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Main modal backdrop + BooksShowcase — no pointer-events on close btn here */}
          <motion.div
            key="archive-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: 'rgba(8,10,18,0.97)' }}
          >
            {/* BooksShowcase fills the modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 overflow-hidden"
            >
              <BooksShowcase
                books={books}
                heroTitle="The Archive"
                navTitle="Chapters"
                showNav={true}
                showDetailPanel={true}
                showCarousel={true}
                themeColors={{
                  navy:   '#0f1724',
                  cream:  '#f5efe6',
                  pink:   '#c8a96e',
                  lav:    '#b8c4d8',
                  peri:   '#6a82a8',
                  bgDark: '#0b0f1a',
                }}
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>

          {/* Close button & label rendered via portal — sits ABOVE the canvas at z-[9999] */}
          {createPortal(
            <motion.div
              key="archive-close-portal"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              className="fixed top-4 right-4 z-[9999] flex items-center gap-3"
              style={{ pointerEvents: 'auto' }}
            >
              {/* Archive label */}
              <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                <div className="h-[2px] w-5 rounded-full bg-brand" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand/80">
                  The Archive
                </span>
              </div>
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close Archive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.85)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s, border-color 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>,
            document.body
          )}
        </>
      )}
    </AnimatePresence>
  )
}

// ── Transition-aware CTA link ─────────────────────────────────────────────────
function CTALink({ hovered, setHovered, onClick }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group inline-flex cursor-pointer items-center gap-4 border-0 bg-transparent p-0"
      aria-label="Explore the Archive"
    >
      <motion.div
        animate={{ width: hovered ? 56 : 44, background: hovered ? '#111111' : 'transparent' }}
        transition={{ duration: 0.35, ease }}
        className="relative flex items-center justify-center overflow-hidden rounded-full border border-ink"
        style={{ height: 44, minWidth: 44 }}
      >
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.28 }}
          className="font-serif text-[18px] text-ink group-hover:text-white"
        >→</motion.span>
      </motion.div>
      <div className="overflow-hidden">
        <motion.div
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ duration: 0.28, ease }}
        >
          <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary/50 mb-0.5">
            Begin exploring
          </div>
          <div className="font-serif text-[clamp(22px,3vw,40px)] font-black leading-none tracking-[-1.5px] text-ink">
            Explore the Archive
          </div>
        </motion.div>
      </div>
    </button>
  )
}

// ── Transition-aware quick nav link ──────────────────────────────────────────
function TransitionNavLink({ link, index }) {
  const go = useTransitionNavigate()
  return (
    <button
      onClick={() => go(link.to)}
      className="group flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-sans text-[12px] font-medium text-secondary transition-colors hover:text-ink"
    >
      <span className="font-sans text-[10px] text-secondary/35 transition-colors group-hover:text-brand">
        0{index + 1}
      </span>
      {link.label}
      <span className="font-serif text-[13px] text-ink/20 transition-all group-hover:translate-x-0.5 group-hover:text-ink">
        ↗
      </span>
    </button>
  )
}

// ════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════════════════
export default function DiscoverMore() {
  const heroRef = useRef(null)

  return (
    <main className="relative z-20">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — PRESERVED EXACTLY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-24 md:px-14 lg:px-20"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/* Mobile: portrait treated as an intentional cinematic backdrop — wider,
              face kept in frame via a top-biased crop, and visible enough to read as
              a presence rather than a smudge. Desktop (md+) is untouched — same 55%
              column, same object-center crop, same whisper-quiet 0.068 opacity. */}
          <img src={portrait3Img} alt=""
            className="absolute right-0 top-0 h-full w-[72%] object-cover object-[58%_12%] opacity-[0.15] md:w-[55%] md:object-center md:opacity-[0.068]" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/48 to-transparent md:via-bg/82" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
        </div>

        <ImageTrail containerRef={heroRef} />

        <div className="relative max-w-[840px]" style={{ zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-brand" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
              Discover More
            </span>
          </motion.div>

          {['Four decades.', 'Many chapters.', 'One continuing journey.'].map((line, i) => (
            <div key={line} style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 1.02, delay: 0.32 + i * 0.15, ease }}
                className="block font-serif text-[clamp(38px,7.5vw,118px)] font-black leading-[0.92] tracking-[-2px] sm:tracking-[-3px] text-ink"
              >{line}</motion.h1>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.82, ease }}
            className="mt-7 max-w-[520px] font-sans text-[14px] leading-[24px] sm:text-[17px] sm:leading-[30px] text-secondary"
          >
            Explore the work, people, ideas and institutions that have shaped
            Dr. Sanjay Goel's journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-14 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/20 pt-[5px]"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-ink/28" />
            </motion.div>
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-secondary/48">
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01 — THE MAN BEHIND THE WORK
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ManBehindWork />

      {/* Section gap */}
      <div className="h-16 md:h-24" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 — IDEAS & PERSPECTIVES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <IdeasPerspectives />

      {/* Section gap */}
      <div className="h-16 md:h-24" />

      {/* Places, People & Moments section removed as requested */}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 — A LIFE OF CONTRIBUTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <LifeOfContribution />

      {/* Section gap */}
      <div className="h-16 md:h-24" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CLOSING — THERE IS MORE TO EVERY JOURNEY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ClosingCTA />

    </main>
  )
}
