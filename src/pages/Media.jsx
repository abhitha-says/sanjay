import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MediaHero from '../components/MediaHero'
import Reveal from '../components/Reveal'
import { Box, Building, Users, Droplet, Landmark, Wallet, Award } from '../components/icons'

import moderatorCscmpEvent  from '../assets/gallery/moderator-cscmp-event.jpg'
import withAshaBhosle       from '../assets/gallery/with-asha-bhosle.jpg'
import withSanjivSanyal     from '../assets/gallery/with-sanjiv-sanyal.jpg'
import withSudhirMungantiwar from '../assets/gallery/with-sudhir-mungantiwar.jpg'
import felicitatedKhot      from '../assets/gallery/felicitated-minister-khot.jpg'
import withSunilPal         from '../assets/gallery/with-sunil-pal.jpg'
import stXaviers            from '../assets/gallery/st-xaviers-150-years.jpg'
import mhadaCeo             from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'
import cscmpNewsletter      from '../assets/gallery/cscmp-newsletter-launch-2011.jpg'
import speakingConference   from '../assets/gallery/speaking-conference-2012.jpg'

const ease = [0.22, 1, 0.36, 1]

const topics = [
  { label: 'Supply Chain & Logistics',       icon: Box      },
  { label: 'Real Estate & Township Development', icon: Building },
  { label: 'Manpower Management',            icon: Users    },
  { label: 'Water Treatment Technologies',   icon: Droplet  },
  { label: 'Heritage Conservation',          icon: Landmark },
  { label: 'Fund Raising & Financial Services', icon: Wallet },
]

const moments = [
  { image: moderatorCscmpEvent,   caption: 'Moderator at a Council of Supply Chain Management Professionals (USA) event', role: 'Speaker · CSCMP',           position: '25% 40%' },
  { image: withSanjivSanyal,      caption: 'With Shri Sanjiv Sanyal, Economic Adviser to the Prime Minister of India',   role: 'Leadership Forum',          position: '50% 30%' },
  { image: withSudhirMungantiwar, caption: 'With Shri Sudhir Bhau Mungantiwar, former Finance Minister, Govt. of Maharashtra', role: 'Public Service',     position: '50% 25%' },
  { image: withAshaBhosle,        caption: 'With the late Asha Bhosle Tai — a moment of warmth and admiration',          role: 'Cultural Evening',          position: '50% 22%' },
  { image: felicitatedKhot,       caption: 'Felicitated by Minister Khot in recognition of professional achievements',    role: 'Recognition Ceremony',      position: '50% 20%' },
  { image: withSunilPal,          caption: 'With comedian and social activist Shri Sunil Pal',                            role: 'Community Event',           position: '50% 20%' },
  { image: stXaviers,             caption: "St. Xavier's College Calcutta — 150-year anniversary celebration",            role: 'Alumni Association',        position: '50% 35%' },
  { image: mhadaCeo,              caption: 'With MHADA CEO Shri Sanjiv Jaiswal at a housing policy roundtable',          role: 'Policy Discussion',         position: '50% 28%' },
  { image: cscmpNewsletter,       caption: 'CSCMP Newsletter launch event — 2011',                                        role: 'Publication Launch · 2011', position: '50% 40%' },
  { image: speakingConference,    caption: 'Speaking at an international supply chain conference — 2012',                 role: 'Keynote · 2012',            position: '50% 18%' },
]

const languages = [
  { name: 'Hindi',            level: 'Native or bilingual',   pct: 100, script: 'हिंदी'       },
  { name: 'English',          level: 'Full professional',     pct: 95,  script: 'English'     },
  { name: 'Bengali',          level: 'Full professional',     pct: 90,  script: 'বাংলা'        },
  { name: 'Marathi',          level: 'Professional working',  pct: 75,  script: 'मराठी'       },
  { name: 'Rajasthani',       level: 'Professional working',  pct: 70,  script: 'राजस्थानी'   },
  { name: 'Bihari languages', level: 'Elementary',            pct: 40,  script: 'भोजपुरी'    },
]

// ── Speaking topic pill ──────────────────────────────────────────────────────
function TopicPill({ label, icon: Icon, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group flex items-center gap-3 rounded-[14px] border border-border bg-white/60 px-5 py-3.5 transition-all duration-300 hover:border-brand/25 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 transition-colors group-hover:bg-brand/20">
          <Icon className="h-4 w-4 text-brand" />
        </span>
        <span className="font-sans text-[14px] font-medium text-ink">{label}</span>
      </div>
    </Reveal>
  )
}

// ── Moment photo card ────────────────────────────────────────────────────────
function MomentCard({ moment, index, featured = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal delay={Math.min(index * 0.07, 0.4)} as="figure" className="group relative m-0">
      <div
        className={`relative overflow-hidden rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-500 group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.14)] ${featured ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.img
          src={moment.image}
          alt={moment.caption}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease }}
          className="h-full w-full object-cover"
          style={{ objectPosition: moment.position ?? '50% 50%' }}
        />

        {/* Dark gradient + caption overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-x-0 bottom-0 p-5"
        >
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">
            {moment.role}
          </p>
          <p className="mt-1 font-sans text-[14px] leading-[22px] text-white">
            {moment.caption}
          </p>
        </motion.div>

        {/* Role badge always visible */}
        <div className="absolute left-4 top-4">
          <span className="rounded-pill bg-black/30 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">
            {moment.role}
          </span>
        </div>
      </div>

      {/* Caption below (always visible on mobile) */}
      <figcaption className="mt-3 font-sans text-[13.5px] italic leading-[20px] text-secondary md:hidden">
        {moment.caption}
      </figcaption>
    </Reveal>
  )
}

// ── Award card ───────────────────────────────────────────────────────────────
function AwardCard() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-10 md:px-12">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-[80px]" aria-hidden="true" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8">
            <Award className="h-7 w-7 text-white/70" />
          </div>
          <div className="flex-1">
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-brand/90">
              Recognition · May 2015
            </span>
            <h3 className="mt-2 font-serif text-[clamp(22px,2.8vw,32px)] font-bold text-white">
              Super Achiever Award
            </h3>
            <p className="mt-3 max-w-[520px] font-sans text-[15px] leading-[26px] text-white/65">
              Issued by the Oriental College of Management for progressive work with GTC Group.
            </p>
          </div>
          <div className="shrink-0 border-t border-white/10 pt-4 font-sans text-[14px] italic leading-[22px] text-white/40 md:w-[160px] md:border-l md:border-t-0 md:pl-8 md:pt-0">
            Acknowledging leadership, vision and consistent contribution.
            <span className="mt-3 block h-[2px] w-8 bg-brand/50" />
          </div>
        </div>
      </div>
    </Reveal>
  )
}


// ── Page ─────────────────────────────────────────────────────────────────────
export default function Media() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <main className="relative z-20 -mt-[72px]">
      <MediaHero
        index="05"
        title="Media &"
        accent="Recognition"
        subtitle="Four decades of supply chain, real estate and heritage work, delivered from a podium in any of six languages."
      />

      {/* ── Speaking Topics ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-20 lg:px-20">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">On stage</span>
            <h2 className="mt-2 font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-ink">
              Speaking Topics
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[380px] font-sans text-[15px] leading-[26px] text-secondary">
              Every topic below is a job he has held, not a subject he has read about.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ label, icon }, i) => (
            <TopicPill key={label} label={label} icon={icon} index={i} />
          ))}
        </div>
      </section>

      {/* ── Recognition Award ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-20 lg:px-20">
        <Reveal>
          <span className="mb-8 block font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">Recognition</span>
        </Reveal>
        <AwardCard />
      </section>

      {/* ── Moments Gallery ── */}
      <section className="border-t border-border px-6 py-16 md:px-14 md:py-20 lg:px-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">Public life</span>
            <h2 className="mt-2 font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-ink">
              Moments
            </h2>
          </Reveal>
        </div>

        {/* Featured top row: 2 large */}
        <div className="grid gap-4 sm:grid-cols-2">
          {moments.slice(0, 2).map((m, i) => (
            <MomentCard key={m.caption} moment={m} index={i} featured />
          ))}
        </div>

        {/* Middle row: 3 */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moments.slice(2, 5).map((m, i) => (
            <MomentCard key={m.caption} moment={m} index={i + 2} />
          ))}
        </div>

        {/* Bottom row: remaining */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] xl:grid-cols-4">
          {moments.slice(5).map((m, i) => (
            <MomentCard key={m.caption} moment={m} index={i + 5} />
          ))}
        </div>
      </section>

      {/* ── Languages ── */}
      <section className="border-t border-border px-6 py-12 md:px-14 lg:px-20">
        <Reveal>
          <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">Reach</span>
          <h2 className="mt-2 mb-8 font-serif text-[clamp(24px,3vw,36px)] font-bold leading-tight text-ink">
            Languages
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-x-12 lg:max-w-[700px]">
          {languages.map((lang, i) => (
            <Reveal
              key={lang.name}
              delay={Math.min(i * 0.05, 0.25)}
              className="flex items-baseline justify-between border-b border-border py-3.5"
            >
              <span className="font-serif text-[clamp(16px,1.8vw,20px)] font-semibold text-ink">
                {lang.name}
              </span>
              <span className="ml-4 shrink-0 text-right font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-secondary/70">
                {lang.level}
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
