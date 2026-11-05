import type { Metadata } from "next";
import { PilotForm } from "@/components/pilot-form";

export const metadata: Metadata = {
  title: "Join the Pilot — Depth",
  description:
    "Share how your team reviews engineering drawings. Depth confirms a request only after it is saved.",
};

export default function PilotPage() {
  return (
    <main className="mx-auto w-full max-w-[768px] px-4 py-20">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Pilot</p>
      <h1 className="mt-4 font-display text-[40px] leading-[44px] tracking-[-0.8px] lg:text-[50px] lg:leading-[52px] lg:tracking-[-2px]">
        Help shape Depth.
      </h1>
      <p className="mt-4 text-[18px] leading-7 text-soft">
        We&apos;re inviting engineering and manufacturing teams to explore an early pilot and share how they manage drawing reviews.
      </p>
      <div className="mt-12">
        <PilotForm />
      </div>
    </main>
  );
}
