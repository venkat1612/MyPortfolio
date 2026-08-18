import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, FileDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { profile, navLinks } from '../data/portfolio'
import { springy } from '../lib/motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-r from-brand via-brand2 to-brand" />
      </motion.div>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass border-b border-line/10' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
          <a href="#top" className="group flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl font-mono text-xs font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
            >
              {profile.initials}
            </span>
            <span className="hidden font-mono text-sm text-muted transition-colors group-hover:text-txt sm:block">
              {profile.firstName.toLowerCase()}<span className="text-brand">.dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors ${
                    active === link.id ? 'text-txt' : 'text-muted hover:text-txt'
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-line/[.07]"
                      transition={springy}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href={profile.resumeUrl}
              download
              className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] sm:inline-flex"
              style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-xl border border-line/15 text-txt md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="flex h-full flex-col items-center justify-center gap-1"
            >
              {navLinks.map((link) => (
                <motion.li key={link.id} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-3xl font-bold text-txt"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="mt-8">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-semibold text-white"
                  style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
