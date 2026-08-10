import PageHeader from '../components/PageHeader'
import MilestoneCard from '../components/MilestoneCard'
import JourneyRail from '../components/JourneyRail'
import stXaviers150 from '../assets/gallery/st-xaviers-150-years.jpg'
import mhadaCeo from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'

const milestones = [
  {
    id: 'st-xaviers-college',
    period: '1985 – 1988',
    title: 'B.Com (Hons)',
    org: "St. Xavier's College, Calcutta",
    location: 'Kolkata, West Bengal',
    type: 'education',
    description:
      'Born in Rajasthan, raised across Haryana and Uttar Pradesh, and schooled in West Bengal — a childhood spent across cultures that shaped a lifelong ease in moving between them.',
    focus: 'Where discipline, curiosity and cross-cultural values first took root.',
    image: stXaviers150,
    caption: "Celebrating 150 years of St. Xavier's College, Kolkata",
  },
  {
    id: 'jv-pack',
    period: '1991 – 1993',
    title: 'Director',
    org: 'J V Pack Co Pvt Ltd',
    location: 'Allahabad, Uttar Pradesh',
    description:
      'In charge of manufacturing operations at an ancillary unit of IFFCO Phulpur, producing empty fertiliser bags.',
    focus: 'Learning manufacturing discipline from the shop floor up.',
  },
  {
    id: 'goel-trading',
    period: '1993 – 1997',
    title: 'Sr. Executive',
    org: 'Goel Trading Company',
    location: 'Kolkata, West Bengal',
    description:
      'Distribution head for fertiliser under the Consignment Agency of Tata Steel and the Steel Authority of India (SAIL).',
    focus: 'Distribution and trust — the fundamentals of every venture since.',
  },
  {
    id: 'martin-burn',
    period: '1994 – 1995',
    title: 'Export Manager',
    org: 'Martin Burn Limited',
    location: 'Kolkata, West Bengal',
    description: 'Explored export markets for agro commodities on behalf of the company.',
    focus: 'An early lesson in reading markets beyond national borders.',
  },
  {
    id: 'vriddhee',
    period: '1995 – 1997',
    title: 'Owner',
    org: 'Vriddhee Commercial Corporation',
    location: 'Dhanbad–Ranchi, Bihar',
    description: 'Marketed fertilisers across the state of Bihar.',
    focus: 'Independence, taken early — building a business from the ground up.',
  },
  {
    id: 'gtc-corporation',
    period: '1997 – Present',
    title: 'President',
    org: 'GTC Corporation',
    location: 'Mumbai, Maharashtra',
    description: 'In charge of all management operations and decisions.',
    focus: 'Operational discipline as the foundation for everything that followed.',
  },
  {
    id: 'gtc-group',
    period: '2006 – Present',
    title: 'Chairman',
    org: 'GTC Group',
    location: 'Mumbai, Maharashtra',
    description: 'Responsible for the Group’s vision and direction.',
    details:
      'Working as the steering force with an eye on growth in gross revenue, employee satisfaction and social acceptance — trying to follow the philosophy of India’s Prime Minister: "Sabka Saath, Sabka Vikas," working together, winning together.',
    focus: '"Sabka Saath, Sabka Vikas" — working together, winning together.',
  },
  {
    id: 'hamilton-packers',
    period: '2007 – 2013',
    title: 'Owner',
    org: 'Hamilton Packers',
    location: 'Mumbai, Maharashtra',
    description:
      'Specialised in the relocation of personal effects, corporate shifting, and the handling of antiques and high-value paintings.',
    details:
      'Our motto: to bring happiness to the face of every customer — whether relocating a home, an office, or a single irreplaceable painting.',
    focus: 'Handling what mattered most to others, with the greatest care.',
  },
  {
    id: 'sikkim-manipal',
    period: '2006 – 2009',
    title: 'M.B.A., HR & Marketing',
    org: 'Sikkim Manipal Institute of Technology',
    location: 'India',
    type: 'education',
    description: 'Formalised two decades of hands-on business instinct with a Master’s in HR & Marketing.',
    focus: 'Formalising two decades of hands-on business instinct.',
  },
  {
    id: 'pet-travel',
    period: '2012 – Present',
    title: 'Director',
    org: 'Pet Travel Private Limited',
    location: 'Mumbai, Maharashtra',
    description: 'Safe movement of animals across the world by air, sea and road.',
    focus: 'An idea born from love for animals, built into an international service.',
  },
  {
    id: 'gtc-enterprises',
    period: '2012 – Present',
    title: 'Managing Partner',
    org: 'GTC Enterprises',
    location: 'Mumbai Metropolitan Region',
    description: 'Development of low-cost housing.',
    details: 'Continuing to expand access to quality, affordable housing across Navi Mumbai.',
    focus: 'Housing that’s within reach, without compromise on quality.',
    image: mhadaCeo,
    caption: 'With MHADA CEO, Shri Sanjiv Jaiswal, IAS',
  },
  {
    id: 'bargain-india',
    period: '2015 – Present',
    title: 'Managing Director',
    org: 'Bargain India Private Limited',
    location: 'Navi Mumbai, Maharashtra',
    description:
      'Home loans, mortgage and commercial loans, and real estate through print and digital marketing — built around customer empowerment.',
    details:
      'Operating across two verticals — Bargain Flats and Bargain Loans — through a network of associates, agents and channel partners, with a vision to serve every home or finance need hassle-free and at the lowest possible cost.',
    focus: 'Customer empowerment, one hassle-free transaction at a time.',
  },
  {
    id: 'alternative-medicine',
    period: '2014 – 2015',
    title: 'Doctor of Medicine (M.D.), Health & Wellness',
    org: 'Indian Board of Alternative Medicine',
    location: 'India',
    type: 'education',
    description:
      'Explored centuries-old traditional therapies that succeed, at low or no cost, where popular medicine sometimes fails.',
    focus: 'Where popular medicine fails, sometimes alternative therapies work like magic.',
  },
  {
    id: 'aryavarta',
    period: '2020 – Present',
    title: 'Founder',
    org: 'Aryavarta Heritage Foundation',
    location: 'Mumbai Metropolitan Region',
    description:
      'An NGO registered with the Government of India to support, preserve and promote the rich cultural heritage of Ancient India — its monuments, social practices, arts and other areas of significance.',
    focus: 'Preserving Ancient India’s heritage, for generations still to come.',
  },
  {
    id: 'seavista',
    period: '2024 – Present',
    title: 'Partner',
    org: 'Seavista Infrastructure LLP',
    location: 'Navi Mumbai, Maharashtra',
    description: 'Developing a residential-cum-commercial tower at a prime location in Nerul.',
    focus: 'Building homes and community, one prime location at a time.',
  },
  {
    id: 'agrawal-business-network',
    period: '2025 – Present',
    title: 'Chief Executive Officer',
    org: 'Agrawal Business Network LLP',
    location: 'Mumbai, Maharashtra',
    description: 'Also serving as a Resource Person for the National Commission for Women, India.',
    focus: 'Still building, still learning — four decades on.',
  },
]

export default function Journey() {
  return (
    <main className="relative z-20">
      <PageHeader
        index="02"
        title="The"
        accent="Journey"
        subtitle="Four decades of work across industries and geographies — from a fertiliser trading floor in Kolkata to the chairmanship of a diversified group, with a medical degree and a heritage foundation along the way."
      />
      <div className="px-6 pb-24 md:px-14 md:pb-32 lg:px-20">
        <div className="flex gap-12 xl:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-8">
            {milestones.map((milestone, i) => (
              <MilestoneCard
                key={milestone.id}
                id={milestone.id}
                milestone={milestone}
                delay={Math.min(i * 0.03, 0.24)}
              />
            ))}
          </div>
          <JourneyRail
            items={milestones.map(({ id, period, type }) => ({ id, period, type }))}
          />
        </div>
      </div>
    </main>
  )
}
