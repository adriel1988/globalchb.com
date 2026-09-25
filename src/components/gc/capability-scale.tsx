"use client";

import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { COMPANY_FACTS } from "@/lib/company-facts";
import { PORTFOLIO_STATS } from "@/lib/featured-projects";

/** 03 — CAPACIDAD: números enormes. Solo cifras verificables (las null no se muestran). */
export function CapabilityScale() {
  const g = useGc();
  const c = g.scale;
  const f = COMPANY_FACTS;

  const stats: { value: string; label: string }[] = [
    { value: `${PORTFOLIO_STATS.projects}+`, label: c.projects },
    PORTFOLIO_STATS.multifamilyUnits > 0
      ? { value: `${PORTFOLIO_STATS.multifamilyUnits.toLocaleString("en-US")}+`, label: c.units }
      : null,
    { value: String(PORTFOLIO_STATS.cities), label: c.cities },
    { value: String(g.capabilities.items.length), label: c.systems },
    f.personnel ? { value: `${f.personnel}+`, label: c.personnel } : null,
    f.bondingCapacityM ? { value: `$${f.bondingCapacityM}M`, label: c.bonding } : null,
    f.insuranceCoverageM ? { value: `$${f.insuranceCoverageM}M`, label: c.insurance } : null,
    f.combinedExperienceYears ? { value: `${f.combinedExperienceYears}+`, label: c.experience } : null,
    f.establishedYear ? { value: String(f.establishedYear), label: c.established } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section className="tech-grid relative overflow-hidden bg-navy py-20 text-white sm:py-28" aria-labelledby="scale-title">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="scale-title" kicker={c.kicker} title={c.title} dark />
        <dl className={`mt-14 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 ${stats.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-b border-white/10 py-8 sm:pr-8 lg:pl-8 lg:[&:not(:last-child)]:border-r">
              <dt className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{s.label}</dt>
              <dd className="stat-number text-7xl text-white sm:text-8xl lg:text-9xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-slate-500">{c.footnote}</p>
      </div>
    </section>
  );
}
