import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const stats = [
  { value: '40+', label: 'Years in business' },
  { value: '6', label: 'Languages spoken' },
  { value: '3', label: 'States that shaped him' },
  { value: '12+', label: 'Boards served' },
]

const explore = [
  {
    to: '/journey',
    label: 'The Journey',
    description: 'A four-decade career, milestone by milestone.',
  },
  {
    to: '/initiatives',
    label: 'Initiatives',
    description: 'Heritage, clean water and public service.',
  },
  {
    to: '/leadership',
    label: 'Leadership',
    description: 'Group, chamber and board stewardship.',
  },
  {
    to: '/media',
    label: 'Media & Recognition',
    description: 'Speaking, awards and languages.',
  },
]

export default function DiscoverMore() {
  return (
    <main className="relative z-20">
      <PageHeader
        index="00"
        title="Discover"
        accent="Sanjay"
        subtitle="A solution-oriented mentor and dedicated worker, shaped by four decades of work across industries and a childhood spent across three regions of India."
      />

      <div className="px-6 pb-24 md:px-14 md:pb-32 lg:px-20">
        <div className="max-w-[760px]">
          <Reveal className="grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-[36px] font-bold leading-none text-brand">
                  {stat.value}
                </div>
                <div className="mt-2 font-sans text-[13px] leading-[18px] text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-12 space-y-5 font-sans text-[17px] leading-[29px] text-secondary"
          >
            <p>
              Born in Rajasthan, raised across Haryana and Uttar Pradesh, and schooled and
              graduated in West Bengal, Sanjay Goel has imbibed values from across India's
              cultures. Over more than four decades he has moved fluently between industries —
              starting as the distribution head for Tata Steel and SAIL's fertiliser consignments,
              working as an export manager exploring agro-commodity markets, and consolidating
              land for large Indian corporates.
            </p>
            <p>
              He has managed teams of over 300 employees, run logistics for events involving 70
              people and 30 vehicles, and operated large warehouse networks — including for BP
              Energy under stringent British HSE standards. He built and ran the back-end supply
              chain for prestigious international brands like DAKS London, SavileRowCo and
              Trussardi across Forbes Group's 22-store retail network in India, executed the
              shifting of large offices and prestigious clients, and handled antiques and
              high-value paintings along the way. He went on to found Pet Travel for the
              international movement of pets.
            </p>
            <p>
              Alongside villa housing, real estate and low-income group housing development, he
              serves as an advisor to the Loharuka Group of Hotels and to ITM College, Lucknow, and
              is an established speaker across India and abroad.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-12 border-l-2 border-brand pl-6">
            <p className="font-serif text-[26px] italic leading-snug text-ink md:text-[30px]">
              "True leadership lies in building people and preserving values."
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="Continue reading" title="Explore Further" />
          <div className="grid gap-4 sm:grid-cols-2">
            {explore.map((item, i) => (
              <Reveal key={item.to} delay={Math.min(i * 0.06, 0.24)}>
                <Link
                  to={item.to}
                  className="group flex items-center justify-between rounded-[20px] border border-border bg-white/40 p-6 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <span>
                    <span className="block font-serif text-[20px] font-bold text-ink">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-sans text-[14px] text-secondary">
                      {item.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-[16px] text-ink transition-transform group-hover:translate-x-1"
                  >
                    &#8599;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
