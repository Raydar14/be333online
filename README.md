# BE333 — static site

A hand-built static version of **be333.online**, ready for GitHub Pages.
Calm meditation brand: *Pause. Breathe. Be. — three minutes, three times a day, three weeks.*

## Files

```
be333/
├── index.html        ← home (must stay named index.html — see note below)
├── research.html     ← the research behind BE333
├── download.html     ← get the app + notify form
├── css/style.css     ← all styling + design tokens (:root)
├── js/script.js      ← injects the shared header/footer, mobile nav, scroll reveals
├── assets/
│   └── favicon.svg   ← lotus mark (used for the logo and the browser tab)
├── CNAME             ← be333.online
├── .nojekyll         ← tells GitHub Pages to serve files as-is
└── README.md         ← this file
```

The header and footer are **not** copied into each page — `js/script.js` builds them
once and injects them, so edit the nav or footer in that one file.

## Three things to fill in before launch

1. **Formspree form ID** — in `download.html`, replace `YOUR_FORM_ID` in the form
   `action` with your real Formspree ID (e.g. `https://formspree.io/f/abcdwxyz`).
2. **App store links** — in `download.html`, replace the two `href="#"` on the
   App Store / Google Play buttons once you have store URLs.
3. **Social links** — in `js/script.js` (the footer block), replace the three
   `href="#"` for Bluesky, Goodreads, and Reddit.

Optional: add `assets/favicon.png` (a 180×180 PNG lotus) for the Apple touch icon,
and `assets/og-image.png` (1200×630) for nicer link previews. The site works without them.

## Deploy to GitHub Pages

1. Create a repo and put **these files at the repo root** (not inside a subfolder).
2. Push them up:
   ```bash
   git init
   git add .
   git commit -m "BE333 static site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/be333.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
4. **Custom domain:** the `CNAME` file already says `be333.online`. In GoDaddy DNS, point the
   domain at GitHub Pages — four A records for the apex and a CNAME for `www`:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  YOUR_USERNAME.github.io
   ```
   Then tick **Enforce HTTPS** in Settings → Pages once the cert is issued.

### Important: don't let it serve the README

If GitHub Pages ever shows this README instead of the site, it means it can't find
`index.html` at the root. Make sure `index.html` sits at the **top level** of the repo
(or of the `/docs` folder if you choose that as the source) — not nested in a subfolder.
The `.nojekyll` file is included to keep Pages from doing anything clever with the files.

## What changed from the WordPress version

- Rebuilt as 3 lightweight static pages (no WordPress, no plugins, no comment forms).
- New calm lavender/lotus design; Fraunces + Hanken Grotesk type.
- Hero is a live **breathing guide** that demonstrates a session.
- Copy tightened and grammar fixed throughout.
- Research page restructured; the broken empty-column summary table rebuilt.
- Download page turned from a near-empty stub into a real page.
- Lotus logo + favicon are inline SVG, so nothing depends on the old WordPress image URLs.
