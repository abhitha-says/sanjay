import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// A still-life for the contact hero, drawn rather than photographed: there is
// no stationery shot in src/assets, and SectionMotif already sets the
// precedent of CSS/SVG anchors over stock imagery. Two stacked cards, a
// letterhead, and a leaf sprig, all masked into the cream at the edges.
export default function ContactStationery() {
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  // Two parallax depths — the front letterhead travels further than the card
  // behind it, which is what sells the layering.
  const frontX = useTransform(sx, [-1, 1], [-10, 10])
  const frontY = useTransform(sy, [-1, 1], [-7, 7])
  const backX = useTransform(sx, [-1, 1], [-4, 4])
  const backY = useTransform(sy, [-1, 1], [-3, 3])
  const sprigX = useTransform(sx, [-1, 1], [6, -6])

  function handleMouseMove(e) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[240px] w-full select-none sm:h-[300px] md:h-[460px] lg:h-[540px]"
      style={{
        // Fades the panel into the page on the left and bottom so it reads as
        // light falling across the cream, not as a pasted rectangle. Two
        // gradients composited — the site's standard edge treatment.
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, #000 22%, #000 100%), linear-gradient(to top, transparent 0%, #000 26%, #000 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, #000 22%, #000 100%), linear-gradient(to top, transparent 0%, #000 26%, #000 100%)',
        WebkitMaskComposite: 'source-in',
        maskComposite: 'intersect',
      }}
    >
      {/* Warm light wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 110% at 72% 12%, rgba(255,253,248,0.95) 0%, rgba(244,239,231,0.85) 45%, rgba(233,226,215,0.6) 100%)',
        }}
      />

      {/* Soft cast shadow under the arrangement */}
      <div
        className="absolute bottom-[14%] left-[18%] right-[10%] h-[26%] rounded-[50%]"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(90,60,30,0.10), transparent 70%)' }}
      />

      {/* Leaf sprig — same vocabulary as SectionMotif's heritage variant */}
      <motion.svg
        viewBox="0 0 200 200"
        style={{ x: sprigX }}
        initial={{ opacity: 0, rotate: -6 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.6, delay: 0.35, ease }}
        className="absolute right-[6%] top-[2%] h-[46%] w-auto text-brand/45"
        fill="none"
      >
        <path d="M100 190 C 96 130, 92 80, 70 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => {
          const t = i / 5
          const x = 100 - 30 * t - 4
          const y = 176 - 150 * t
          return (
            <g key={i}>
              <ellipse
                cx={x + 20 - i * 1.5}
                cy={y - 10}
                rx="17"
                ry="8"
                transform={`rotate(${-24 - i * 4} ${x + 20 - i * 1.5} ${y - 10})`}
                fill="currentColor"
                opacity="0.85"
              />
              <ellipse
                cx={x - 20 + i * 1.5}
                cy={y}
                rx="16"
                ry="7.5"
                transform={`rotate(${26 + i * 4} ${x - 20 + i * 1.5} ${y})`}
                fill="currentColor"
                opacity="0.7"
              />
            </g>
          )
        })}
      </motion.svg>

      {/* Card behind — depth only */}
      <motion.div
        style={{ x: backX, y: backY }}
        initial={{ opacity: 0, y: 26, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 4.5 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        className="absolute left-[16%] top-[30%] h-[46%] w-[58%] rounded-[10px] border border-black/[0.05] bg-[#efe9df] shadow-[0_18px_40px_rgba(90,60,30,0.10)]"
      />

      {/* Letterhead */}
      <motion.div
        style={{ x: frontX, y: frontY }}
        initial={{ opacity: 0, y: 34, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -3.2 }}
        transition={{ duration: 1.3, delay: 0.32, ease }}
        className="absolute left-[10%] top-[24%] flex h-[54%] w-[62%] flex-col justify-between rounded-[10px] border border-black/[0.06] bg-[#fffdfa] p-[6%] shadow-[0_30px_60px_rgba(90,60,30,0.16)]"
      >
        <div>
          <div
            className="font-sans font-extrabold leading-none text-brand"
            style={{ fontSize: 'clamp(11px, 1.5vw, 20px)', letterSpacing: '-0.01em' }}
          >
            GTC GROUP
          </div>
          <div
            className="mt-[3%] font-sans uppercase text-secondary/70"
            style={{ fontSize: 'clamp(5px, 0.62vw, 8px)', letterSpacing: '0.22em' }}
          >
            Right people&hellip;better results
          </div>
        </div>

        {/* Suggested body copy — hairlines, never lorem text */}
        <div className="flex flex-col gap-[6%]">
          {[100, 92, 96, 74].map((w, i) => (
            <motion.span
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.09, ease }}
              className="block h-px origin-left bg-ink/[0.13]"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        <span className="block h-px w-[38%] bg-brand/30" />
      </motion.div>

      {/* Pen — a single warm stroke resting across the card */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.55, ease }}
        className="absolute bottom-[22%] right-[22%] h-[3.5%] w-[34%] rotate-[-14deg] rounded-full"
        style={{
          background: 'linear-gradient(90deg, #2b2b2b 0%, #1b1b1b 62%, #b08d4f 78%, #8f6f38 100%)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.18)',
        }}
      />
    </div>
  )
}
