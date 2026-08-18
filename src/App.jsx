import { useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import Skills from './components/Skills'
import LiveFeed from './components/LiveFeed'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const handleSelectSkill = useCallback((skill) => {
    setSelectedSkill(skill)
    if (skill?.projects?.length) {
      setTimeout(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 180)
    }
  }, [])

  return (
    <ThemeProvider>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Projects highlightIds={selectedSkill?.projects ?? []} />
        <Skills selected={selectedSkill} onSelect={handleSelectSkill} />
        <LiveFeed />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  )
}
