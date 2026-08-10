import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

const ease = [0.22, 1, 0.36, 1]

export default function WordField({ items }) {
  const [activeWord, setActiveWord] = useState(items[0]?.word ?? null)
  const active = items.find((i) => i.word === activeWord)

  return (
    <div>
      <Reveal className="flex flex-wrap gap-x-3 gap-y-2">
        {items.map((item) => {
          const isActive = item.word === activeWord
          return (
            <button
              key={item.word}
              type="button"
              onClick={() => setActiveWord(item.word)}
              onMouseEnter={() => setActiveWord(item.word)}
              className={`font-serif text-[clamp(30px,5vw,60px)] font-bold leading-none tracking-[-0.5px] transition-colors duration-300 ${
                isActive ? 'text-brand' : 'text-ink/25 hover:text-ink/60'
              }`}
            >
              {item.word}
            </button>
          )
        })}
      </Reveal>

      <div className="mt-8 min-h-[64px] max-w-[640px]">
        {active && (
          <motion.p
            key={active.word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="font-sans text-[16px] leading-[26px] text-secondary"
          >
            {active.body}
            {active.status === 'needs-confirmation' && (
              <span className="ml-2 font-sans text-[12px] italic text-secondary/60">
                · unconfirmed
              </span>
            )}
          </motion.p>
        )}
      </div>
    </div>
  )
}
