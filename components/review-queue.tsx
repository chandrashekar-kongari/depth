"use client";

import { motion, useReducedMotion } from "motion/react";
import { BracketDrawing, CoverDrawing, ShaftDrawing, Thumb } from "@/components/drawings";

const rows = [
  { id: "BRG-2041", name: "Bracket, Housing", rev: "C", status: "In Review", kind: "bracket" as const },
  { id: "SHF-1180", name: "Shaft, Drive", rev: "B", status: "Approved", kind: "shaft" as const },
  { id: "CVR-0904", name: "Cover, End", rev: "A", status: "Changes requested", kind: "cover" as const },
  { id: "PLT-3312", name: "Plate, Mount", rev: "D", status: "Awaiting Review", kind: "plate" as const },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{children}</p>
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
      className={`flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-border-sub bg-card p-8 lg:min-h-[412px] ${className}`}
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      <h3 className="pt-8 text-[16px] font-medium leading-6">{title}</h3>
    </motion.article>
  );
}

export function ReviewQueue() {
  return (
    <section id="platform" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1088px] px-4 py-24 xl:px-0 lg:py-28">
        <h2 className="max-w-[664px] text-[28px] font-medium leading-[34px] tracking-[-0.56px] lg:text-[36px] lg:leading-[40px] lg:tracking-[-0.72px]">
          Every drawing. Every revision.
          <br />
          A clearer review process.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-3">
          <Card title="Review Queue" className="lg:col-span-2">
            <Label>Illustrative</Label>
            <ul className="mt-4 divide-y divide-border-sub">
              {rows.map((row) => (
                <li key={row.id} className="flex items-center gap-3 py-3">
                  <Thumb kind={row.kind} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium leading-5">
                      {row.id} · {row.name}
                    </p>
                    <p className="text-[12px] leading-4 text-soft">Rev {row.rev}</p>
                  </div>
                  <span className="hidden text-[12px] text-secondary-text sm:inline">{row.status}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Drawing Revision">
            <Label>Review status</Label>
            <ul className="mt-6 space-y-4">
              {[
                ["In Review", "2"],
                ["Changes requested", "1"],
                ["Approved", "1"],
                ["Awaiting Review", "1"],
              ].map(([label, count]) => (
                <li key={label} className="flex items-center justify-between border-b border-border-sub pb-3 text-[14px]">
                  <span>{label}</span>
                  <span className="font-mono text-[12px] text-brand">{count}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Drawing Details">
            <Label>Drawing details</Label>
            <div className="mt-3 min-h-0 flex-1">
              <CoverDrawing className="h-full max-h-[240px]" />
            </div>
          </Card>
          <Card title="Who can review">
            <Label>In Review</Label>
            <ul className="mt-5 space-y-4 text-[14px]">
              {[
                ["A. Shah", "Design engineer", "In Review"],
                ["M. Ortiz", "Checker", "Awaiting Review"],
                ["L. Chen", "Manufacturing", "Awaiting Review"],
              ].map(([name, role, state]) => (
                <li key={name} className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-medium">{name}</span>
                    <span className="text-[12px] text-soft">{role}</span>
                  </span>
                  <span className="text-[12px] text-secondary-text">{state}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Revision history">
            <Label>Drawing revision</Label>
            <ol className="mt-5 space-y-4 border-l border-border pl-4 text-[14px]">
              {[
                ["Rev C", "12 Mar 2026", "In Review"],
                ["Rev B", "02 Feb 2026", "Superseded"],
                ["Rev A", "14 Jan 2026", "Superseded"],
              ].map(([rev, date, state]) => (
                <li key={rev}>
                  <p className="font-medium">{rev}</p>
                  <p className="text-[12px] text-soft">
                    {date} · {state}
                  </p>
                </li>
              ))}
            </ol>
          </Card>
          <Card title="Drawing Details" className="lg:col-span-3">
            <Label>Drawing details</Label>
            <div className="mt-3 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
              <BracketDrawing className="max-h-[250px]" />
              <div className="hidden lg:block">
                <ShaftDrawing className="max-h-[250px]" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
