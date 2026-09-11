"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { BadgeCheck, Crosshair, PlugZap, Users } from "lucide-react";

export function ProcessSection() {
  const { t } = useLanguage();
  return (
    <section id="process" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 50% at 50% 110%, oklch(0.695 0.133 85) 0, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.process.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.process.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.process.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step) => (
            <li
              key={step.num}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.07]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-6 select-none text-4xl font-normal leading-none text-primary/20 transition-colors duration-300 group-hover:text-primary/30"
              >
                {step.num}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-sm tabular-nums text-primary ring-1 ring-inset ring-primary/35">
                {step.num}
              </span>
              <h3 className="mt-4 text-lg font-normal leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const whyIcons = [BadgeCheck, Crosshair, PlugZap, Users];

export function WhyUsSection() {
  const { t } = useLanguage();
  return (
    <section id="why" className="bg-background py-20 sm:py-24" aria-labelledby="why-us-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.whyUs.kicker}</p>
            <h2 id="why-us-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
              {t.whyUs.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.whyUs.subtitle}</p>

            <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {t.whyUs.items.map((item, i) => {
                const Icon = whyIcons[i] ?? BadgeCheck;
                return (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-sm font-normal">{item.title}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/Experiencia.webp"
                alt="Experiencia eléctrica que se traduce en resultados — Global Technology &amp; Electrical Services"
                width={1152}
                height={864}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-xl bg-slate-950 p-4 text-white shadow-xl sm:-left-6">
              <p className="text-2xl font-normal text-primary">{t.hero.stats[0].value}</p>
              <p className="text-xs font-medium text-slate-300">{t.hero.stats[0].label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
