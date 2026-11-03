"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoogleReviewsLink, useSiteInfo } from "@/components/site-info";
import { useGc, useLanguage } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";

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
  const { locale } = useLanguage();
  const pathname = usePathname();
  const { googleReviewsUrl } = useSiteInfo();
  const es = locale === "es";

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) {
      setStatus("error");
      return;
    }
    try {
      setStatus("sending");
      const currentPath =
        typeof window !== "undefined" && window.location.pathname
          ? window.location.pathname
          : pathname || "/";
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clean,
          language: locale,
          page: currentPath,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="mt-auto bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
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

          <nav className="lg:col-span-2" aria-label={g.footer.company}>
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

          <div id="contacto" className="scroll-mt-24 lg:col-span-3">
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

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-white">{es ? "Suscripción" : "Subscribe"}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {es
                ? "Suscríbete para recibir campañas publicitarias y contenido relevante de la empresa."
                : "Subscribe to receive promotional campaigns and relevant company content."}
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2.5" noValidate>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={es ? "Tu correo electrónico" : "Your email address"}
                  aria-label={es ? "Correo electrónico para suscribirse" : "Email address to subscribe"}
                  className="h-10 w-full border border-white/15 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-gold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-10 w-full items-center justify-center bg-gold px-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-gold-bright disabled:opacity-60"
              >
                {status === "sending"
                  ? es ? "Enviando..." : "Sending..."
                  : es ? "Suscribirse" : "Subscribe"}
              </button>
              {status === "success" && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{es ? "¡Suscripción registrada con éxito!" : "Successfully subscribed!"}</span>
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-rose-400">
                  {es ? "Introduce un correo electrónico válido." : "Please enter a valid email address."}
                </p>
              )}
            </form>
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
