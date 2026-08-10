import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function BackgroundText() {
  const mx = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 25 })
  const x = useTransform(sx, [-1, 1], [-3, 3])

  useEffect(() => {
    function handleMove(e) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mx])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      <motion.div
        className="absolute left-[25%] top-[4%] font-serif font-bold leading-[0.86] text-ink"
        style={{
          fontSize: 'clamp(80px, 18vw, 270px)',
          opacity: 0.05,
          letterSpacing: '-4px',
          x,
        }}
      >
        <div className="whitespace-nowrap">Dr. Sanjay</div>
        <div className="whitespace-nowrap" style={{ color: '#2d7a3a' }}>Goel</div>
      </motion.div>
    </motion.div>
  )
}
