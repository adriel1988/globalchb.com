"use client";

import { useState } from "react";
import { useGc } from "@/components/language-provider";
import { ProjectCard } from "@/components/gc/project-card";
import { PROJECTS, type ProjectType } from "@/lib/featured-projects";

/** Portafolio completo con filtro por tipo. Proyectos con foto primero. */
export function ProjectsIndex() {
  const g = useGc();
  const [filter, setFilter] = useState<ProjectType | "all">("all");
  const types = [...new Set(PROJECTS.map((p) => p.type).filter(Boolean))] as ProjectType[];
  const list = PROJECTS.filter((p) => filter === "all" || p.type === filter).sort(
    (a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)),
  );

  return (
    <section className="bg-offwhite py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2" role="group">
          {(["all", ...types] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                filter === t ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-navy"
              }`}
            >
              {t === "all" ? g.pages.projects.kicker : g.types[t]}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
