import { motion } from 'framer-motion'
import { blurUp, fadeUp, viewport, springy } from '../../lib/motion'
import { useTilt, useMagnetic } from '../../hooks'

/* Scroll reveal with a subtle blur-in — reads as more "premium" than a plain fade. */
export function Reveal({ children, delay = 0, className = '', variant = blurUp }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: variant.hidden,
        show: { ...variant.show, transition: { ...variant.show.transition, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* Consistent section shell with semantic heading structure. */
export function Section({ id, eyebrow, title, lede, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="container-x">
        <Reveal>
          <header className="mb-10 max-w-2xl sm:mb-14">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-7 bg-brand/60" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-txt sm:text-[2.6rem]">
              {title}
            </h2>
            {lede && <p className="mt-4 text-base leading-relaxed text-muted">{lede}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

/* Card that rotates in 3D toward the pointer, with a glare hotspot. */
export function TiltCard({ children, className = '', max = 8 }) {
  const tilt = useTilt({ max })

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`tilt-root group/tilt relative ${className}`}
    >
      <div className="tilt-inner card relative overflow-hidden transition-transform duration-300 ease-out">
        <span className="glare" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}

/* Button/link wrapper that drifts toward the cursor. */
export function Magnetic({ children, className = '', strength = 0.28 }) {
  const mag = useMagnetic(strength)
  return (
    <div
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

export { motion, fadeUp, blurUp, viewport, springy }
