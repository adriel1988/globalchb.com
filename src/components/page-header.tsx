"use client";

import { useLanguage } from "@/components/language-provider";

type Copy = { kicker?: string; title: string; subtitle?: string };

export function PageHeader({ es, en }: { es: Copy; en: Copy }) {
  const { locale } = useLanguage();
  const c = locale === "es" ? es : en;

  return (
    <section className="relative overflow-hidden bg-slate-950 pb-16 pt-[128px] text-white sm:pb-20">
      {/* Resplandor dorado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 62% 58% at 50% -12%, oklch(0.695 0.133 85) 0, transparent 62%)",
        }}
      />
      {/* Filete inferior dorado */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {c.kicker ? (
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            {c.kicker}
          </p>
        ) : null}

        <h1 className="mt-2 max-w-3xl text-3xl font-normal tracking-tight sm:text-4xl lg:text-5xl">
          {c.title}
        </h1>
        {c.subtitle ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{c.subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
