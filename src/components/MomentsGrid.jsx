import Reveal from './Reveal'

export default function MomentsGrid({ photos }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo, i) => (
        <Reveal key={photo.caption} delay={Math.min(i * 0.08, 0.32)} as="figure">
          <div className="overflow-hidden rounded-[16px] shadow-soft" style={{ aspectRatio: '4 / 3' }}>
            <img
              src={photo.image}
              alt={photo.caption}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              style={{ objectPosition: photo.position ?? '50% 50%' }}
            />
          </div>
          <figcaption className="mt-3 font-sans text-[13.5px] italic leading-[20px] text-secondary">
            {photo.caption}
          </figcaption>
        </Reveal>
      ))}
    </div>
  )
}
