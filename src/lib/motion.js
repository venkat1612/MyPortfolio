export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
}

export const blurUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

export const stagger = (delayChildren = 0, staggerChildren = 0.07) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})

export const springy = { type: 'spring', stiffness: 400, damping: 28 }
export const softSpring = { type: 'spring', stiffness: 180, damping: 22 }

export const viewport = { once: true, margin: '-80px' }
