import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="mb-6 flex items-baseline gap-4">
      {eyebrow && (
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-[28px] font-bold leading-tight text-ink md:text-[34px]">
        {title}
      </h2>
    </Reveal>
  )
}
