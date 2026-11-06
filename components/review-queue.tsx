"use client";

import { motion, useReducedMotion } from "motion/react";
import { Thumb } from "@/components/drawings";
import { ThemeImage } from "@/components/theme-image";

const rows = [
  {
    id: "BRG-2041",
    name: "Bracket, Housing",
    rev: "C",
    status: "In Review",
    kind: "bracket" as const,
  },
  {
    id: "SHF-1180",
    name: "Shaft, Drive",
    rev: "B",
    status: "Approved",
    kind: "shaft" as const,
  },
  {
    id: "CVR-0904",
    name: "Cover, End",
    rev: "A",
    status: "Changes requested",
    kind: "cover" as const,
  },
  {
    id: "PLT-3312",
    name: "Plate, Mount",
    rev: "D",
    status: "Awaiting Review",
    kind: "plate" as const,
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
      {children}
    </p>
  );
}

function Card({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-border-secondary bg-background-card p-8 lg:min-h-[412px] ${className}`}
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      <h3 className="pt-8 text-[16px] font-semibold leading-6">{title}</h3>
    </motion.article>
  );
}

export function ReviewQueue() {
  return (
    <section id="platform" data-line>
      <div className="rail grid-layout relative py-24 lg:py-28">
        <span
          className="absolute top-24 left-0 h-6 w-0.5 translate-y-2 bg-brand-base lg:top-28"
          aria-hidden
        />
        <h2 className="max-w-[664px] text-[22px] font-semibold leading-[calc(4/3*1em)] tracking-normal text-foreground-primary lg:text-[34px] lg:leading-[calc(10/9*1em)]">
          Every drawing. Every revision.
          <span className="block text-foreground-tertiary">
            A clearer review process.
          </span>
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-3">
          <Card title="Review Queue" className="lg:col-span-2">
            <Label>Illustrative</Label>
            <ul className="mt-4 divide-y divide-border-primary">
              {rows.map((row) => (
                <li key={row.id} className="flex items-center gap-3 py-3">
                  <Thumb kind={row.kind} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium leading-5">
                      {row.id} · {row.name}
                    </p>
                    <p className="text-[12px] leading-4 text-foreground-secondary">
                      Rev {row.rev}
                    </p>
                  </div>
                  <span className="hidden text-[12px] text-foreground-tertiary sm:inline">
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Drawing Revision">
            <Label>Review status</Label>
            <div className="mt-3 min-h-0 flex-1">
              <ThemeImage
                name="05-review-status"
                alt="Illustrative review status for drawings in the queue"
              />
            </div>
          </Card>
          <Card title="Drawing Details">
            <Label>Drawing details</Label>
            <div className="mt-3 min-h-0 flex-1">
              <ThemeImage
                name="02-drawing-details"
                alt="Illustrative mechanical drawing sheet"
              />
            </div>
          </Card>
          <Card title="Who can review">
            <Label>In Review</Label>
            <div className="mt-3 min-h-0 flex-1">
              <ThemeImage
                name="03-reviewer-workflow"
                alt="Illustrative reviewers assigned to a drawing"
              />
            </div>
          </Card>
          <Card title="Revision history">
            <Label>Drawing revision</Label>
            <div className="mt-3 min-h-0 flex-1">
              <ThemeImage
                name="04-revision-history"
                alt="Illustrative revision history for a drawing"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
