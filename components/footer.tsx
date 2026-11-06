import Link from "next/link";
import { ThemeControl } from "@/components/theme-control";
import { Wordmark } from "@/components/wordmark";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { href: "/#deployment", label: "Deployment" },
      { href: "/#storage", label: "Private storage" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/#direction", label: "Product direction" },
      { href: "/pilot", label: "Pilot form" },
    ],
  },
  {
    title: "Contact us",
    links: [
      {
        href: "https://www.linkedin.com/company/godepth/home/",
        label: "LinkedIn",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer data-line>
      <div className="rail grid-layout pb-12 pt-[104px]">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,160px))]">
          <div>
            <Link href="/" aria-label="Depth home">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-6 text-foreground-secondary">
              Engineering workflows. Under your control.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[14px] font-normal leading-5 text-foreground-muted">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-medium leading-4 hover:text-brand-base"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[14px] font-medium leading-4 hover:text-brand-base"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-foreground-muted">Depth pilot site</p>
          <ThemeControl />
        </div>
      </div>
    </footer>
  );
}
