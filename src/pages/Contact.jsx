import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import Reveal from '../components/Reveal'
import ContactStationery from '../components/ContactStationery'
import AnimatedTooltip from '../components/AnimatedTooltip'
import { useCoarsePointer } from '../hooks/useCoarsePointer'
import { Lock, Mail, Pencil, User } from '../components/icons'
import { email, profiles } from '../data/social'

const ease = [0.22, 1, 0.36, 1]

// A different bubble per platform — the shapes are the point of the component,
// so they shouldn't all be the same one. Contact page only.
const TOOLTIP_VARIANT = {
  X: 'gram',
  Facebook: 'smaug',
  Instagram: 'cora',
  LinkedIn: 'dori',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELDS = [
  { name: 'name', placeholder: 'Full name', icon: User, type: 'text', autoComplete: 'name' },
  { name: 'email', placeholder: 'Email address', icon: Mail, type: 'email', autoComplete: 'email' },
  { name: 'subject', placeholder: 'Subject', icon: Pencil, type: 'text', autoComplete: 'off' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

// encodeURIComponent, not URLSearchParams: the latter encodes spaces as "+",
// which several mail clients render literally in the body.
const enc = encodeURIComponent

// Webmail compose deep link, used when the OS has no mail client to hand off
// to. Takes the same prefilled subject/body as a mailto: would.
const WEBMAIL = [
  {
    id: 'gmail',
    label: 'Gmail',
    url: (subject, body) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(email)}&su=${enc(subject)}&body=${enc(body)}`,
  },
]

// ── Message form ──────────────────────────────────────────────────────────────
// There is no backend on this site, so "send" hands the composed note to the
// visitor's own mail client — nothing is transmitted or stored here, which is
// what the privacy line under the button promises.
//
// mailto: silently does nothing when no handler is registered (common on
// desktops without a mail app, and inside embedded browsers, which block
// external protocol launches outright), so the button cannot just fire one and
// declare victory. It attempts the handoff, then watches for the page losing
// focus — the only observable signal that the OS took over — and if that never
// comes, it surfaces webmail compose links that always work.
//
// Swap `handleSubmit` for a POST if a form endpoint is ever added.
function MessageForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  // 'idle' | 'sent' — handed off to a mail app | 'fallback' — nothing took it
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const timers = useRef([])

  const subject = values.subject.trim() || `Message from ${values.name.trim()}`
  const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }))
    setErrors((e) => (e[field] ? { ...e, [field]: null } : e))
    setStatus('idle')
    setCopied(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const next = {}
    if (!values.name.trim()) next.name = 'Please add your name.'
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please add a valid email address.'
    if (!values.message.trim()) next.message = 'Please add a message.'

    setErrors(next)
    if (Object.keys(next).length) return

    // A real anchor click, not `location.href =`: the click keeps the user
    // gesture attached, which some browsers require before they will launch an
    // external protocol handler at all.
    const a = document.createElement('a')
    a.href = `mailto:${email}?subject=${enc(subject)}&body=${enc(body)}`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()

    let tookOver = false
    const noteHandoff = () => {
      tookOver = true
    }
    window.addEventListener('blur', noteHandoff, { once: true })
    document.addEventListener('visibilitychange', noteHandoff, { once: true })

    timers.current.push(
      setTimeout(() => {
        window.removeEventListener('blur', noteHandoff)
        document.removeEventListener('visibilitychange', noteHandoff)
        setStatus(tookOver ? 'sent' : 'fallback')
      }, 1200),
    )
  }

  function copyMessage() {
    const text = `To: ${email}\nSubject: ${subject}\n\n${body}`
    const done = () => {
      setCopied(true)
      timers.current.push(setTimeout(() => setCopied(false), 2400))
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, done)
      return
    }
    // execCommand path for browsers that gate the async clipboard API.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    done()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col">
      <div className="flex items-center gap-2.5 text-brand">
        <Mail className="h-[18px] w-[18px]" />
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em]">
          Send a message
        </span>
      </div>

      <div className="mt-7 flex flex-col gap-3.5">
        {FIELDS.map(({ name, placeholder, icon: Icon, type, autoComplete }) => (
          <label key={name} className="block">
            <span className="sr-only">{placeholder}</span>
            <span className="relative block">
              <input
                type={type}
                name={name}
                value={values[name]}
                autoComplete={autoComplete}
                onChange={(e) => update(name, e.target.value)}
                placeholder={placeholder}
                aria-invalid={errors[name] ? 'true' : undefined}
                className={`h-[54px] w-full rounded-[14px] border bg-white/70 pl-4 pr-12 font-sans text-[15px] text-ink outline-none transition-colors placeholder:text-secondary/70 focus:border-brand/45 focus:bg-white ${
                  errors[name] ? 'border-accent/60' : 'border-border'
                }`}
              />
              <Icon className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-secondary/55" />
            </span>
            {errors[name] && (
              <span className="mt-1.5 block font-sans text-[12px] text-accent">{errors[name]}</span>
            )}
          </label>
        ))}

        <label className="block">
          <span className="sr-only">Your message</span>
          <textarea
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Your message"
            aria-invalid={errors.message ? 'true' : undefined}
            className={`w-full resize-y rounded-[14px] border bg-white/70 px-4 py-3.5 font-sans text-[15px] leading-[24px] text-ink outline-none transition-colors placeholder:text-secondary/70 focus:border-brand/45 focus:bg-white ${
              errors.message ? 'border-accent/60' : 'border-border'
            }`}
          />
          {errors.message && (
            <span className="mt-1.5 block font-sans text-[12px] text-accent">{errors.message}</span>
          )}
        </label>
      </div>

      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.25, ease }}
        className="group relative mt-5 flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-brand font-sans text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(45,122,58,0.22)]"
      >
        Send message
        <span
          aria-hidden="true"
          className="absolute right-5 text-[17px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          &#8599;
        </span>
      </motion.button>

      <div className="mt-3.5 flex items-start gap-2 font-sans text-[12.5px] leading-[20px] text-secondary">
        <Lock className="mt-[2px] h-[14px] w-[14px] shrink-0 text-secondary/70" />
        <span>
          {status === 'sent'
            ? 'Your mail app is opening with the message ready to send.'
            : 'Nothing is stored on this site — your note opens in your own mail app.'}
        </span>
      </div>

      <AnimatePresence>
        {status === 'fallback' && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-[16px] border border-border bg-white/70 p-4">
              <p className="font-sans text-[13px] leading-[21px] text-ink">
                No mail app opened on this device. Your message is written and
                ready &mdash; send it from webmail instead:
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {WEBMAIL.map((m) => (
                  <a
                    key={m.id}
                    href={m.url(subject, body)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand px-4 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-brand/90"
                  >
                    {m.label}
                    <span aria-hidden="true" className="text-[13px]">
                      &#8599;
                    </span>
                  </a>
                ))}

                <button
                  type="button"
                  onClick={copyMessage}
                  className="inline-flex h-9 cursor-pointer items-center rounded-full border border-border bg-white px-4 font-sans text-[13px] font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
                >
                  {copied ? 'Copied' : 'Copy message'}
                </button>
              </div>

              <p className="mt-3 font-sans text-[12.5px] text-secondary">
                Or write directly to{' '}
                <a href={`mailto:${email}`} className="text-brand hover:underline">
                  {email}
                </a>
                .
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

// ── Profile card ──────────────────────────────────────────────────────────────
// The card drives the bubble rather than the icon itself: hovering anywhere on
// the card is the natural target, and the trigger stays non-interactive so the
// tooltip never nests a button inside the card's link.
function ProfileCard({ profile }) {
  const [open, setOpen] = useState(false)
  const coarse = useCoarsePointer()
  const closeTimer = useRef(null)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Touch has no hover, so a tap shows the bubble on the way to opening the
  // link, then closes itself — nothing on a phone fires mouseleave.
  function handleTouch() {
    setOpen(true)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 1600)
  }

  return (
    <motion.a
      href={profile.href}
      target="_blank"
      rel="noreferrer noopener"
      onMouseEnter={() => !coarse && setOpen(true)}
      onMouseLeave={() => !coarse && setOpen(false)}
      onTouchStart={handleTouch}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease }}
      className="group block rounded-[18px] border border-border bg-white/70 px-4 py-4 transition-colors hover:border-brand/30 hover:bg-white"
      aria-label={`${profile.label ?? profile.title} — ${profile.handle}`}
    >
      {/* `block` spans the tooltip wrapper across the whole card, so the bubble
          and its pointer centre on the card rather than on the icon. */}
      <AnimatedTooltip
        open={open}
        block
        variant={TOOLTIP_VARIANT[profile.title] ?? 'cora'}
        shapeColor="#111111"
        textColor="#F5F2ED"
        triggerClassName="flex items-center gap-3.5"
        content={
          <span className="font-sans">
            <span className="font-semibold">{profile.label ?? profile.title}</span>
            <br />
            {profile.handle}
          </span>
        }
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink transition-colors group-hover:bg-brand">
          <svg
            viewBox={profile.viewBox}
            width={18}
            height={18}
            fill="currentColor"
            aria-hidden="true"
            className="text-white"
          >
            <path d={profile.d} />
          </svg>
        </span>

        <span className="min-w-0">
          <span className="block font-sans text-[14.5px] font-semibold leading-tight text-ink">
            {profile.label ?? profile.title}
          </span>
          <span className="mt-0.5 block truncate font-sans text-[13px] text-secondary">
            {profile.handle}
          </span>
        </span>

        <span
          aria-hidden="true"
          className="ml-auto font-sans text-[15px] text-secondary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        >
          &#8599;
        </span>
      </AnimatedTooltip>
    </motion.a>
  )
}

export default function Contact() {
  const go = useTransitionNavigate()

  return (
    <main className="relative z-20 w-full">
      {/* ── Hero ── */}
      <section className="relative grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:gap-4">
        <div className="px-6 pt-10 md:px-14 md:pt-6 lg:px-20">
          <motion.button
            onClick={() => go('/')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-sans text-[13px] text-secondary transition-colors hover:text-ink"
            aria-label="Back home"
          >
            <span aria-hidden="true">&#8592;</span> Back home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease }}
            className="mt-8 font-sans text-[20px] font-semibold text-ink"
          >
            07
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.14, ease }}
            className="mt-2 font-serif font-black leading-[0.92] tracking-[-2px] text-ink"
            style={{ fontSize: 'clamp(52px, 7.4vw, 116px)', fontWeight: 900 }}
          >
            Let&rsquo;s
            <br />
            <span className="text-brand">connect.</span>
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-7 block h-px w-12 origin-left bg-ink/25"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.36, ease }}
            className="mt-6 max-w-[440px] font-sans text-[16px] leading-[29px] text-secondary md:text-[17px]"
          >
            For speaking invitations, heritage collaborations, or a conversation
            about supply chain, housing and community work &mdash; a direct note
            is the fastest route.
          </motion.p>
        </div>

        <ContactStationery />
      </section>

      {/* ── Message + write-to ── */}
      <section className="px-6 pt-10 md:px-14 md:pt-14 lg:px-20">
        <Reveal className="overflow-hidden rounded-[26px] border border-border bg-white/55 shadow-soft backdrop-blur-[10px] md:rounded-[32px]">
          <div className="grid md:grid-cols-[1.12fr_0.88fr]">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <MessageForm />
            </div>

            <div className="flex flex-col items-center justify-center border-t border-border p-8 text-center md:border-l md:border-t-0 md:p-10 lg:p-12">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Write to
              </span>

              <span className="mt-8 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-brand/10">
                <Mail className="h-[24px] w-[24px] text-brand" />
              </span>

              <a
                href={`mailto:${email}`}
                className="mt-6 font-serif text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.5px] text-ink transition-colors hover:text-brand"
              >
                {email}
              </a>

              <p className="mt-3 font-sans text-[15px] leading-[26px] text-secondary">
                Every email is read personally.
              </p>

              <span className="my-8 block h-px w-16 bg-border" />

              <figure className="relative max-w-[300px]">
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -top-6 font-serif text-[54px] leading-none text-brand/25"
                >
                  &ldquo;
                </span>
                <blockquote className="font-serif text-[clamp(18px,2.1vw,22px)] italic leading-[1.45] text-ink/85">
                  The best outcomes begin with meaningful conversations.
                </blockquote>
              </figure>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Profiles ── */}
      <section className="px-6 pb-14 pt-5 md:px-14 md:pb-20 md:pt-6 lg:px-20">
        <Reveal className="rounded-[26px] border border-border bg-white/40 p-6 shadow-soft backdrop-blur-[10px] sm:p-8 md:rounded-[32px] md:p-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {profiles.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.06, 0.24)}>
                <ProfileCard profile={s} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  )
}
