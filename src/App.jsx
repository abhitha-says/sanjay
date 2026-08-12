import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dock from './components/Dock'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import { TransitionProvider } from './context/TransitionContext'
import Home from './pages/Home'
import DiscoverMore from './pages/DiscoverMore'
import Journey from './pages/Journey'
import Initiatives from './pages/Initiatives'
import Leadership from './pages/Leadership'
import Media from './pages/Media'

const noiseUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export default function App() {
  return (
    <TransitionProvider>
      <div
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden"
        style={{
          background:
            'radial-gradient(circle at 74% 60%, rgba(255,247,235,0.08), transparent 32%), radial-gradient(circle at 15% 10%, rgba(255,255,255,0.15), transparent 45%), radial-gradient(circle at 85% 90%, rgba(0,0,0,0.009), transparent 50%), #F5F2ED',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 62%, rgba(120,72,40,0.035) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("${noiseUrl}")`,
            opacity: 0.018,
          }}
        />

        {/* Global cinematic transition overlay — renders once, above everything */}
        <PageTransition />
        <ScrollToTop />

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover-more" element={<DiscoverMore />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/media" element={<Media />} />
        </Routes>
        <Dock />
      </div>
    </TransitionProvider>
  )
}
