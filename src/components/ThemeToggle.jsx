import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { springy } from '../lib/motion'

/* Sliding knob toggle. The knob is a shared layout element, so Framer Motion
 * springs it across rather than snapping. */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggle, isDark } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex h-9 w-[68px] items-center rounded-full border border-line/15 bg-raised/70 p-1 transition-colors hover:border-brand/40 ${className}`}
    >
      {/* Track icons */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5">
        <Sun className={`h-3.5 w-3.5 transition-opacity ${isDark ? 'opacity-35' : 'opacity-0'}`} aria-hidden="true" />
        <Moon className={`h-3.5 w-3.5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-35'}`} aria-hidden="true" />
      </span>

      {/* Knob */}
      <motion.span
        layout
        transition={springy}
        className="relative z-10 grid h-7 w-7 place-items-center rounded-full shadow-lg"
        style={{
          marginLeft: isDark ? 'calc(100% - 1.75rem - 0.25rem)' : 0,
          background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))',
        }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
          className="text-white"
        >
          {isDark
            ? <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            : <Sun className="h-3.5 w-3.5" aria-hidden="true" />}
        </motion.span>
      </motion.span>
    </button>
  )
}
