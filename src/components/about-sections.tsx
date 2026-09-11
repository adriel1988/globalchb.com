"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ArrowRight, Building, Landmark, MapPin, ChevronDown, ChevronUp, CheckCircle2, Shield } from "lucide-react";

const featureIcons = [Landmark, Building, MapPin];

/** OUR COMPANY — Quién es el contratista */
export function CompanySection() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const paragraphs = t.company.paragraphs ?? [t.company.p1, t.company.p2];
  const displayedParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <section id="company" className="bg-background py-20 sm:py-24" aria-labelledby="company-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.company.kicker}</p>
            <h2 id="company-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
              {t.company.title}
            </h2>
            <span
              aria-hidden="true"
              className="mt-5 block h-px w-24 bg-gradient-to-r from-primary to-transparent"
            />

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {displayedParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {paragraphs.length > 2 && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-primary border-primary/30 hover:bg-primary/10"
                >
                  {expanded ? (
                    <>
                      {t.company.showLess}
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t.company.showMore}
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

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
                      className="pointer-events-none absolute right-5 top-5 select-none text-3xl font-normal leading-none text-primary/20"
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
                src="/images/about-company.webp"
                alt="Equipo de electricistas revisando planos en obra"
                width={1152}
                height={864}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-xl border border-primary/40 bg-slate-950 p-4 text-white shadow-xl sm:-left-6">
              <p className="text-2xl font-normal text-primary">{t.hero.stats[0].value}</p>
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
  const [showAll, setShowAll] = useState(false);

  const items = t.stories.items ?? [];
  const visibleItems = showAll ? items : items.slice(0, 6);

  return (
    <section id="stories" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.stories.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.stories.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">{t.stories.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        {items.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, i) => (
              <article
                key={item.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-20px_rgba(212,160,23,0.35)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                      <Shield className="h-3 w-3" />
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium text-amber-400/90">{item.partner}</span>
                  </div>

                  <h3 className="mt-4 text-lg font-normal text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-1 text-xs text-primary/90">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {t.stories.status ?? "Completed & Delivered"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {items.length > 6 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="border-white/20 bg-white/5 text-white hover:bg-white/15"
            >
              {showAll ? (
                <>
                  {t.stories.showLess}
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  {t.stories.showMore}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}

          <Link href="/proyectos">
            <Button size="lg" className="shadow-lg shadow-primary/20">
              {t.stories.cta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
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
                  <p className="mt-0.5 text-xs text-muted-foreground">East Bay Harbor, FL</p>
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
