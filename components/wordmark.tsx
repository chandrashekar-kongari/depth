export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-foreground-primary ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <rect
          width="24"
          height="24"
          rx="6"
          fill="currentColor"
          className="text-brand-base"
        />
        <path
          d="M6.5 6.2h7.2L18 10.2V17.8H6.5V6.2z"
          fill="none"
          stroke="var(--base-white)"
          strokeWidth="1.4"
        />
        <path
          d="M13.7 6.2v4H18"
          fill="none"
          stroke="var(--base-white)"
          strokeWidth="1.4"
        />
        <path
          d="M9 13.6h6.2M9 15.8h4"
          stroke="var(--base-white)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-medium tracking-[-0.03em]">Depth</span>
    </span>
  );
}
