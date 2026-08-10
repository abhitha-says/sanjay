import { useState } from 'react'
import Reveal from './Reveal'
import { Briefcase, Calendar, GraduationCap, MapPin } from './icons'

function InfoRow({ icon: Icon, label, sub }) {
  return (
    <div className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Icon />
      </span>
      <div>
        <div className="font-sans text-[14px] font-semibold leading-tight text-ink">{label}</div>
        {sub && <div className="font-sans text-[13px] text-secondary">{sub}</div>}
      </div>
    </div>
  )
}

export default function MilestoneCard({ milestone, id, delay = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const { period, title, org, location, description, image, caption, type, focus, details } = milestone
  const RoleIcon = type === 'education' ? GraduationCap : Briefcase

  return (
    <Reveal
      id={id}
      delay={delay}
      className="scroll-mt-28 rounded-[28px] border border-border bg-white/50 p-6 shadow-soft md:p-8"
    >
      <div
        className={`grid gap-8 lg:items-center ${
          image ? 'lg:grid-cols-[1fr_1.15fr_260px]' : 'lg:grid-cols-[1fr_260px]'
        }`}
      >
        <div>
          <div className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
            {period}
          </div>
          <h3 className="mt-2 font-serif text-[28px] font-bold leading-[1.08] text-ink md:text-[32px]">
            {title}
          </h3>
          <span className="mt-3 block h-[2px] w-10 bg-accent" />
          <p className="mt-4 font-sans text-[15px] leading-[24px] text-secondary">{description}</p>

          {details && (
            <>
              {expanded && (
                <p className="mt-3 font-sans text-[15px] leading-[24px] text-secondary">{details}</p>
              )}
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-5 inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-2.5 font-sans text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                {expanded ? 'Show less' : 'View details'}
                <span aria-hidden="true">{expanded ? '↑' : '↗'}</span>
              </button>
            </>
          )}
        </div>

        {image && (
          <figure className="overflow-hidden rounded-[20px]">
            <img
              src={image}
              alt={caption ?? title}
              className="h-[220px] w-full object-cover md:h-[260px]"
            />
          </figure>
        )}

        <div className="divide-y divide-border">
          <InfoRow icon={RoleIcon} label={title} sub={org} />
          <InfoRow icon={Calendar} label={period} sub="Duration" />
          {location && (
            <InfoRow icon={MapPin} label={location} sub={location === 'India' ? '' : 'India'} />
          )}
          {focus && (
            <div className="flex items-start gap-3 pt-3.5">
              <span className="font-serif text-[30px] leading-none text-accent">&ldquo;</span>
              <p className="font-serif text-[15px] italic leading-[22px] text-ink">{focus}</p>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
