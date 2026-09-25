"use client";

import Image from "next/image";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";

/** Equipo: estructura real de ejecución (no "somos organizados"). */
export function TeamStructure() {
  const c = useGc().team;
  return (
    <section id="team" className="scroll-mt-20 bg-offwhite py-20 sm:py-28" aria-labelledby="team-title">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy">
          <Image src="/images/team.webp" alt={c.photoAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionHeading id="team-title" kicker={c.kicker} title={c.title} />
          <ol className="mt-8 grid grid-cols-1 border-t border-navy/15 sm:grid-cols-2">
            {c.roles.map((r, i) => (
              <li key={r} className="flex items-baseline gap-4 border-b border-navy/15 py-3">
                <span className="stat-number text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl text-navy">{r}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-base text-slate-600">{c.closing}</p>
        </div>
      </div>
    </section>
  );
}
