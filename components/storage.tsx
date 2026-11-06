import { ThemeImage } from "@/components/theme-image";

export function Storage() {
  return (
    <section id="storage" data-line>
      <div className="rail grid-layout relative grid gap-14 py-24 lg:py-28">
        <span
          className="absolute top-24 left-0 h-6 w-0.5 translate-y-2 bg-brand-base lg:top-28"
          aria-hidden
        />
        <div>
          <h2 className="max-w-[664px] text-[22px] font-semibold leading-[calc(4/3*1em)] tracking-normal text-foreground-primary lg:text-[34px] lg:leading-[calc(10/9*1em)]">
            Private drawing storage.
            <span className="block text-foreground-tertiary">
              Your files stay with you.
            </span>
          </h2>
          <p className="mt-8 max-w-[520px] text-[16px] leading-6 text-foreground-secondary">
            Depth is being designed so engineering drawings can be stored inside
            customer-controlled infrastructure. This is the intended approach
            for the pilot, not a completed certification.
          </p>
        </div>
        <figure className="overflow-hidden rounded-xl border border-border-secondary bg-background-card p-6 sm:p-8">
          <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
            Illustrative
          </figcaption>
          <div className="mt-4">
            <ThemeImage
              name="09-private-drawing-storage"
              alt="Illustrative private storage for engineering drawings"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
