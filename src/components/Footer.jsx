import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { Magnetic } from './ui'
import { profile } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  const socials = [
    { icon: Github,   href: profile.github,            label: 'GitHub' },
    { icon: Linkedin, href: profile.linkedin,          label: 'LinkedIn' },
    { icon: Mail,     href: `mailto:${profile.email}`, label: 'Email' },
  ]

  return (
    <footer className="relative border-t border-line/10 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm text-muted">
            {profile.firstName.toLowerCase()}<span className="text-brand">.dev</span>
          </p>
          <p className="mt-1 text-xs text-faint">
            © {year} {profile.name} · Built with React, Three.js, Tailwind &amp; Framer Motion
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <Magnetic key={s.label} strength={0.4}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-line/12 text-faint transition-colors hover:border-brand/45 hover:text-brand"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
          ))}

          <Magnetic strength={0.4}>
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-1 grid h-10 w-10 place-items-center rounded-xl border border-line/12 text-faint transition-colors hover:border-brand/45 hover:text-brand"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
