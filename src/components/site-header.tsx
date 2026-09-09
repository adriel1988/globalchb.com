"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Languages } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";

const NAV = [
  { id: "home", href: "/" },
  { id: "company", href: "/nosotros" },
  { id: "services", href: "/servicios" },
  { id: "projects", href: "/proyectos" },
  { id: "team", href: "/equipo" },
  { id: "catalog", href: "/catalogo" },
  { id: "contact", href: "/contacto" },
] as const;

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-2xl border-[2.2px] border-[#D4A017] bg-black/80 shadow-[0_0_25px_rgba(212,160,23,0.3)] ${
        compact ? "gap-2.5 p-1.5" : "gap-3.5 p-3"
      }`}
    >
      <span
        className={`shrink-0 overflow-hidden rounded-xl border-2 border-[#D4A017] bg-black ${
          compact ? "size-10" : "size-12"
        }`}
      >
        <img
          src="/brand-logo-hd.jpg"
          alt="Logotipo de Global Technology & Electrical Services"
          className="h-full w-full object-cover"
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
  const { t, toggleLocale, locale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels: Record<(typeof NAV)[number]["id"], string> = {
    home: t.nav.home,
    company: t.nav.company,
    services: t.nav.services,
    projects: t.nav.projects,
    team: t.nav.team,
    catalog: t.nav.catalog,
    contact: t.nav.contact,
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const navLinkClass = (active: boolean) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "text-primary"
        : scrolled
          ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/85"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-[77px] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" aria-label={COMPANY.name} className="shrink-0">
          <BrandLogo compact />
        </Link>

        <div className="flex items-center gap-2">
          <nav className="mr-2 hidden items-center gap-1 xl:flex" aria-label="Navegación principal">
            {NAV.map(({ id, href }) => (
              <Link key={id} href={href} className={navLinkClass(isActive(href))}>
                {navLabels[id]}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            className={`gap-1.5 ${scrolled ? "text-foreground" : "text-white hover:bg-white/10 hover:text-white"}`}
            aria-label="Cambiar idioma / Switch language"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase">{locale === "es" ? "EN" : "ES"}</span>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`xl:hidden ${scrolled ? "text-foreground" : "text-white hover:bg-white/10"}`}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <nav className="mt-2 flex flex-col gap-1" aria-label="Menú móvil">
                {NAV.map(({ id, href }) => (
                  <Link
                    key={id}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent ${
                      isActive(href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {navLabels[id]}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
