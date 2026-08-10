import Reveal from './Reveal'

export default function PhotoGrid({ photos }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {photos.map((photo, i) => (
        <Reveal key={photo.caption} delay={Math.min(i * 0.06, 0.3)} as="figure">
          <img
            src={photo.image}
            alt={photo.caption}
            className="w-full rounded-[20px] object-cover shadow-soft"
          />
          <figcaption className="mt-3 font-sans text-[14px] italic leading-[21px] text-secondary">
            {photo.caption}
          </figcaption>
        </Reveal>
      ))}
    </div>
  )
}
