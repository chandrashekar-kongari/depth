# Depth — Dark & Light Hero Animation

The same calm, 13-second product story in coordinated dark and light modes. Both are 1920×1080, 24fps, silent, and self-contained.

## For a Next.js/React website

1. Copy `Dark/video/depth-quiet-hero.*`, `Light/video/depth-quiet-hero-light.*`, and each theme's poster PNG into `public/depth-hero/`.
2. Copy `DepthQuietHeroThemed.tsx` into your components directory.
3. Use `<DepthQuietHeroThemed theme={resolvedTheme === 'light' ? 'light' : 'dark'} />`.
4. Render your actual hero headline as accessible HTML above the video. Keep motion muted and looping. For reduced motion, prefer showing the theme poster.

Both source HTML files are editable, and both include reproducible render scripts. The product behavior and findings are illustrative, not live AI analysis.
