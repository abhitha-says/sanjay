import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import Reveal from './Reveal'

export default function PageHeader({ index, title, accent, subtitle }) {
  const go = useTransitionNavigate()

  return (
    <div className="px-6 pb-10 pt-20 md:px-14 md:pb-16 md:pt-24 lg:px-20">
      <Reveal>
        <button
          onClick={() => go('/')}
          className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-sans text-[13px] text-secondary transition-colors hover:text-ink"
          aria-label="Back home"
        >
          <span aria-hidden="true">&#8592;</span> Back home
        </button>
      </Reveal>

      <Reveal delay={0.08} className="mt-8 font-sans text-[20px] font-semibold text-ink">
        {index}
      </Reveal>

      <Reveal
        as="h1"
        delay={0.14}
        className="mt-2 font-serif text-[clamp(44px,7vw,104px)] font-black leading-[0.95] tracking-[-2px] text-ink"
      >
        {title}
        {accent && <span className="text-brand"> {accent}</span>}
      </Reveal>

      {subtitle && (
        <Reveal
          delay={0.22}
          className="mt-5 max-w-[640px] font-sans text-[18px] leading-[30px] text-secondary"
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}

