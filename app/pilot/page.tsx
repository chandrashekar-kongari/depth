import type { Metadata } from "next";
import { PilotForm } from "@/components/pilot-form";

export const metadata: Metadata = {
  title: "Join the Pilot — Depth",
  description:
    "Tell us how your team reviews drawings. We'll review your application and follow up.",
};

export default function PilotPage() {
  return (
    <main className="mx-auto w-full max-w-[768px] px-[var(--grid-margin)] py-20">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
        Early pilot
      </p>
      <h1 className="mt-4 text-[34px] font-medium leading-[calc(10/9*1em)] tracking-normal text-foreground-primary lg:text-[46px] lg:leading-[46px]">
        Help shape the future of drawing reviews.
      </h1>
      <p className="mt-4 text-[16px] leading-6 text-foreground-secondary">
        We&apos;re inviting mechanical engineering and manufacturing teams to
        explore Depth through an early pilot. Tell us how your team reviews
        drawings and what would make the process better.
      </p>
      <div className="mt-12">
        <PilotForm />
      </div>
    </main>
  );
}
