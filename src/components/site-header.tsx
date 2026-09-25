"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useGc, useLanguage } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";

const NAV = [
  { id: "projects", href: "/projects" },
  { id: "capabilities", href: "/capabilities" },
  { id: "newConstruction", href: "/new-construction" },
  { id: "technology", href: "/technology" },
  { id: "about", href: "/about" },
  { id: "resources", href: "/resources" },
  { id: "catalog", href: "/catalogo" },
] as const;

function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="size-11 shrink-0 overflow-hidden border-2 border-gold bg-black">
        <img
          src="/brand-logo-hd.png"
          alt="Global Technology & Electrical Services logo"
          className="h-full w-full scale-140 object-cover"
          width={44}
          height={44}
        />
      </span>
      <span className="leading-none">
        <span className="font-display block whitespace-nowrap text-lg tracking-wide text-white">Global Technology</span>
        <span className="mt-1 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">&amp; Electrical Services</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const g = useGc();
  const { toggleLocale, locale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-navy/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={COMPANY.name} className="shrink-0">
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-1">
          <nav className="mr-2 hidden items-center xl:flex" aria-label={g.nav.main}>
            {NAV.map(({ id, href }) => (
              <Link
                key={id}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`whitespace-nowrap px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors 2xl:px-3 2xl:text-xs 2xl:tracking-[0.16em] ${
                  isActive(href) ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {g.nav[id]}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleLocale}
            className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white"
            aria-label={g.nav.switchLanguage}
          >
            <span className={locale === "en" ? "text-white" : "text-white/50"}>EN</span>
            <span className="mx-1 text-white/30">/</span>
            <span className={locale === "es" ? "text-white" : "text-white/50"}>ES</span>
          </button>

          <Link
            href="/request-a-proposal"
            className="ml-2 hidden h-11 items-center whitespace-nowrap bg-gold px-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-gold-bright sm:inline-flex"
          >
            {g.nav.rfp}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" className="ml-1 p-2 text-white xl:hidden" aria-label={g.nav.openMenu}>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l-white/10 bg-navy text-white">
              <SheetTitle className="sr-only">{g.nav.menu}</SheetTitle>
              <nav className="mt-14 flex flex-col px-4" aria-label={g.nav.menu}>
                {NAV.map(({ id, href }) => (
                  <Link
                    key={id}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`font-display border-b border-white/10 py-4 text-2xl ${isActive(href) ? "text-gold" : "text-white"}`}
                  >
                    {g.nav[id]}
                  </Link>
                ))}
                <Link
                  href="/request-a-proposal"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex h-12 items-center justify-center bg-gold text-xs font-semibold uppercase tracking-[0.16em] text-navy"
                >
                  {g.nav.rfp}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
