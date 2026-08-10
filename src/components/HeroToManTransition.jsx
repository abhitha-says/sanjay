/**
 * HeroToManTransition.jsx
 *
 * CORE IDEA — one image, one position, dimming dissolves.
 *
 * At progress = 0:
 *   The sticky stage looks IDENTICAL to the DiscoverMore landing hero.
 *   Same portrait, same position (right-0 top-0 h-full w-55%), same 0.068 opacity.
 *   Same hero text ("Four decades…") visible.
 *
 * As scroll progresses:
 *   The SINGLE portrait's opacity animates 0.068 → 1.0 — it brightens IN PLACE.
 *   Hero text drifts up + fades out.
 *   "The Man Behind the Work" content enters OVER the now-bright portrait.
 *
 * No second image. No image moving anywhere. One continuous visual.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import portrait3 from '../assets/portrait-3.png'

const BG = '#F5F2ED'

const VALUES = ['Curiosity', 'Purpose', 'People', 'Integrity', 'Service']

export default function HeroToManTransition() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Portrait: opacity goes from landing-hero dim (0.068) → full color (1.0)
  const portraitOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.65],
    [0.068, 0.068, 1]         // holds at dim until p=0.20, then brightens
  )

  // Left-side gradient that the landing hero has (always present, keeps text readable)
  // At full portrait opacity we tighten it slightly so the portrait shows through more
  const gradientOpacity = useTransform(scrollYProgress, [0.4, 0.85], [1, 0.75])

  // ── Hero text group: exits up-left
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 0.7, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.78], ['0%', '-5%'])
  const heroX       = useTransform(scrollYProgress, [0.28, 0.78], ['0px', '-36px'])

  // ── "Man Behind the Work" content: enters from below-left
  const manOpacity = useTransform(scrollYProgress, [0.42, 0.70], [0, 1])
  const manY       = useTransform(scrollYProgress, [0.42, 0.72], ['48px', '0px'])

  // Staggered sub-elements
  const titleOp = useTransform(scrollYProgress, [0.48, 0.70], [0, 1])
  const titleY  = useTransform(scrollYProgress, [0.48, 0.70], ['32px', '0px'])
  const paraOp  = useTransform(scrollYProgress, [0.54, 0.75], [0, 1])
  const paraY   = useTransform(scrollYProgress, [0.54, 0.75], ['26px', '0px'])
  const tagsOp  = useTransform(scrollYProgress, [0.60, 0.80], [0, 1])
  const tagsY   = useTransform(scrollYProgress, [0.60, 0.80], ['18px', '0px'])

  return (
    /* 260vh scroll space */
    <section
      ref={containerRef}
      style={{ height: '260vh', position: 'relative' }}
      aria-label="The man behind the work"
    >
      {/* ── Sticky 100vh stage ──────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 21 }}>

        {/* Page background */}
        <div style={{ position: 'absolute', inset: 0, background: BG }} />

        {/* ══════════════════════════════════════════════════════════════
            THE PORTRAIT — one image, one position, dim lifts in place.
            Starts at opacity 0.068 (identical to landing hero).
            Animates to opacity 1.0 (full color / Man Behind the Work state).
            ══════════════════════════════════════════════════════════════ */}
        <motion.img
          src={portrait3}
          alt="Dr. Sanjay Goel"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '55%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: portraitOpacity,
          }}
        />

        {/* Left-to-right page-bg gradient — same as landing hero, keeps text readable */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to right, ${BG} 0%, rgba(245,242,237,0.82) 44%, transparent 100%)`,
            opacity: gradientOpacity,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        {/* Bottom fade — same as landing hero */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 60%, ${BG} 100%)`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* ══════════════════════════════════════════════════════════════
            LANDING HERO TEXT — exits as scroll progresses
            Mirrors the DiscoverMore landing hero text exactly.
            ══════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'clamp(24px, 5.5vw, 80px)',
            paddingRight: 24,
            opacity: heroOpacity,
            y: heroY,
            x: heroX,
            pointerEvents: 'none',
          }}
        >
          {/* "Discover More" eyebrow */}
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ height: 1, width: 32, background: '#2d7a3a' }} />
            <span
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: '#2d7a3a',
              }}
            >
              Discover More
            </span>
          </div>

          {/* Heading lines */}
          {['Four decades.', 'Many chapters.', 'One continuing journey.'].map((line) => (
            <div key={line}>
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 900,
                  fontSize: 'clamp(46px, 8vw, 118px)',
                  lineHeight: 0.92,
                  letterSpacing: '-3px',
                  color: '#111111',
                }}
              >
                {line}
              </div>
            </div>
          ))}

          <p
            style={{
              marginTop: 40,
              maxWidth: 520,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 17,
              lineHeight: '30px',
              color: '#5E5E5E',
            }}
          >
            Explore the work, people, ideas and institutions that have shaped
            Dr. Sanjay Goel's journey.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            THE MAN BEHIND THE WORK CONTENT
            Appears OVER the brightening portrait from p = 0.42 onward.
            ══════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'clamp(24px, 5.5vw, 80px)',
            paddingRight: 24,
            maxWidth: 600,
            opacity: manOpacity,
            y: manY,
            pointerEvents: 'none',
          }}
        >
          {/* Chapter badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 32,
                width: 32,
                borderRadius: '50%',
                background: '#2d7a3a',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 11,
                fontWeight: 900,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              01
            </span>
            <div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.38em',
                  color: 'rgba(45,122,58,0.60)',
                }}
              >
                Chapter
              </div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  lineHeight: 1.25,
                  color: '#2d7a3a',
                }}
              >
                The Man Behind the Work
              </div>
            </div>
          </div>

          {/* Main heading */}
          <motion.h2
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.2vw, 76px)',
              lineHeight: 0.93,
              letterSpacing: '-2.5px',
              color: '#111111',
              opacity: titleOp,
              y: titleY,
            }}
          >
            Beyond titles
            <br />
            <em style={{ color: '#2d7a3a' }}>and responsibilities.</em>
          </motion.h2>

          {/* Paragraphs */}
          <motion.div
            style={{ opacity: paraOp, y: paraY, marginTop: 28, maxWidth: 460 }}
          >
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                lineHeight: '27px',
                color: '#5E5E5E',
                marginBottom: 16,
              }}
            >
              Born in Rajasthan, schooled in Bengal, and shaped by four decades of
              commerce, community and culture &mdash; Dr. Sanjay Goel's story is not
              simply a professional one.
            </p>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                lineHeight: '27px',
                color: '#5E5E5E',
                marginBottom: 16,
              }}
            >
              It is a story of curiosity. Of building things &mdash; businesses,
              institutions, relationships &mdash; with the quiet conviction that people
              matter more than balance sheets.
            </p>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                lineHeight: '27px',
                color: '#5E5E5E',
              }}
            >
              He speaks five languages. He preserves heritage. He finds meaning in
              service. And he believes, firmly, that true leadership is measured by what
              it leaves behind.
            </p>
          </motion.div>

          {/* Values tags */}
          <motion.div
            style={{
              opacity: tagsOp,
              y: tagsY,
              marginTop: 32,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {VALUES.map((v) => (
              <span
                key={v}
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(0,0,0,0.08)',
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 6,
                  paddingBottom: 6,
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#5E5E5E',
                }}
              >
                {v}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Hairline scroll-progress indicator at bottom edge */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            width: '100%',
            background: 'rgba(45,122,58,0.28)',
            scaleX: scrollYProgress,
            transformOrigin: 'left',
            zIndex: 40,
          }}
        />
      </div>
    </section>
  )
}
