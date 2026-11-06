import { ButtonLink } from "@/components/button-link";
import { LineField } from "@/components/line-field";
import { PilotForm } from "@/components/pilot-form";

export function PilotBand() {
  return (
    <section id="pilot" className="relative border-t border-line">
      <div className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,#000_55%)]">
          <LineField />
        </div>
        <div className="relative mx-auto flex w-full max-w-[1088px] flex-col gap-6 px-4 py-10 xl:px-0 lg:h-[139px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <h2 className="font-display text-[32px] font-normal leading-[38px] tracking-[-0.64px] lg:text-[36px] lg:leading-[40px] lg:tracking-[-0.72px]">
            Help shape the future of drawing reviews.
          </h2>
          <ButtonLink href="#signup">Join the Pilot</ButtonLink>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-[1088px] gap-12 px-4 py-20 xl:px-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <p className="max-w-[420px] text-[18px] leading-7 text-soft">
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
