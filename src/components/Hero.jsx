import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, ArrowDown, MapPin, Globe, BadgeCheck } from 'lucide-react'
import { Magnetic } from './ui'
import { profile, stats, workPreferences } from '../data/portfolio'
import { fadeUp, blurUp, stagger, springy } from '../lib/motion'
import { useCountUp, useScramble } from '../hooks'

/* Three.js is ~450 KB gzipped — it must never block first paint. */
const NetworkScene = lazy(() => import('./three/NetworkScene'))

export default function Hero() {
  const [mount3D, setMount3D] = useState(false)
  const { out: scrambled, run } = useScramble(profile.title)

  useEffect(() => {
    // Hold the 3D scene until the browser is idle so the text lands first.
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 400))
    const id = idle(() => setMount3D(true))
    return () => window.cancelIdleCallback?.(id)
  }, [])

  useEffect(() => { const t = setTimeout(run, 500); return () => clearTimeout(t) }, [run])

  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden pt-28 pb-16 sm:pt-32" aria-label="Introduction">
      {/* ---------- Ambient background ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        <div className="absolute -top-48 left-1/4 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px] dark:bg-brand/25" />
        <div className="absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-brand2/15 blur-[120px]" />
      </div>

      {/* ---------- 3D scene ---------- */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block" aria-hidden="true">
        {mount3D && (
          <Suspense fallback={null}>
            <NetworkScene />
          </Suspense>
        )}
      </div>

      <div className="container-x relative">
        <motion.div initial="hidden" animate="show" variants={stagger(0.05, 0.09)} className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/[.08] py-1.5 pl-2.5 pr-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Open to new roles
            </span>
          </motion.div>

          <motion.h1
            variants={blurUp}
            className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-txt sm:text-6xl lg:text-7xl"
          >
            Venkata Sai
            <br />
            <span className="grad-text">Kandipati</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            onMouseEnter={run}
            className="mt-5 cursor-default font-mono text-sm text-brand sm:text-base"
            data-cursor
          >
            {scrambled}
            <span className="mx-2 text-faint">/</span>
            <span className="text-muted">{profile.yearsExperience} years in production</span>
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.hook}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {profile.location}
            <span className="opacity-40">·</span>
            <span className="font-mono text-muted">{profile.timezone}</span>
            <span className="opacity-40">·</span>
            <span>Full overlap with UK, EU &amp; Gulf hours</span>
          </motion.p>

          {/* What a recruiter checks first — stated plainly, not buried in prose. */}
          <motion.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-2" aria-label="Work preferences">
            {workPreferences.map((w) => {
              const Icon = w.icon === 'pin' ? MapPin : w.icon === 'globe' ? Globe : BadgeCheck
              return (
                <li
                  key={w.label}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line/12 bg-line/[.03] px-2.5 py-1.5 text-xs font-medium text-muted"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {w.label}
                </li>
              )
            })}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <motion.a
                href={profile.resumeUrl}
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={springy}
                className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-xl"
                style={{
                  background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))',
                  boxShadow: '0 18px 40px -14px rgb(var(--brand) / .7)',
                }}
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                Download Resume
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={springy}
                className="inline-flex items-center gap-2 rounded-2xl border border-line/15 bg-surface/60 px-6 py-3.5 text-sm font-semibold text-txt backdrop-blur transition-colors hover:border-brand/45"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View GitHub
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ---------- Stats ---------- */}
        <motion.dl
          initial="hidden"
          animate="show"
          variants={stagger(0.55, 0.08)}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-4"
        >
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </motion.dl>

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-14 flex w-fit items-center gap-2 text-xs text-faint transition-colors hover:text-brand"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-float" aria-hidden="true" />
          Selected work
        </motion.a>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  const { ref, display } = useCountUp(value)

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={springy}
      className="card p-4 text-center sm:p-5"
    >
      <dt className="sr-only">{label}</dt>
      <dd>
        <span ref={ref} className="block font-mono text-2xl font-extrabold text-txt sm:text-3xl">
          {display}
        </span>
        <span className="mt-1.5 block text-[11px] leading-snug text-faint sm:text-xs">{label}</span>
      </dd>
    </motion.div>
  )
}
