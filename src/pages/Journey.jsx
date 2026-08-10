import PageHeader from '../components/PageHeader'
import Timeline from '../components/Timeline'
import stXaviers150 from '../assets/gallery/st-xaviers-150-years.jpg'
import mhadaCeo from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'

const milestones = [
  {
    period: '1985 – 1988',
    title: 'B.Com (Hons)',
    org: "St. Xavier's College, Calcutta",
    description:
      'Born in Rajasthan, raised across Haryana and Uttar Pradesh, and schooled in West Bengal — a childhood spent across cultures that shaped a lifelong ease in moving between them.',
    image: stXaviers150,
    caption: "Celebrating 150 years of St. Xavier's College, Kolkata",
  },
  {
    period: '1991 – 1993',
    title: 'Director',
    org: 'J V Pack Co Pvt Ltd',
    location: 'Allahabad',
    description:
      'In charge of manufacturing operations at an ancillary unit of IFFCO Phulpur, producing empty fertiliser bags.',
  },
  {
    period: '1993 – 1997',
    title: 'Sr. Executive',
    org: 'Goel Trading Company',
    location: 'Greater Kolkata Area',
    description:
      'Distribution head for fertiliser under the Consignment Agency of Tata Steel and the Steel Authority of India (SAIL).',
  },
  {
    period: '1994 – 1995',
    title: 'Export Manager',
    org: 'Martin Burn Limited',
    location: 'Greater Kolkata Area',
    description: 'Explored export markets for agro commodities on behalf of the company.',
  },
  {
    period: '1995 – 1997',
    title: 'Owner',
    org: 'Vriddhee Commercial Corporation',
    location: 'Dhanbad-Ranchi Area',
    description: 'Marketed fertilisers across the state of Bihar.',
  },
  {
    period: '1997 – Present',
    title: 'President',
    org: 'GTC Corporation',
    description: 'In charge of all management operations and decisions.',
  },
  {
    period: '2006 – Present',
    title: 'Chairman',
    org: 'GTC Group',
    description:
      'Responsible for the Group’s vision and direction — steering growth in gross revenue, employee satisfaction and social acceptance, in the spirit of "Sabka Saath, Sabka Vikas": working together, winning together.',
  },
  {
    period: '2007 – 2013',
    title: 'Owner',
    org: 'Hamilton Packers',
    description:
      'Specialised in the relocation of personal effects, corporate shifting, and the handling of antiques and high-value paintings.',
  },
  {
    period: '2006 – 2009',
    title: 'M.B.A., HR & Marketing',
    org: 'Sikkim Manipal Institute of Technology',
  },
  {
    period: '2012 – Present',
    title: 'Director',
    org: 'Pet Travel Private Limited',
    description: 'Safe movement of animals across the world by air, sea and road.',
  },
  {
    period: '2012 – Present',
    title: 'Managing Partner',
    org: 'GTC Enterprises',
    location: 'Mumbai Metropolitan Region',
    description: 'Development of low-cost housing.',
    image: mhadaCeo,
    caption: 'With MHADA CEO, Shri Sanjiv Jaiswal, IAS',
  },
  {
    period: '2015 – Present',
    title: 'Managing Director',
    org: 'Bargain India Private Limited',
    location: 'Navi Mumbai',
    description:
      'Home loans, mortgage and commercial loans, and real estate through print and digital marketing — built around customer empowerment.',
  },
  {
    period: '2014 – 2015',
    title: 'Doctor of Medicine (M.D.), Health & Wellness',
    org: 'Indian Board of Alternative Medicine',
    description:
      'Explored centuries-old traditional therapies that succeed, at low or no cost, where popular medicine sometimes fails.',
  },
  {
    period: '2020 – Present',
    title: 'Founder',
    org: 'Aryavarta Heritage Foundation',
    location: 'Mumbai Metropolitan Region',
    description:
      'An NGO registered with the Government of India to support, preserve and promote the rich cultural heritage of Ancient India — its monuments, social practices, arts and other areas of significance.',
  },
  {
    period: '2024 – Present',
    title: 'Partner',
    org: 'Seavista Infrastructure LLP',
    location: 'Navi Mumbai',
    description: 'Developing a residential-cum-commercial tower at a prime location in Nerul.',
  },
  {
    period: '2025 – Present',
    title: 'Chief Executive Officer',
    org: 'Agrawal Business Network LLP',
    description: 'Also serving as a Resource Person for the National Commission for Women, India.',
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
        <Timeline items={milestones} />
      </div>
    </main>
  )
}
