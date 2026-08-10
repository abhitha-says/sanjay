import PageHeader from '../components/PageHeader'
import InfoCard from '../components/InfoCard'
import Reveal from '../components/Reveal'

const initiatives = [
  {
    meta: 'Founder · 2020 – Present',
    title: 'Aryavarta Heritage Foundation',
    description:
      'An NGO registered with the Government of India to support, preserve and promote the rich cultural heritage of Ancient India — spanning monuments, social practices, arts and other areas of historical significance.',
  },
  {
    meta: 'Partner · 2017 – 2020',
    title: 'Water Treatment Technologies',
    description:
      'Through Greenzytech Solutions LLP, brought a chemical-free approach to drinking and waste water treatment — softening water and removing microbial and other impurities without chemicals or membranes, in systems built to run maintenance-free for at least 25 years, while cutting waste-water treatment costs by up to 50%.',
  },
  {
    meta: 'Resource Person · 2025 – Present',
    title: 'National Commission for Women, India',
    description:
      "Contributing as a resource person to the Commission's work on behalf of women across India.",
  },
  {
    meta: 'Fund Raiser · 1987',
    title: 'PM Relief Fund',
    description:
      'Volunteered in disaster and humanitarian relief fundraising for the Prime Minister’s Relief Fund.',
  },
]

export default function Initiatives() {
  return (
    <main className="relative z-20">
      <PageHeader
        index="03"
        title="Initiatives"
        subtitle="Work undertaken alongside a business career — in heritage preservation, clean water access, humanitarian relief and public service."
      />
      <div className="px-6 pb-16 md:px-14 lg:px-20">
        <div className="grid gap-6 md:grid-cols-2">
          {initiatives.map((item, i) => (
            <InfoCard key={item.title} {...item} delay={Math.min(i * 0.08, 0.32)} />
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="mt-12 max-w-[720px] font-sans text-[16px] leading-[26px] text-secondary"
        >
          <span className="font-semibold text-ink">Also invested in: </span>
          Education, solid waste management, and fund raising & financial services — recurring
          themes across three decades of community-facing work.
        </Reveal>
      </div>
    </main>
  )
}
