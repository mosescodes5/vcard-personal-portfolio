# Moses Oluwasekan — Portfolio (React + Vite)

React rebuild of the portfolio. Same content as the HTML version — About,
Resume (including Rynts), Portfolio (Evenova, Taiwo, Rynts, and the rest),
Contact — same purple/pink identity, now as components instead of one big
HTML file.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173). **Always use this —
never open dist/index.html directly by double-clicking it.** Opening files
via `file://` breaks module scripts in every browser; that was very likely
the cause of "nothing happens when I click Resume" in the old HTML version.

## Build for production

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Push this folder to a GitHub repo (a fresh one, or replace the old
   HTML repo's contents with this).
2. Import the repo on vercel.com.
3. Vercel will auto-detect **Vite** as the framework — let it. This is the
   opposite of the earlier issue: the old HTML repo had a Vite build
   silently running against plain static files, corrupting asset paths.
   Here it's supposed to run Vite, so there's no mismatch.
4. No build command / output directory overrides needed — Vercel's Vite
   preset handles both automatically.

## Project structure

```
src/
  components/     — Sidebar, Navbar, About, Resume, Portfolio, Contact
  data/
    projects.js   — every project: title, link, category, image import
  assets/images/  — avatar, icons, logos, project thumbnails
  style.css       — same stylesheet as the HTML version (purple theme)
```

## Adding or editing a project

Edit `src/data/projects.js` — add an entry with a `title`, `link`,
`category`, and an imported `image`. The grid and filters pick it up
automatically, no HTML editing required.
