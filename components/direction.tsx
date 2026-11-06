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
        className="h-full w-full text-foreground"
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
              fill="var(--background)"
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
          fill="color-mix(in srgb, var(--brand) 16%, transparent)"
          stroke="var(--brand)"
        />
        <text
          x="224"
          y="63"
          fill="var(--brand)"
          fontSize="11"
          fontFamily="var(--font-geist-mono), monospace"
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
        className="h-full w-full text-foreground"
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
        <circle cx="196" cy="146" r="10" fill="none" stroke="var(--brand)" />
        <path d="M196 140v12M190 146h12" stroke="var(--brand)" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 320 220"
      className="h-full w-full text-foreground"
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
      <path d="M210 64h62v92h-62z" fill="none" stroke="var(--brand)" />
      <path
        d="M222 96h38M222 116h28"
        stroke="var(--brand)"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

export function Direction() {
  const reduce = useReducedMotion();
  return (
    <section id="direction" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1088px] px-4 py-24 xl:px-0 lg:py-28">
        <h2 className="max-w-[664px] text-[28px] font-medium leading-[34px] tracking-[-0.56px] lg:text-[36px] lg:leading-[40px] lg:tracking-[-0.72px]">
          Starting with reviews.
          <br />
          Building toward deeper engineering intelligence.
        </h2>
        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              className="flex flex-col overflow-hidden rounded-xl border border-border-sub bg-card"
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06 }}
            >
              <div className="relative h-[280px] border-b border-border-sub bg-background-secondary sm:h-[320px]">
                <p className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Product direction
                </p>
                <Art kind={item.art} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-brand">
                  {item.kicker}
                </p>
                <h3 className="mt-3 text-[16px] font-medium leading-6">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-soft">
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
