/**
 * HeroToManTransition.jsx
 *
 * Sticky storytelling stage placed between the DiscoverMore landing hero and
 * the "Ideas & Perspectives" section.
 *
 * Scroll progress 0 → 1 across a 260vh scroll space controls:
 *
 *   Layer 1 — Hero ghost      : mirrors DiscoverMore hero (portrait dimmed + heading text)
 *                               exits gradually by p = 0.80
 *   Layer 2 — Continuous img  : same portrait, same spatial position;
 *                               dark overlay dissolves + CSS brightness lifts (p 0.18 → 0.68)
 *   Layer 3 — Man content     : "The Man Behind the Work" copy appears over image (p 0.44 → 1.0)
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import portrait3 from '../assets/portrait-3.png'

const BG_COLOR = '#F5F2ED'

// The same bottom-fade mask used across the site's hero images
const PORTRAIT_MASK =
  'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 12%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)'

const VALUES = ['Curiosity', 'Purpose', 'People', 'Integrity', 'Service']

// ─────────────────────────────────────────────────────────────────────────────
export default function HeroToManTransition() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Layer 1: DiscoverMore hero ghost exits ────────────────────────────────
  const heroOpacity = useTransform(scrollYProgress, [0, 0.40, 0.80], [1, 0.50, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.80], ['0%', '-6%'])
  const heroTextX   = useTransform(scrollYProgress, [0.28, 0.78], ['0px', '-48px'])

  // ── Layer 2: Continuous portrait (un-dims) ────────────────────────────────
  // Slides in on top of hero ghost seamlessly
  const continuousOp  = useTransform(scrollYProgress, [0, 0.10], [0, 1])
  const dimOverlayOp  = useTransform(scrollYProgress, [0, 0.18, 0.70], [0.78, 0.78, 0])
  const imgBrightness = useTransform(scrollYProgress, [0.15, 0.68], [0.38, 1.06])
  const imgFilter     = useMotionTemplate`contrast(1.04) brightness(${imgBrightness})`

  // ── Layer 3: Man Behind the Work content ─────────────────────────────────
  const manOpacity = useTransform(scrollYProgress, [0.44, 0.68], [0, 1])
  const manY       = useTransform(scrollYProgress, [0.44, 0.72], ['48px', '0px'])
  const manX       = useTransform(scrollYProgress, [0.44, 0.72], ['-20px', '0px'])

  const manTitleOp = useTransform(scrollYProgress, [0.50, 0.72], [0, 1])
  const manTitleY  = useTransform(scrollYProgress, [0.50, 0.72], ['36px', '0px'])
  const manParaOp  = useTransform(scrollYProgress, [0.57, 0.76], [0, 1])
  const manParaY   = useTransform(scrollYProgress, [0.57, 0.76], ['28px', '0px'])
  const manTagsOp  = useTransform(scrollYProgress, [0.63, 0.82], [0, 1])
  const manTagsY   = useTransform(scrollYProgress, [0.63, 0.82], ['20px', '0px'])

  // Portrait shared position — mirrors DiscoverMore hero portrait (right 0, top 0, 55% wide)
  const portraitCommon = {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '55%',
    objectFit: 'cover',
    objectPosition: 'center',
    WebkitMaskImage: PORTRAIT_MASK,
    maskImage: PORTRAIT_MASK,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }

  return (
    <section
      ref={containerRef}
      aria-label="The man behind the work — scroll transition"
      style={{ height: '260vh', position: 'relative' }}
    >
      {/* ── Sticky 100vh stage ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          zIndex: 21,
        }}
      >

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 1 — HERO GHOST
            Exact re-creation of the DiscoverMore landing hero.
            Exits (fade + slight upward drift) as scroll progresses.
            ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: heroOpacity,
            y: heroY,
            pointerEvents: 'none',
          }}
        >
          {/* Background: page colour */}
          <div style={{ position: 'absolute', inset: 0, background: BG_COLOR }} />

          {/* Dimmed portrait — same position as DiscoverMore hero */}
          <img
            src={portrait3}
            alt=""
            aria-hidden="true"
            style={{
              ...portraitCommon,
              opacity: 0.068,
              filter: 'none',
              zIndex: 1,
            }}
          />
          {/* Gradients that the DiscoverMore hero uses */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to right, ${BG_COLOR} 0%, rgba(245,242,237,0.82) 42%, transparent 100%)`,
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, transparent 60%, ${BG_COLOR} 100%)`,
              zIndex: 2,
            }}
          />

          {/* Hero text content (mirrors DiscoverMore hero) */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              paddingLeft: 'clamp(24px, 5.5vw, 80px)',
              paddingRight: 24,
              maxWidth: 840,
              x: heroTextX,
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
              <div key={line} style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 900,
                    fontSize: 'clamp(46px, 8vw, 118px)',
                    lineHeight: 0.92,
                    letterSpacing: '-3px',
                    color: '#111111',
                    display: 'block',
                  }}
                >
                  {line}
                </div>
              </div>
            ))}

            {/* Sub-copy */}
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
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 2 — CONTINUOUS PORTRAIT
            Same portrait, same spatial position.
            Dark overlay dissolves; CSS brightness lifts 0.38 → 1.06.
            This is the "image continuity" layer — it looks identical to the
            hero portrait at p=0, then brightens as p increases.
            ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: continuousOp,
            pointerEvents: 'none',
            zIndex: 12,
          }}
        >
          {/* Solid bg so the page bg shows through the left/bottom gradients */}
          <div style={{ position: 'absolute', inset: 0, background: BG_COLOR }} />

          {/* Portrait — brightness driven by scroll */}
          <motion.img
            src={portrait3}
            alt="Dr. Sanjay Goel"
            style={{
              ...portraitCommon,
              filter: imgFilter,
              zIndex: 2,
            }}
          />

          {/* Dissolving dark overlay — the un-dimming veil */}
          <motion.div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: '55%',
              background: 'rgba(0,0,0,0.78)',
              opacity: dimOverlayOp,
              zIndex: 3,
              pointerEvents: 'none',
              WebkitMaskImage: PORTRAIT_MASK,
              maskImage: PORTRAIT_MASK,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />

          {/* Left content-area bleed so text reads cleanly */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to right, ${BG_COLOR} 0%, rgba(245,242,237,0.90) 30%, rgba(245,242,237,0.22) 55%, transparent 70%)`,
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />
          {/* Bottom bleed */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(245,242,237,0.60) 0%, transparent 20%)`,
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 3 — THE MAN BEHIND THE WORK CONTENT
            Appears over the brightening portrait from p = 0.44 onward.
            Each sub-element has a slightly staggered entry.
            ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            opacity: manOpacity,
            y: manY,
            x: manX,
          }}
        >
          <div
            style={{
              paddingLeft: 'clamp(24px, 5.5vw, 80px)',
              paddingRight: 24,
              maxWidth: 590,
              width: '100%',
            }}
          >
            {/* Chapter badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 28,
              }}
            >
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
            <motion.div style={{ opacity: manTitleOp, y: manTitleY }}>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 900,
                  fontSize: 'clamp(36px, 5.2vw, 76px)',
                  lineHeight: 0.93,
                  letterSpacing: '-2.5px',
                  color: '#111111',
                }}
              >
                Beyond titles
                <br />
                <em style={{ color: '#2d7a3a' }}>and responsibilities.</em>
              </h2>
            </motion.div>

            {/* Paragraphs */}
            <motion.div
              style={{
                opacity: manParaOp,
                y: manParaY,
                marginTop: 28,
                maxWidth: 460,
              }}
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
                service. And he believes, firmly, that true leadership is measured by
                what it leaves behind.
              </p>
            </motion.div>

            {/* Values tags */}
            <motion.div
              style={{
                opacity: manTagsOp,
                y: manTagsY,
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
          </div>
        </motion.div>

        {/* Hairline scroll-progress indicator */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            background: 'rgba(45,122,58,0.30)',
            scaleX: scrollYProgress,
            transformOrigin: 'left',
            zIndex: 40,
            width: '100%',
          }}
        />
      </div>
    </section>
  )
}
