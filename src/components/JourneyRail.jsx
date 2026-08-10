import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Briefcase, GraduationCap, ListIcon } from './icons'

const ease = [0.22, 1, 0.36, 1]
const TOP_OFFSET = 112 // px from viewport top where the sticky rail sits
const BOTTOM_GAP = 48 // px breathing room at the bottom of the viewport
const REFERENCE_FRACTION = 0.35 // how far down the viewport counts as "current"

export default function JourneyRail({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const [windowH, setWindowH] = useState(() =>
    typeof window === 'undefined' ? 600 : window.innerHeight - TOP_OFFSET - BOTTOM_GAP,
  )
  const listRef = useRef(null)
  const itemRefs = useRef({})
  const offsetY = useMotionValue(0)

  useEffect(() => {
    function handleResize() {
      setWindowH(window.innerHeight - TOP_OFFSET - BOTTOM_GAP)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Ties the rail directly to scroll position — both which year is
  // highlighted and how far the list has slid are recalculated on every
  // frame from the milestones' actual on-screen position, so the rail
  // moves continuously in step with the page across its full length
  // instead of jumping between a few IntersectionObserver checkpoints.
  useEffect(() => {
    const elements = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (elements.length === 0) return

    function update() {
      const referenceLine = window.innerHeight * REFERENCE_FRACTION

      let activeIdx = 0
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].getBoundingClientRect().top <= referenceLine) activeIdx = i
        else break
      }
      const newActiveId = elements[activeIdx].id
      setActiveId((prev) => (prev === newActiveId ? prev : newActiveId))

      const firstTop = elements[0].getBoundingClientRect().top + window.scrollY
      const lastBottom = elements[elements.length - 1].getBoundingClientRect().bottom + window.scrollY
      const span = Math.max(1, lastBottom - firstTop)
      const scrolled = window.scrollY + referenceLine - firstTop
      const progress = Math.min(1, Math.max(0, scrolled / span))

      const list = listRef.current
      const maxOffset = list ? Math.max(0, list.scrollHeight - windowH) : 0
      offsetY.set(-progress * maxOffset)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items, windowH, offsetY])

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <nav aria-label="Journey timeline navigation" className="hidden shrink-0 xl:block">
      <div className="sticky w-[190px]" style={{ top: TOP_OFFSET }}>
        <div className="mb-5 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
          <ListIcon className="h-3.5 w-3.5" />
          On this journey
        </div>
        <div
          className="relative overflow-hidden"
          style={{
            height: windowH,
            maskImage:
              'linear-gradient(to bottom, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)',
          }}
        >
          <motion.ol
            ref={listRef}
            style={{ y: offsetY }}
            className="relative border-l border-border pb-6 pl-6 pt-6"
          >
            {items.map((item) => {
              const active = item.id === activeId
              const ItemIcon = item.type === 'education' ? GraduationCap : Briefcase
              return (
                <li
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el
                  }}
                  className="relative pb-6 last:pb-0"
                >
                  <button type="button" onClick={() => goTo(item.id)} className="group block text-left">
                    <span className="absolute -left-[37px] top-[-7px] flex h-6 w-6 shrink-0 items-center justify-center">
                      {active && (
                        <motion.span
                          layoutId="journey-rail-active"
                          transition={{ duration: 0.5, ease }}
                          className="absolute inset-0 rounded-full bg-brand shadow-[0_0_0_4px_rgba(45,122,58,0.15)]"
                        />
                      )}
                      <ItemIcon
                        className={`relative h-3.5 w-3.5 shrink-0 transition-colors duration-300 ${
                          active ? 'text-white' : 'text-ink/25 group-hover:text-ink/50'
                        }`}
                      />
                      {!active && <span className="absolute inset-0 rounded-full border border-border" />}
                    </span>
                    <motion.span
                      animate={{ x: active ? 4 : 0 }}
                      transition={{ duration: 0.35, ease }}
                      className={`inline-block font-sans text-[13px] transition-colors duration-300 ${
                        active ? 'font-semibold text-ink' : 'text-secondary/70 group-hover:text-secondary'
                      }`}
                    >
                      {item.period}
                    </motion.span>
                  </button>
                </li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </nav>
  )
}
