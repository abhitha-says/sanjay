import founderPortrait from '../assets/portrait-3.png'

// Every claim below is tagged so it's traceable back to research:
//   'confirmed'          — verified against an independent/official record
//   'public'             — stated on Dr. Goel's own site/profiles, self-sourced
//   'needs-confirmation' — could not be verified; needs a yes/no from Dr. Goel
// See src/data/initiativesConfirmation.md for the full breakdown.

export const philosophy =
  'Four decades in business have run alongside a quieter thread of work — preserving what came before, treating water and waste as problems worth solving, and showing up where institutions asked for a hand. None of it competes with the business. It is the same discipline, spent on something else.'

export const heritage = {
  id: 'aryavarta',
  org: 'Aryavarta Heritage Foundation',
  role: 'Founder',
  period: '2020 — Present',
  yearEstablished: '2020',
  pillars: ['Preserve', 'Protect', 'Promote'],
  summary:
    'A private not-for-profit company set up to support, preserve and promote the cultural heritage of Ancient India — its monuments, social practices, arts and other areas of historical significance.',
  summaryStatus: 'public',
  image: founderPortrait,
  imageCaption: 'Dr. Sanjay Goel, Founder',
  registry: {
    cin: 'U92320MH2020NPL338179',
    roc: 'Registrar of Companies, Mumbai',
    category: 'Museums & cultural institutions — Section 8, not-for-profit',
    registeredOffice: 'Kharghar, Navi Mumbai',
    status: 'confirmed',
    sourceName: 'Ministry of Corporate Affairs company registry',
  },
  detail: {
    overview:
      'Aryavarta Heritage Foundation was incorporated on 24 February 2020 as a private not-for-profit company, registered under the Ministry of Corporate Affairs in the "museums and cultural institutions" category. Its stated purpose is the preservation and promotion of Ancient India’s cultural heritage.',
    overviewStatus: 'confirmed',
    role:
      'Dr. Sanjay Goel is the Foundation’s Founder, one of two directors on record since incorporation, alongside Asha Goel.',
    roleStatus: 'confirmed',
    timeline: [
      { year: '2020', label: 'Registered with the Ministry of Corporate Affairs, Kharghar, Navi Mumbai', status: 'confirmed' },
      { year: 'Present', label: 'Continues as an active, registered entity', status: 'confirmed' },
    ],
    activitiesStatus: 'needs-confirmation',
    activitiesNote:
      'Specific projects, sites, events or partnerships undertaken by the Foundation are not yet documented here — awaiting confirmation from Dr. Goel before publishing details.',
    sources: [
      { name: 'Ministry of Corporate Affairs company registry', note: 'CIN U92320MH2020NPL338179 · Registrar of Companies, Mumbai', status: 'confirmed' },
      { name: "Dr. Sanjay Goel's personal site", note: 'Foundation mission statement', status: 'public' },
    ],
  },
}

export const water = {
  id: 'water',
  org: 'Water Treatment Technologies',
  vehicle: 'Greenzytech Solutions LLP',
  role: 'Partner',
  period: '2017 — 2020',
  summary:
    'A chemical-free approach to drinking and waste-water treatment — softening water and removing microbial and other impurities without chemicals or membranes, in systems described as maintenance-free for at least 25 years, while cutting waste-water treatment costs by up to 50%.',
  summaryStatus: 'needs-confirmation',
  note: 'Figures as stated by Dr. Goel; not independently verified.',
}

export const publicService = [
  {
    word: 'Heritage',
    body: 'Founder, Aryavarta Heritage Foundation (2020 — Present) — preserving the monuments, arts and social practices of Ancient India.',
    status: 'public',
  },
  {
    word: 'Environment',
    body: 'Partner, Greenzytech Solutions LLP (2017 — 2020) — chemical-free water and waste-water treatment.',
    status: 'needs-confirmation',
  },
  {
    word: 'Public Service',
    body: 'Resource Person, National Commission for Women, India (2025 — Present). Exact scope of the role is unconfirmed.',
    status: 'needs-confirmation',
  },
  {
    word: 'Relief',
    body: 'Fund raiser, Prime Minister’s Relief Fund (1987) — disaster and humanitarian relief fundraising.',
    status: 'needs-confirmation',
  },
  {
    word: 'Community',
    body: 'Vice Chairman, Navi Mumbai Chamber of Business & Industries; ex-President, Lions Club of Kharghar; President, Agrawal Samaj, Kharghar; Secretary (West Zone), St. Xavier’s College Calcutta Alumni Association.',
    status: 'public',
  },
]

export const byTheNumbers = [
  { value: '2020', label: 'Aryavarta Heritage Foundation established', status: 'confirmed' },
  { value: '37+', label: 'Years across industries', status: 'public' },
]

export const finalStatement =
  'Business built the means. This is where some of it went.'
