import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Section, TiltCard } from './ui'
import { experience } from '../data/portfolio'
import { viewport } from '../lib/motion'

export default function Experience() {
  const wrap = useRef(null)

  // The timeline spine draws itself as you scroll past it.
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start 75%', 'end 55%'],
  })
  const height = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <Section
      id="path"
      eyebrow="Trajectory"
      title="Seven years, three domains"
      lede="Payments, application security, and industrial telemetry. Different problems, same discipline — understand the domain, then build something that survives contact with production."
    >
      <div ref={wrap} className="relative">
        {/* Static rail */}
        <div className="absolute left-0 top-0 h-full w-px bg-line/12 sm:left-1" aria-hidden="true" />
        {/* Progress rail */}
        <motion.div
          style={{ scaleY: height }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-brand to-brand2 sm:left-1"
          aria-hidden="true"
        />

        <ol className="space-y-6 pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                className={`absolute -left-[26px] top-6 grid h-3.5 w-3.5 place-items-center rounded-full border-2 sm:-left-[42px] ${
                  job.current ? 'border-emerald-500 bg-bg' : 'border-line/30 bg-bg'
                }`}
                aria-hidden="true"
              >
                {job.current && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
              </span>

              <TiltCard max={4}>
                <div className="tilt-layer p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-bold text-txt">
                      {job.role}
                      <span className="ml-2 font-normal text-muted">· {job.company}</span>
                    </h3>
                    <span className={`font-mono text-xs ${job.current ? 'text-emerald-600 dark:text-emerald-400' : 'text-faint'}`}>
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-faint">{job.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{job.summary}</p>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
