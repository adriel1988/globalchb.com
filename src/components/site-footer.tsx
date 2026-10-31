"use client";

import Link from "next/link";
import { GoogleReviewsLink, useSiteInfo } from "@/components/site-info";
import { useGc } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";
import { ShieldCheck } from "lucide-react";

const FOOTER_NAV = [
  { id: "projects", href: "/projects" },
  { id: "newConstruction", href: "/new-construction" },
  { id: "capabilities", href: "/capabilities" },
  { id: "resources", href: "/resources" },
  { id: "catalog", href: "/catalogo" },
  { id: "about", href: "/about" },
] as const;

export function SiteFooter() {
  const g = useGc();
  const { googleReviewsUrl } = useSiteInfo();

  return (
    <footer className="mt-auto bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl text-white">Global Technology</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">&amp; Electrical Services</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{g.footer.tagline}</p>
            <Link
              href="/request-a-proposal"
              className="mt-6 inline-flex h-11 items-center bg-gold px-5 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:bg-gold-bright"
            >
              {g.nav.rfp}
            </Link>
          </div>

          <nav className="md:col-span-3" aria-label={g.footer.company}>
            <h3 className="eyebrow text-white">{g.footer.company}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_NAV.map(({ id, href }) => (
                <li key={id}>
                  <Link href={href} className="text-slate-400 transition-colors hover:text-gold">
                    {g.nav[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div id="contacto" className="scroll-mt-24 md:col-span-4">
            <h3 className="eyebrow text-white">{g.footer.contact}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="leading-relaxed">{COMPANY.address}</li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="break-all transition-colors hover:text-gold">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href="tel:+17869527504" className="transition-colors hover:text-gold">
                  {COMPANY.phone}
                </a>
                <span className="mx-2 text-slate-600">·</span>
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  WhatsApp
                </a>
              </li>
              <li>{g.footer.hours}</li>
              {googleReviewsUrl && (
                <li className="pt-1">
                  <GoogleReviewsLink variant="footer" />
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 pr-0 text-xs text-slate-500 sm:pr-24 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. {g.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <Link href="/privacy" className="transition-colors hover:text-gold">
              {g.footer.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="transition-colors hover:text-gold">
              {g.footer.terms}
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
