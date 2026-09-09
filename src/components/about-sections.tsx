"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ArrowRight, Building, Landmark, MapPin } from "lucide-react";

const featureIcons = [Landmark, Building, MapPin];

/** OUR COMPANY — quién es el contratista */
export function CompanySection() {
  const { t } = useLanguage();
  return (
    <section id="company" className="bg-background py-20 sm:py-24" aria-labelledby="company-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.company.kicker}</p>
            <h2 id="company-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
              {t.company.title}
            </h2>
            <span
              aria-hidden="true"
              className="mt-5 block h-px w-24 bg-gradient-to-r from-primary to-transparent"
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.company.p1}</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.company.p2}</p>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.company.features.map((f, i) => {
                const Icon = featureIcons[i] ?? Landmark;
                return (
                  <div
                    key={f.title}
                    className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_rgba(212,160,23,0.35)]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 select-none text-5xl font-normal text-primary/10"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent text-primary ring-1 ring-inset ring-primary/30">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <dt className="mt-3 text-sm font-normal leading-snug">{f.title}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</dd>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/about-company.png"
                alt="Equipo de electricistas revisando planos en obra"
                width={1152}
                height={864}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-xl border border-primary/40 bg-slate-950 p-4 text-white shadow-xl sm:-left-6">
              <p className="text-2xl font-normal text-primary">7+</p>
              <p className="text-xs font-medium text-slate-300">{t.hero.stats[0].label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** OUR WORK IN ACTION: SUCCESS STORIES */
export function StoriesSection() {
  const { t } = useLanguage();
  return (
    <section id="stories" className="relative overflow-hidden bg-secondary/40 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, oklch(0.695 0.133 85) 0, transparent 45%), radial-gradient(circle at 85% 85%, oklch(0.695 0.133 85) 0, transparent 40%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.stories.kicker}</p>
            <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.stories.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">{t.stories.subtitle}</p>
            <div className="mt-8">
              <Link href="/proyectos">
                <Button size="lg">
                  {t.stories.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Exciting Projects on the Horizon */
export function HorizonSection() {
  const { t } = useLanguage();
  return (
    <section id="horizon" className="bg-background py-20 sm:py-24" aria-labelledby="horizon-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.horizon.kicker}</p>
          <h2 id="horizon-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.horizon.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.horizon.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {t.horizon.projects.map((name) => (
            <li key={name}>
              <div className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_rgba(212,160,23,0.35)]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent text-primary ring-1 ring-inset ring-primary/30">
                  <Building className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-normal leading-snug">{name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Bay Harbor Islands, FL</p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-primary/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          {t.horizon.closing}
        </p>
      </div>
    </section>
  );
}
