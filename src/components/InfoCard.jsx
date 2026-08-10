import Reveal from './Reveal'

export default function InfoCard({ title, meta, description, delay = 0 }) {
  return (
    <Reveal
      delay={delay}
      className="rounded-[24px] border border-border bg-white/40 p-7 shadow-soft backdrop-blur-[2px]"
    >
      {meta && (
        <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
          {meta}
        </div>
      )}
      <h3 className="mt-2 font-serif text-[24px] font-bold leading-tight text-ink">{title}</h3>
      {description && (
        <p className="mt-3 font-sans text-[15px] leading-[24px] text-secondary">{description}</p>
      )}
    </Reveal>
  )
}
