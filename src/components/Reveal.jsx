import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ children, delay = 0, className = '', as = 'div', y = 24 }) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
