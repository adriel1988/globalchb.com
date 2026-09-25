"use client";

import Link from "next/link";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";

/** 06 — Capacidad de ejecución: preconstrucción → cierre. */
export function BuiltToExecute() {
  const g = useGc();
  const c = g.execute;

  return (
    <section className="bg-charcoal py-20 text-white sm:py-28" aria-labelledby="execute-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="execute-title" kicker={c.kicker} title={c.title} subtitle={c.subtitle} dark />
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {c.phases.map((p, i) => (
            <div key={p.title} className="bg-charcoal p-7">
              <p className="stat-number text-sm text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-3 text-2xl">{p.title}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/request-a-proposal"
            className="group flex flex-col justify-end bg-gold p-7 text-navy transition-colors hover:bg-gold-bright"
          >
            <span className="font-display text-3xl">{g.nav.rfp}</span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-[0.16em]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
