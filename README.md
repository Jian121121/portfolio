# Portfolio

A dark, code-editor-themed portfolio built with React, Tailwind CSS, and Framer Motion.
Sections: hero, about, skills, projects, experience, contact — each styled like part of
an editor (file tabs for nav, a typed-out object for the hero, a git-log for projects,
a commit-line timeline for experience).

## Setup

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

## Make it yours

Almost everything you need to change lives in **`src/data/content.js`**:

- `profile` — name, role, location, tagline, email, GitHub/LinkedIn links
- `about` — your intro paragraph
- `skills` — grouped skill categories and tags
- `projects` — name, description, tech, link, year
- `experience` — jobs / education, in reverse-chronological order

Drop a `resume.pdf` into `public/` if you want the resume link to work.

## Customizing look and feel

- Colors: `tailwind.config.js` → `theme.extend.colors` (canvas/surface = backgrounds,
  keyword/string/func/warn = accent colors used like syntax highlighting)
- Fonts: currently JetBrains Mono + Inter, loaded via Google Fonts in `index.html`
- Section order: reorder the components in `src/App.jsx`
- Hero typing effect: `src/components/Hero.jsx` (the `lines` array)

## Build for production

```bash
npm run build
```

Outputs static files to `dist/` — deploy that folder to Vercel, Netlify, GitHub Pages,
or any static host.

## Deploying to Vercel (matches the reference site)

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Framework preset: Vite (auto-detected) — no config needed
4. Deploy
