import { useCallback, useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/* ---------------------------------------------------------------------------
 * useTilt — pointer-driven 3D rotation with a glare hotspot.
 * Returns a ref plus handlers; writes transforms directly to the node so the
 * animation never triggers a React re-render.
 * ------------------------------------------------------------------------- */
export function useTilt({ max = 9, scale = 1.015 } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el || prefersReduced()) return

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height

      const rx = (0.5 - py) * max * 2
      const ry = (px - 0.5) * max * 2

      const inner = el.querySelector('.tilt-inner') || el
      inner.style.transform =
        `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`

      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
    })
  }, [max, scale])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    const inner = el.querySelector('.tilt-inner') || el
    inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/* ---------------------------------------------------------------------------
 * useMagnetic — element drifts toward the cursor while hovered.
 * ------------------------------------------------------------------------- */
export function useMagnetic(strength = 0.32) {
  const ref = useRef(null)
  const frame = useRef(0)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el || prefersReduced()) return
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
    })
  }, [strength])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/* ---------------------------------------------------------------------------
 * useCountUp — animates 0 → target once the element scrolls into view.
 * Handles values like "7+" and "100%" by preserving the suffix.
 * ------------------------------------------------------------------------- */
export function useCountUp(raw, duration = 1400) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const done = useRef(false)

  useEffect(() => {
    const target = parseFloat(String(raw).replace(/[^\d.]/g, '')) || 0
    const suffix = String(raw).replace(/[\d.]/g, '')

    if (prefersReduced()) { setDisplay(String(raw)); return }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true

        const start = performance.now()
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(target * eased) + (t === 1 ? suffix : ''))
          if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })
    }, { threshold: 0.4 })

    io.observe(el)
    return () => io.disconnect()
  }, [raw, duration])

  return { ref, display }
}

/* ---------------------------------------------------------------------------
 * useScramble — decrypt-style text reveal, fired on demand.
 * ------------------------------------------------------------------------- */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

export function useScramble(text, { speed = 34 } = {}) {
  const [out, setOut] = useState(text)
  const timer = useRef(null)

  const run = useCallback(() => {
    if (prefersReduced()) return
    clearInterval(timer.current)
    let frame = 0
    timer.current = setInterval(() => {
      setOut(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < frame) return text[i]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )
      frame += 0.5
      if (frame >= text.length) { clearInterval(timer.current); setOut(text) }
    }, speed)
  }, [text, speed])

  useEffect(() => () => clearInterval(timer.current), [])

  return { out, run }
}

/* ---------------------------------------------------------------------------
 * useMouse — normalised pointer position (-1..1), used for scene parallax.
 * ------------------------------------------------------------------------- */
export function useMouse() {
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pos.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pos
}
