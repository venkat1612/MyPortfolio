import { motion, AnimatePresence } from 'framer-motion'
import { Layers, X, MousePointerClick } from 'lucide-react'
import { Section, Reveal, TiltCard } from './ui'
import { skillLayers, projects } from '../data/portfolio'
import { springy } from '../lib/motion'

export default function Skills({ selected, onSelect }) {
  const matched = selected ? projects.filter((p) => selected.projects.includes(p.id)) : []

  return (
    <Section
      id="stack"
      eyebrow="Architecture"
      title="The stack, by layer"
      lede="Percentage bars don't mean anything — nobody is 87% good at Java. This is grouped the way a system actually is. Click any technology to see exactly where I've used it in production."
    >
      <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <div className="space-y-4">
          {skillLayers.map((layer, li) => (
            <Reveal key={layer.layer} delay={li * 0.05}>
              <TiltCard max={4}>
                <div className="tilt-layer p-5 sm:p-6">
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-txt">
                      <Layers className="h-4 w-4 text-brand" aria-hidden="true" />
                      {layer.layer}
                    </h3>
                    <p className="hidden text-xs text-faint sm:block">{layer.blurb}</p>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {layer.items.map((item) => {
                      const isSel = selected?.name === item.name
                      return (
                        <li key={item.name}>
                          <motion.button
                            type="button"
                            whileHover={{ y: -3, scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springy}
                            onClick={() => onSelect(isSel ? null : item)}
                            aria-pressed={isSel}
                            className={`badge cursor-pointer px-2.5 py-1.5 text-[11.5px] ${
                              isSel ? 'badge-on' : 'hover:border-brand/45 hover:text-brand'
                            }`}
                          >
                            {item.name}
                            {item.projects.length > 0 && (
                              <span className="ml-1 text-[10px] opacity-60">{item.projects.length}</span>
                            )}
                          </motion.button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-24">
            <div className="card min-h-[300px] p-5 sm:p-6">
              <AnimatePresence mode="wait">
                {!selected ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex h-full min-h-[260px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-line/10 bg-line/[.03]"
                    >
                      <MousePointerClick className="h-5 w-5 text-brand" aria-hidden="true" />
                    </motion.div>
                    <p className="text-sm font-semibold text-muted">Select a technology</p>
                    <p className="mt-1.5 max-w-[16rem] text-xs leading-relaxed text-faint">
                      I'll show you the production systems it was used in, and why it was the right call.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selected.name}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-brand">Technology</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-txt">{selected.name}</h3>
                      </div>
                      <button
                        type="button" onClick={() => onSelect(null)} aria-label="Clear selection"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line/12 text-faint transition-colors hover:text-txt"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-5">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">
                        {matched.length > 0
                          ? `Used in ${matched.length} system${matched.length > 1 ? 's' : ''}`
                          : 'Working knowledge'}
                      </p>

                      {matched.length > 0 ? (
                        <ul className="space-y-2">
                          {matched.map((p, i) => (
                            <motion.li
                              key={p.id}
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.07 }}
                            >
                              <a
                                href="#work"
                                className="block rounded-xl border border-line/10 bg-line/[.02] p-3 transition-colors hover:border-brand/40 hover:bg-brand/[.06]"
                              >
                                <span className="block text-sm font-semibold text-txt">{p.title}</span>
                                <span className="mt-0.5 block text-xs text-faint">{p.org} · {p.period}</span>
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-relaxed text-faint">
                          In my toolkit and used outside the three case studies here — happy to talk through it in an interview.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
