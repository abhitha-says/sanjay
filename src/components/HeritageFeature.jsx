import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

const ease = [0.22, 1, 0.36, 1]

export default function HeritageFeature({ data }) {
  const [open, setOpen] = useState(false)
  const { org, role, period, yearEstablished, pillars, summary, image, imageCaption, registry, detail } = data

  return (
    <section className="px-6 py-20 md:px-14 md:py-28 lg:px-20">
      <Reveal className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
        {role} · {period}
      </Reveal>

      <Reveal
        as="h2"
        delay={0.06}
        className="mt-3 font-serif text-[clamp(40px,6.5vw,88px)] font-black leading-[0.96] tracking-[-1.5px] text-ink"
      >
        {org}
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal delay={0.12} className="relative">
          <div className="pointer-events-none select-none font-serif text-[clamp(90px,12vw,180px)] font-black leading-none text-brand/12">
            {yearEstablished}
          </div>
          <div className="-mt-6 flex flex-wrap gap-x-5 gap-y-1 font-serif text-[26px] italic text-ink/80 md:-mt-10">
            {pillars.map((p, i) => (
              <span key={p}>
                {p}
                {i < pillars.length - 1 && <span className="text-brand/40"> · </span>}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-[46ch] font-sans text-[17px] leading-[28px] text-secondary">{summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 font-sans text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              {open ? 'Close' : 'Read the full story'}
              <span aria-hidden="true">{open ? '↑' : '↗'}</span>
            </button>
            <span className="font-sans text-[12px] italic text-secondary/70">
              {registry.sourceName} ↗
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative overflow-hidden rounded-[28px] shadow-soft">
          <img
            src={image}
            alt={imageCaption}
            className="h-[360px] w-full object-cover object-top md:h-[440px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 py-4">
            <p className="font-sans text-[13px] italic text-white/90">{imageCaption}</p>
          </div>
        </Reveal>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, height: 'auto', clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden"
          >
            <div className="mt-14 grid gap-10 border-t border-border pt-12 md:grid-cols-2">
              <div>
                <h3 className="font-serif text-[20px] font-bold text-ink">Overview</h3>
                <p className="mt-2 font-sans text-[15px] leading-[24px] text-secondary">{detail.overview}</p>

                <h3 className="mt-8 font-serif text-[20px] font-bold text-ink">Role</h3>
                <p className="mt-2 font-sans text-[15px] leading-[24px] text-secondary">{detail.role}</p>

                <h3 className="mt-8 font-serif text-[20px] font-bold text-ink">Registration</h3>
                <dl className="mt-2 space-y-1 font-sans text-[14px] leading-[22px] text-secondary">
                  <div><dt className="inline font-semibold text-ink">CIN — </dt><dd className="inline">{registry.cin}</dd></div>
                  <div><dt className="inline font-semibold text-ink">Registrar — </dt><dd className="inline">{registry.roc}</dd></div>
                  <div><dt className="inline font-semibold text-ink">Category — </dt><dd className="inline">{registry.category}</dd></div>
                  <div><dt className="inline font-semibold text-ink">Registered office — </dt><dd className="inline">{registry.registeredOffice}</dd></div>
                </dl>
              </div>

              <div>
                <h3 className="font-serif text-[20px] font-bold text-ink">Timeline</h3>
                <ul className="mt-2 space-y-3">
                  {detail.timeline.map((t) => (
                    <li key={t.year} className="flex gap-4 font-sans text-[15px] text-secondary">
                      <span className="w-16 shrink-0 font-semibold text-brand">{t.year}</span>
                      <span>{t.label}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 font-serif text-[20px] font-bold text-ink">Work &amp; activities</h3>
                <p className="mt-2 font-sans text-[15px] italic leading-[24px] text-secondary/80">
                  {detail.activitiesNote}
                </p>

                <h3 className="mt-8 font-serif text-[20px] font-bold text-ink">Sources</h3>
                <ul className="mt-2 space-y-1">
                  {detail.sources.map((s) => (
                    <li key={s.name} className="font-sans text-[13px] text-secondary">
                      {s.name} <span className="text-secondary/60">— {s.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
