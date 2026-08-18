import { useEffect, useRef, useState } from 'react'

/* Custom pointer: a small dot that tracks exactly, plus a larger ring that
 * lags behind and swells over interactive elements. Disabled entirely on
 * touch devices and when reduced motion is requested. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let raf = 0

    let revealed = false
    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY

      // Stay invisible until the pointer actually moves, otherwise both
      // elements sit parked mid-screen on load and read as stray artifacts.
      if (!revealed) {
        revealed = true
        current.x = e.clientX
        current.y = e.clientY
        if (dot.current) dot.current.style.opacity = '1'
        if (ring.current) ring.current.style.opacity = '1'
      }

      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, [data-cursor]')
      ring.current?.classList.toggle('is-active', !!interactive)
    }

    const loop = () => {
      current.x += (target.x - current.x) * 0.16
      current.y += (target.y - current.y) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate3d(${current.x - 18}px, ${current.y - 18}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          .cursor-ring.is-active {
            width: 60px; height: 60px;
            margin: -12px 0 0 -12px;
            background: rgb(var(--brand) / .12);
            border-color: rgb(var(--brand) / .55);
          }
        }
      `}</style>

      <div
        ref={dot}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-brand"
      />
      <div
        ref={ring}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border border-line/25 transition-[width,height,background-color,border-color,margin] duration-300"
      />
    </>
  )
}
