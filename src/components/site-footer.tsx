"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useGc, useLanguage } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";
import { privacyPolicy, termsOfService, type PolicySection } from "@/lib/policies";
import { ShieldCheck, FileText } from "lucide-react";

function PolicyDialog({
  open,
  onOpenChange,
  title,
  updated,
  sections,
  icon,
  closeLabel,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  updated: string;
  sections: PolicySection[];
  icon: React.ReactNode;
  closeLabel: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription>{updated}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-5">
            {sections.map((s, idx) => (
              <section key={s.heading || `section-${idx}`}>
                {s.heading ? <h3 className="text-sm font-normal text-foreground">{s.heading}</h3> : null}
                {s.body.map((p, i) => (
                  <p key={i} className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {closeLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const FOOTER_NAV = [
  { id: "projects", href: "/projects" },
  { id: "capabilities", href: "/capabilities" },
  { id: "newConstruction", href: "/new-construction" },
  { id: "technology", href: "/technology" },
  { id: "about", href: "/about" },
  { id: "resources", href: "/resources" },
  { id: "catalog", href: "/catalogo" },
] as const;

export function SiteFooter() {
  const { t, locale } = useLanguage();
  const g = useGc();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

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
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 pr-0 text-xs text-slate-500 sm:pr-24 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. {g.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <button onClick={() => setPrivacyOpen(true)} className="transition-colors hover:text-gold">
              {g.footer.privacy}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setTermsOpen(true)} className="transition-colors hover:text-gold">
              {g.footer.terms}
            </button>
          </div>
        </div>
      </div>

      <PolicyDialog
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
        title={t.policies.privacyTitle}
        updated={t.policies.privacyUpdated}
        sections={privacyPolicy[locale]}
        closeLabel={t.policies.close}
        icon={<ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />}
      />
      <PolicyDialog
        open={termsOpen}
        onOpenChange={setTermsOpen}
        title={t.policies.termsTitle}
        updated={t.policies.termsUpdated}
        sections={termsOfService[locale]}
        closeLabel={t.policies.close}
        icon={<FileText className="h-5 w-5 text-primary" aria-hidden="true" />}
      />
    </footer>
  );
}
