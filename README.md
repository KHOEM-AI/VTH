# VTH

Personal learning portfolio of **Khoem Soksivutha** — built with React + Vite + TypeScript, deployed to GitHub Pages.

## Structure

```
VTH/
├── .github/workflows/deploy.yml   ← auto-deploy on push to main
└── khoem-now/                     ← the actual website project
    ├── src/
    │   ├── App.tsx                ← main page (certificate gallery)
    │   ├── App.css
    │   ├── main.tsx
    │   ├── index.css
    │   └── components/ZoomTool.tsx
    ├── public/certificates/       ← certificate images
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── .gitignore
```

## Run locally

```
cd khoem-now
npm install
npm run dev
```

## Deploy

Push to `main` — GitHub Actions builds and publishes automatically to GitHub Pages.
Enable it once under **Settings → Pages → Source → GitHub Actions**.

Live at: `https://khoem-ai.github.io/VTH/`
