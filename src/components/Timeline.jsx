import Reveal from './Reveal'

export default function Timeline({ items }) {
  return (
    <div className="relative border-l border-border pl-8">
      {items.map((item, i) => (
        <Reveal
          key={`${item.title}-${item.period}`}
          delay={Math.min(i * 0.04, 0.4)}
          className="relative pb-12 last:pb-0"
        >
          <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full bg-brand ring-4 ring-bg" />
          <div className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
            {item.period}
          </div>
          <h3 className="mt-1 font-serif text-[26px] font-bold leading-tight text-ink md:text-[30px]">
            {item.title}
          </h3>
          <div className="mt-1 font-sans text-[15px] text-secondary">
            {item.org}
            {item.location && <span className="text-ink/30"> &middot; {item.location}</span>}
          </div>
          {item.description && (
            <p className="mt-3 max-w-[640px] font-sans text-[16px] leading-[26px] text-secondary">
              {item.description}
            </p>
          )}
          {item.image && (
            <figure className="mt-5 max-w-[380px]">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full rounded-[18px] object-cover shadow-soft"
              />
              <figcaption className="mt-2 font-sans text-[13px] italic leading-[19px] text-secondary">
                {item.caption}
              </figcaption>
            </figure>
          )}
        </Reveal>
      ))}
    </div>
  )
}
