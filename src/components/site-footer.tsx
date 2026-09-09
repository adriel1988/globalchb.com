"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/components/language-provider";
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
            {sections.map((s) => (
              <section key={s.heading}>
                <h3 className="text-sm font-normal text-foreground">{s.heading}</h3>
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

export function SiteFooter() {
  const { t, locale } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const serviceLinks = locale === "es"
    ? ["Paneles residenciales y subpaneles", "Paneles comerciales", "Paneles trifásicos", "Trazado eléctrico con Trimble", "Estaciones de carga EV/RV", "Interruptores e iluminación"]
    : ["Residential panels & sub panels", "Commercial panels", "3-phase panels", "Electrical layout with Trimble", "EV/RV charging stations", "Switches & lighting"];

  return (
    <footer className="mt-auto bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.footer.about}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {COMPANY.legalName}
            </p>
          </div>

          <nav aria-label={t.footer.servicesTitle}>
            <h3 className="text-sm font-normal uppercase tracking-wider text-white">{t.footer.servicesTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link href="/servicios" className="text-slate-400 transition-colors hover:text-primary">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div id="contacto" className="scroll-mt-24">
            <h3 className="text-sm font-normal uppercase tracking-wider text-white">{t.footer.contactTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="font-medium text-slate-300">{t.footer.businessName}</li>
              <li className="leading-relaxed">{COMPANY.address}</li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="break-all transition-colors hover:text-primary">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="leading-relaxed">{COMPANY.area[locale]}</li>
              <li className="leading-relaxed">{COMPANY.hours[locale]}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-normal uppercase tracking-wider text-white">{t.footer.legalTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-slate-400 transition-colors hover:text-primary"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTermsOpen(true)}
                  className="text-slate-400 transition-colors hover:text-primary"
                >
                  {t.footer.terms}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 pl-0 pr-20 text-xs text-slate-500 sm:flex-row sm:pr-28">
          <p>{t.footer.copyright}</p>
          <p>{COMPANY.office[locale]}</p>
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
