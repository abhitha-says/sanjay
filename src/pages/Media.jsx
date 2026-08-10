import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import PhotoGrid from '../components/PhotoGrid'
import speakingConference2012 from '../assets/gallery/speaking-conference-2012.jpg'
import moderatorCscmpEvent from '../assets/gallery/moderator-cscmp-event.jpg'
import withAshaBhosle from '../assets/gallery/with-asha-bhosle.jpg'
import withSanjivSanyal from '../assets/gallery/with-sanjiv-sanyal.jpg'
import withSunilPal from '../assets/gallery/with-sunil-pal.jpg'
import withSudhirMungantiwar from '../assets/gallery/with-sudhir-mungantiwar.jpg'

const topics = [
  'Supply Chain & Logistics',
  'Real Estate & Township Development',
  'Manpower Management',
  'Water Treatment Technologies',
  'Heritage Conservation',
  'Fund Raising & Financial Services',
]

const speakingPhotos = [
  { image: speakingConference2012, caption: 'Speaking at a conference, 2012' },
  {
    image: moderatorCscmpEvent,
    caption: 'Moderator at a Council of Supply Chain Management Professionals (USA) event',
  },
]

const momentsPhotos = [
  { image: withSanjivSanyal, caption: 'With Shri Sanjiv Sanyal, Economic Advisor to the PM' },
  { image: withSudhirMungantiwar, caption: 'With Shri Sudhir Bhau Mungantiwar, former Finance Minister, Govt of Maharashtra' },
  { image: withAshaBhosle, caption: 'With the late Asha Bhosle Tai' },
  { image: withSunilPal, caption: 'With comedian Sunil Pal' },
]

const languages = [
  { name: 'Hindi', level: 'Native or bilingual proficiency' },
  { name: 'English', level: 'Full professional proficiency' },
  { name: 'Bengali', level: 'Full professional proficiency' },
  { name: 'Marathi', level: 'Professional working proficiency' },
  { name: 'Rajasthani', level: 'Professional working proficiency' },
  { name: 'Bihari languages', level: 'Elementary proficiency' },
]

export default function Media() {
  return (
    <main className="relative z-20">
      <PageHeader
        index="05"
        title="Media &"
        accent="Recognition"
        subtitle="An established speaker across India and abroad, carrying four decades of supply chain, real estate and heritage experience onto stages and into six languages."
      />
      <div className="px-6 pb-24 md:px-14 md:pb-32 lg:px-20">
        <div className="max-w-[820px]">
          <SectionHeading eyebrow="On stage" title="Speaking Topics" />
          <Reveal className="mb-8 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-pill border border-border bg-white/40 px-4 py-2 font-sans text-[14px] text-ink"
              >
                {topic}
              </span>
            ))}
          </Reveal>
          <div className="mb-16">
            <PhotoGrid photos={speakingPhotos} />
          </div>

          <SectionHeading eyebrow="May 2015" title="Super Achiever Award" />
          <Reveal className="mb-16 max-w-[640px] font-sans text-[16px] leading-[26px] text-secondary">
            Issued by the Oriental College of Management in recognition of achievements and
            progressive work associated with GTC Group.
          </Reveal>

          <SectionHeading eyebrow="Public life" title="Moments" />
          <div className="mb-16">
            <PhotoGrid photos={momentsPhotos} />
          </div>

          <SectionHeading eyebrow="Reach" title="Languages" />
          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {languages.map((lang, i) => (
              <Reveal
                key={lang.name}
                delay={Math.min(i * 0.05, 0.3)}
                className="flex items-baseline justify-between border-b border-border pb-3"
              >
                <span className="font-serif text-[19px] font-semibold text-ink">{lang.name}</span>
                <span className="text-right font-sans text-[13px] text-secondary">
                  {lang.level}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
