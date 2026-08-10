import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Abstract, CSS/SVG-only dividers — used where no photograph exists so a
// section still has a visual anchor without reaching for stock imagery.
export default function SectionMotif({ variant = 'heritage' }) {
  if (variant === 'water') {
    return (
      <div className="px-6 py-4 md:px-14 lg:px-20" aria-hidden="true">
        <svg viewBox="0 0 1200 120" className="h-[80px] w-full text-brand/25 md:h-[110px]" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M0 ${30 + i * 20} C 200 ${5 + i * 20}, 400 ${55 + i * 20}, 600 ${30 + i * 20} S 1000 ${5 + i * 20}, 1200 ${30 + i * 20}`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6, delay: i * 0.12, ease }}
            />
          ))}
        </svg>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-6 py-10 md:px-14 lg:px-20" aria-hidden="true">
      <svg viewBox="0 0 240 90" className="h-[70px] w-[190px] text-brand/30">
        <motion.path
          d="M10 88V40 M40 88V30 M70 88V22 M100 88V15 M120 88V12 M140 88V15 M170 88V22 M200 88V30 M230 88V40 M4 44C4 20 236 20 236 44"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease }}
        />
      </svg>
    </div>
  )
}
