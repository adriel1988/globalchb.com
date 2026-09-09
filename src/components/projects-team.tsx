"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/components/language-provider";
import { Eye, MapPin, UserCog, HardHat, Users } from "lucide-react";

export type ProjectItem = {
  id: string;
  slug: string;
  name: string;
  location: string | null;
  image: string | null;
  descEs?: string | null;
  descEn?: string | null;
  category?: string | null;
};

const roleIcons = [UserCog, HardHat, Users];

/** OUR PROJECTS — galería de trabajos realizados */
export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const { t, locale } = useLanguage();
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const types = t.projects.types as Record<string, string>;
  const typeLabel = (cat: string | null | undefined) => (cat ? types[cat] ?? null : null);

  return (
    <section id="projects" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 45% at 85% -10%, oklch(0.695 0.133 85) 0, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.projects.kicker}</p>
          <h2 id="projects-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.projects.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.projects.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const featured = i === 0;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-300 hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  featured ? "sm:col-span-2 lg:row-span-2" : ""
                }`}
                aria-label={`${t.projects.viewProject}: ${p.name}`}
              >
                <div className={`relative w-full overflow-hidden bg-slate-900 ${featured ? "h-64 lg:h-full lg:min-h-[26rem]" : "h-64"}`}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      priority={featured}
                      sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center bg-gradient-to-br from-primary/25 via-slate-900 to-slate-950"
                      aria-hidden="true"
                    >
                      <MapPin className="h-10 w-10 text-primary/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" aria-hidden="true" />

                  {/* Índice */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 rounded-md border border-white/20 bg-black/40 px-2 py-0.5 text-xs tabular-nums text-white/90 backdrop-blur-sm"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Píldora "ver proyecto" al hover */}
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs text-primary-foreground opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.projects.viewProject}
                  </span>

                  {/* Nombre y ubicación */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className={`font-normal leading-snug text-white ${featured ? "text-xl" : "text-base"}`}>
                      {p.name}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {typeLabel(p.category) && (
                        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs text-primary-foreground">
                          {typeLabel(p.category)}
                        </span>
                      )}
                      {p.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-black/40 px-2.5 py-1 text-xs text-amber-300 backdrop-blur-sm">
                          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {p.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm font-medium uppercase tracking-widest text-slate-500">
          {t.projects.galleryTitle}
        </p>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogDescription className="sr-only">
            {selected?.location ?? t.projects.viewProject}
          </DialogDescription>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-6 text-lg">{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="relative h-72 overflow-hidden rounded-xl sm:h-96">
                {selected.image ? (
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="(min-width: 640px) 672px, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {typeLabel(selected.category) && (
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary ring-1 ring-inset ring-primary/30">
                    {typeLabel(selected.category)}
                  </span>
                )}
                {selected.location && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 px-2.5 py-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    {selected.location}
                  </span>
                )}
              </div>
              {(locale === "es" ? selected.descEs : selected.descEn) ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {locale === "es" ? selected.descEs : selected.descEn}
                </p>
              ) : null}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/** OUR TEAM */
export function TeamSection() {
  const { t } = useLanguage();
  return (
    <section id="team" className="bg-background py-20 sm:py-24" aria-labelledby="team-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-first lg:order-last">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/team.png"
                alt="Equipo de contratistas eléctricos profesionales en obra"
                width={1152}
                height={864}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-xl border border-primary/40 bg-slate-950 p-4 text-white shadow-xl sm:-right-6">
              <p className="text-2xl font-normal text-primary">100%</p>
              <p className="text-xs font-medium text-slate-300">{t.hero.stats[3].label}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.team.kicker}</p>
            <h2 id="team-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
              {t.team.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.team.p1}</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.team.p2}</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.team.p3}</p>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.team.roles.map((r, i) => {
                const Icon = roleIcons[i] ?? Users;
                return (
                  <div
                    key={r.title}
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
                    <dt className="mt-3 text-sm font-normal leading-snug">{r.title}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.desc}</dd>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
