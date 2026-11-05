"use client";

import { motion, useReducedMotion } from "motion/react";

export function Deployment() {
  const reduce = useReducedMotion();
  return (
    <section id="deployment" className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1088px] gap-14 px-4 py-24 xl:px-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:py-28">
        <div>
          <h2 className="max-w-[664px] text-[28px] font-medium leading-[34px] tracking-[-0.56px] lg:text-[36px] lg:leading-[40px] lg:tracking-[-0.72px]">
            Drawing data stays with your team.
            <br />
            Local, or hosted by your organization.
          </h2>
          <div className="mt-8 max-w-[520px] space-y-4 text-[16px] leading-6 text-soft">
            <p>Depth is being shaped for two deployment preferences.</p>
            <p>
              <span className="text-foreground">Fully local.</span> The review queue would run in the team’s own environment.
            </p>
            <p>
              <span className="text-foreground">Organization-hosted.</span> The same queue would be hosted by the customer’s organization, rather than as a shared public service.
            </p>
            <p>
              The intention is that drawing files and review activity remain inside that customer environment. This is a pilot direction. Depth does not yet offer a completed install, and this site claims no certification or security attestation.
            </p>
          </div>
        </div>
        <motion.figure
          className="relative overflow-hidden rounded-xl border border-border-sub bg-card p-6 sm:p-8"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Illustrative concept
          </figcaption>
          <svg viewBox="0 0 640 420" className="mt-4 h-auto w-full text-foreground" role="img" aria-label="Diagram of Depth and drawing data inside a customer environment">
            <rect x="16" y="28" width="608" height="364" rx="18" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="5 6" />
            <text x="32" y="54" fill="currentColor" fontSize="13" fontFamily="var(--font-inter), Inter, sans-serif">
              Customer environment
            </text>
            <g>
              <rect x="48" y="150" width="150" height="88" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.45" />
              <text x="68" y="188" fill="currentColor" fontSize="14" fontFamily="var(--font-inter), Inter, sans-serif">
                Reviewers
              </text>
              <text x="68" y="210" fill="currentColor" opacity="0.6" fontSize="12" fontFamily="var(--font-inter), Inter, sans-serif">
                Inside the boundary
              </text>
              <rect x="244" y="138" width="164" height="112" rx="10" fill="color-mix(in srgb, var(--brand) 12%, transparent)" stroke="var(--brand)" />
              <text x="268" y="188" fill="currentColor" fontSize="16" fontFamily="var(--font-inter), Inter, sans-serif">
                Depth
              </text>
              <text x="268" y="210" fill="currentColor" opacity="0.65" fontSize="12" fontFamily="var(--font-inter), Inter, sans-serif">
                Review queue
              </text>
              <rect x="452" y="150" width="150" height="88" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.45" />
              <text x="472" y="188" fill="currentColor" fontSize="14" fontFamily="var(--font-inter), Inter, sans-serif">
                Drawing store
              </text>
              <text x="472" y="210" fill="currentColor" opacity="0.6" fontSize="12" fontFamily="var(--font-inter), Inter, sans-serif">
                Sheets and revisions
              </text>
              <path d="M198 194h46M408 194h44" stroke="var(--brand)" strokeWidth="1.4" />
            </g>
            <g fontFamily="var(--font-inter), Inter, sans-serif" fontSize="13" fill="currentColor">
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
