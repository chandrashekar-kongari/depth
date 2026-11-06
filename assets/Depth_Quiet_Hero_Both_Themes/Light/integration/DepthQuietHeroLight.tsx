import React from "react";

/** Place the light-mode video assets and poster in /public/depth-hero/ */
export function DepthQuietHeroLight() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#f5f7f5]">
      <video className="block h-auto w-full" autoPlay loop muted playsInline preload="metadata"
        aria-label="Illustrative Depth drawing review, light theme"
        poster="/depth-hero/depth-hero-poster-light.png">
        <source src="/depth-hero/depth-quiet-hero-light.webm" type="video/webm" />
        <source src="/depth-hero/depth-quiet-hero-light.mp4" type="video/mp4" />
      </video>
      <p className="sr-only">Illustrative product concept with scripted example findings.</p>
    </div>
  );
}
