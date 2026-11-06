"use client";

import { motion, useReducedMotion } from "motion/react";
import { ThemeImage } from "@/components/theme-image";

export function Deployment() {
  const reduce = useReducedMotion();
  return (
    <section id="deployment" data-line>
      <div className="rail grid-layout relative grid gap-14 py-24 lg:py-28">
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
          <div className="mt-4">
            <ThemeImage
              name="06-private-deployment"
              alt="Diagram of Depth inside a customer-controlled environment"
            />
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
