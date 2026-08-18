import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCommitHorizontal, BookOpen, GraduationCap, PenLine, Radio } from 'lucide-react'
import { Section } from './ui'
import { liveFeed } from '../data/portfolio'
import { springy } from '../lib/motion'

const TYPES = {
  shipping: { label: 'Shipping', icon: GitCommitHorizontal, cls: 'text-emerald-500 dark:text-emerald-400', ring: 'border-emerald-500/25 bg-emerald-500/[.08]' },
  learning: { label: 'Learning', icon: GraduationCap,       cls: 'text-brand',                             ring: 'border-brand/25 bg-brand/[.08]' },
  reading:  { label: 'Reading',  icon: BookOpen,            cls: 'text-brand2',                            ring: 'border-brand2/25 bg-brand2/[.08]' },
  writing:  { label: 'Writing',  icon: PenLine,             cls: 'text-amber-500 dark:text-amber-400',     ring: 'border-amber-500/25 bg-amber-500/[.08]' },
}

const FILTERS = ['All', 'Shipping', 'Learning', 'Reading']

export default function LiveFeed() {
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 720)
    return () => clearTimeout(t)
  }, [])

  const items = filter === 'All' ? liveFeed : liveFeed.filter((i) => TYPES[i.type]?.label === filter)

  return (
    <Section
      id="activity"
      eyebrow="Day-to-day"
      title="What I'm working on right now"
      lede="A snapshot of current momentum — what's being shipped, what's being learned, what's on the desk. Updated as the work moves."
    >
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 bg-line/[.02] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-muted">activity.log</span>
            <Radio className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`relative rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  filter === f ? 'text-txt' : 'text-faint hover:text-muted'
                }`}
              >
                {filter === f && (
                  <motion.span layoutId="feed-pill" className="absolute inset-0 -z-10 rounded-lg bg-line/[.08]" transition={springy} />
                )}
                {f.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-line/[.06]">
          {loading
            ? [0, 1, 2].map((i) => <FeedSkeleton key={i} />)
            : (
              <AnimatePresence mode="popLayout">
                {items.map((item, i) => <FeedRow key={item.title} item={item} index={i} />)}
              </AnimatePresence>
            )}

          {!loading && items.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-faint">No entries in this stream yet.</p>
          )}
        </div>
      </div>
    </Section>
  )
}

function FeedRow({ item, index }) {
  const meta = TYPES[item.type] || TYPES.shipping
  const Icon = meta.icon

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ x: 4 }}
      className="group flex gap-3.5 px-4 py-4 transition-colors hover:bg-line/[.02] sm:gap-4 sm:px-5"
    >
      <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${meta.ring}`}>
        <Icon className={`h-4 w-4 ${meta.cls}`} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className={`font-mono text-[11px] uppercase tracking-wider ${meta.cls}`}>{meta.label}</span>
          <h3 className="text-sm font-bold text-txt">{item.title}</h3>
          <time className="ml-auto shrink-0 font-mono text-[11px] text-faint">{item.time}</time>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
        {item.tag && <span className="badge mt-2.5 group-hover:border-brand/35 group-hover:text-brand">{item.tag}</span>}
      </div>
    </motion.article>
  )
}

function FeedSkeleton() {
  return (
    <div className="flex gap-4 px-5 py-4">
      <div className="skeleton h-9 w-9 shrink-0 rounded-xl" />
      <div className="flex-1">
        <div className="skeleton h-3.5 w-2/5" />
        <div className="skeleton mt-2.5 h-3 w-full" />
        <div className="skeleton mt-2 h-3 w-3/5" />
      </div>
    </div>
  )
}
