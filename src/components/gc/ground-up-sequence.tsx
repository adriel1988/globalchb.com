"use client";

import Link from "next/link";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";

/** 05 — Obra nueva: secuencia de 10 fases, del subterráneo a la entrega. */
export function GroundUpSequence({ showCta = true }: { showCta?: boolean }) {
  const c = useGc().groundUp;

  return (
    <section className="tech-grid-light bg-offwhite py-20 sm:py-28" aria-labelledby="ground-up-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="ground-up-title"
          kicker={c.kicker}
          title={c.title}
          subtitle={c.subtitle}
          action={
            showCta ? (
              <Link href="/new-construction" className="text-sm font-semibold uppercase tracking-[0.16em] text-navy hover:text-gold">
                {c.cta} →
              </Link>
            ) : undefined
          }
        />

        <ol className="relative mt-14 grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {c.steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-6 pb-10 md:[&:nth-child(n+9)]:pb-0">
              <div className="flex flex-col items-center">
                <span className="stat-number flex h-14 w-14 shrink-0 items-center justify-center border border-navy bg-navy text-xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="mt-2 w-px flex-1 bg-navy/20" />
              </div>
              <div className="pt-2">
                <h3 className="font-display text-2xl text-navy sm:text-3xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.items}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
