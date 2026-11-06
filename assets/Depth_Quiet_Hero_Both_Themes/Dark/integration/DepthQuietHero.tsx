import React from "react";

/**
 * Place the WebM, MP4 and poster in /public/depth-hero/.
 * A silent, self-contained product concept animation for marketing.
 * Keeps hero headline as accessible HTML outside the video.
 */
export function DepthQuietHero() {
  return (
    <div className="relative isolate w-full overflow-hidden rounded-2xl bg-[#090b0f]">
      <video
        className="block h-auto w-full"
        aria-label="Illustrative Depth engineering drawing revision review"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/depth-hero/depth-hero-poster.png"
      >
        <source src="/depth-hero/depth-quiet-hero.webm" type="video/webm" />
        <source src="/depth-hero/depth-quiet-hero.mp4" type="video/mp4" />
        Your browser does not support video playback.
      </video>
      <p className="sr-only">Illustrative product concept with scripted example findings; not a live AI engineering analysis.</p>
    </div>
  );
}
