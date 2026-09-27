"use client";

import { BadgeCheck, ShieldCheck, Landmark, HardHat, Boxes, ClipboardCheck } from "lucide-react";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { GoogleReviewsCta } from "@/components/site-info";
import { CLIENT_EXPERIENCE, COMPANY_FACTS } from "@/lib/company-facts";

const ICONS = [BadgeCheck, ShieldCheck, Landmark, HardHat, Boxes, ClipboardCheck];

/** 10 — Confianza: credenciales + relaciones (solo nombres autorizados). */
export function TrustedExperience() {
  const c = useGc().trust;
  const partners = CLIENT_EXPERIENCE.filter((p) => p.authorized);

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="trust-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="trust-title" kicker={c.kicker} title={c.title} />
        <ul className="mt-14 grid grid-cols-1 border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((it, i) => {
            const Icon = ICONS[i] ?? BadgeCheck;
            return (
              <li key={it.title} className="border-b border-r border-slate-200 p-7">
                <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
                <h3 className="font-display mt-4 text-2xl text-navy">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {it.desc}
                  {i === 0 && COMPANY_FACTS.stateLicenseNumber ? ` ${c.license}: ${COMPANY_FACTS.stateLicenseNumber}` : ""}
                </p>
              </li>
            );
          })}
        </ul>

        {/* Reseñas de Google (solo si el CRM tiene un enlace válido guardado) */}
        <GoogleReviewsCta />

        {partners.length > 0 && (
          <div className="mt-14 border-y border-slate-200 py-8 text-center">
            <p className="eyebrow text-slate-500">{c.alongside}</p>
            <p className="font-display mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-2xl text-navy/80">
              {partners.map((p, i) => (
                <span key={p.name} className="flex items-center gap-6">
                  {i > 0 && <span aria-hidden="true" className="text-gold">|</span>}
                  {p.name}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
