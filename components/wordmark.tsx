export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-foreground-primary ${className}`}
    >
      <img
        src="/brand/mark.svg"
        alt=""
        width={1024}
        height={1024}
        className="h-7 w-7"
      />
      <span className="text-[15px] font-medium tracking-[-0.03em]">Depth</span>
    </span>
  );
}
