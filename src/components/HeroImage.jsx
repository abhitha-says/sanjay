import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const slideSpring = { type: 'spring', stiffness: 210, damping: 26, mass: 1 }
const fadeTween = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
const blurTween = { duration: 0.55, ease: [0.22, 1, 0.36, 1] }

const variants = {
  enter: (dir) => ({
    opacity: 0,
    scale: 1.08,
    x: dir * 36,
    filter: 'blur(14px)',
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: 'blur(0px)',
  },
  exit: (dir) => ({
    opacity: 0,
    scale: 0.96,
    x: dir * -28,
    filter: 'blur(10px)',
  }),
}

export default function HeroImage({ images, index, direction }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const x = useTransform(sx, [-1, 1], [-8, 8])
  const y = useTransform(sy, [-1, 1], [-5, 5])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  const current = images[index]

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[420px] w-full sm:h-[480px] md:absolute md:bottom-0 md:right-[-2%] md:z-10 md:h-[82%] md:w-[62%] md:translate-x-[20px] lg:right-[0%] lg:h-[100%] lg:w-[70%] lg:translate-x-[30px] lg:-translate-y-[10px]"
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 1.08, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.src}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: slideSpring, scale: slideSpring, opacity: fadeTween, filter: blurTween }}
            className="absolute inset-0 h-full w-full"
          >
            <motion.img
              src={current.src}
              alt={current.alt}
              style={{
                x,
                y,
                filter: 'contrast(1.04) brightness(0.99)',
                WebkitMaskImage:
                  'linear-gradient(to top, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%)',
                maskImage:
                  'linear-gradient(to top, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%)',
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
              className="h-full w-full object-contain object-bottom"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
