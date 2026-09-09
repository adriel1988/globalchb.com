"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Wrench, PlugZap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";

const badgeIcons = [BadgeCheck, Wrench, PlugZap];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden bg-black">
      {/* Foto de los cables de alta tensión — pegada arriba, a todo lo ancho, sin distorsión y sin sombra azul */}
      <Image
        src="/images/hero-brand-panoramic.png"
        alt={t.hero.imageAlt}
        width={1376}
        height={768}
        priority
        className="absolute left-0 top-0 h-auto w-full opacity-55"
      />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/60 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.title.split(t.hero.highlight)[0]}
            <span className="text-primary">{t.hero.highlight}</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={COMPANY.contactUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <Link
              href="/servicios"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 bg-white/5 px-8 text-sm font-medium text-white transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {t.hero.badges.map((b, i) => {
            const Icon = badgeIcons[i] ?? BadgeCheck;
            return (
              <div
                key={b.title}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/20 text-amber-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-normal text-white">{b.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-normal text-white sm:text-3xl">
                <span className="text-primary">{s.value}</span>
              </dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
