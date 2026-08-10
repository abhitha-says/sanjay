import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import cscmpNewsletter from '../assets/gallery/cscmp-newsletter-launch-2011.jpg'
import felicitatedMinisterKhot from '../assets/gallery/felicitated-minister-khot.jpg'

const groupLeadership = [
  {
    title: 'Chairman',
    org: 'GTC Group',
    period: '2006 – Present',
    description: "Group vision and direction, with an eye on growth, employee welfare and social acceptance.",
  },
  {
    title: 'President',
    org: 'GTC Corporation',
    period: '1997 – Present',
    description: 'All management operations and decisions.',
  },
  {
    title: 'Managing Partner',
    org: 'GTC Enterprises',
    period: '2012 – Present',
    description: 'Development of low-cost housing.',
  },
  {
    title: 'Chief Executive Officer',
    org: 'Agrawal Business Network LLP',
    period: '2025 – Present',
  },
]

const chambers = [
  {
    title: 'Vice Chairman',
    org: 'Navi Mumbai Chamber of Commerce, Business and Industry',
    period: '2016 – Present',
  },
  {
    title: 'Co-Chairman, Supply Chain & Logistics Committee',
    org: 'Maharashtra Chamber of Commerce, Industry & Agriculture',
    period: '2015 – 2020',
    image: felicitatedMinisterKhot,
    caption: 'Felicitated by Shri Sada Bhau Khot, Hon. Minister, Govt of Maharashtra',
  },
  {
    title: 'Country Representative – India',
    org: 'Supply Chain Asia',
    period: '2006 – 2025',
  },
  {
    title: 'Country Reviewer – Bangladesh',
    org: 'International Pet Animal Transport Association',
    period: '2013 – 2025',
  },
  {
    title: 'Hon. Secretary, Mumbai Round Table',
    org: 'Council of Supply Chain Management Professionals',
    period: '2012 – 2014',
    image: cscmpNewsletter,
    caption: 'Launch of the CSCMP (USA) Newsletter in India, 2011',
  },
  {
    title: 'Vice President, Programs',
    org: 'CSCMP Mumbai Round Table',
    period: '2014 – 2015',
  },
  {
    title: 'Secretary, West Zone',
    org: "St. Xavier's College Calcutta Alumni Association",
    period: '2006 – Present',
  },
]

const boards = [
  { title: 'Independent Director', org: 'Suvidhaa.com', period: '2020 – 2021' },
  { title: 'Director', org: 'Disha Loharuka Infratech Pvt Ltd', period: '2011 – 2025' },
  { title: 'Director', org: 'Pet Travel Private Limited', period: '2012 – 2025' },
  { title: 'Director', org: 'Hamilton Greens Pvt. Ltd.', period: '2008 – 2015' },
  { title: 'Director', org: 'GTC Cargo Pvt Limited', period: '2006 – 2012' },
  { title: 'Director', org: 'Prakash Packers & Movers Pvt Ltd', period: '2009 – 2011' },
  { title: 'Director', org: 'Ideal Insurance Brokers Pvt. Ltd.', period: '2010 – 2011' },
  { title: 'Director', org: 'HR Invent Pvt. Ltd.', period: '2006 – 2011' },
]

const memberships = [
  'Confederation of Indian Industry',
  "Indian Merchants' Chamber",
  'Bombay Chamber of Commerce & Industry',
  'Council of Supply Chain Management Professionals (USA)',
  'All India Goods Transport Congress',
  'Bombay Goods Transport Association',
  'Lions Clubs International',
]

function RoleRow({ title, org, period, description, image, caption }) {
  return (
    <Reveal className="border-b border-border py-5 first:pt-0 last:border-none">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <div>
          <h3 className="font-serif text-[20px] font-bold leading-tight text-ink">{title}</h3>
          <div className="mt-0.5 font-sans text-[15px] text-secondary">
            {org}
            {description && (
              <span className="block text-[14px] leading-[22px]">{description}</span>
            )}
          </div>
        </div>
        <div className="shrink-0 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-brand md:text-right">
          {period}
        </div>
      </div>
      {image && (
        <figure className="mt-4 max-w-[280px]">
          <img src={image} alt={caption} className="w-full rounded-[16px] object-cover shadow-soft" />
          <figcaption className="mt-2 font-sans text-[13px] italic leading-[19px] text-secondary">
            {caption}
          </figcaption>
        </figure>
      )}
    </Reveal>
  )
}

export default function Leadership() {
  return (
    <main className="relative z-20">
      <PageHeader
        index="04"
        title="Leadership"
        subtitle="Governance and stewardship across a diversified group, industry chambers, and the boards of a dozen companies."
      />
      <div className="px-6 pb-24 md:px-14 md:pb-32 lg:px-20">
        <div className="max-w-[820px]">
          <SectionHeading eyebrow="Group" title="Enterprise Leadership" />
          <div className="mb-16">
            {groupLeadership.map((role) => (
              <RoleRow key={role.title + role.org} {...role} />
            ))}
          </div>

          <SectionHeading eyebrow="Industry" title="Chambers &amp; Bodies" />
          <div className="mb-16">
            {chambers.map((role) => (
              <RoleRow key={role.title + role.org} {...role} />
            ))}
          </div>

          <SectionHeading eyebrow="Governance" title="Board Directorships" />
          <div className="mb-16">
            {boards.map((role) => (
              <RoleRow key={role.title + role.org} {...role} />
            ))}
          </div>

          <SectionHeading eyebrow="Since 1988" title="Professional Memberships" />
          <Reveal className="flex flex-wrap gap-3">
            {memberships.map((name) => (
              <span
                key={name}
                className="rounded-pill border border-border bg-white/40 px-4 py-2 font-sans text-[14px] text-ink"
              >
                {name}
              </span>
            ))}
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-16 rounded-[24px] border border-border bg-white/40 p-7 shadow-soft"
          >
            <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
              Recognition · May 2015
            </div>
            <h3 className="mt-2 font-serif text-[24px] font-bold leading-tight text-ink">
              Super Achiever Award
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-[24px] text-secondary">
              Issued by the Oriental College of Management, in recognition of achievements and
              progressive work with GTC Group.
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
