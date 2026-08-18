import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Building2, ChevronDown, Target } from 'lucide-react'
import { Section, TiltCard } from './ui'
import { projects, categories } from '../data/portfolio'
import { springy, viewport } from '../lib/motion'

export default function Projects({ highlightIds = [] }) {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems I've shipped to production"
      lede="Three domains, one throughline: taking fragile, manual processes and rebuilding them as systems that hold under real traffic. These are commercial platforms, so the code is private — the engineering decisions are not."
    >
      <LayoutGroup id="pf">
        <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = filter === cat
            const count = cat === 'All' ? projects.length : projects.filter((p) => p.categories.includes(cat)).length
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => { setFilter(cat); setExpanded(null) }}
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-muted hover:text-txt'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-xl"
                    style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
                    transition={springy}
                  />
                )}
                {cat}
                <span className={`ml-1.5 font-mono text-[11px] ${isActive ? 'text-white/70' : 'text-faint'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>

      {loading ? (
        <div className="grid gap-5">{[0, 1, 2].map((i) => <CardSkeleton key={i} />)}</div>
      ) : (
        <motion.div layout className="grid gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isOpen={expanded === project.id}
                onToggle={() => setExpanded((c) => (c === project.id ? null : project.id))}
                highlighted={highlightIds.includes(project.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Section>
  )
}

function ProjectCard({ project, isOpen, onToggle, highlighted }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
      viewport={viewport}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className={highlighted ? 'ring-2 ring-brand/60 rounded-2xl' : ''} max={5}>
        <article className="tilt-layer p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <h3 className="text-xl font-bold tracking-tight text-txt sm:text-2xl">{project.title}</h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-faint">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                {project.org}
                <span className="opacity-40">·</span>
                <span className="font-mono">{project.period}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.categories.map((c) => (
                <span key={c} className="rounded-md border border-line/10 px-2 py-1 text-[11px] text-faint">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-sm font-bold text-brand sm:text-base">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {project.impact}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <div key={m.k} className="rounded-xl border border-line/10 bg-line/[.03] px-3 py-1.5">
                <span className="block text-[10px] uppercase tracking-wider text-faint">{m.k}</span>
                <span className="block font-mono text-xs text-txt">{m.v}</span>
              </div>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <motion.li key={tech} whileHover={{ y: -3, scale: 1.05 }} transition={springy} className="badge">
                {tech}
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            {isOpen ? 'Hide engineering detail' : 'Read engineering detail'}
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={springy}>
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2.5 border-t border-line/10 pt-4">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </TiltCard>
    </motion.div>
  )
}

function CardSkeleton() {
  return (
    <div className="card p-5 sm:p-7">
      <div className="skeleton h-6 w-1/3" />
      <div className="skeleton mt-3 h-3 w-1/4" />
      <div className="skeleton mt-5 h-4 w-3/4" />
      <div className="skeleton mt-3 h-3 w-full" />
      <div className="mt-5 flex gap-2">
        {[56, 80, 64, 48].map((w, i) => <div key={i} className="skeleton h-6" style={{ width: w }} />)}
      </div>
    </div>
  )
}
