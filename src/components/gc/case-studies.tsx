"use client";

import Image from "next/image";
import Link from "next/link";
import { useGc, useLanguage } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { PROJECTS } from "@/lib/featured-projects";

/** 08 — Casos de estudio: reto → solución → resultado (solo proyectos con caso documentado). */
export function CaseStudiesSection() {
  const g = useGc();
  const { locale } = useLanguage();
  const c = g.caseStudies;
  const studies = PROJECTS.filter((p) => p.caseStudy).slice(0, 3);
  if (studies.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="case-studies-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="case-studies-title" kicker={c.kicker} title={c.title} />
        <div className="mt-14 space-y-6">
          {studies.map((p) => {
            const cs = p.caseStudy!;
            return (
              <article key={p.slug} className="grid grid-cols-1 border border-slate-200 lg:grid-cols-12">
                <div className="relative min-h-60 bg-navy lg:col-span-4">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  ) : (
                    <div className="tech-grid absolute inset-0 bg-gradient-to-br from-navy-700 to-navy" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="font-display text-3xl">{p.name}</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {[p.city, p.type ? g.types[p.type] : null].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3 lg:col-span-8">
                  {(
                    [
                      [c.challenge, cs.challenge[locale]],
                      [c.solution, cs.solution[locale]],
                      [c.result, cs.result[locale]],
                    ] as const
                  ).map(([label, text]) => (
                    <div key={label} className="bg-white p-7">
                      <p className="eyebrow text-gold">{label}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{text}</p>
                    </div>
                  ))}
                  <Link
                    href={`/projects/${p.slug}`}
                    className="bg-white px-7 pb-7 text-xs font-semibold uppercase tracking-[0.18em] text-navy hover:text-gold sm:col-span-3"
                  >
                    {c.read} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
