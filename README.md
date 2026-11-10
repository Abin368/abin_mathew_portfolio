# Abin Mathew — Minimal Monochrome Portfolio

A minimal, high-contrast, strictly black-and-white portfolio website built with React and Vite.

## Features

- **Strictly Black & White**: Pure monochrome visual language with Swiss-inspired typography, hairline borders, and zero chromatic noise.
- **Interactive Monochrome Theme Toggle**: Instant switch between Dark Monochrome (`#000000`) and Light Monochrome (`#ffffff`), saved to `localStorage`.
- **Black-and-White Portrait**: Displays your provided portrait photo (`public/abin_mathew.png`) with strict black-and-white tone-mapping and framing.
- **Structured Sections**:
  - **Hero**: Clean introduction with availability badge and dual CTAs.
  - **01 / Selected Work**: Minimal project cards with hover-lift and outbound link indicators.
  - **02 / Skills & Stack**: Categorized into Frontend, Backend & APIs, and Tools & Workflow.
  - **03 / Philosophy**: Personal statement, design values, and key highlights.
  - **04 / Contact**: Large headline, one-click copy email button, and social media links.
- **Fully Responsive**: Optimized for ultra-wide monitors, laptops, tablets, and mobile devices.

## Personalize Your Information

All content is centralized in [`src/content.js`](src/content.js). You can edit:
- Name, title, location, and bio
- Email and social media links
- Skills lists
- Projects (titles, descriptions, tags, and URLs)

## Development

Run locally:

```powershell
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build for Production

```powershell
npm run build
```

The production output will be generated in `dist/`.
