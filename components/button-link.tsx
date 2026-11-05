import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "header" | "default";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
}: Props) {
  const sizeClass =
    size === "header" ? "h-[34px] px-3.5" : "h-[42px] pl-4 pr-3";
  const variantClass =
    variant === "primary"
      ? "border border-transparent bg-button text-button-text hover:opacity-90"
      : "border border-border bg-transparent text-foreground hover:bg-card";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-[4px] text-[14px] font-medium leading-4 transition-opacity ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
      {variant === "primary" ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </Link>
  );
}
