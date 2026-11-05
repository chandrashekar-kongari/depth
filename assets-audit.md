# Mintlify homepage asset audit

Recorded 5 November 2026 from https://www.mintlify.com/. Public URLs are listed so the reference can be checked. None of these files are copied into the Depth site. A public URL is not permission to reuse the artwork.

| Asset | Section | Source | Type | Intrinsic / display | Behavior | Permission | Depth replacement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wordmark | Header, footer, product preview | Inline logo, about `104×24` displayed | SVG | Displayed at 24px tall | Static | Mintlify trademark | Original Depth sheet mark and wordmark |
| Hero line-field | Hero, also echoed in lower bands | In-page canvas, full hero (`1440×992` at the desktop hero) | Canvas | Fills the hero | Slow drifting curves, green to yellow-green | Original Mintlify motion graphic | Original canvas line-field in the same role |
| Docs preview, light | Hero product | `https://www.mintlify.com/images/docs-preview/preview-light.svg` | SVG | Intrinsic `1080×656`; displayed about `1055×641` and cropped on the right | Static artwork inside a framed product surface | Mintlify product illustration | Original drawing-review surface, labeled “Illustrative concept” |
| Docs preview, dark | Hero product | `https://www.mintlify.com/images/docs-preview/preview-dark.svg` | SVG | Intrinsic `1080×656` | Swapped in dark theme | Mintlify product illustration | Same original surface, themed |
| Customer logos | Logo wall | `https://www.mintlify.com/images/customer-stories/*-light.svg` and `*-dark.svg` (Anthropic, Amazon, Cognition, Solana, AT&T, and others) | SVG | Small lockups, roughly 20–29px tall | Static, theme-swapped | Third-party trademarks | Not used. No replacement logos |
| Feature-card scenes | “One platform” bento | Six canvases, card interiors about `695×410` and `339×410` | Canvas | Displayed near the card artboard | Ambient motion inside `12px` panels | Mintlify product graphics | Original queue, status, geometry, reviewer, revision, and sheet scenes |
| Enterprise / scale graphics | Story and scale bands | Canvases about `536×472` and full-bleed `1440×504` | Canvas | Section backgrounds | Ambient | Mintlify | Not used. Deployment uses an original boundary diagram |
| Startup story photos | Startup band | `https://www.mintlify.com/_next/image?url=%2Fnew%2Fstartups%2F{lovable,kalshi,decagon,replit,perplexity,polymarket,harvey}.webp` and `*-dark.webp` | WebP via Next image | Displayed about `341×390` | Static, theme-swapped | Mintlify / customer imagery | Three original technical illustrations at a similar card proportion |
| Testimonial and blog media | Lower page | Page content and post cards | Mixed | Not reused | Marquee, links | Mintlify editorial | Omitted. No quotes or posts exist for Depth |
| UI icons | Nav, FAQ, buttons, theme, social | Inline SVG | SVG | 16px class icons | Hover and expand | Mintlify UI icons | Simple original chevrons and a menu icon |
| Arizona Flare | Hero H1, closing H2 | `arizonaFlare` family loaded by the site | Commercial webfont | 50px hero, 36px closing | Static | Commercial, not licensed for Depth | Instrument Serif, SIL Open Font License, via `next/font` |
| Inter | Body, UI, section headlines | `inter` family | Font | 14–36px | Static | SIL Open Font License | Inter via `next/font` |
| Paper Mono | Small technical labels | `paperMono` family | Commercial webfont | Labels | Static | Commercial, not licensed for Depth | Not used |
| Geist Mono | Mono UI | `Geist Mono` family | Font | Labels | Static | SIL Open Font License | Geist Mono via `next/font` |

## Rules applied

- Mintlify trademarks, product screenshots, customer logos, photographs, and canvases are reference-only.
- Depth product pictures are drawn as HTML and SVG for this site. They are labeled “Illustrative concept” and are not screenshots of a released application.
- No stock illustration set is used.
- The line-field is a new canvas sketch with the same job as the reference: thin curves, brand green, behind the product, slower than the reading.
