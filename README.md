# Shattered Realms — Soulslike Cinematic Scroll Prototype

A cinematic Soulslike-inspired scrolling web experience built as a fast prototype with **Vite**, **TypeScript**, and **GSAP / ScrollTrigger**.

**Live prototype:** https://shattered-realms-vite.onrender.com

## What it includes

- Seven distinct world / region transitions
- Persistent foreground traveler silhouette
- GSAP-powered scroll choreography
- Parallax environment layers
- Particle fields and atmospheric motion
- Chapter / progress tracking
- Loop-style ending that visually returns toward the opening
- Responsive behavior and reduced-motion support

## Stack

- Vite
- TypeScript
- GSAP + ScrollTrigger
- CSS
- Render Static Site

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The production output is generated in `dist/`.

## Deployment

Render builds from the `main` branch with:

```bash
npm install && npm run build
```

and publishes `dist/`.

**Live:** https://shattered-realms-vite.onrender.com
