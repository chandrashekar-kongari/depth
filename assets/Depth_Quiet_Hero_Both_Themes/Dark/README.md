# Depth — Quiet Product Hero

A refined, understated homepage animation built to support the headline, not compete with it. Inspired by the design principles of focused product interfaces: quiet surfaces, readable engineering content and purposeful motion. This is an original design, not a copy of Linear or Apple.

## Contents

- `video/depth-quiet-hero.webm` — VP9 optimized, 1920 × 1080, 24fps, 13 seconds, silent.
- `video/depth-quiet-hero.mp4` — H.264 fallback, 1920 × 1080, 24fps, 13 seconds, silent.
- `preview/depth-hero-poster.png` — static fallback/poster.
- `preview/storyboard.png` — five storyboard frames.
- `index.html` — source animation in pure HTML / CSS / SVG / JS. Can be opened locally. No external assets or dependencies.
- `source/render.py` — reproducible video exporter (requires Chromium, Playwright and FFmpeg).
- `integration/DepthQuietHero.tsx` — React/Next.js video snippet (Tailwind classes).
- `integration/vanilla.html` — plain HTML/CSS snippet with reduced-motion fallback.

## Design rationale

The video communicates one thing: **compare engineering revisions and see what needs attention**.

- One main drawing instead of multiple panels and fake dashboards.
- No neon scan beams, particle effects or stock 3D illustrations.
- Realistic-looking sheet, dimensions and callouts.
- Three explicit review outcomes: two resolved, one still needs attention.
- Neutral base palette with teal reserved for confirmed work and amber reserved for a remaining issue.
- Slow, subtle transitions so people can actually read what changes.
- Quiet margin around a single product window so it can sit below a hero headline.

## Put on the Depth marketing site

Place the WebM, MP4 and PNG poster in your `public/depth-hero/` folder. Integrate the provided React or vanilla HTML snippet in the homepage hero media slot, below your actual HTML H1 and product statement. Do not burn marketing copy into the video. For reduced-motion visitors, show the poster instead.

**Product status:** This animation is an illustrative product concept using scripted review outcomes. It is not a functioning AI drawing reviewer and does not claim released capabilities or security certifications. Product status should also be clear in the surrounding page copy.
