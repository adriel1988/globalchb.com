"use client";

import Image from "next/image";
import Link from "next/link";
import { useGc, useLanguage } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import type { CapabilityKey } from "@/lib/gc-content";
import type { WebCapability } from "@/lib/supabase-data";

export const CAPABILITY_IMAGES: Record<CapabilityKey, string> = {
  electrical: "/images/svc-commercial-panel.png",
  lifeSafety: "/images/proj-metropolitan.png",
  power: "/images/svc-3phase.png",
  lowVoltage: "/images/proj-coral-square.png",
  ev: "/images/svc-ev-charger.png",
  technology: "/images/svc-trimble.png",
};

/** 04 — 6 sistemas principales. Imagen + título + 2 líneas + Learn more. */
export function CapabilitiesGrid({
  detailed = false,
  showHeading = true,
  items: dbItems,
}: {
  detailed?: boolean;
  showHeading?: boolean;
  /** Capacidades publicadas desde el CRM. Si no hay ninguna se usa el contenido por defecto. */
  items?: WebCapability[];
}) {
  const c = useGc().capabilities;
  const { locale } = useLanguage();

  type Card = { key: string; title: string; desc: string; bullets: string[]; image: string };
  const cards: Card[] =
    dbItems && dbItems.length > 0
      ? dbItems.map((it) => ({
          key: it.key,
          title: locale === "es" ? it.titleEs : it.titleEn,
          desc: locale === "es" ? it.descEs : it.descEn,
          bullets: locale === "es" ? it.bulletsEs : it.bulletsEn,
          image: it.photo ?? "", // sin foto en el CRM = espacio vacío (se sube desde Publicidad › Capacidades)
        }))
      : c.items.map((it) => ({ ...it, image: CAPABILITY_IMAGES[it.key] }));

  return (
    <section id="capabilities" className="scroll-mt-20 bg-white py-20 sm:py-28" aria-labelledby={showHeading ? "capabilities-title" : undefined}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && <SectionHeading id="capabilities-title" kicker={c.kicker} title={c.title} subtitle={c.subtitle} />}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-14" : ""}`}>
          {cards.map((item, i) => (
            <article key={item.key} id={detailed ? item.key : undefined} className="group flex scroll-mt-24 flex-col bg-white shadow-[0_0_0_1px_#e2e8f0]">
              <div className={`relative aspect-[16/10] overflow-hidden ${item.image ? "bg-navy" : "bg-white"}`}>
                {!item.image ? null : item.image.startsWith("http") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {item.image && <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" aria-hidden="true" />}
                <span aria-hidden="true" className={`stat-number absolute bottom-4 left-5 text-3xl ${item.image ? "text-white/80" : "text-slate-300"}`}>
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
