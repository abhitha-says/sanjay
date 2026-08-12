import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// The canonical page order used to compute transition direction.
// forward  = currentIndex < nextIndex
// backward = currentIndex > nextIndex
export const PAGE_ORDER = [
  '/',
  '/journey',
  '/initiatives',
  '/leadership',
  '/media',
  '/discover-more',
]

const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState('forward')

  // The overlay component registers its animate function here
  const animateRef = useRef(null)
  const currentPathRef = useRef(window.location.pathname)
  const stuckTimerRef = useRef(null)

  const registerAnimator = useCallback((fn) => {
    animateRef.current = fn
  }, [])

  const navigateTo = useCallback(
    (nextPath) => {
      if (isTransitioning) return
      if (nextPath === currentPathRef.current) return

      const currentPath = currentPathRef.current
      const currentIdx = PAGE_ORDER.indexOf(currentPath)
      const nextIdx = PAGE_ORDER.indexOf(nextPath)

      const dir =
        currentIdx === -1 || nextIdx === -1
          ? 'forward'
          : nextIdx >= currentIdx
            ? 'forward'
            : 'backward'

      setDirection(dir)
      setIsTransitioning(true)

      // Safety net: if anything downstream throws (curtain never calls
      // onComplete), don't let navigation stay permanently locked out —
      // isTransitioning would otherwise never clear and every future click
      // would silently no-op forever.
      clearTimeout(stuckTimerRef.current)
      stuckTimerRef.current = setTimeout(() => setIsTransitioning(false), 3000)

      if (animateRef.current) {
        animateRef.current({
          direction: dir,
          // Called by the curtain only once it has FULLY covered the
          // screen (see PageTransition's transitionend-driven wait — not
          // a fixed sleep). Scroll is reset both before and after the
          // route swap, and the curtain waits a further frame before
          // revealing anything (see PageTransition), so the destination
          // page is guaranteed to be mounted at scrollY 0 before it is
          // ever shown — not merely "eventually" at scrollY 0.
          onRouteChange: () => {
            // Reset BEFORE the destination route mounts, so any layout
            // effect that reads scroll position on mount (e.g. Framer
            // Motion's useScroll) observes 0, never the old page's offset.
            window.scrollTo(0, 0)
            currentPathRef.current = nextPath
            navigate(nextPath)
            // Re-assert immediately after: navigate() only *schedules* the
            // React update, it doesn't block until it's committed, so this
            // also covers the instant right after the call returns.
            window.scrollTo(0, 0)
          },
          onComplete: () => {
            clearTimeout(stuckTimerRef.current)
            setIsTransitioning(false)
          },
        })
      } else {
        window.scrollTo(0, 0)
        currentPathRef.current = nextPath
        navigate(nextPath)
        window.scrollTo(0, 0)
        clearTimeout(stuckTimerRef.current)
        setIsTransitioning(false)
      }
    },
    [isTransitioning, navigate],
  )

  return (
    <TransitionContext.Provider
      value={{ navigateTo, isTransitioning, direction, registerAnimator }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error('useTransition must be used inside <TransitionProvider>')
  }
  return ctx
}
