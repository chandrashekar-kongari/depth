"use client";

import { motion, useReducedMotion } from "motion/react";
import { ThemeImage } from "@/components/theme-image";

const items = [
  {
    kicker: "Current focus / Pilot",
    title: "Drawing Review Queue",
    body: "A dedicated workspace for organizing drawings awaiting engineering review.",
    art: "icon" as const,
  },
  {
    kicker: "Coming soon",
    title: "AI Drawing Review",
    body: "Planned assistance for examining technical drawings, identifying potential issues, and checking revisions against review comments.",
    art: "07-ai-drawing-review" as const,
  },
  {
    kicker: "Coming soon",
    title: "3D-to-2D Drawing Generation",
    body: "Planned tools to support the creation of technical 2D drawings from 3D models.",
    art: "08-3d-to-2d" as const,
  },
];

export function Direction() {
  const reduce = useReducedMotion();
  return (
    <section id="direction" data-line>
      <div className="rail grid-layout relative py-24 lg:py-28">
        <span
          className="absolute top-24 left-0 h-6 w-0.5 translate-y-2 bg-brand-base lg:top-28"
          aria-hidden
        />
        <h2 className="max-w-[664px] text-[22px] font-semibold leading-[calc(4/3*1em)] tracking-normal text-foreground-primary lg:text-[34px] lg:leading-[calc(10/9*1em)]">
          Starting with reviews.
          <span className="block text-foreground-tertiary">
            Building toward deeper engineering intelligence.
          </span>
        </h2>
        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              className="flex min-h-[412px] flex-col overflow-hidden rounded-xl border border-border-secondary bg-base-default"
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.22,
                delay: reduce ? 0 : index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative flex h-[280px] items-center justify-center overflow-hidden border-b border-border-primary bg-base-default sm:h-[320px]">
                <p className="absolute left-5 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                  Product direction
                </p>
                {item.art === "icon" ? (
                  <img
                    src="/brand/drawing-review.svg"
                    alt="Drawing review"
                    width={512}
                    height={512}
                    className="h-28 w-28"
                  />
                ) : (
                  <ThemeImage
                    name={item.art}
                    alt={
                      item.art === "07-ai-drawing-review"
                        ? "Illustrative concept for planned AI drawing review"
                        : "Illustrative concept for planned 3D-to-2D drawing generation"
                    }
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-brand-base">
                  {item.kicker}
                </p>
                <h3 className="mt-3 text-[16px] font-semibold leading-6">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-foreground-secondary">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
