"use client";

import { motion, useReducedMotion } from "motion/react";

const items = [
  {
    kicker: "Current focus / Pilot",
    title: "Drawing Review Queue",
    body: "A dedicated workspace for organizing drawings awaiting engineering review.",
    art: "queue" as const,
  },
  {
    kicker: "Coming soon",
    title: "AI Drawing Review",
    body: "Planned assistance for examining technical drawings, identifying potential issues, and checking revisions against review comments.",
    art: "assist" as const,
  },
  {
    kicker: "Coming soon",
    title: "3D-to-2D Drawing Generation",
    body: "Planned tools to support the creation of technical 2D drawings from 3D models.",
    art: "generate" as const,
  },
];

function Art({ kind }: { kind: "queue" | "assist" | "generate" }) {
  if (kind === "queue") {
    return (
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full text-foreground-primary"
        aria-hidden
      >
        {[0, 1, 2].map((index) => (
          <g
            key={index}
            transform={`translate(${36 + index * 18} ${28 + index * 14})`}
          >
            <rect
              width="180"
              height="120"
              rx="6"
              fill="var(--background-primary)"
              stroke="currentColor"
              strokeOpacity={0.35 + index * 0.2}
            />
            <path
              d="M16 36h90M16 54h70M16 84h148"
              stroke="currentColor"
              strokeOpacity="0.45"
            />
          </g>
        ))}
        <rect
          x="214"
          y="48"
          width="70"
          height="22"
          rx="4"
          fill="color-mix(in srgb, var(--brand-base) 16%, transparent)"
          stroke="var(--brand-base)"
        />
        <text
          x="224"
          y="63"
          fill="var(--brand-base)"
          fontSize="11"
          fontFamily="var(--font-source-code-pro), ui-monospace, monospace"
        >
          REV C
        </text>
      </svg>
    );
  }
  if (kind === "assist") {
    return (
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full text-foreground-primary"
        aria-hidden
      >
        <rect
          x="48"
          y="36"
          width="180"
          height="140"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <circle cx="110" cy="100" r="28" fill="none" stroke="currentColor" />
        <path
          d="M150 70h50M150 100h40"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <circle
          cx="196"
          cy="146"
          r="10"
          fill="none"
          stroke="var(--brand-base)"
        />
        <path d="M196 140v12M190 146h12" stroke="var(--brand-base)" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 320 220"
      className="h-full w-full text-foreground-primary"
      aria-hidden
    >
      <path
        d="M70 150 130 70l70 28-60 80z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      <path
        d="M168 86v72M130 70l38 16"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <path d="M210 64h62v92h-62z" fill="none" stroke="var(--brand-base)" />
      <path
        d="M222 96h38M222 116h28"
        stroke="var(--brand-base)"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

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
              className="flex min-h-[412px] flex-col overflow-hidden rounded-xl border border-border-secondary bg-background-card"
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.22,
                delay: reduce ? 0 : index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-[280px] border-b border-border-primary bg-background-secondary sm:h-[320px]">
                <p className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                  Product direction
                </p>
                <Art kind={item.art} />
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
