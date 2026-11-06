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
    size === "header"
      ? "h-[34px] px-3.5 text-[12px] leading-4"
      : "h-[42px] pl-4 pr-3 text-[14px] leading-5";
  const variantClass =
    variant === "primary"
      ? "border border-transparent bg-base-invert text-foreground-invert shadow-button-sm hover:opacity-90"
      : "border border-border-secondary bg-transparent text-foreground-primary hover:bg-background-secondary";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-[4px] font-medium transition-opacity duration-200 ease-out-soft ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
      {variant === "primary" && size !== "header" ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M6 3.5 10.5 8 6 12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </Link>
  );
}
