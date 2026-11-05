"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { Wordmark } from "@/components/wordmark";

const links = [
  { href: "/#platform", label: "Platform" },
  { href: "/#deployment", label: "Deployment" },
  { href: "/#direction", label: "Product direction" },
  { href: "/#pilot", label: "Pilot" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <header
        className={`h-[65px] border-b bg-background/90 backdrop-blur-md transition-colors ${
          scrolled ? "border-line" : "border-transparent"
        }`}
      >
      <div className="relative mx-auto flex h-full w-full max-w-[1088px] items-center px-4 xl:px-0">
        <Link href="/" aria-label="Depth home" className="relative z-10">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium leading-4 text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="relative z-10 ml-auto flex items-center gap-2">
          <ButtonLink href="/#pilot" size="header" className="max-[420px]:hidden">
            Join the Pilot
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              {open ? (
                <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      </header>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-background px-4 py-4 lg:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-[16px] font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <ButtonLink href="/#pilot" onClick={() => setOpen(false)}>
                Join the Pilot
              </ButtonLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
