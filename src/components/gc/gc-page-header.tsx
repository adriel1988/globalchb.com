"use client";

import { useGc } from "@/components/language-provider";
import type { GcContent } from "@/lib/gc-content";

/** Cabecera de páginas internas: navy, retícula técnica, titular condensado. */
export function GcPageHeader({ page }: { page: keyof GcContent["pages"] }) {
  const c = useGc().pages[page];
  return (
    <section className="tech-grid relative overflow-hidden bg-navy pb-16 pt-36 text-white sm:pb-20 sm:pt-40">
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow flex items-center gap-3 text-gold">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {c.kicker}
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{c.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{c.subtitle}</p>
      </div>
    </section>
  );
}
