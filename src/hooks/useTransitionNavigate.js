import { useTransition } from '../context/TransitionContext'

/**
 * Drop-in replacement for click-based navigation.
 * Returns a navigate function that routes every click through
 * the cinematic transition pipeline.
 *
 * Usage:
 *   const go = useTransitionNavigate()
 *   <button onClick={() => go('/journey')}>Journey</button>
 */
export function useTransitionNavigate() {
  const { navigateTo } = useTransition()
  return navigateTo
}
