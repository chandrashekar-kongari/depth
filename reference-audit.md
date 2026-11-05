# Mintlify homepage reference audit

Inspected https://www.mintlify.com/ on 5 November 2026 in a real browser. Styles below are computed values, not estimates from memory. Viewports were set with Chrome device metrics: 1440×900, 1920×1080, and 390×844.

The live site is one system with two themes. With the page forced to `light`, the canvas is warm white and the brand green is deep. With `dark` (also the system theme in this browser), the same layout uses a near-black ground and a brighter green. Light is the primary Depth target. Dark is the same token set inverted.

Playwright is used later to re-measure the Depth build against these numbers. The figures in this file come from the live page’s computed style, because that is the precise source.

## Global

| Token | Light | Dark |
| --- | --- | --- |
| Page background | `#ffffff` (`--color-background-main` resolves to white; `--color-background-primary` is `#fefdfb`) | `#08090a` |
| Secondary surface | `#faf8f5` | `#111216` |
| Card surface | `#f9f6f3` (feature cards use a near-white warm fill; dark cards are `#0f0f12`) | `#0f0f12` |
| Text | `#121715` | `#faf8f5` |
| Soft text | about 60% of the text color | `rgba(255,255,255,.6)` |
| Muted label | `#969e9b` | `#969e9b` |
| Brand | `#0c8c5e` | `#18e299` |
| Brand vivid | `#1fa77a` | `#1fa77a` |
| Hairline | `#f1f0ee` | `#1e1f21` |
| Border | `rgba(0,0,0,.04)` to `.08` | `rgba(255,255,255,.07)` to `.08` |

- Body font: Inter.
- Hero and closing line: Arizona Flare, a commercial flared serif. Weight 400 on the hero, 500 on the closing line.
- Mono labels: Paper Mono and Geist Mono. Paper Mono is commercial.
- Content grid: 24 columns, `1088px` wide, `16px` column gap.
- At 1440 the grid starts at x = 176. At 1920 it stays `1088px` and starts at x = 416. Type sizes do not change between those two desktop widths.
- Spacing unit: `0.25rem`.
- Button radius: `4px`. Feature-card radius: `12px`. No measured button shadow.
- Motion observed: a canvas line-field drifts behind the hero and the closing band; header nav is a centered cluster; FAQ rows expand; carousels and a testimonial marquee move. The motion is slow and small.

## Header

- Height `65px`, full viewport width, page background.
- Inner bar is the `1088px` content width.
- Wordmark at x = 176, y = 20, about `104×24`.
- Links are 14px Inter medium, inside the content bar, visually centered in the viewport: Products, Solutions, Resources, Pricing.
- Right side: ghost “Sign in” and solid “Contact sales”.
- Both header buttons are `34px` tall, 14px / 16px, weight 500, padding `8px 14px`, radius `4px`.
- Light solid button: fill `#121715`, text `#faf8f5`. Light ghost button: transparent with a hairline.
- Dark solid button: white fill, near-black text. Dark ghost: transparent, white text, white border at 7% opacity.
- At 390 the desktop links collapse. An “Open menu” button replaces them. Page gutters become `16px`. The mobile header’s box size did not return a reliable height in the same query (the measured header node was `0×0` while the menu button was present). Treat the mobile bar as the same 65px system until a later capture shows otherwise.

## Hero

Section height `992px` on desktop (starts below the header) and `797px` at 390.

Desktop, 1440 and 1920:

- Status pill at x = 176, y = 145. Height `34px`, radius `2px`, padding `4px 4px 4px 10px`, 1px border at about 7% contrast. It shows a live “Agent traffic” figure. That figure is Mintlify-specific and must not be copied as a fake Depth metric.
- Headline at x = 176, y = 195. Width `352px`, height `156px` (three lines). Arizona Flare, `50px` / `52px`, weight 400, tracking `-2px`, color is the main text color.
- Supporting copy directly under it, same `352px` column, Inter `18px` / `24px`, weight 400, 60% contrast. A few words are full contrast.
- Gap from the pill to the headline is about `16px`. Gap from the headline to the copy is about `16px`. Gap from the copy to the buttons is about `32px`.
- Primary button “Get started” at x = 176, y = 447, `125×42`, radius `4px`, 14px medium. Padding is slightly heavier on the left (`12px 12px 12px 16px`) because of the trailing chevron.
- Secondary button sits `8px` to its right, `186×42`, bordered, same type.
- A product surface enters from the right and is cropped by the viewport. A green and yellow-green line-field sits behind that surface, denser toward the right and lower half, and does not cover the headline.
- Hero section class includes `overflow-x-clip`.

Mobile, 390:

- Gutters `16px`. Headline x = 16, width `358px`.
- Headline size drops to `40px` / `44px`, tracking `-0.8px`.
- Supporting copy stays `18px` / `24px` and uses the same width as the headline.
- The two buttons stay on one row (y = 366), still `42px` tall.
- The first section headline in the next band drops to `20px`. That band is the logo introduction, which Depth does not reproduce.

## Sections present on the live page

Offsets at desktop. Heights include the section’s own padding and media.

| Order | Heading | Top | Height |
| --- | --- | --- | --- |
| 1 | The intelligent documentation platform | 65 | 992 |
| 2 | Join 20,000+ of the world’s most ambitious companies… | 1057 | 608 |
| 3 | One platform for your entire knowledge stack. | 1665 | 1660 |
| 4 | Powering businesses of all sizes. | 3325 | 864 |
| 5 | Built to scale with the agent web. | 4189 | 853 |
| 6 | Enabling the next generation of startups. | 5042 | 906 |
| 7 | Trusted by teams building for agents. | 5948 | 883 |
| 8 | Latest updates | 6831 | 766 |
| 9 | The knowledge platform built for agents | 7597 | 139 |
| 10 | Frequently Asked Questions | 7736 | 817 |

Footer starts near y = 8553 and is about `677px` tall, with `104px` padding on top.

Section headlines for the product bands are Inter `36px` / `40px`, weight 500, tracking `-0.72px`, color `#faf8f5` in dark and `#121715` in light, and about `664px` wide. The two sentences in each headline share that style. The FAQ title is Inter `32px` / `40px`, tracking `-0.64px`, weight 500. The closing line is Arizona Flare `36px` / `40px`, weight 500, tracking `-0.72px`, width about `599px`, sharing a `139px` band with the two buttons on the right.

### Feature bento

Six articles. Radius `12px`, padding `32px`, border `1px solid` at about 7% white in dark, background `#0f0f12` in dark and a warm off-white in light. Row height `412px` on desktop. Widths inside the content column: about `697 + 341`, then three `341`, then one `1054`. Gap is `16px`. Titles sit at the bottom of each card: Inter `16px` / `24px`, weight 500, with `32px` of space above the title. Interiors are canvases, not stock illustrations.

At 390 the cards stack. Measured card width about `324px`, height about `395px`.

### Proof sections Depth will not copy

Logo wall, customer-story carousels, metric counts, testimonial marquee, and blog posts are real Mintlify content. Depth has no verified customers, quotes, statistics, or posts, so those sections are not rebuilt. Their layout notes stay here so the omission is deliberate.

### FAQ

The open/closed control is a full-width button, about `768×64`, centered (x = 336 at 1440). Type is Inter `16px` / `24px`, weight 400, padding `20px 0`. Rows are separated by hairlines.

### Footer

Five link groups (Explore, Resources, Documentation, Company, Legal). Group labels are Inter `14px` / `20px`, weight 400, color `#969e9b`. Links are Inter `14px`, weight 500. A theme control offers Light, Dark, and System. Social links and a status pill are Mintlify’s own. Depth will not invent equivalents.

## Interaction notes

- Header is sticky and remains `65px`.
- Desktop navigation is visible; mobile uses an explicit menu button.
- Hero line-field is a canvas animation.
- Feature cards and several lower sections also use canvases.
- FAQ buttons expose `aria-expanded` collapsed by default.
- Theme is stored as Light / Dark / System. System follows the OS.

## Depth translation

Keep the header height, content width, gutters, hero scale, button geometry, bento radii, headline scale, closing band, FAQ column, and footer spacing. Replace the commercial serif with Instrument Serif (OFL). Use Inter and Geist Mono. Do not ship Mintlify artwork. Do not invent logos, quotes, or metrics to fill the omitted bands.
