# CSDCMS Website — Astro Rebuild

This is the rebuilt CSDCMS site, built with the **Astro** framework, in a
"deep space" visual theme (dark surfaces, real space photography,
orbital-mechanics hero graphic, signal-cyan + exhaust-orange accents).

## Latest round of changes

- **Real supporter logos** — the six "Mission Partners" logos (BC Hydro,
  Calian, MDA Space, the Trottier Family Foundation, Telesat, and the
  Canadian Space Society) are now the actual brand files you provided,
  bundled into the project at `public/images/supporters/` rather than
  hotlinked. They're shown full-colour on small white cards (logos are
  designed for light backgrounds, so this keeps every one of them
  legible against the dark theme) on both the home page and the Contact
  page.
- **A real CanSat photo** — the 2022 winning team's flight unit is now a
  featured, clearly-visible photo (not a blurred background) next to the
  "A real science instrument. A real flight." copy on the home page, with
  a caption crediting the team. This replaces a paragraph that previously
  had no visual at all.
- **Hero image is now Earth from space** — the home-page hero background
  is *The Blue Marble* (Apollo 17, 1972) instead of the Pillars of
  Creation, per your request.
- **Pillars of Creation moved** — it's now the background of the "why it
  matters" mission-statement section further down the home page, instead
  of sitting behind the hero.
- **More background imagery on the home page** — the "Two ways to fly"
  category section now has the Andromeda Galaxy as an ambient background
  (the two category cards keep their own solid background, so the photo
  shows through around and behind them).
- **Register page now uses a different photo** (Aurora Australis from the
  ISS) instead of reusing Blue Marble, since Blue Marble moved to the
  home hero and repeating the exact same photo across two pages felt
  redundant.

## Where every image is used now

| Page | Background photo |
|---|---|
| Home — hero | The Blue Marble (Earth, Apollo 17) |
| Home — "Two ways to fly" | Andromeda Galaxy (ambient, behind the cards) |
| Home — mission statement band | Pillars of Creation |
| Home — "A real science instrument" | **Real CanSat photo** (foreground, not background) |
| Home / Contact — Mission Partners | **Real supporter logos** |
| Challenge — header | Cosmic Cliffs, Carina Nebula (Webb) |
| Challenge — "Launch day" band | Falcon 9 liftoff |
| Register — header | Aurora Australis (ISS) |
| Resources — header | Falcon 9 liftoff |
| Board — header | Andromeda Galaxy |
| Contact — header | Deep-space star texture |

## Folder structure

```
csdcms-astro/        ← Astro source project (edit this)
  public/
    images/
      cansat-2022-winners.webp   ← real CanSat hardware photo
      supporters/                ← real partner logo files
  src/
    components/       Header, Footer, Starfield, BgPhoto
    layouts/           Layout.astro — shared <head>, nav, footer, scripts
    lib/               images.ts — all photo URLs/paths + credits, in one place
    pages/             index, challenge, register, resources, board, contact
    styles/            global.css — the entire design system
  astro.config.mjs
  package.json

csdcms-built/         ← Pre-built static HTML + images (ready to upload as-is)
  index.html, challenge.html, register.html, resources.html,
  board.html, contact.html
  images/              same local image assets, already copied alongside the HTML
```

## To preview or edit the source project

```bash
cd csdcms-astro
npm install
npm run dev        # http://localhost:4321
```

## To build it yourself

```bash
npm run build       # outputs to csdcms-astro/dist/
```

## Deploying

The **`csdcms-built/`** folder is ready to upload to any static host —
upload the whole folder, including the `images/` subfolder, so the local
logo and CanSat photos travel with the HTML. Internal links are
root-relative (`/challenge`, `/images/...`, etc.), so this only works
correctly when the folder is served from the root of a domain (any
static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your
existing web host) rather than opened directly as a local file.

The Wikimedia-hosted space photography and the YouTube embeds will only
render once the site is actually online — they (like the csdcms.ca photo
links) can't load from a fully offline machine.

## Notes

- All page content (bios, tutorial descriptions, etc.) is in
  `src/pages/*.astro` as plain data — easy to edit without touching CSS.
- `src/lib/images.ts` is the single place to swap any photo or logo — it
  exports `SPACE_PHOTOS` (Wikimedia URLs), `SUPPORTER_LOGOS` (local
  partner logos), and `CANSAT_PHOTO` (the real hardware photo).
- To add or replace a supporter logo: drop the file into
  `public/images/supporters/` and add an entry to the `SUPPORTER_LOGOS`
  array in `images.ts`.
- The starfield is generated at build time with a fixed seed, so it's
  identical on every build (not random per visitor).
