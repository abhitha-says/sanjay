import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function Quote() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 22 })
  const sy = useSpring(my, { stiffness: 50, damping: 22 })
  const x = useTransform(sx, [-1, 1], [-2, 2])
  const y = useTransform(sy, [-1, 1], [-2, 2])

  useEffect(() => {
    function handleMove(e) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mx, my])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 1.03 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, delay: 1.44, ease: [0.22, 1, 0.36, 1] }}
      style={{ x, y }}
      className="mt-8 w-full px-6 text-left md:absolute md:right-[2%] md:top-[6%] md:z-20 md:mt-0 md:w-[190px] md:rounded-2xl md:bg-bg/80 md:p-4 md:px-4 md:shadow-soft md:backdrop-blur-sm lg:right-[0%] lg:top-[32%] lg:w-[210px]"
    >
      <span className="block font-serif text-[48px] leading-[1] text-accent">&ldquo;</span>
      <p
        className="mt-1 font-serif text-[22px] text-ink"
        style={{ lineHeight: '1.45', fontWeight: 500 }}
      >
        True leadership lies in building people and preserving values.
      </p>
    </motion.div>
  )
}
