"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/button-link";
import { LineField } from "@/components/line-field";
import { ReviewSurface } from "@/components/review-surface";

export function Hero() {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-[797px] overflow-x-clip lg:min-h-[992px]">
      <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,transparent_34%,#000_43%,#000_100%)]">
        <LineField />
      </div>
      <div className="grid-layout relative z-10 px-4 pt-10 min-[1120px]:px-0 lg:pt-20">
        <motion.div
          {...rise}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[352px]"
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
            <ButtonLink href="/#platform" variant="secondary">
              Explore Depth
            </ButtonLink>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="relative z-10 mx-4 mt-10 h-[460px] sm:mx-auto sm:max-w-[1088px] lg:absolute lg:left-[calc(50%-129px)] lg:top-[351px] lg:mx-0 lg:mt-0 lg:h-[641px] lg:w-[1055px]"
        initial={reduce ? undefined : { opacity: 0, x: 28 }}
        animate={reduce ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <ReviewSurface />
        <p className="sr-only">Drawing review queue.</p>
      </motion.div>
    </section>
  );
}
