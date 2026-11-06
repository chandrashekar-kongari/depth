"use client";

import { motion, useReducedMotion } from "motion/react";

export function Deployment() {
  const reduce = useReducedMotion();
  return (
    <section id="deployment" data-line>
      <div className="rail grid-layout relative grid gap-14 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:py-28">
        <span
          className="absolute top-24 left-0 h-6 w-0.5 translate-y-2 bg-brand-base lg:top-28"
          aria-hidden
        />
        <div>
          <h2 className="max-w-[664px] text-[22px] font-semibold leading-[calc(4/3*1em)] tracking-normal text-foreground-primary lg:text-[34px] lg:leading-[calc(10/9*1em)]">
            Your engineering data.
            <span className="block text-foreground-tertiary">
              Your environment.
            </span>
          </h2>
          <div className="mt-8 max-w-[520px] space-y-4 text-[16px] leading-6 text-foreground-secondary">
            <p>
              Depth is being designed for deployment within your own
              environment, so engineering drawings can remain under your
              organization&apos;s control.
            </p>
            <p>
              <span className="text-foreground-primary">Local deployment.</span>{" "}
              Designed for teams that want to run Depth locally.
            </p>
            <p>
              <span className="text-foreground-primary">
                Organization-hosted deployment.
              </span>{" "}
              Designed for deployment on infrastructure managed by your
              organization.
            </p>
            <p>These are the intended deployment approaches.</p>
          </div>
        </div>
        <motion.figure
          className="relative overflow-hidden rounded-xl border border-border-secondary bg-background-card p-6 sm:p-8"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
            Deployment & data control
          </figcaption>
          <svg
            viewBox="0 0 640 420"
            className="mt-4 h-auto w-full text-foreground-primary"
            role="img"
            aria-label="Diagram of Depth and drawing data inside a customer environment"
          >
            <rect
              x="16"
              y="28"
              width="608"
              height="364"
              rx="18"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeDasharray="5 6"
            />
            <text
              x="32"
              y="54"
              fill="currentColor"
              fontSize="13"
              fontFamily="var(--font-inter), Inter, sans-serif"
            >
              Customer environment
            </text>
            <g>
              <rect
                x="48"
                y="150"
                width="150"
                height="88"
                rx="10"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.45"
              />
              <text
                x="68"
                y="188"
                fill="currentColor"
                fontSize="14"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                Reviewers
              </text>
              <text
                x="68"
                y="210"
                fill="currentColor"
                opacity="0.6"
                fontSize="12"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                Inside the boundary
              </text>
              <rect
                x="244"
                y="138"
                width="164"
                height="112"
                rx="10"
                fill="color-mix(in srgb, var(--brand-base) 12%, transparent)"
                stroke="var(--brand-base)"
              />
              <text
                x="268"
                y="188"
                fill="currentColor"
                fontSize="16"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                Depth
              </text>
              <text
                x="268"
                y="210"
                fill="currentColor"
                opacity="0.65"
                fontSize="12"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                Review queue
              </text>
              <rect
                x="452"
                y="150"
                width="150"
                height="88"
                rx="10"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.45"
              />
              <text
                x="472"
                y="188"
                fill="currentColor"
                fontSize="14"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                Drawing store
              </text>
              <text
                x="472"
                y="210"
                fill="currentColor"
                opacity="0.6"
                fontSize="12"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                Sheets and revisions
              </text>
              <path
                d="M198 194h46M408 194h44"
                stroke="var(--brand-base)"
                strokeWidth="1.4"
              />
            </g>
            <g
              fontFamily="var(--font-inter), Inter, sans-serif"
              fontSize="13"
              fill="currentColor"
            >
              <text x="48" y="330">
                Fully local
              </text>
              <text x="48" y="350" opacity="0.6">
                Queue runs in the team environment
              </text>
              <text x="330" y="330">
                Organization-hosted
              </text>
              <text x="330" y="350" opacity="0.6">
                Hosted by the customer organization
              </text>
            </g>
          </svg>
        </motion.figure>
      </div>
    </section>
  );
}
