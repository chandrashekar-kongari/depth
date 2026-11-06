import { ButtonLink } from "@/components/button-link";
import { LineField } from "@/components/line-field";
import { PilotForm } from "@/components/pilot-form";

export function PilotBand() {
  return (
    <section id="pilot" data-line className="relative">
      <div className="relative overflow-hidden border-b border-border-line">
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,#000_55%)]">
          <LineField />
        </div>
        <div className="rail grid-layout relative flex flex-col gap-6 py-10 lg:h-[139px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <h2 className="text-[22px] font-semibold leading-[calc(4/3*1em)] tracking-normal text-foreground-primary lg:text-[34px] lg:leading-[calc(10/9*1em)]">
            Help shape the future of drawing reviews.
          </h2>
          <ButtonLink href="#signup">Join the Pilot</ButtonLink>
        </div>
      </div>
      <div className="rail grid-layout grid gap-12 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <p className="max-w-[420px] text-[16px] leading-6 text-foreground-secondary">
            We&apos;re inviting mechanical engineering and manufacturing teams
            to explore Depth through an early pilot. Tell us how your team
            reviews drawings and what would make the process better.
          </p>
        </div>
        <PilotForm />
      </div>
    </section>
  );
}
