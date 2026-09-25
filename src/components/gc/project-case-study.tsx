"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGc, useLanguage } from "@/components/language-provider";
import { PROJECTS, type ConstructionProject } from "@/lib/featured-projects";

/** Página de caso de estudio: Hero → Snapshot → Scope → Challenge / Solution / Execution / Result. */
export function ProjectCaseStudy({ project }: { project: ConstructionProject }) {
  const g = useGc();
  const { locale } = useLanguage();
  const c = g.caseStudies;
  const p = project;
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const snapshot = [
    [c.location, p.city ? `${p.city}, FL` : null],
    [c.projectType, p.type ? g.types[p.type] : null],
    [c.units, p.units ? p.units.toLocaleString("en-US") : null],
    [c.stories, p.stories ? String(p.stories) : null],
    [c.area, p.squareFeet ? `${p.squareFeet.toLocaleString("en-US")} ${g.featured.sf}` : null],
    [c.gc, p.partnerAuthorized ? p.partner : null],
    [c.status, p.status ? g.status[p.status] : null],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  const photos = [p.image, ...p.gallery].filter(Boolean) as string[];

  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-navy text-white">
        {p.image ? (
          <Image src={p.image} alt={p.name} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="tech-grid absolute inset-0 bg-gradient-to-br from-navy-700 to-navy" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/20" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-40 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-gold">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {c.backToProjects}
          </Link>
          <h1 className="font-display mt-6 text-5xl sm:text-7xl lg:text-8xl">{p.name}</h1>
          <p className="mt-4 text-lg text-slate-300">
            {[p.city ? `${p.city}, Florida` : null, p.type ? g.types[p.type] : null].filter(Boolean).join(" · ")}
          </p>
          {p.units && (
            <p className="stat-number mt-6 text-6xl text-gold sm:text-7xl">
              {p.units} <span className="text-3xl text-white/80">{g.featured.units}</span>
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <aside className="lg:col-span-4">
            <p className="eyebrow text-gold">{c.snapshot}</p>
            <dl className="mt-5 border-t border-navy/15">
              {snapshot.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-navy/15 py-3 text-sm">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="eyebrow mt-10 text-gold">{c.contractScope}</p>
            <ul className="mt-4 space-y-2">
              {p.scope.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm font-semibold text-navy">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-gold" />
                  {g.scope[s]}
                </li>
              ))}
            </ul>
          </aside>

          <div className="lg:col-span-8">
            <p className="eyebrow text-gold">{c.overview}</p>
            <p className="mt-4 text-xl leading-relaxed text-navy">{p.summary[locale]}</p>

            {p.caseStudy && (
              <div className="mt-12 grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3">
                {(
                  [
                    [c.challenge, p.caseStudy.challenge[locale]],
                    [c.solution, p.caseStudy.solution[locale]],
                    [c.result, p.caseStudy.result[locale]],
                  ] as const
                ).map(([label, text]) => (
                  <div key={label} className="bg-offwhite p-6">
                    <h2 className="font-display text-2xl text-navy">{label}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            )}

            {photos.length > 1 && (
              <>
                <h2 className="eyebrow mt-12 text-gold">{c.execution}</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {photos.map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden bg-navy">
                      <Image src={src} alt={p.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-display text-4xl">{c.similarCta}</p>
            <p className="mt-2 text-slate-300">{c.similarText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request-a-proposal"
              className="inline-flex h-12 items-center justify-center bg-gold px-6 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:bg-gold-bright"
            >
              {g.nav.rfp}
            </Link>
            {next && next.slug !== p.slug && (
              <Link
                href={`/projects/${next.slug}`}
                className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-6 text-xs font-semibold uppercase tracking-[0.16em] hover:border-white"
              >
                {c.nextProject}: {next.name}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
