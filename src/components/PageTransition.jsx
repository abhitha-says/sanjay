import { useEffect, useRef } from 'react'
import { useTransition } from '../context/TransitionContext'

/**
 * PageTransition
 *
 * A single fixed full-screen cream curtain that lives at the root of the app.
 * It is driven imperatively by TransitionContext.navigateTo() through the
 * registerAnimator() callback.
 *
 * Choreography (forward direction):
 *   [0ms]    Curtain enters from BOTTOM (translateY 100% → 0)  — 520ms
 *   [500ms]  Screen fully covered → route changes here, scroll resets
 *   [550ms]  Curtain exits UPWARD (translateY 0 → -100%)        — 580ms
 *   [550ms]  Page content label (destination name) fades + rises
 *   [1130ms] Complete
 *
 * Backward direction:
 *   Curtain enters from TOP (translateY -100% → 0) then exits DOWNWARD
 *
 * Reduced-motion:
 *   Uses a simple 180ms opacity crossfade instead of all transforms.
 */

// Cinematic cubic-bezier: sharp entry, lazy exit
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Resolves when `el`'s transform transition actually finishes, driven by
// the real `transitionend` event rather than a guessed millisecond delay.
// `fallbackMs` is a safety net only (dropped frames, throttled background
// tabs, browsers that skip the event) — it is not the primary signal, so a
// slow device still waits for the real thing instead of firing early and
// briefly exposing the previous page's scroll position.
function waitForTransformTransition(el, fallbackMs) {
  return new Promise((resolve) => {
    let done = false
    function finish() {
      if (done) return
      done = true
      el.removeEventListener('transitionend', onEnd)
      clearTimeout(fallbackTimer)
      resolve()
    }
    function onEnd(e) {
      if (e.target === el && e.propertyName === 'transform') finish()
    }
    el.addEventListener('transitionend', onEnd)
    const fallbackTimer = setTimeout(finish, fallbackMs)
  })
}

// Waits for the next `n` real animation frames — used to confirm the
// browser has actually painted the destination page's mount before the
// curtain is allowed to reveal it. Backed by a timeout fallback for the
// same reason as above: a backgrounded/throttled tab can stop firing rAF
// entirely, and this must never be able to hang navigation forever.
function waitFrames(n, fallbackMs) {
  return new Promise((resolve) => {
    let done = false
    let remaining = n
    function finish() {
      if (done) return
      done = true
      clearTimeout(fallbackTimer)
      resolve()
    }
    function tick() {
      if (done) return
      remaining -= 1
      if (remaining <= 0) finish()
      else requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    const fallbackTimer = setTimeout(finish, fallbackMs)
  })
}

export default function PageTransition() {
  const { registerAnimator } = useTransition()
  const curtainRef = useRef(null)
  const labelRef = useRef(null)
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    /**
     * animate() is called by navigateTo() with:
     *   direction       'forward' | 'backward'
     *   onRouteChange() called at curtain full-cover
     *   onComplete()    called when curtain exits
     */
    async function animate({ direction, onRouteChange, onComplete }) {
      const label = labelRef.current

      if (reducedMotion.current) {
        // ── Reduced-motion: simple opacity crossfade ──────────────────────
        curtain.style.transition = 'opacity 180ms ease'
        curtain.style.opacity = '1'
        curtain.style.pointerEvents = 'all'
        await sleep(180)
        onRouteChange()
        await sleep(50)
        curtain.style.opacity = '0'
        await sleep(180)
        curtain.style.pointerEvents = 'none'
        onComplete()
        return
      }

      // ── PHASE 1: Curtain enters (covers screen) ───────────────────────
      const enterFrom = direction === 'forward' ? '100%' : '-100%'
      const exitTo   = direction === 'forward' ? '-100%' : '100%'

      // Reset curtain to starting position instantly (no transition)
      curtain.style.transition = 'none'
      curtain.style.transform = `translateY(${enterFrom})`
      curtain.style.opacity = '1'
      curtain.style.pointerEvents = 'all'

      // Force reflow so the browser registers the reset
      void curtain.offsetHeight

      // Animate curtain covering the screen
      curtain.style.transition = `transform 520ms ${EASE}`
      curtain.style.transform = 'translateY(0%)'

      // Wait for the cover animation to ACTUALLY finish — the real
      // transitionend event, not an approximated sleep(). onRouteChange
      // below performs the route swap + scroll reset synchronously, so it
      // must never fire while the curtain is still mid-slide: that would
      // let a sliver of the old page's scroll position show through,
      // which is exactly the bug this guards against (most visible on
      // slower mobile devices where a fixed-ms guess runs early).
      await waitForTransformTransition(curtain, 520)

      // ── PHASE 2: Route change (screen fully covered) ──────────────────
      // onRouteChange() pins scroll to 0 and calls React Router's
      // navigate(), which only *schedules* the destination page's mount —
      // it doesn't block until React has committed it.
      onRouteChange()

      // Wait two animation frames: the destination page's mount is
      // guaranteed to have committed and painted by then (a single frame
      // isn't always enough — React can flush the update a task later than
      // the call site). This is a real completion signal tied to the
      // browser's paint cycle, not a guessed setTimeout duration — backed
      // by a short timeout fallback so a backgrounded/throttled tab (which
      // can stop firing rAF altogether) can never hang navigation. Only
      // once it resolves do we allow the curtain to start revealing
      // anything — still fully hidden behind the opaque curtain throughout.
      await waitFrames(2, 100)

      // Belt-and-suspenders: re-assert scrollY 0 one more time right
      // before the reveal starts, in case anything nudged it during the
      // two frames above.
      window.scrollTo(0, 0)

      // ── PHASE 3: Curtain exits (reveals new page) ─────────────────────
      curtain.style.transition = `transform 580ms ${EASE}`
      curtain.style.transform = `translateY(${exitTo})`

      // Animate label if present
      if (label) {
        label.style.transition = 'none'
        label.style.opacity = '0'
        label.style.transform = direction === 'forward' ? 'translateY(12px)' : 'translateY(-12px)'
        void label.offsetHeight
        label.style.transition = `opacity 380ms ${EASE_OUT} 80ms, transform 380ms ${EASE_OUT} 80ms`
        label.style.opacity = '1'
        label.style.transform = 'translateY(0)'
      }

      await sleep(580)

      // ── PHASE 4: Cleanup ──────────────────────────────────────────────
      curtain.style.transition = 'none'
      curtain.style.opacity = '0'
      curtain.style.pointerEvents = 'none'

      if (label) {
        label.style.opacity = '0'
      }

      onComplete()
    }

    registerAnimator(animate)
  }, [registerAnimator])

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#F5F2ED',
        transform: 'translateY(100%)',
        opacity: 0,
        pointerEvents: 'none',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle centre motif — the GTC monogram mark, shown during transition */}
      <div
        ref={labelRef}
        style={{
          opacity: 0,
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(11px, 1.2vw, 14px)',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(17,17,17,0.18)',
          userSelect: 'none',
        }}
      >
        GTC GROUP
      </div>
    </div>
  )
}
