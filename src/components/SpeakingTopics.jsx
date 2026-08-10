import Reveal from './Reveal'

export default function SpeakingTopics({ topics }) {
  return (
    <section className="border-t border-border px-6 py-14 md:px-14 md:py-16 lg:px-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
        <Reveal>
          <div className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
            On stage
          </div>
          <h2 className="mt-2 font-serif text-[28px] font-bold leading-tight text-ink md:text-[34px]">
            Speaking Topics
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:max-w-[720px]">
          {topics.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-pill border border-border bg-white/40 px-4 py-2.5 font-sans text-[13.5px] text-ink"
            >
              <Icon className="h-4 w-4 text-brand" />
              {label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
