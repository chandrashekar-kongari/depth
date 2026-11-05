import Link from "next/link";
import { ThemeControl } from "@/components/theme-control";
import { Wordmark } from "@/components/wordmark";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/#platform", label: "Review queue" },
      { href: "/#deployment", label: "Deployment" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/#direction", label: "Product direction" },
      { href: "/pilot", label: "Pilot form" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1088px] px-4 pb-12 pt-[104px] xl:px-0">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,160px))]">
          <div>
            <Link href="/" aria-label="Depth home">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-6 text-soft">
              Pilot requests are stored on this site’s server so they can be read. Depth does not publish customer logos, testimonials, or usage statistics.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[14px] font-normal leading-5 text-muted">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[14px] font-medium leading-4 hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">Depth pilot site</p>
          <ThemeControl />
        </div>
      </div>
    </footer>
  );
}
