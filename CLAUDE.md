# CSDCMS CanSat Website

Static marketing/informational site for the CanSat Design Challenge, run by the Canadian Satellite Design Challenge Management Society (CSDCMS). Built with **Astro 4** using the Cloudflare adapter. No frontend framework — vanilla JS only, all styling in one global CSS file.

## Commands

All commands run from `csdcms-astro/`:

```bash
npm run dev      # Dev server on http://localhost:4321 (hot reload)
npm run build    # Build to csdcms-astro/dist/
npm run preview  # Build + wrangler dev (local Cloudflare preview)
npm run deploy   # Build + wrangler deploy (Cloudflare Workers)
```

**Important:** the build outputs to `csdcms-astro/dist/` (Cloudflare adapter, `output: "hybrid"` in astro.config.mjs). The `csdcms-built/` folder and the root `index.html`/`contact.html` are stale snapshots from an older setup — never edit them and never treat them as the deploy target.

## Directory structure

```
csdcms-astro/
├── src/
│   ├── pages/            # File-based routing: index, challenge, register, resources, board, contact
│   ├── components/
│   │   ├── Header.astro     # Nav; takes currentPage prop for active-link styling
│   │   ├── Footer.astro     # Footer + photo credits
│   │   ├── BgPhoto.astro    # Background photo w/ gradient overlay (variants: hero, header, band)
│   │   └── Starfield.astro  # Fixed canvas starfield: 3 parallax layers, twinkle, pointer drift
│   ├── layouts/Layout.astro # Single wrapper: meta, fonts, and ALL page JS (nav, reveals, hero, glow)
│   ├── lib/images.ts        # All image constants: space photo URLs, supporter logos, credits
│   └── styles/global.css    # The entire design system — no scoped/component CSS
└── public/images/           # Local assets (CanSat photo, supporter logos)
```

## Design system (`src/styles/global.css`)

Theme: deep space — dark layered surfaces, real NASA/ESA photography, cyan + blue accents.

- **Surfaces:** `--void`, `--deep`, `--cosmos`, `--nebula`, `--horizon` (darkest → lightest), applied via `.s-*` section classes
- **Accents:** `--signal` (cyan), `--exhaust` (blue); text: `--star`, `--star-soft`, `--star-dim`; lines: `--line`, `--line-bright`
- **Type:** `--f-display` (Big Shoulders Display, uppercase headings), `--f-body` (Archivo), `--f-mono` (JetBrains Mono, labels/buttons)
- **Spacing:** `--sp-1`…`--sp-9` (4–96px); easing token `--ease-out`
- **Key patterns:** `.container`, `.section`/`.section--sm`, `.card`, `.cat-card`, `.tag--*` (small bordered labels), `.spec-list`, `.numbered-list`, `.timeline`, `.compare`, `.links-strip`, `.btn--primary/--ghost/--signal`
- **Utilities:** `.lead`, `.mt-*`/`.mb-*`, `.cta-row`, `.split-row`, `.center-col`, `.grid-2/-3/-2-wide`

Style rules:
- All styling goes in `global.css` using the tokens — no Tailwind, no scoped styles, avoid inline `style=""`
- Fluid type via `clamp()`; responsive breakpoints at 1024/860/560px
- Never hardcode image URLs in pages — import from `src/lib/images.ts`
- Use `BgPhoto` for background photography, never raw `<img>` backgrounds

## Interactivity & animation

All page JS lives in one inline script in `Layout.astro`. Progressive enhancement is load-bearing:

- A head script adds the `js` class to `<html>`. Enhanced layouts (scroll-story hero, flight path, reveals) are gated behind `html.js` **and** `@media (prefers-reduced-motion: no-preference)`. Without JS or with reduced motion, the homepage hero collapses to a single static screen — keep that fallback working.
- **Hero (homepage):** 260svh pinned scroll story. Scroll sets a target; a rAF loop lerps `--hero-headline-exit` / `--hero-mission-enter` CSS vars for fluid crossfades. No `filter: blur()` in scene transitions (perf).
- **Reveals:** add `.reveal` to any element; IntersectionObserver adds `.visible` with a small stagger per batch.
- **Card glow:** one delegated `pointermove` listener sets `--mx`/`--my` on `.card/.cat-card/.video-card/.crew-card`; a radial-gradient `::after` follows the cursor.
- **Flight path:** `.flightpath` inside the homepage `.page-flow` wrapper — dashed margin line + CanSat marker driven by the `--fp-progress` var (desktop ≥1100px only).
- **Flight animations (hero SVG + card icons):** pure CSS keyframes with physically-ordered phases — freefall (accelerating) → chute pop w/ overshoot + deceleration → slow swaying descent → landing pulse. Keep the physics order if retiming.
- Keep JS vanilla and minimal; guard hover effects with `@media (hover: hover)`.

## Content & tone

- Voice: plain, confident, specific — written like the engineer who runs the program. Avoid hype ("real/actual" repetition, unattributed quotes, faux mission-control props like status LEDs or "Log 01" captions). These were deliberately removed in the 2026-07 redesign; don't reintroduce them.
- Facts that must stay exact: CanSat ≈66 mm × 115 mm; Beginner = drone drop ~120 m, free kit, SD-card data; Advanced = sounding rocket 1 km+ at Lethbridge AB, live RF telemetry, top team → ESA CanSat (Netherlands); charity #806534806 RR0001; contact info@csdcms.ca / +1 778-988-6343.
- Space photos are Wikimedia Commons hotlinks (public domain / CC BY 4.0), credited in the footer. Update URLs only in `images.ts` and keep `PHOTO_CREDITS` in sync.

## Gotchas

- `html { scroll-behavior: smooth }` — programmatic scrolling (tests, screenshots) must use `behavior: 'instant'` or the reveal observer misses sections.
- The CSDCMS logo and some photos/PDFs are hotlinked from `www.csdcms.ca` — not bundled locally.
- Video embeds on /resources are YouTube iframes; titles may contain HTML entities and render via `set:html`.
- No linter/formatter configured; match existing formatting by hand.

## Verifying changes

1. `npm run dev`, check all six pages at `localhost:4321`.
2. Check both hero modes: normal scroll (smooth crossfade) and reduced-motion emulation (static single screen, everything visible).
3. Check mobile (~375px) and the 860px breakpoint (nav collapses to hamburger).
4. `npm run build` must complete cleanly.
