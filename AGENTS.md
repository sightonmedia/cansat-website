# CanSat Website Agent Instructions

This is a static website for the Canadian Space Agency's CanSat Challenge, built with **Astro 4.16.0**. The site is minimal and maintainable—purely static HTML with no frontend framework complexity.

## Project Overview

- **Purpose**: Marketing/informational site for the CanSat Challenge program
- **Framework**: Astro (static site generator)
- **Output**: Static HTML files deployable to any hosting
- **Design Theme**: "Deep space"—dark surfaces, space photography, signal-cyan + exhaust-orange accents
- **See also**: [README.md](README.md) for latest design/content changes

## Build & Development Commands

```bash
cd csdcms-astro
npm run dev      # Start dev server on http://localhost:3000 (hot reload)
npm run build    # Generate static HTML to csdcms-built/
npm run preview  # Preview the production build locally
```

**Key build detail**: Output folder is `csdcms-built/` (not `dist/`). CSS is inlined into each HTML file (no separate `.css`).

## Directory Structure & Key Files

```
csdcms-astro/
├── src/
│   ├── pages/              # File-based routing (*.astro → *.html)
│   │   ├── index.astro     # Home page
│   │   ├── challenge.astro, register.astro, resources.astro, etc.
│   ├── components/         # Reusable Astro components
│   │   ├── Header.astro    # Navigation; accepts currentPage prop for active link styling
│   │   ├── Footer.astro    # Static footer
│   │   ├── BgPhoto.astro   # Background image abstraction (variants: hero, header, band)
│   │   └── Starfield.astro # Fixed SVG background with deterministic stars
│   ├── layouts/
│   │   └── Layout.astro    # Single wrapper for all pages (meta tags, fonts, JS init)
│   ├── lib/
│   │   └── images.ts       # Centralized constants: space photos URLs + supporter logo paths
│   └── styles/
│       └── global.css      # All styling (no Tailwind, no scoped CSS)
└── public/
    └── images/supporters/  # Local brand files (BC Hydro, Calian, MDA Space, etc.)
```

## Page Structure Pattern

Every page follows this structure:

```astro
import Layout from '../layouts/Layout.astro';
import BgPhoto from '../components/BgPhoto.astro';
import { SPACE_PHOTOS } from '../lib/images';

<Layout title="Page Title" currentPage="/path">
  <main>
    {page content goes here}
  </main>
</Layout>
```

**Rule**: All pages must use the `Layout.astro` wrapper. Never add page-specific meta tags or script setup outside of it.

## Design System & Styling

**All styling lives in `src/styles/global.css`** (no component-scoped CSS). Use design tokens:

### Color Tokens
- `--void`, `--deep`, `--cosmos`, `--nebula`, `--horizon` (dark theme grays)
- `--signal` (cyan accent)
- `--exhaust` (orange accent)

### Spacing Scale
`--sp-1` through `--sp-9` (4px to 96px in 8px increments)

### Key Utility Classes
- `.container` — max-width wrapper
- `.grid-2` — two-column responsive grid
- `.card` — card styling for content blocks
- `.section` — vertical spacing + scroll animation setup
- `.btn` — button styling
- `.reveal` — scroll-triggered animation (IntersectionObserver, respects `prefers-reduced-motion`)
- `.s-{variant}` — background color utilities

### Responsive Typography
Uses `clamp()` for fluid scaling (no media queries needed). Example: `h1` scales from 2.6rem to 5.2rem.

## Image & Asset Management

### Space Photos
- All sourced from Wikimedia Commons (public domain / CC BY 4.0)
- **Centralized in `src/lib/images.ts`** — URLs exported as constants
- **Never hardcode photo URLs in components** — always import from `images.ts`
- To change a space photo: edit the URL in `src/lib/images.ts`, not the component

### Local Images
- CanSat photos stored in `public/images/` (e.g., `cansat-2022-winners.webp`)
- Supporter logos in `public/images/supporters/` — replace files here to update brand logos
- **No image optimization pipeline** — serve as-is (consider compression before committing large images)

## Component Guidelines

### BgPhoto Component
```astro
<BgPhoto
  src={SPACE_PHOTOS.blueMarble}
  alt="Description"
  variant="hero"        <!-- or 'header', 'band' -->
  objectPosition="center"
/>
```
Always use `BgPhoto` for background images—don't inline `<img>` tags. Variants handle positioning and sizing automatically.

### Header Component
```astro
<Header currentPage="/current-path" />
```
The `currentPage` prop controls which link gets active styling. Update navigation links in `src/components/Header.astro` (single source of truth).

### Layout Component
```astro
<Layout title="Page Title" currentPage="/path">
  {content}
</Layout>
```
The Layout includes `<Header>`, `<Footer>`, `<Starfield>`, fonts, and scroll animation setup.

## Animations & Interactivity

- **Scroll reveal animations**: Add `.reveal` class to any element; IntersectionObserver auto-triggers fade-in on scroll
- **Mobile menu**: JavaScript in `Layout.astro` handles hamburger toggle
- **Accessibility**: All animations respect `prefers-reduced-motion`
- **No framework JS** — just vanilla JavaScript; keep interactivity minimal

## Common Tasks

### Create a New Page
1. Add `new-page.astro` to `src/pages/`
2. Wrap content in `<Layout title="..." currentPage="/new-page">...</Layout>`
3. Run `npm run build` — Astro auto-generates `csdcms-built/new-page.html`

### Add a Reusable Component
1. Create `src/components/MyComponent.astro`
2. Define Props interface at the top
3. Import in pages as needed

### Update Styling Site-Wide
Edit `src/styles/global.css` only. Use design tokens; avoid adding page-specific styles.

### Update Supporter Logos
Replace files in `public/images/supporters/` or update URLs in `src/lib/images.ts`.

### Update Space Background Photos
Edit URLs in `src/lib/images.ts` (don't hardcode in components).

## Deployment

1. Run `npm run build` (outputs to `csdcms-built/`)
2. Deploy the `csdcms-built/` folder to static hosting (GitHub Pages, Netlify, etc.)
3. The old `contact.html` and `index.html` in the root are from a previous build—ignore them

## Known Quirks & Gotchas

- **No package lock file** — `npm install` may cause version drift; consider committing `package-lock.json`
- **Mobile menu requires JavaScript** — no progressive enhancement; menu is non-functional without JS
- **External logo** (CSDCMS mark) hotlinked from `csdcms.ca` — not bundled locally
- **No linting/formatting tools** — rely on editor defaults; consider adding Prettier + ESLint if team grows
- **Global CSS only** — all styling changes go in one file; keep utility classes organized and documented

## Getting Started as an AI Agent

When assigned a task in this repo:

1. ✅ Assume Astro file-based routing: files in `src/pages/` auto-route to HTML
2. ✅ All styling uses global design tokens (`--signal`, `--exhaust`, `--sp-*`)
3. ✅ Images centralized in `src/lib/images.ts`—never hardcode URLs
4. ✅ Use `BgPhoto`, `Header`, `Footer` components instead of reinventing them
5. ✅ Build outputs to `csdcms-built/`—that's the deployment folder
6. ✅ Run `npm run build` to generate static output
7. ✅ Keep JavaScript minimal—vanilla JS only, no framework

## Questions?

Consult [README.md](README.md) for project context and design decisions. Explore `src/` to see examples of existing pages and components.
