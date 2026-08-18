import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react'
import { Section, Reveal, Magnetic } from './ui'
import { profile, WEB3FORMS_KEY } from '../data/portfolio'
import { springy } from '../lib/motion'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const KEY_UNSET = !WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE'

// Loud in dev, silent in production — so an unset key can't ship unnoticed.
if (import.meta.env.DEV && KEY_UNSET) {
  console.warn(
    '[contact] WEB3FORMS_KEY is not set — the form will fall back to opening the ' +
    'visitor\'s mail client instead of emailing you directly.\n' +
    'Get a free key at https://web3forms.com and paste it into src/data/portfolio.js',
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)

  const validate = (v) => {
    const e = {}
    if (!v.name.trim()) e.name = 'Please add your name'
    else if (v.name.trim().length < 2) e.name = 'That looks a little short'

    if (!v.email.trim()) e.email = 'Please add an email so I can reply'
    else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email doesn’t look right'

    if (!v.message.trim()) e.message = 'Please add a message'
    else if (v.message.trim().length < 12) e.message = 'A little more detail would help'

    return e
  }

  const change = (f) => (ev) => {
    const next = { ...form, [f]: ev.target.value }
    setForm(next)
    if (touched[f]) setErrors(validate(next))
  }
  const blur = (f) => () => {
    setTouched((t) => ({ ...t, [f]: true }))
    setErrors(validate(form))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const found = validate(form)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(found).length) return

    setStatus('sending')

    if (KEY_UNSET) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry from ${form.name}`,
          from_name: 'Portfolio Site',
          ...form,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setTouched({})
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked — the mailto link still works */ }
  }

  const channels = [
    { icon: Mail,     label: 'Email',    value: profile.email,            href: `mailto:${profile.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect professionally', href: profile.linkedin },
    { icon: Github,   label: 'GitHub',   value: 'Browse the code',        href: profile.github },
  ]

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Hiring for a backend role?"
      lede="I'm open to permanent, full-time roles — on-site or hybrid in Johannesburg, or fully remote anywhere. I reply to every genuine message within 24 hours."
    >
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <div className="space-y-3">
            {channels.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                whileHover={{ x: 6 }}
                transition={springy}
                className="card flex items-center gap-4 p-4"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                  style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
                >
                  <c.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-faint">{c.label}</span>
                  <span className="block truncate text-sm font-semibold text-txt">{c.value}</span>
                </span>
              </motion.a>
            ))}

            <button type="button" onClick={copyEmail} className="card flex w-full items-center gap-4 p-4 text-left">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line/12 bg-line/[.03]">
                {copied ? <Check className="h-4.5 w-4.5 text-emerald-500" /> : <Copy className="h-4.5 w-4.5 text-muted" />}
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-faint">Quick copy</span>
                <span className="block text-sm font-semibold text-txt">
                  {copied ? 'Email copied' : 'Copy email address'}
                </span>
              </span>
            </button>

            <div className="card border-emerald-500/25 bg-emerald-500/[.05] p-4">
              <p className="text-xs leading-relaxed text-emerald-700 dark:text-emerald-300/85">
                <strong className="font-bold">Based in {profile.location} ({profile.timezone}).</strong>{' '}
                Available on-site or hybrid across Gauteng, and fully remote for teams anywhere —
                with a full working-day overlap with UK, EU and Gulf hours. No relocation or sponsorship required.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card p-5 sm:p-7">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[350px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ ...springy, delay: 0.1 }}
                    className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" aria-hidden="true" />
                  </motion.span>
                  <h3 className="text-xl font-bold text-txt">Message on its way</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted">
                    Thanks for reaching out — I'll get back to you within 24 hours.
                  </p>
                  <button
                    type="button" onClick={() => setStatus('idle')}
                    className="mt-5 text-sm font-semibold text-brand hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <Field id="name" label="Your name" placeholder="Jane Recruiter"
                    value={form.name} onChange={change('name')} onBlur={blur('name')} error={touched.name && errors.name} />
                  <Field id="email" label="Email" type="email" placeholder="jane@company.com"
                    value={form.email} onChange={change('email')} onBlur={blur('email')} error={touched.email && errors.email} />
                  <Field id="message" label="Message" textarea placeholder="Tell me about the role, the team and the stack…"
                    value={form.message} onChange={change('message')} onBlur={blur('message')} error={touched.message && errors.message} />

                  {status === 'error' && (
                    <p className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Something went wrong. Please email me directly at {profile.email}.
                    </p>
                  )}

                  <Magnetic strength={0.12}>
                    <motion.button
                      type="submit" disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
                      transition={springy}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                      style={{
                        background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))',
                        boxShadow: '0 16px 36px -14px rgb(var(--brand) / .75)',
                      }}
                    >
                      {status === 'sending'
                        ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending…</>
                        : <><Send className="h-4 w-4" aria-hidden="true" />Send message</>}
                    </motion.button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function Field({ id, label, error, textarea, ...props }) {
  const base = 'w-full rounded-xl border bg-bg/60 px-4 py-3.5 text-sm text-txt placeholder:text-faint transition-colors focus:outline-none'
  const tone = error ? 'border-red-500/45 focus:border-red-500' : 'border-line/12 focus:border-brand'

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint">
        {label}
      </label>

      {textarea
        ? <textarea id={id} rows={5} className={`${base} ${tone} resize-none`} aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined} {...props} />
        : <input id={id} className={`${base} ${tone}`} aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined} {...props} />}

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`} role="alert"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
