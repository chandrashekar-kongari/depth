import type { Metadata } from "next";
import { PilotForm } from "@/components/pilot-form";

export const metadata: Metadata = {
  title: "Join the Pilot — Depth",
  description:
    "Tell us how your team reviews drawings. We'll review your application and follow up.",
};

export default function PilotPage() {
  return (
    <main className="mx-auto w-full max-w-[768px] px-4 py-20">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Early pilot
      </p>
      <h1 className="mt-4 font-display text-[40px] leading-[44px] tracking-[-0.8px] lg:text-[50px] lg:leading-[52px] lg:tracking-[-2px]">
        Help shape the future of drawing reviews.
      </h1>
      <p className="mt-4 text-[18px] leading-7 text-soft">
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
