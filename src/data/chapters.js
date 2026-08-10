import stXaviers150 from '../assets/gallery/st-xaviers-150-years.jpg'
import mhadaCeo from '../assets/gallery/mhada-ceo-sanjiv-jaiswal.jpg'
import cscmpNewsletter from '../assets/gallery/cscmp-newsletter-launch-2011.jpg'
import felicitatedMinisterKhot from '../assets/gallery/felicitated-minister-khot.jpg'
import speakingConference2012 from '../assets/gallery/speaking-conference-2012.jpg'
import moderatorCscmpEvent from '../assets/gallery/moderator-cscmp-event.jpg'
import withAshaBhosle from '../assets/gallery/with-asha-bhosle.jpg'
import withSanjivSanyal from '../assets/gallery/with-sanjiv-sanyal.jpg'
import withSunilPal from '../assets/gallery/with-sunil-pal.jpg'
import withSudhirMungantiwar from '../assets/gallery/with-sudhir-mungantiwar.jpg'

const CREAM = '#F5F2ED'
const WHITE_INK = '255,255,255'
const CREAM_INK = '245,242,237'

export const chapters = [
  {
    id: 'journey',
    title: 'The Journey',
    author: 'Dr. Sanjay Goel',
    year: '1985 – 2025',
    tag: 'Career Timeline',
    desc: 'Four decades of work across industries and geographies — from a fertiliser trading floor in Kolkata to the chairmanship of a diversified group, with a medical degree and a heritage foundation along the way.',
    to: '/journey',
    edge: CREAM,
    backBg: '#2d7a3a',
    spineBg: '#2d7a3a',
    spineInk: '#ffffff',
    backInk: WHITE_INK,
    pages: [
      {
        period: '1985 – 1988',
        title: "St. Xavier's College, Calcutta",
        body: 'B.Com (Hons). Born in Rajasthan, raised across Haryana and Uttar Pradesh, schooled in West Bengal.',
        image: stXaviers150,
      },
      {
        period: '1993 – 1997',
        title: 'Goel Trading Company',
        body: 'Distribution head for fertiliser under the Consignment Agency of Tata Steel and SAIL, Kolkata.',
      },
      {
        period: '1997 – Present',
        title: 'President, GTC Corporation',
        body: 'In charge of all management operations and decisions.',
      },
      {
        period: '2006 – Present',
        title: 'Chairman, GTC Group',
        body: 'Group vision and direction — "Sabka Saath, Sabka Vikas": working together, winning together.',
      },
      {
        period: '2012 – Present',
        title: 'Managing Partner, GTC Enterprises',
        body: 'Development of low-cost housing across the Mumbai Metropolitan Region.',
        image: mhadaCeo,
      },
      {
        period: '2020 – Present',
        title: 'Aryavarta Heritage Foundation',
        body: 'Founder — preserving the monuments, arts and social practices of Ancient India.',
      },
    ],
  },
  {
    id: 'initiatives',
    title: 'Initiatives',
    author: 'Dr. Sanjay Goel',
    year: '2017 – Present',
    tag: 'Community Impact',
    desc: 'Work undertaken alongside a business career — in heritage preservation, clean water access, humanitarian relief and public service.',
    to: '/initiatives',
    edge: CREAM,
    backBg: '#111111',
    spineBg: '#111111',
    spineInk: CREAM,
    backInk: CREAM_INK,
    pages: [
      {
        period: '2020 – Present',
        title: 'Aryavarta Heritage Foundation',
        body: 'An NGO preserving the monuments, social practices and arts of Ancient India.',
      },
      {
        period: '2017 – 2020',
        title: 'Water Treatment Technologies',
        body: 'Chemical-free drinking and waste water treatment via Greenzytech Solutions LLP.',
      },
      {
        period: '2025 – Present',
        title: 'National Commission for Women, India',
        body: 'Resource Person, contributing to the Commission’s work for women across India.',
      },
      {
        period: '1987',
        title: 'PM Relief Fund',
        body: 'Volunteered as a fund raiser for disaster and humanitarian relief.',
      },
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    author: 'Dr. Sanjay Goel',
    year: '1997 – Present',
    tag: 'Governance',
    desc: 'Governance and stewardship across a diversified group, industry chambers, and the boards of a dozen companies.',
    to: '/leadership',
    edge: CREAM,
    backBg: '#E45A49',
    spineBg: '#E45A49',
    spineInk: '#ffffff',
    backInk: WHITE_INK,
    pages: [
      {
        period: '2006 – Present',
        title: 'Chairman, GTC Group',
        body: 'Group vision and direction, with an eye on growth, employee welfare and social acceptance.',
      },
      {
        period: '2015 – 2020',
        title: 'Maharashtra Chamber of Commerce',
        body: 'Co-Chairman, Supply Chain & Logistics Committee.',
        image: felicitatedMinisterKhot,
      },
      {
        period: '2012 – 2014',
        title: 'CSCMP Mumbai Round Table',
        body: 'Hon. Secretary, Council of Supply Chain Management Professionals.',
        image: cscmpNewsletter,
      },
      {
        period: '2016 – Present',
        title: 'Navi Mumbai Chamber of Commerce',
        body: 'Vice Chairman, Business and Industry.',
      },
      {
        period: 'May 2015',
        title: 'Super Achiever Award',
        body: 'Issued by the Oriental College of Management, for progressive work with GTC Group.',
      },
    ],
  },
  {
    id: 'media',
    title: 'Media & Recognition',
    author: 'Dr. Sanjay Goel',
    year: '2011 – Present',
    tag: 'Public Voice',
    desc: 'An established speaker across India and abroad, carrying four decades of supply chain, real estate and heritage experience onto stages and into six languages.',
    to: '/media',
    edge: CREAM,
    backBg: '#1f3d2a',
    spineBg: '#1f3d2a',
    spineInk: '#ffffff',
    backInk: WHITE_INK,
    pages: [
      {
        period: '2012',
        title: 'Speaking at a Conference',
        body: 'An established speaker across India and abroad.',
        image: speakingConference2012,
      },
      {
        period: '2011',
        title: 'Moderator, CSCMP (USA) Event',
        body: 'Moderating panels on supply chain and logistics.',
        image: moderatorCscmpEvent,
      },
      {
        period: 'Public life',
        title: 'With Sanjiv Sanyal',
        body: 'Economic Advisor to the Prime Minister of India.',
        image: withSanjivSanyal,
      },
      {
        period: 'Public life',
        title: 'With Sudhir Mungantiwar',
        body: 'Former Finance Minister, Government of Maharashtra.',
        image: withSudhirMungantiwar,
      },
      {
        period: 'Public life',
        title: 'With Asha Bhosle',
        body: 'A cherished meeting with the legendary singer.',
        image: withAshaBhosle,
      },
      {
        period: 'Public life',
        title: 'With Sunil Pal',
        body: 'A light-hearted moment with the comedian.',
        image: withSunilPal,
      },
    ],
  },
]
