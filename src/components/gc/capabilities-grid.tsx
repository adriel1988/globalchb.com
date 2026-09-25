"use client";

import Image from "next/image";
import Link from "next/link";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import type { CapabilityKey } from "@/lib/gc-content";

export const CAPABILITY_IMAGES: Record<CapabilityKey, string> = {
  electrical: "/images/svc-commercial-panel.png",
  lifeSafety: "/images/proj-metropolitan.png",
  power: "/images/svc-3phase.png",
  lowVoltage: "/images/proj-coral-square.png",
  ev: "/images/svc-ev-charger.png",
  technology: "/images/svc-trimble.png",
};

/** 04 — 6 sistemas principales. Imagen + título + 2 líneas + Learn more. */
export function CapabilitiesGrid({ detailed = false, showHeading = true }: { detailed?: boolean; showHeading?: boolean }) {
  const c = useGc().capabilities;

  return (
    <section id="capabilities" className="scroll-mt-20 bg-white py-20 sm:py-28" aria-labelledby={showHeading ? "capabilities-title" : undefined}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && <SectionHeading id="capabilities-title" kicker={c.kicker} title={c.title} subtitle={c.subtitle} />}
        <div className={`grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-14" : ""}`}>
          {c.items.map((item, i) => (
            <article key={item.key} id={detailed ? item.key : undefined} className="group flex scroll-mt-24 flex-col bg-white">
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <Image
                  src={CAPABILITY_IMAGES[item.key]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" aria-hidden="true" />
                <span aria-hidden="true" className="stat-number absolute bottom-4 left-5 text-3xl text-white/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl text-navy">{item.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                {detailed && (
                  <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5 text-sm text-slate-700">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {!detailed && (
                  <Link
                    href={`/capabilities#${item.key}`}
                    className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:text-gold"
                  >
                    {c.learnMore} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
