"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useGc } from "@/components/language-provider";
import type { ConstructionProject } from "@/lib/featured-projects";
import { cn } from "@/lib/utils";

/** Tarjeta de proyecto: la foto es protagonista; sin párrafos. */
export function ProjectCard({
  project,
  large = false,
  index,
  className,
}: {
  project: ConstructionProject;
  large?: boolean;
  index?: number;
  className?: string;
}) {
  const g = useGc();
  const p = project;
  const facts = [
    p.units ? `${p.units.toLocaleString("en-US")} ${g.featured.units}` : null,
    p.stories ? `${p.stories} ${g.featured.stories}` : null,
    p.squareFeet ? `${p.squareFeet.toLocaleString("en-US")} ${g.featured.sf}` : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/projects/${p.slug}`}
      className={cn(
        "group relative flex overflow-hidden bg-navy-800 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        large ? "min-h-[28rem] lg:min-h-[40rem]" : "min-h-[22rem]",
        className,
      )}
    >
      {p.image ? (
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="tech-grid absolute inset-0 bg-gradient-to-br from-navy-700 to-navy" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" aria-hidden="true" />

      {typeof index === "number" && (
        <span aria-hidden="true" className="stat-number absolute left-5 top-5 text-lg text-white/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/30 bg-navy/40 backdrop-blur-sm transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy"
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>

      <div className="relative mt-auto w-full p-6 sm:p-8">
        <h3 className={cn("font-display", large ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl")}>{p.name}</h3>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
          {p.city && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {p.city}, Florida
            </span>
          )}
          {p.type && <span>{g.types[p.type]}</span>}
        </p>
        {facts.length > 0 && (
          <p className="stat-number mt-4 text-2xl text-gold sm:text-3xl">{facts.join(" · ")}</p>
        )}
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          {p.scope.map((s) => g.scope[s]).join(" · ")}
        </p>
        {p.partnerAuthorized && p.partner && <p className="mt-2 text-xs text-slate-400">{p.partner}</p>}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white group-hover:text-gold">
          {g.featured.viewCaseStudy} →
        </span>
      </div>
    </Link>
  );
}
