"use client";

import Image from "next/image";
import Link from "next/link";
import { Boxes, Crosshair, LayoutDashboard, ClipboardCheck, Camera, FileCheck2 } from "lucide-react";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";

const ICONS = [Boxes, Crosshair, LayoutDashboard, ClipboardCheck, Camera, FileCheck2];

/** 07 — Tecnología como reducción de riesgo. Electric blue solo aquí (acento técnico). */
export function TechnologySection({ showCta = true }: { showCta?: boolean }) {
  const c = useGc().technology;

  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-navy py-20 text-white sm:py-28" aria-labelledby="technology-title" id="technology-detail">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block" aria-hidden="true">
        <Image src="/images/svc-trimble.png" alt="" fill sizes="50vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy/40" />
      </div>
      <div className="tech-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="technology-title"
          kicker={c.kicker}
          title={c.title}
          subtitle={c.subtitle}
          dark
          action={
            showCta ? (
              <Link href="/capabilities#technology-detail" className="text-sm font-semibold uppercase tracking-[0.16em] text-white hover:text-tech">
                {c.cta} →
              </Link>
            ) : undefined
          }
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((it, i) => {
            const Icon = ICONS[i] ?? Boxes;
            return (
              <div key={it.title} className="border border-white/10 bg-navy-800/80 p-7 backdrop-blur-sm transition-colors hover:border-tech/60">
                <Icon className="h-7 w-7 text-tech" aria-hidden="true" />
                <h3 className="font-display mt-5 text-2xl">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
