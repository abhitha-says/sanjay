import { useState, useEffect } from 'react'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import portrait2 from '../assets/portrait-2.png'
import stXaviers150 from '../assets/gallery/st-xaviers-150-years.jpg'
import mhadaCeo from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'

const ease = [0.22, 1, 0.36, 1]

// ── Data — identical facts to the original Journey page, nothing invented ──

const milestones = [
  {
    id: 'st-xaviers-college',
    period: '1985 – 1988',
    title: 'B.Com (Hons)',
    org: "St. Xavier's College, Calcutta",
    location: 'Kolkata, West Bengal',
    type: 'education',
    description:
      'Born in Rajasthan, raised across Haryana and Uttar Pradesh, and schooled in West Bengal — a childhood spent across cultures that shaped a lifelong ease in moving between them.',
    focus: 'Where discipline, curiosity and cross-cultural values first took root.',
    image: stXaviers150,
    imageCaption: "Celebrating 150 years of St. Xavier's College, Kolkata",
  },
  {
    id: 'jv-pack',
    period: '1991 – 1993',
    title: 'Director',
    org: 'J V Pack Co Pvt Ltd',
    location: 'Allahabad, Uttar Pradesh',
    description: 'In charge of manufacturing operations at an ancillary unit of IFFCO Phulpur, producing empty fertiliser bags.',
    focus: 'Learning manufacturing discipline from the shop floor up.',
  },
  {
    id: 'goel-trading',
    period: '1993 – 1997',
    title: 'Sr. Executive',
    org: 'Goel Trading Company',
    location: 'Kolkata, West Bengal',
    description: 'Distribution head for fertiliser under the Consignment Agency of Tata Steel and the Steel Authority of India (SAIL).',
    focus: 'Distribution and trust — the fundamentals of every venture since.',
  },
  {
    id: 'martin-burn',
    period: '1994 – 1995',
    title: 'Export Manager',
    org: 'Martin Burn Limited',
    location: 'Kolkata, West Bengal',
    description: 'Explored export markets for agro commodities on behalf of the company.',
    focus: 'An early lesson in reading markets beyond national borders.',
  },
  {
    id: 'vriddhee',
    period: '1995 – 1997',
    title: 'Owner',
    org: 'Vriddhee Commercial Corporation',
    location: 'Dhanbad–Ranchi, Bihar',
    description: 'Marketed fertilisers across the state of Bihar.',
    focus: 'Independence, taken early — building a business from the ground up.',
  },
  {
    id: 'gtc-corporation',
    period: '1997 – Present',
    title: 'President',
    org: 'GTC Corporation',
    location: 'Mumbai, Maharashtra',
    description: 'In charge of all management operations and decisions.',
    focus: 'Operational discipline as the foundation for everything that followed.',
  },
  {
    id: 'gtc-group',
    period: '2006 – Present',
    title: 'Chairman',
    org: 'GTC Group',
    location: 'Mumbai, Maharashtra',
    description: "Responsible for the Group's vision and direction.",
    focus: '"Sabka Saath, Sabka Vikas" — working together, winning together.',
  },
  {
    id: 'hamilton-packers',
    period: '2007 – 2013',
    title: 'Owner',
    org: 'Hamilton Packers',
    location: 'Mumbai, Maharashtra',
    description: 'Specialised in the relocation of personal effects, corporate shifting, and the handling of antiques and high-value paintings.',
    focus: 'Handling what mattered most to others, with the greatest care.',
  },
  {
    id: 'sikkim-manipal',
    period: '2006 – 2009',
    title: 'M.B.A., HR & Marketing',
    org: 'Sikkim Manipal Institute of Technology',
    location: 'India',
    type: 'education',
    description: "Formalised two decades of hands-on business instinct with a Master's in HR & Marketing.",
    focus: 'Formalising two decades of hands-on business instinct.',
  },
  {
    id: 'pet-travel',
    period: '2012 – Present',
    title: 'Director',
    org: 'Pet Travel Private Limited',
    location: 'Mumbai, Maharashtra',
    description: 'Safe movement of animals across the world by air, sea and road.',
    focus: 'An idea born from love for animals, built into an international service.',
  },
  {
    id: 'gtc-enterprises',
    period: '2012 – Present',
    title: 'Managing Partner',
    org: 'GTC Enterprises',
    location: 'Mumbai Metropolitan Region',
    description: 'Development of low-cost housing.',
    focus: "Housing that's within reach, without compromise on quality.",
    image: mhadaCeo,
    imageCaption: 'With MHADA CEO, Shri Sanjiv Jaiswal, IAS',
  },
  {
    id: 'alternative-medicine',
    period: '2014 – 2015',
    title: 'Doctor of Medicine (M.D.), Health & Wellness',
    org: 'Indian Board of Alternative Medicine',
    location: 'India',
    type: 'education',
    description: 'Explored centuries-old traditional therapies that succeed, at low or no cost, where popular medicine sometimes fails.',
    focus: 'Where popular medicine fails, sometimes alternative therapies work like magic.',
  },
  {
    id: 'bargain-india',
    period: '2015 – Present',
    title: 'Managing Director',
    org: 'Bargain India Private Limited',
    location: 'Navi Mumbai, Maharashtra',
    description: 'Home loans, mortgage and commercial loans, and real estate through print and digital marketing — built around customer empowerment.',
    focus: 'Customer empowerment, one hassle-free transaction at a time.',
  },
  {
    id: 'aryavarta',
    period: '2020 – Present',
    title: 'Founder',
    org: 'Aryavarta Heritage Foundation',
    location: 'Mumbai Metropolitan Region',
    description: 'An NGO registered with the Government of India to support, preserve and promote the rich cultural heritage of Ancient India.',
    focus: "Preserving Ancient India's heritage, for generations still to come.",
  },
  {
    id: 'seavista',
    period: '2024 – Present',
    title: 'Partner',
    org: 'Seavista Infrastructure LLP',
    location: 'Navi Mumbai, Maharashtra',
    description: 'Developing a residential-cum-commercial tower at a prime location in Nerul.',
    focus: 'Building homes and community, one prime location at a time.',
  },
  {
    id: 'agrawal-business-network',
    period: '2025 – Present',
    title: 'Chief Executive Officer',
    org: 'Agrawal Business Network LLP',
    location: 'Mumbai, Maharashtra',
    description: 'Also serving as a Resource Person for the National Commission for Women, India.',
    focus: 'Still building, still learning — four decades on.',
  },
]

const educationCount = milestones.filter((m) => m.type === 'education').length
const roleCount = milestones.length - educationCount

// ── Icons ─────────────────────────────────────────────────────────────────

function GraduationCapIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}
function BriefcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  )
}

// ── Hero (same technique as Leadership/Media heroes) ────────────────────────

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
          // Cormorant Garamond ships 300–700; 900 gets synthesized into a
          // smeared fake bold.
          fontWeight: 700,
          lineHeight: 0.86,
          letterSpacing: '-4px',
          opacity: 0.05,
          fontSize: 'clamp(46px, 14vw, 250px)',
          color: '#111111',
        }}
      >
        <div className="whitespace-nowrap">Journey</div>
      </motion.div>
    </motion.div>
  )
}

function JourneyImage() {
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
    <>
      {/* ── Mobile portrait backdrop (< md) ────────────────────────────────────
          Portrait-led editorial: face sits high in frame so the eye reads
          person → text as it travels down. The two-stop gradient keeps the
          face as a presiding presence while the text area below stays clean.
      */}
      <div className="absolute inset-0 z-0 md:hidden" aria-hidden="true">
        <img
          src={portrait2}
          alt=""
          className="h-full w-full object-cover opacity-[0.32]"
          style={{ objectPosition: '50% 5%' }}
        />
        {/* Heavier bottom fade for portrait-led editorial — face shows,
            text block reads cleanly against near-white page. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/30 to-bg/90" />
      </div>

      {/* ── Desktop / Tablet portrait panel (≥ md) ──────────────────────────
          Tablet (md–lg): editorial — narrower panel so the left text column
          has enough breathing room for a clean two-column read.
          Desktop (lg+): cinematic — panel expands, portrait dominates the
          right half; left column pins firmly at max-width.
      */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0) }}
        // portrait-2.png is 500×500 — panel is square-ish so no head cropping.
        // md (tablet): 54% wide — enough room for the editorial text column.
        // lg (laptop): 56% wide — starts going cinematic.
        // xl (desktop): 60% wide — full cinematic split.
        className="absolute bottom-0 right-0 z-0 hidden md:block md:h-[90%] md:w-[54%] lg:h-[96%] lg:w-[56%] xl:w-[60%]"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.24, ease }}
        >
          <motion.img
            src={portrait2}
            alt="Dr. Sanjay Goel"
            fetchpriority="high"
            style={{
              x,
              y,
              // Left fade: tablet needs stronger early fade (text column is
              // narrower). Desktop: gentler start so more portrait shows.
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.22) 16%, rgba(0,0,0,0.62) 26%, rgba(0,0,0,0.9) 34%, black 44%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.45) 6%, black 16%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.22) 16%, rgba(0,0,0,0.62) 26%, rgba(0,0,0,0.9) 34%, black 44%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.45) 6%, black 16%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              // Show upper-body / face: portrait is square so 15% from top is the chest
              objectPosition: '50% 12%',
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </>
  )
}

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

function JourneyHero() {
  return (
    // The 72px in-flow <header> sits above <main>, so a full 100vh hero always
    // pushed its own bottom below the fold. Subtract the header height.
    <section className="relative h-[calc(100svh-72px)] w-full overflow-hidden">
      <BgWatermark />
      <JourneyImage />

      {/*
        Mobile  (< md)  — Portrait-led editorial.
          justify-end + pb-16 anchors the text at the bottom so the eye
          reads portrait → back-link → typography → stats, travelling down.
          px-5 keeps content away from the viewport edge on narrow phones.

        Tablet  (md–lg) — Editorial.
          justify-center vertically balances the text column against the
          portrait panel. pl-12 gives the column enough clearance from the
          left edge; max-w-[420px] prevents the copy from bleeding into the
          portrait. The back-link is repositioned inside the top area with
          a negative translate on the wrapper.

        Desktop (lg+)   — Cinematic.
          pl-16 / xl:pl-24 anchors the column firmly left. max-w-[520px]
          creates a generous gutter between copy and portrait. The scroll
          cue at the bottom fills the lower-left composition dead zone.
      */}
      <div className="relative z-20 flex h-full flex-col justify-end px-5 pb-16 pt-10 md:justify-center md:pb-0 md:pt-0 md:pl-12 md:max-w-[460px] lg:max-w-[520px] lg:pl-16 xl:pl-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mb-5 md:mb-8"
        >
          <BackHomeBtn />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.72, ease }}
          className="font-sans text-[20px] font-semibold tabular-nums lining-nums tracking-[-0.023em] text-ink"
        >
          03
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.84, ease }}
          className="mt-2 font-serif leading-[0.92] text-ink"
          style={{ letterSpacing: '-2px', fontWeight: 700, fontSize: 'clamp(52px, 6.5vw, 110px)' }}
        >
          The <span style={{ color: '#2d7a3a' }}>Journey</span>
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease }}
          className="mt-4 block h-[2px] w-10 origin-left bg-accent"
        />

        <motion.p
          initial={{ opacity: 0, y: 30, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease }}
          className="mt-4 max-w-[420px] font-sans text-[14.5px] leading-[23px] text-secondary sm:text-[15px] sm:leading-[25px] md:max-w-[380px] md:text-[16px] md:leading-[27px] lg:max-w-[420px] lg:text-[17px] lg:leading-[28px]"
        >
          Four decades of work across industries and geographies — from a fertiliser trading
          floor in Kolkata to the chairmanship of a diversified group, with a medical degree and
          a heritage foundation along the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease }}
          className="mt-6 flex flex-wrap gap-2.5 md:mt-8 md:gap-3"
        >
          {[
            { num: '40+', label: 'Years' },
            { num: String(roleCount), label: 'Roles Held' },
            { num: '1985', label: 'Since' },
          ].map(({ num, label }) => (
            <div key={label} className="rounded-[14px] [corner-shape:squircle] border border-border bg-white/60 px-3.5 py-2 text-center backdrop-blur-sm md:px-4 md:py-2.5 [@media(prefers-reduced-transparency:reduce)]:bg-white">
              {/* lining-nums matters most here: Cormorant defaults to old-style
                  figures, which made "1985" ride up and down the baseline. */}
              <div
                className="font-serif text-[26px] leading-none tabular-nums lining-nums text-ink md:text-[30px]"
                style={{ fontWeight: 700, letterSpacing: '-0.5px' }}
              >
                {num}
              </div>
              <div className="mt-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.1em] text-secondary md:text-[10px]">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue — cinematic anchor in the lower-left dead zone.
            Hidden on mobile (no whitespace there); shown on desktop. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9, ease }}
          className="mt-10 hidden items-center gap-3 md:flex md:mt-14"
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

// ── Section label (same pattern as Leadership) ───────────────────────────────

function SectionLabel({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease }}
      className="mb-12"
    >
      <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</span>
      <h2 className="mt-2 font-serif font-bold leading-tight text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', letterSpacing: '-0.5px' }}>
        {title}
      </h2>
      {description && <p className="mt-3 max-w-[520px] font-sans text-[15px] leading-[26px] text-secondary">{description}</p>}
    </motion.div>
  )
}

// ── Photo milestone card (same technique as Leadership's EnterpriseCard) ────

function PhotoMilestone({ m, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = m.type === 'education' ? GraduationCapIcon : BriefcaseIcon

  return (
    <motion.div
      id={m.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
      className="group relative scroll-mt-28"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] md:aspect-[21/9]">
        <motion.img
          src={m.image}
          alt={m.imageCaption}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-6 top-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
            <Icon className="h-4 w-4" />
          </span>
          <span className="rounded-pill bg-black/30 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm">
            {m.period}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <h3 className="font-serif text-[26px] font-bold leading-tight text-white md:text-[34px]">{m.title}</h3>
          <p className="mt-1 font-sans text-[14px] text-white/70">
            {m.org} · {m.location}
          </p>
        </div>
      </div>

      <p className="mt-4 max-w-[70ch] font-sans text-[15px] leading-[25px] text-secondary">{m.description}</p>
      <p className="mt-2 font-serif text-[15px] italic leading-[22px] text-ink/70">"{m.focus}"</p>
      <p className="mt-2 font-sans text-[12.5px] italic text-secondary/70">{m.imageCaption}</p>
    </motion.div>
  )
}

// ── Row milestone (same technique as Leadership's ChamberRow) ───────────────

function RowMilestone({ m, index }) {
  const Icon = m.type === 'education' ? GraduationCapIcon : BriefcaseIcon
  return (
    <motion.div
      id={m.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: Math.min((index % 4) * 0.06, 0.24), ease }}
      className="group scroll-mt-28 border-b border-border py-6"
    >
      <div className="grid grid-cols-[36px_1fr] items-start gap-x-5 md:grid-cols-[40px_1fr_160px]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Icon className="h-4 w-4" />
        </span>

        <div className="min-w-0">
          {/* Below md the period column doesn't exist, so it reads as a label above the title instead of squeezing the text into a third column. */}
          <span className="mb-1 block font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-brand md:hidden">
            {m.period}
          </span>
          <h3 className="font-serif text-[20px] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-brand md:text-[22px]">
            {m.title}
          </h3>
          <div className="mt-0.5 font-sans text-[14px] text-secondary">
            {m.org} · {m.location}
          </div>
          <p className="mt-2 max-w-[62ch] font-sans text-[14.5px] leading-[23px] text-secondary">{m.description}</p>
          {m.focus && <p className="mt-2 font-serif text-[14.5px] italic leading-[21px] text-ink/65">"{m.focus}"</p>}
        </div>

        <div className="hidden pt-1 text-right md:block">
          <span className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-brand">{m.period}</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Final ─────────────────────────────────────────────────────────────────

function FinalSection() {
  return (
    <section className="border-t border-border px-6 py-20 md:px-14 md:py-28 lg:px-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease }}
        className="font-serif font-black leading-[0.95] text-ink"
        style={{ fontSize: 'clamp(38px,6vw,80px)', letterSpacing: '-2px' }}
      >
        The journey <span className="text-brand">continues.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, delay: 0.12, ease }}
        className="mt-5 max-w-[46ch] font-sans text-[16px] leading-[27px] text-secondary"
      >
        Experience becomes meaningful when it continues to create value.
      </motion.p>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function Journey() {
  return (
    <main className="relative z-20">
      <JourneyHero />

      <section className="border-t border-border px-6 py-16 md:px-14 md:py-24 lg:px-20">
        <SectionLabel
          eyebrow="1985 – Present"
          title="A Career Across Industries"
          description={`${roleCount} roles and ${educationCount} degrees — fertiliser trading, exports, logistics, real estate, animal transport, finance and heritage, in the order they happened.`}
        />

        <div className="flex flex-col gap-14 md:gap-16">
          {milestones.map((m, i) =>
            m.image ? (
              <PhotoMilestone key={m.id} m={m} index={i} />
            ) : (
              <RowMilestone key={m.id} m={m} index={i} />
            ),
          )}
        </div>
      </section>

      <FinalSection />
    </main>
  )
}
