# Venkata Sai Kandipati — Portfolio (Advanced / 3D Edition)

Interactive developer portfolio with a **light/dark theme toggle**, a **real-time 3D service-mesh scene** (Three.js via React Three Fiber), pointer-driven **3D tilt cards**, magnetic buttons and a custom cursor.

Built with React 18 + Vite, Tailwind CSS, Framer Motion and Three.js.

> This is the *advanced* edition. The simpler dark-only version is a separate project — deploy either, or both under different domains.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview  # http://localhost:4173
```

---

## Positioning

The site states plainly that you are open to **both**:

- Johannesburg roles — on-site or hybrid
- Fully remote roles — anywhere

That appears as scannable chips in the hero, in the terminal boot sequence, in the contact section, and in the page metadata. A recruiter filling a Sandton req and a recruiter filling a remote req both get a clear yes without reading a paragraph.

> Your resume PDF still reads *"Available for fully remote roles"*. Update that line so it matches the site — otherwise a recruiter sees a contradiction between the page and the attachment.

---

## Deploy checklist

**The site is deployable right now.** Nothing is broken without the steps below — they just make it better.

### 1. Contact form → your inbox *(2 minutes, recommended)*

```js
// src/data/portfolio.js — bottom of the file
export const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'
```

Free key at <https://web3forms.com>, no account needed. Until it's set, the form still validates fully and falls back to opening the visitor's mail client — and `npm run dev` prints a console warning so it can't ship unnoticed.

### 2. After your first deploy — set your real URL

Vercel gives you a URL like `venkata-portfolio.vercel.app`. Replace the placeholder in **three files**:

| File | What to change |
|---|---|
| `index.html` | `canonical`, `og:url`, `og:image`, `twitter:image`, and `url` / `image` in the JSON-LD block |
| `public/robots.txt` | the `Sitemap:` line |
| `public/sitemap.xml` | the `<loc>` value |

A find-and-replace on `venkata-portfolio.vercel.app` covers all of them. Until you do, social previews and search indexing point at a URL that doesn't exist.

### 3. Resume

Bundled at `public/Venkata_Sai_Resume.pdf` and wired to both Download CTAs. Overwrite it keeping the filename identical, or set `VITE_RESUME_URL` to host it elsewhere.

---

## Social share card

`public/og-image.png` (1200×630) is what LinkedIn, WhatsApp and X render when your link is shared — which matters a lot when you're sending it to recruiters. Without it they'd see a blank grey box.

To regenerate after editing your details, edit `og-template.html` and run:

```bash
npx playwright screenshot --viewport-size=1200,630 og-template.html public/og-image.png
```

The template never ships to visitors — it's a build-time tool only.

---

## SEO

- **JSON-LD `Person` schema** — tells Google you're a person with a job title, a location and a stack, not a company. Includes `sameAs` links to your GitHub and LinkedIn so the profiles get associated with each other.
- **`robots.txt` + `sitemap.xml`** — so the page gets crawled and indexed.
- **Title and description** carry both "Johannesburg" and "Remote", which is what recruiters actually search.

---

## What makes this the "advanced" version

### Light / dark theme
- Every colour is a CSS custom property, so switching themes is a single class on `<html>` — no component re-renders, no flash of unstyled colour.
- An inline script in `index.html` resolves the theme **before first paint**, killing the white flash that normally hits dark-mode sites on load.
- Respects the OS preference until the visitor makes an explicit choice, then remembers it. `localStorage` access is wrapped in try/catch so private-mode Safari degrades gracefully instead of crashing.
- The 3D scene reads the active theme and recolours its materials to match.

### The 3D scene (`src/components/three/NetworkScene.jsx`)
Not a decorative blob — it's a **service-mesh topology**: 15 nodes distributed evenly over a sphere via a Fibonacci lattice, wired to their nearest neighbours, with packets travelling the edges. It's a distributed system, which is what the rest of the site is about.

- Rotates continuously, breathes on a sine, and parallaxes toward the pointer.
- Packets are a single `InstancedMesh` — one draw call for all of them.
- Lazy-loaded behind `requestIdleCallback`, so the text lands first and Three.js streams in after.
- Hidden below `lg` — mobile gets the gradient field instead of a GPU cost.

### Interaction layer (`src/hooks/index.js`)
| Hook | What it does |
|---|---|
| `useTilt` | Rotates a card in 3D toward the pointer and moves a glare hotspot with it. Writes transforms directly to the DOM inside a rAF — never re-renders React. |
| `useMagnetic` | Buttons drift toward the cursor on approach. |
| `useCountUp` | Stats animate 0 → target on scroll-in, preserving suffixes like `7+` and `100%`. |
| `useScramble` | Decrypt-style text reveal on the job title (hover it again to replay). |
| `useMouse` | Normalised pointer position feeding the 3D parallax. |

Plus a custom two-part cursor (exact dot + lagging ring that swells over interactive elements), and an infinite marquee of the stack.

**Every one of these is disabled under `prefers-reduced-motion`,** and the cursor is skipped entirely on touch devices.

---

## Performance

The 3D engine is code-split so it never blocks first paint:

| Chunk | Size (gzipped) | When it loads |
|---|---|---|
| `index` (app) | ~62 KB | immediately |
| `motion` (Framer Motion) | ~43 KB | immediately |
| `css` | ~7 KB | immediately |
| `three` (Three.js + R3F) | ~220 KB | after idle, desktop only |

**~112 KB gzipped to first paint**, with the heavy 3D work deferred and skipped on mobile entirely.

---

## Deploy free on Vercel

Identical to the other version:

1. Push to a GitHub repo.
2. <https://vercel.com> → **Add New… → Project** → import the repo.
3. Vercel auto-detects Vite. Change nothing. **Deploy.**

For a custom domain: **Settings → Domains → Add**. SSL is issued automatically and free.

> Running both versions? Give them separate repos and separate Vercel projects — e.g. `venkata.vercel.app` and `venkata-pro.vercel.app`.

---

## Structure

```
src/
├── data/portfolio.js         ← all content (shared with the other version)
├── context/ThemeContext.jsx  ← theme state + persistence
├── hooks/index.js            ← tilt, magnetic, count-up, scramble, mouse
├── lib/motion.js             ← shared Framer Motion variants
├── components/
│   ├── three/NetworkScene.jsx  ← the 3D service mesh
│   ├── ui/index.jsx            ← Section, Reveal, TiltCard, Magnetic
│   ├── Cursor.jsx  ThemeToggle.jsx  Nav.jsx  Hero.jsx
│   ├── Marquee.jsx  Projects.jsx  Skills.jsx  LiveFeed.jsx
│   └── Experience.jsx  Contact.jsx  Footer.jsx
└── App.jsx
```

---

## Accessibility

Semantic landmarks throughout, one `<h1>`, skip-to-content link, visible focus rings in both themes, `role="switch"` + `aria-checked` on the theme toggle, `aria-pressed` / `aria-expanded` on every toggle, labelled form fields with `role="alert"` errors, and the decorative 3D canvas marked `aria-hidden`.
