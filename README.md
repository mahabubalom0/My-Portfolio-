# Mahabub Alam — Portfolio

Flutter Developer & Graphics Designer portfolio. Plain HTML/CSS/JS, wired up
with Vite for local dev and a proper build step.

## Project structure

```
.
├── index.html          # entry HTML (references src/style.css + src/main.js)
├── package.json
├── src/
│   ├── style.css        # all styling
│   └── main.js          # JS entry point
└── assets/
    └── images/           # put project screenshots here (see README inside)
```

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Output goes to `dist/` — upload that folder's contents to any static host
(Netlify, Vercel, InfinityFree, etc.).

## Adding project screenshots

See `assets/images/README.md` for exact steps to swap the emoji placeholders
in the "My Projects" section with real screenshots.
