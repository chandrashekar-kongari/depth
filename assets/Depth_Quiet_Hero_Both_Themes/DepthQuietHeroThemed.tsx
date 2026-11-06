import React from "react";

type DepthHeroTheme = "light" | "dark";

/** Provide your website's resolved color theme; no user data leaves the browser. */
export function DepthQuietHeroThemed({ theme }: { theme: DepthHeroTheme }) {
  const light = theme === "light";
  const prefix = "/depth-hero/";
  const base = light ? "depth-quiet-hero-light" : "depth-quiet-hero";
  const poster = light ? "depth-hero-poster-light.png" : "depth-hero-poster.png";
  return (
    <div className={`w-full overflow-hidden rounded-2xl ${light ? "bg-[#f5f7f5]" : "bg-[#090b0f]"}`}>
      <video key={base} className="block h-auto w-full" autoPlay muted loop playsInline
        preload="metadata" poster={prefix + poster}
        aria-label="Illustrative comparison of engineering drawing revisions">
        <source src={prefix + base + ".webm"} type="video/webm" />
        <source src={prefix + base + ".mp4"} type="video/mp4" />
      </video>
      <p className="sr-only">Scripted Depth engineering review concept, not a live AI analysis.</p>
    </div>
  );
}
