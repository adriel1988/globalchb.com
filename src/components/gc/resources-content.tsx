"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGc, useLanguage } from "@/components/language-provider";
import type { ServiceItem } from "@/components/services-section";
import { COMPANY } from "@/lib/i18n";

/** Recursos: precalificación, servicio residencial (catálogo de Supabase) y soluciones de producto. */
export function ResourcesContent({ services }: { services: ServiceItem[] }) {
  const c = useGc().resources;
  const { locale } = useLanguage();

  return (
    <section className="bg-offwhite py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <article className="flex flex-col bg-navy p-8 text-white">
          <h2 className="font-display text-3xl">{c.prequal.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.prequal.desc}</p>
          <Link
            href="/request-a-proposal"
            className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-gold hover:text-white"
          >
            {c.prequal.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </article>

        <article id="residential" className="flex scroll-mt-24 flex-col border border-navy/15 bg-white p-8">
          <h2 className="font-display text-3xl text-navy">{c.residential.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.residential.desc}</p>
          {services.length > 0 ? (
            <ul className="custom-scrollbar mt-6 max-h-[26rem] divide-y divide-slate-200 overflow-y-auto overscroll-contain border-y border-slate-200 pr-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={COMPANY.contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 py-3"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-navy group-hover:text-gold">
                        {locale === "es" ? s.nameEs : s.nameEn}
                      </span>
                      {(locale === "es" ? s.descEs : s.descEn) && (
                        <span className="mt-1 line-clamp-2 block text-xs text-slate-500">{locale === "es" ? s.descEs : s.descEn}</span>
                      )}
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-gold" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-slate-500">{c.residential.empty}</p>
          )}
          <a
            href={COMPANY.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-gold"
          >
            {c.residential.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </article>

        <article className="flex flex-col border border-navy/15 bg-white p-8">
          <h2 className="font-display text-3xl text-navy">{c.products.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.products.desc}</p>
          <Link
            href="/catalogo"
            className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-gold"
          >
            {c.products.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  );
}
