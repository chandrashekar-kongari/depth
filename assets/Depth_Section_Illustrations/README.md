# Depth — Website Section Illustrations

This package contains *section illustrations only*, not a redesign of the Depth marketing page. The assets are inspired by Mintlify's restrained product-marketing art direction and adapted for mechanical engineering, drawing workflows, and customer-controlled deployment. All imagery is original to Depth.

## Files

- `svg/dark/` — editable vector illustrations on dark matching background (1200 × 800 viewBox)
- `svg/light/` — editable vector illustrations on light matching background (1200 × 800 viewBox)
- `png/dark/` and `png/light/` — high-resolution 2400 × 1600 PNG exports
- `preview/` — overview sheet of all 9 illustrated sections
- `manifest.json` — file names, mapping, and descriptions
- `extras/` — optional high-resolution transparent AI-rendered floating CAD plate artwork

Each illustration is designed to sit beside or above HTML copy, rather than containing your page headlines. The SVG is the recommended format for websites.

## Section mapping
- **Drawing Review Queue:** `01-drawing-review-queue.svg` — Queue section; use as illustration above or beside your product text.
- **Drawing Details:** `02-drawing-details.svg` — Detailed mechanical CAD sheet for the Drawing Details section.
- **Who Can Review:** `03-reviewer-workflow.svg` — Assigned reviewers and review state artwork.
- **Revision History:** `04-revision-history.svg` — Stacked revisions and revision timeline artwork.
- **Review Status:** `05-review-status.svg` — Review states and progress visualization.
- **Deployment & Data Control:** `06-private-deployment.svg` — Customer-controlled environment boundary with local components.
- **AI Drawing Review:** `07-ai-drawing-review.svg` — Illustrative future AI-assisted issue detection and verification.
- **3D-to-2D Drawing:** `08-3d-to-2d.svg` — Illustrative planned 3D model to 2D drawing workflow.
- **Private Drawing Storage:** `09-private-drawing-storage.svg` — Optional IP protection and secure file storage illustration.

## Drop into Cursor / React

1. Copy `svg/` to your website's `public/illustrations/` folder.
2. Use your existing section components, text, spacing, and typography. Only replace the illustration artwork.
3. Use the dark or light SVG based on your theme. Example JSX:

```jsx
<picture>
  <source media="(prefers-color-scheme: dark)" srcSet="/illustrations/dark/06-private-deployment.svg" />
  <img src="/illustrations/light/06-private-deployment.svg"
       alt="Diagram of Depth inside a customer-controlled environment"
       width="1200" height="800" loading="lazy"
       style={{width: '100%', height: 'auto', borderRadius: 20}} />
</picture>
```

If your site has a manual theme toggle, choose a file path using the same theme state rather than `prefers-color-scheme`.

## Content and security accuracy

These visuals are **illustrative concepts**, not proof of shipped product capabilities. The review queue is the pilot focus; AI checking and 3D-to-2D generation are planned. The private-deployment illustration expresses the intended architecture, not a completed compliance certification or verified no-egress guarantee. Keep corresponding copy qualified until product implementation and customer tests confirm it.

## Design system

- Accent: mint-teal (#16E3BA dark; #009D82 light)
- Backgrounds: #0B1011 dark, #F6F9F8 light
- Thin engineering linework, restrained gradients, no embedded marketing headlines
- Inter for tiny illustrative UI labels, DejaVu Sans Mono for drawing annotations

Source generator: `build.py`; can be rerun with Python + cairosvg + Pillow.
