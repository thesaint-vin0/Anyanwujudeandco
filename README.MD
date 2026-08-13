# Jude Anyanwu — Fiscal Architecture

A premium, production-ready 3D portfolio for **Jude Anyanwu**, Professional Accountant, Financial Consultant & Tax Advisor.

> _"Turning Numbers into Strategic Business Growth."_

## ✨ Overview

An institutional-grade digital presence built on the **"Ledger Grid"** design system — mathematical balance, expansive white space, and the stability of Swiss modernism. Subtle, elegant 3D interactions rather than flashy effects.

- **3D Hero** — a "Crystalized Bar Chart" of frosted-glass pillars that rotate and lean toward the cursor (raw Three.js, performant).
- **Sections** — Hero, About (animated stats), Services (bento glass grid), Skills (floating cards), Experience (fiscal timeline), Portfolio (result-metric cards), Testimonials (carousel), FAQ, Blog, Contact (working email), Footer.
- **Extras** — loader, custom cursor, scroll progress bar, back-to-top, smooth scrolling, accessibility (focus states, `prefers-reduced-motion`, ARIA).

## 🎨 Design System

| Token | Value |
| --- | --- |
| Primary (Deep Midnight) | `#0F172A` |
| Background (Basalt White) | `#F8FAFC` |
| Secondary (Cobalt Trust) | `#1E40AF` |
| Accent (Burnished Gold) | `#B45309` |
| Typography | Inter (heading/body) · JetBrains Mono (data) |

## 🧰 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** (custom design tokens)
- **Three.js** (custom 3D hero scene, no extra deps)
- **Framer Motion** (animations, parallax, page motion)
- **lucide-react** (icons)
- Base44 platform (hosting, email integration for the contact form)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

The app runs on the Base44 platform. The contact form sends real email via the platform's email integration to `jude.anyanwu@fiscal-architecture.com` — update `CONTACT_RECIPIENT` in `src/components/sections/Contact.jsx` to change the destination.

## 📁 Structure

```
src/
  components/
    three/Hero3D.jsx        # Crystalized bar chart scene
    sections/               # Hero, About, Services, Skills, Experience,
                            # ParallaxBanner, Portfolio, Testimonials,
                            # FAQ, Blog, Contact, Footer
    Navbar.jsx, Loader.jsx, ScrollProgress.jsx,
    CustomCursor.jsx, BackToTop.jsx
  data/portfolio.js         # All site content (single source of truth)
  hooks/                    # useCountUp, useInView
  pages/Home.jsx
```

## ♿ Accessibility

- All motion wrapped in `prefers-reduced-motion` checks.
- 2px focus ring (`#1E40AF`) on interactive elements.
- ARIA labels on 3D canvas, counters, and navigation.

## 📄 License

© Jude Anyanwu. All rights reserved.