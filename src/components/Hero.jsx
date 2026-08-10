import { useEffect, useState } from 'react'
import BackgroundText from './BackgroundText'
import HeroContent from './HeroContent'
import HeroImage from './HeroImage'
import Quote from './Quote'
import portrait from '../assets/portrait.png'
import portrait2 from '../assets/portrait-2.png'
import portrait3 from '../assets/portrait-3.png'

const images = [
  { src: portrait2, alt: 'Dr. Sanjay Goel' },
  { src: portrait3, alt: 'Dr. Sanjay Goel' },
  { src: portrait, alt: 'Dr. Sanjay Goel' },
]

const AUTOPLAY_INTERVAL = 3500

export default function Hero() {
  const [[index, direction], setSlide] = useState([0, 1])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setSlide(([i]) => [(i + 1) % images.length, 1])
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen w-full md:h-screen md:overflow-hidden">
      <BackgroundText />
      <div className="flex flex-col md:contents">
        <HeroImage images={images} index={index} direction={direction} />
        <HeroContent />
        <Quote />
      </div>
    </section>
  )
}
