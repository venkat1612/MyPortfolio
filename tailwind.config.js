/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* Every colour resolves through a CSS variable, so flipping the theme
       * is a single class change on <html> with no component re-render. */
      colors: {
        bg:      'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        raised:  'rgb(var(--raised) / <alpha-value>)',
        line:    'rgb(var(--line) / <alpha-value>)',
        txt:     'rgb(var(--txt) / <alpha-value>)',
        muted:   'rgb(var(--muted) / <alpha-value>)',
        faint:   'rgb(var(--faint) / <alpha-value>)',
        brand:   'rgb(var(--brand) / <alpha-value>)',
        brand2:  'rgb(var(--brand2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Clash Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink:   { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'pulse-ring': {
          '0%':   { transform: 'scale(.8)', opacity: .8 },
          '100%': { transform: 'scale(2.4)', opacity: 0 },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        marquee: 'marquee 34s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.24,.6,.35,1) infinite',
        'gradient-pan': 'gradient-pan 9s ease infinite',
      },
    },
  },
  plugins: [],
}
