# Moses Oluwasekan — Portfolio (React)

A React (Vite) rebuild of the personal portfolio, converted from the original
static vCard template. Same sections (About, Resume, Portfolio, Contact),
same purple/pink visual identity, now as reusable components.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

The static output lands in `dist/` — deploy that folder anywhere (Vercel,
Netlify, GitHub Pages, etc). For Vercel specifically, just import this repo
directly; it auto-detects Vite and needs no config.

## Project structure

```
src/
  components/
    Sidebar.jsx      — avatar, contact info, socials
    Navbar.jsx       — About / Resume / Portfolio / Contact tabs
    About.jsx        — summary, services, skill bars
    Resume.jsx       — education, experience timeline, certifications
    Portfolio.jsx    — filterable project grid
    Contact.jsx      — contact form (mailto fallback, no backend wired up)
  data/
    projects.js      — all project entries (title, link, category, image)
  assets/images/     — avatar, icons, logos (local files)
  style.css          — full stylesheet, unchanged from the original template
```

## About the project images

`src/data/projects.js` currently points each project thumbnail at
Picsum (https://picsum.photos) — a free, no-API-key stock photo service —
using a different seed per project so each card looks distinct. These are
**generic placeholder photos, not real screenshots** of your sites (this
environment can't capture live screenshots automatically).

To swap in the real thing for any project:

1. Take a screenshot of the live site (or export one from your design tool).
2. Drop the image file into `src/assets/images/`.
3. In `src/data/projects.js`, import it and replace that project's `image`
   value, e.g.:

   ```js
   import evenovaShot from "../assets/images/evenova-screenshot.png";
   // ...
   { id: "evenova", ..., image: evenovaShot }
   ```

This will always look better than any stock photo or mockup — worth doing
for at least Evenova and Taiwo's site since those are your strongest,
realest work.

## Adding a new project

Just add an entry to the `projects` array in `src/data/projects.js` — the
grid and filters pick it up automatically.
