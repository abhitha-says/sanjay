import Reveal from './Reveal'
import { Award } from './icons'

export default function Recognition({ period, title, description, editorialNote }) {
  return (
    <section className="border-t border-border px-6 py-14 md:px-14 md:py-16 lg:px-20">
      <Reveal className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
        Recognition
      </Reveal>

      <Reveal
        delay={0.08}
        className="relative mt-5 overflow-hidden rounded-[20px] border border-border border-l-[3px] border-l-accent bg-white/40 shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 200 160"
          className="pointer-events-none absolute -right-4 top-1/2 h-[160px] w-[200px] -translate-y-1/2 text-brand/[0.06] md:right-[26%]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M100 150V20" />
          <path d="M100 40c20-10 40-6 46 10-18 8-36 4-46-10Z" />
          <path d="M100 65c-20-10-40-6-46 10 18 8 36 4 46-10Z" />
          <path d="M100 90c20-10 38-4 44 12-18 6-34 2-44-12Z" />
        </svg>

        <div className="relative flex flex-col gap-8 p-7 md:flex-row md:items-center md:gap-10 md:p-10">
          <div className="flex shrink-0 items-center gap-5 md:w-[42%]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/70">
              <Award className="h-6 w-6" />
            </span>
            <div>
              <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
                {period}
              </div>
              <h3 className="mt-1 font-serif text-[24px] font-bold leading-tight text-ink">{title}</h3>
            </div>
          </div>

          <p className="font-sans text-[15px] leading-[24px] text-secondary md:flex-1">{description}</p>

          {editorialNote && (
            <div className="shrink-0 border-t border-border pt-4 font-sans text-[14px] italic leading-[22px] text-secondary/80 md:w-[180px] md:border-l md:border-t-0 md:pl-6 md:pt-0">
              {editorialNote}
              <span className="mt-2 block h-[2px] w-8 bg-brand/40" />
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
