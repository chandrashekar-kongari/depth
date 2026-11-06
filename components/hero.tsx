"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/button-link";

function syncHeroVideos(root: HTMLElement) {
  root.querySelectorAll("video").forEach((video) => {
    const hidden = getComputedStyle(video).display === "none";
    if (hidden) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  });
}

export function Hero() {
  const reduce = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const rise = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  useEffect(() => {
    const root = mediaRef.current;
    if (!root) return;
    const sync = () => syncHeroVideos(root);
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-x-clip">
      <div className="grid-layout relative z-10 px-4 pb-16 pt-10 min-[1120px]:px-0 lg:pb-24 lg:pt-20">
        <motion.div
          {...rise}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px]"
        >
          <p className="inline-flex h-[34px] items-center gap-1.5 rounded-[2px] border border-border-primary bg-base-default py-1 pl-2.5 pr-1">
            <span className="text-[12px] font-medium leading-4 tracking-[0.24px] text-foreground-primary/80">
              AI for engineering
            </span>
            <span className="inline-flex h-6 items-center gap-1 rounded-[2px] bg-brand-10 py-1 pl-2 pr-1 text-[12px] font-medium leading-4 tracking-[0.24px] text-brand-base">
              Teams
              <svg viewBox="0 0 24 24" className="size-3 shrink-0" aria-hidden>
                <path
                  d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </p>
          <h1 className="mt-4 text-[34px] font-medium leading-[calc(10/9*1em)] tracking-normal text-foreground-primary lg:text-[46px] lg:leading-[46px]">
            A private AI platform for mechanical drawings.
          </h1>
          <p className="mt-4 text-[16px] leading-6 text-foreground-secondary">
            Mechanical drawing reviews, with your{" "}
            <span className="text-foreground-primary">
              engineering data under your control.
            </span>
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <ButtonLink href="/#pilot">Join the Pilot</ButtonLink>
            <ButtonLink href="/#deployment" variant="secondary">
              Explore Depth
            </ButtonLink>
          </div>
        </motion.div>
        <motion.div
          className="relative z-10 mt-12 lg:mt-16"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={mediaRef}
            className="relative isolate w-full overflow-hidden rounded-2xl bg-[#f5f7f5] motion-reduce:aspect-video motion-reduce:bg-[url('/depth-hero/depth-hero-poster-light.png')] motion-reduce:bg-contain motion-reduce:bg-center motion-reduce:bg-no-repeat dark:bg-[#090b0f] dark:motion-reduce:bg-[url('/depth-hero/depth-hero-poster.png')]"
          >
            <div className="motion-reduce:hidden">
              <video
                className="block h-auto w-full dark:hidden"
                aria-label="Illustrative Depth engineering drawing revision review"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/depth-hero/depth-hero-poster-light.png"
                width={1920}
                height={1080}
              >
                <source
                  src="/depth-hero/depth-quiet-hero-light.webm"
                  type="video/webm"
                />
                <source
                  src="/depth-hero/depth-quiet-hero-light.mp4"
                  type="video/mp4"
                />
              </video>
              <video
                className="hidden h-auto w-full dark:block"
                aria-hidden
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/depth-hero/depth-hero-poster.png"
                width={1920}
                height={1080}
              >
                <source
                  src="/depth-hero/depth-quiet-hero.webm"
                  type="video/webm"
                />
                <source src="/depth-hero/depth-quiet-hero.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="sr-only">
              Illustrative product concept with scripted example findings; not a
              live AI engineering analysis.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
