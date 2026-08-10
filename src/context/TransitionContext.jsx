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

      if (animateRef.current) {
        animateRef.current({
          direction: dir,
          onRouteChange: () => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            currentPathRef.current = nextPath
            navigate(nextPath)
          },
          onComplete: () => {
            setIsTransitioning(false)
          },
        })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        currentPathRef.current = nextPath
        navigate(nextPath)
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
