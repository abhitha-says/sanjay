import Hero from '../components/Hero'
import BooksShowcase from '../components/BooksShowcase'
import { chapters } from '../data/chapters'

const showcaseTheme = {
  navy: '#14201a',
  pink: '#2d7a3a',
  cream: '#2d7a3a',
  lav: '#2d7a3a',
  peri: '#2d7a3a',
  bgLight: 'transparent',
  bgDark: 'transparent',
  foregroundLight: '#2d7a3a',
  foregroundDark: '#2d7a3a',
}

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative z-20 mb-8 h-screen w-full sm:mb-0">
        <BooksShowcase
          books={chapters}
          heroTitle="Chapters"
          showNav={false}
          themeColors={showcaseTheme}
        />
      </section>
    </>
  )
}
