import { BracketDrawing } from "@/components/drawings";

const rail = ["Queue", "Revisions", "Reviews", "Parts", "Releases"];

export function ReviewSurface({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-full overflow-hidden rounded-xl bg-background-card text-foreground-primary shadow-feature-card ring-1 ring-inset ring-border-secondary ${className}`}
      aria-hidden
    >
      <aside className="hidden w-[196px] shrink-0 flex-col border-r border-border-primary bg-background-secondary sm:flex">
        <div className="flex items-center gap-2 px-4 py-4 text-[13px] font-medium">
          <span className="h-2 w-2 rounded-full bg-brand-base" />
          Depth
        </div>
        <ul className="px-2">
          {rail.map((item, index) => (
            <li key={item}>
              <div
                className={`rounded-[4px] px-3 py-2 text-[13px] ${
                  index === 0
                    ? "bg-brand-10 text-brand-base"
                    : "text-foreground-tertiary"
                }`}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-background-primary">
        <div className="flex items-center justify-between gap-3 border-b border-border-primary px-4 py-3 sm:px-5">
          <div>
            <p className="text-[14px] font-medium leading-5">
              BRG-2041 · Bracket, Housing
            </p>
            <p className="text-[12px] leading-4 text-foreground-secondary">
              Rev C · 6061-T6 · Sheet 1 of 1
            </p>
          </div>
          <span className="shrink-0 rounded-[4px] border border-brand-20 bg-brand-10 px-2 py-1 text-[12px] font-medium text-brand-base">
            In Review
          </span>
        </div>
        <div className="relative min-h-0 flex-1 bg-background-secondary">
          <p className="absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
            Illustrative
          </p>
          <BracketDrawing className="h-full w-full px-4 pb-2 pt-7" />
        </div>
      </div>
    </div>
  );
}
