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
  { id: "newConstruction", href: "/new-construction" },
  { id: "capabilities", href: "/capabilities" },
  { id: "resources", href: "/resources" },
  { id: "catalog", href: "/catalogo" },
  { id: "about", href: "/about" },
] as const;

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-2xl border-[2.2px] border-[#D4A017] bg-black/80 shadow-[0_0_25px_rgba(212,160,23,0.3)] ${compact ? "gap-2.5 p-1.5" : "gap-3.5 p-3"
        }`}
    >
      <span
        className={`shrink-0 overflow-hidden rounded-xl border-2 border-[#D4A017] bg-black ${compact ? "size-10" : "size-12"
          }`}
      >
        <img
          src="/brand-logo-hd.png"
          alt="Logotipo de Global Technology & Electrical Services"
          className="h-full w-full object-cover scale-140"
          width={compact ? 40 : 48}
          height={compact ? 40 : 48}
        />
      </span>
      <span className="leading-tight">
        <span className={`block font-normal tracking-wide text-white ${compact ? "text-sm" : "text-base"}`}>
          GLOBAL TECHNOLOGY
        </span>
        <span
          className={`block font-medium uppercase tracking-wider text-[#D4A017] ${compact ? "text-[10px]" : "text-xs"}`}
        >
          &amp; Electrical Services
        </span>
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
      <div className="relative flex h-20 w-full items-center justify-between gap-4 px-3 sm:px-4">
        <Link href="/" aria-label={COMPANY.name} className="shrink-0">
          <BrandLogo compact />
        </Link>

        <nav className="hidden items-center xl:absolute xl:left-1/2 xl:flex xl:-translate-x-1/2" aria-label={g.nav.main}>
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

        <div className="flex items-center gap-1">
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
