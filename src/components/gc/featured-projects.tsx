"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { ProjectCard } from "@/components/gc/project-card";
import { FEATURED_PROJECTS } from "@/lib/featured-projects";

/** 02 — PRUEBA: 6 proyectos destacados, el primero a doble tamaño. */
export function FeaturedProjects() {
  const c = useGc().featured;
  const projects = FEATURED_PROJECTS.slice(0, 6);

  return (
    <section id="selected-work" className="scroll-mt-20 bg-offwhite py-20 sm:py-28" aria-labelledby="selected-work-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="selected-work-title"
          kicker={c.kicker}
          title={c.title}
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-navy hover:text-gold"
            >
              {c.viewAll}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              large={i === 0}
              className={i === 0 ? "sm:col-span-2 lg:row-span-2" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
