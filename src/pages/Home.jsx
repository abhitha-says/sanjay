import Hero from '../components/Hero'
import BooksShowcase from '../components/BooksShowcase'
import { chapters } from '../data/chapters'

const showcaseTheme = {
  navy: '#14201a',
  pink: '#E45A49',
  cream: '#F5F2ED',
  lav: '#cfd8c9',
  peri: '#4f9a5c',
  bgLight: '#F5F2ED',
  bgDark: '#14201a',
  foregroundLight: '#111111',
  foregroundDark: '#F5F2ED',
}

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative z-20 h-screen w-full">
        <BooksShowcase
          books={chapters}
          heroTitle="Chapters"
          navTitle="The Story, In Four Parts"
          themeColors={showcaseTheme}
        />
      </section>
    </>
  )
}
