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
      <div className="relative z-10 mx-auto w-full max-w-[1088px] px-4 pt-10 xl:px-0 lg:pt-20">
        <motion.div
          {...rise}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[352px]"
        >
          <p className="inline-flex h-[34px] items-center gap-2 rounded-[2px] border border-border-sub bg-background py-1 pl-2.5 pr-1 text-[14px] text-soft">
            AI FOR ENGINEERING
            <span className="rounded-[2px] bg-brand/10 px-1.5 py-0.5 font-mono text-[12px] text-brand">
              TEAMS
            </span>
          </p>
          <h1 className="mt-4 font-display text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-foreground lg:text-[50px] lg:leading-[52px] lg:tracking-[-2px]">
            Engineering drawing reviews, brought into focus.
          </h1>
          <p className="mt-4 text-[18px] font-normal leading-6 text-soft">
            Depth is building a dedicated workspace for mechanical drawing
            reviews, helping teams organize drawings, revisions, and review
            work while{" "}
            <span className="text-foreground">
              keeping control of their engineering data.
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
        className="relative z-10 mx-4 mt-10 h-[460px] sm:mx-auto sm:max-w-[1088px] lg:absolute lg:right-[-18%] lg:top-[168px] lg:mx-0 lg:mt-0 lg:h-[780px] lg:w-[70%]"
        initial={reduce ? undefined : { opacity: 0, x: 28 }}
        animate={reduce ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <ReviewSurface />
        <p className="sr-only">
          Drawing review queue.
        </p>
      </motion.div>
    </section>
  );
}
