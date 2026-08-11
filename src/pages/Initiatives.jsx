import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { heritage, water, publicService, byTheNumbers, finalStatement, philosophy } from '../data/initiatives'
import heritageBg from '../assets/heritage-bg.png'

const ease = [0.22, 1, 0.36, 1]

// ─── Initiative Card ──────────────────────────────────────────────────────────
function InitiativeCard({ number, label, title, period, description, accent = false, children }) {
  return (
    <Reveal>
      <div className={`group relative overflow-hidden rounded-[28px] border border-border p-8 md:p-10 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,.08)] ${accent ? 'bg-ink text-white' : 'bg-white/70'}`}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <span className={`font-sans text-[12px] font-semibold uppercase tracking-[0.18em] ${accent ? 'text-white/50' : 'text-brand'}`}>
            {label}
          </span>
          <span className={`font-serif text-[clamp(36px,6vw,72px)] font-black leading-none tabular-nums ${accent ? 'text-white/10' : 'text-brand/10'}`}>
            {number}
          </span>
        </div>
        <h3 className={`font-serif text-[clamp(22px,3vw,32px)] font-bold leading-[1.1] tracking-[-0.5px] ${accent ? 'text-white' : 'text-ink'}`}>
          {title}
        </h3>
        <p className={`mt-1 font-sans text-[13px] font-medium ${accent ? 'text-white/50' : 'text-secondary/70'}`}>
          {period}
        </p>
        <p className={`mt-5 font-sans text-[15px] leading-[26px] ${accent ? 'text-white/75' : 'text-secondary'}`}>
          {description}
        </p>
        {children}
      </div>
    </Reveal>
  )
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col items-center justify-center rounded-[20px] border border-border bg-white/60 px-8 py-8 text-center backdrop-blur-sm">
        <span className="font-serif text-[clamp(40px,5vw,64px)] font-black leading-none tracking-[-1px] text-brand">
          {value}
        </span>
        <span className="mt-2 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-secondary/70">
          {label}
        </span>
      </div>
    </Reveal>
  )
}

// ─── Pillar Badge ─────────────────────────────────────────────────────────────
function PillarBadge({ word, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-pill px-5 py-2 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
        active
          ? 'bg-brand text-white shadow-[0_4px_16px_rgba(45,122,58,.35)]'
          : 'border border-border bg-white/60 text-secondary hover:border-brand/30 hover:text-ink'
      }`}
    >
      {word}
    </button>
  )
}

// ─── Public Service Card ──────────────────────────────────────────────────────
function ServiceCard({ item, index }) {
  return (
    <Reveal delay={index * 0.07}>
      <div className="group flex gap-5 rounded-[20px] border border-border bg-white/60 p-6 transition-all duration-300 hover:border-brand/20 hover:bg-white/90 hover:shadow-[0_8px_32px_rgba(0,0,0,.06)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 font-serif text-[15px] font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div>
          <h4 className="font-serif text-[18px] font-bold text-ink">{item.word}</h4>
          <p className="mt-1.5 font-sans text-[14px] leading-[24px] text-secondary">{item.body}</p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Heritage Detail Panel ────────────────────────────────────────────────────
function HeritageDetail({ data }) {
  const [open, setOpen] = useState(false)
  const { registry, detail } = data

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3 font-sans text-[13px] font-semibold text-ink shadow-[0_2px_12px_rgba(0,0,0,.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,.15)]"
        >
          {open ? 'Close details' : 'Read the full story'}
          <span aria-hidden="true" className="text-brand">{open ? '↑' : '↗'}</span>
        </button>
        <span className="font-sans text-[12px] italic text-white/50">
          Ministry of Corporate Affairs registry
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden"
          >
            <div className="mt-10 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-2">
              <div>
                <h4 className="font-serif text-[18px] font-bold text-white">Overview</h4>
                <p className="mt-2 font-sans text-[14px] leading-[24px] text-white/70">{detail.overview}</p>
                <h4 className="mt-7 font-serif text-[18px] font-bold text-white">Role</h4>
                <p className="mt-2 font-sans text-[14px] leading-[24px] text-white/70">{detail.role}</p>
              </div>
              <div>
                <h4 className="font-serif text-[18px] font-bold text-white">Registration</h4>
                <dl className="mt-2 space-y-1.5 font-sans text-[13px] leading-[22px] text-white/70">
                  <div><dt className="inline font-semibold text-white/90">CIN — </dt><dd className="inline">{registry.cin}</dd></div>
                  <div><dt className="inline font-semibold text-white/90">Registrar — </dt><dd className="inline">{registry.roc}</dd></div>
                  <div><dt className="inline font-semibold text-white/90">Category — </dt><dd className="inline">{registry.category}</dd></div>
                  <div><dt className="inline font-semibold text-white/90">Office — </dt><dd className="inline">{registry.registeredOffice}</dd></div>
                </dl>
                <h4 className="mt-7 font-serif text-[18px] font-bold text-white">Timeline</h4>
                <ul className="mt-2 space-y-2">
                  {detail.timeline.map((t) => (
                    <li key={t.year} className="flex gap-4 font-sans text-[13px] text-white/70">
                      <span className="w-14 shrink-0 font-bold text-white/90">{t.year}</span>
                      <span>{t.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Initiatives() {
  const [activeWord, setActiveWord] = useState(publicService[0].word)
  const activeService = publicService.find((i) => i.word === activeWord)

  const go = useTransitionNavigate()

  return (
    <main className="relative z-20">

      {/* ── Hero ── */}
      <section className="px-6 pt-20 pb-14 md:px-14 md:pt-24 md:pb-20 lg:px-20">
        {/* Back link */}
        <Reveal>
          <button
            onClick={() => go('/')}
            className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-sans text-[13px] text-secondary transition-colors hover:text-ink"
            aria-label="Back home"
          >
            <span aria-hidden="true">&#8592;</span> Back home
          </button>
        </Reveal>

        {/* Two-column layout */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">

          {/* Left — title block */}
          <div>
            <Reveal delay={0.06}>
              <span className="font-sans text-[20px] font-semibold text-ink">04</span>
            </Reveal>
            <Reveal
              as="h1"
              delay={0.14}
              className="mt-2 font-serif text-[clamp(44px,7vw,104px)] font-black leading-[0.95] tracking-[-2px] text-ink"
            >
              Initiatives
            </Reveal>
            <Reveal delay={0.22} className="mt-6 max-w-[42ch] font-sans text-[18px] leading-[30px] text-secondary">
              Business is one part of the journey. Contribution is another.
            </Reveal>
          </div>

          {/* Right — philosophy pull-quote */}
          <Reveal delay={0.3}>
            <div className="relative border-l-[3px] border-brand pl-8 lg:pb-2">
              <span className="mb-5 block font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/70">
                Philosophy
              </span>
              <p className="font-serif text-[clamp(17px,1.8vw,22px)] italic leading-[1.6] text-ink/75">
                Four decades in business have run alongside a quieter thread of work — preserving what came before,
                treating water and waste as problems worth solving, and showing up where institutions asked for a hand.
              </p>
              <p className="mt-4 font-serif text-[clamp(17px,1.8vw,22px)] italic leading-[1.6] text-ink/75">
                None of it competes with the business. It is the same discipline, spent on something else.
              </p>
              {/* Decorative dot */}
              <span
                className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-brand"
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Aryavarta Heritage Foundation — HERO CARD ── */}
      <section className="px-6 pb-6 md:px-14 lg:px-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink p-6 md:p-10 lg:p-14">
            {/* Background ambient glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand/20 blur-[120px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-brand/10 blur-[100px]" aria-hidden="true" />

            {/* Mobile leads with the portrait (order-first); md+ restores the
                original text-left/image-right editorial columns. */}
            <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start md:gap-10">
              {/* Content */}
              <div className="order-2 md:order-1">
                <span className="inline-block rounded-pill border border-white/15 bg-white/8 px-4 py-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Founder · 2020 — Present
                </span>

                <h2 className="mt-5 font-serif text-[clamp(36px,5.5vw,72px)] font-black leading-[0.96] tracking-[-2px] text-white">
                  Aryavarta<br />Heritage<br />Foundation
                </h2>

                <div className="mt-6 flex flex-wrap gap-2">
                  {heritage.pillars.map((p) => (
                    <span key={p} className="rounded-pill border border-brand/40 bg-brand/15 px-4 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-brand/90">
                      {p}
                    </span>
                  ))}
                </div>

                <p className="mt-7 max-w-[50ch] font-sans text-[16px] leading-[28px] text-white/70">
                  {heritage.summary}
                </p>

                <HeritageDetail data={heritage} />
              </div>

              {/* Portrait + stats — leads on mobile, sits right of text from md up */}
              <div className="order-1 flex flex-col gap-5 md:order-2">
                <div className="overflow-hidden rounded-[22px] shadow-[0_20px_60px_rgba(0,0,0,.4)]">
                  <img
                    src={heritage.image}
                    alt={heritage.imageCaption}
                    className="h-[260px] w-full object-cover object-top md:h-[360px] transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[16px] border border-white/10 bg-white/6 p-4 text-center backdrop-blur-sm">
                    <div className="font-serif text-[28px] font-black text-brand">2020</div>
                    <div className="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-white/50">Founded</div>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-white/6 p-4 text-center backdrop-blur-sm">
                    <div className="font-serif text-[28px] font-black text-brand">§8</div>
                    <div className="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-white/50">Not-for-profit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Water Treatment ── */}
      <section className="px-6 py-6 md:px-14 lg:px-20">
        <div className="grid gap-5 md:grid-cols-2">
          <InitiativeCard
            number="02"
            label={`${water.role} · ${water.period}`}
            title={water.org}
            period={water.vehicle}
            description={water.summary}
          >
            <div className="mt-6 flex flex-wrap gap-2">
              {['Chemical-free', 'Maintenance-free 25yr', 'Waste-water cost −50%'].map((tag) => (
                <span key={tag} className="rounded-pill border border-brand/20 bg-brand/8 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                  {tag}
                </span>
              ))}
            </div>
          </InitiativeCard>

          {/* Stats block */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-[28px] border border-border bg-brand/8 p-8 md:p-10">
              <div>
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">Impact</span>
                <h3 className="mt-4 font-serif text-[clamp(28px,3.5vw,40px)] font-bold leading-[1.1] text-ink">
                  By the Numbers
                </h3>
              </div>
              <div className="mt-8 space-y-5">
                {byTheNumbers.map((stat, i) => (
                  <div key={stat.value} className="flex items-center gap-5 border-b border-border pb-5 last:border-0 last:pb-0">
                    <span className="font-serif text-[clamp(36px,4.5vw,54px)] font-black leading-none text-brand">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[14px] leading-[22px] text-secondary">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Community & Contribution ── */}
      <section className="px-6 py-16 md:px-14 md:py-20 lg:px-20">
        <Reveal>
          <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
            Public Service
          </span>
          <h2 className="mt-3 mb-10 font-serif text-[clamp(32px,4.5vw,56px)] font-black leading-[1.02] tracking-[-1px] text-ink">
            Community &amp; Contribution
          </h2>
        </Reveal>

        {/* Interactive word selector */}
        <Reveal delay={0.08}>
          <div className="mb-8 flex flex-wrap gap-2">
            {publicService.map((item) => (
              <PillarBadge
                key={item.word}
                word={item.word}
                active={item.word === activeWord}
                onClick={() => setActiveWord(item.word)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeService && (
              <motion.div
                key={activeService.word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
                className="mb-12 max-w-[60ch] rounded-[16px] border border-brand/15 bg-brand/6 p-5 font-sans text-[15px] leading-[26px] text-secondary"
              >
                {activeService.body}
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {publicService.map((item, i) => (
            <ServiceCard key={item.word} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── Final Statement ── */}
      <section className="relative overflow-hidden border-t border-border px-6 py-24 md:px-14 md:py-32 lg:px-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/4 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative">
          <Reveal>
            <p className="max-w-[22ch] font-serif text-[clamp(30px,5vw,58px)] font-bold leading-[1.1] tracking-[-1px] text-ink">
              {finalStatement}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 h-px w-24 bg-brand" />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
