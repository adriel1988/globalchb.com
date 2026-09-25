"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { CITY_COORDS, PROJECTS, type ConstructionProject } from "@/lib/featured-projects";

// Contorno simplificado de Florida (lng, lat).
const FLORIDA: [number, number][] = [
  [-87.6, 31.0], [-85.0, 31.0], [-85.0, 30.9], [-84.86, 30.71], [-82.2, 30.57], [-82.05, 30.36], [-81.95, 30.72], [-81.45, 30.71],
  [-81.4, 30.35], [-81.25, 29.8], [-81.0, 29.2], [-80.75, 28.7], [-80.55, 28.3], [-80.6, 28.05], [-80.38, 27.6], [-80.2, 27.2],
  [-80.08, 26.95], [-80.03, 26.7], [-80.06, 26.45], [-80.08, 26.2], [-80.1, 26.0], [-80.12, 25.9], [-80.13, 25.78], [-80.2, 25.7],
  [-80.25, 25.62], [-80.33, 25.5], [-80.4, 25.3], [-80.5, 25.2], [-80.85, 25.15], [-81.1, 25.12], [-81.2, 25.3], [-81.35, 25.8],
  [-81.7, 25.95], [-81.85, 26.35], [-82.05, 26.55], [-82.2, 26.9], [-82.45, 27.2], [-82.65, 27.45], [-82.85, 27.85], [-82.7, 28.2],
  [-82.72, 28.6], [-82.65, 28.95], [-83.05, 29.15], [-83.45, 29.6], [-83.95, 30.05], [-84.35, 30.05], [-84.6, 29.9], [-85.05, 29.65],
  [-85.35, 29.68], [-85.45, 29.95], [-85.7, 30.1], [-86.3, 30.38], [-87.0, 30.38], [-87.45, 30.3], [-87.43, 30.48], [-87.6, 31.0],
];

type Proj = (lng: number, lat: number) => [number, number];
const MAIN: Proj = (lng, lat) => [(lng + 87.8) * 90, (31.2 - lat) * 100];
// Recuadro ampliado del sur de Florida (lng -80.45…-79.95, lat 25.62…26.58)
const INSET = { x: 760, y: 250, w: 130, h: 260, lng0: -80.45, lat0: 26.58, sx: 252, sy: 270 };
const INSET_PROJ: Proj = (lng, lat) => [INSET.x + (lng - INSET.lng0) * INSET.sx, INSET.y + (INSET.lat0 - lat) * INSET.sy];
const inInset = (lng: number, lat: number) => lng > -80.45 && lat < 26.58 && lat > 25.62;

const pathFor = (proj: Proj) => FLORIDA.map(([lng, lat], i) => `${i ? "L" : "M"}${proj(lng, lat).map((n) => n.toFixed(1)).join(",")}`).join(" ") + "Z";

type Group = { key: string; city: string; lng: number; lat: number; projects: ConstructionProject[] };

/** 09 — Mapa de proyectos en Florida. */
export function FloridaMap() {
  const g = useGc();
  const c = g.map;

  const groups = useMemo(() => {
    const map = new Map<string, Group>();
    for (const p of PROJECTS) {
      if (!p.coords || !p.city) continue;
      const key = p.city;
      if (!map.has(key)) map.set(key, { key, city: p.city, lng: p.coords.lng, lat: p.coords.lat, projects: [] });
      map.get(key)!.projects.push(p);
    }
    return [...map.values()];
  }, []);
  const unmapped = PROJECTS.filter((p) => !p.coords);

  const [active, setActive] = useState<string>(groups[0]?.key ?? "");
  const activeGroup = groups.find((gr) => gr.key === active) ?? groups[0];

  const hq = CITY_COORDS.davie;
  const [bx0, by0] = MAIN(INSET.lng0, INSET.lat0);
  const [bx1, by1] = MAIN(-79.95, 25.62);

  const Pin = ({ gr, proj }: { gr: Group; proj: Proj }) => {
    const [x, y] = proj(gr.lng, gr.lat);
    const on = gr.key === activeGroup?.key;
    return (
      <g
        role="button"
        tabIndex={0}
        aria-label={`${gr.city}: ${gr.projects.map((p) => p.name).join(", ")}`}
        aria-pressed={on}
        onClick={() => setActive(gr.key)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(gr.key))}
        className="cursor-pointer focus:outline-none"
      >
        <circle cx={x} cy={y} r={on ? 16 : 11} className={on ? "fill-gold/25" : "fill-gold/10"} />
        <circle cx={x} cy={y} r={6} className={on ? "fill-gold" : "fill-white"} stroke="#0a1628" strokeWidth={2} />
      </g>
    );
  };

  return (
    <section className="bg-navy-800 py-20 text-white sm:py-28" aria-labelledby="map-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="map-title" kicker={c.kicker} title={c.title} subtitle={c.subtitle} dark />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <svg viewBox="0 0 900 720" className="h-auto w-full" role="group" aria-label={c.title}>
              <defs>
                <clipPath id="fl-inset-clip">
                  <rect x={INSET.x} y={INSET.y} width={INSET.w} height={INSET.h} />
                </clipPath>
              </defs>
              <path d={pathFor(MAIN)} className="fill-navy-700" stroke="rgba(255,255,255,0.25)" strokeWidth={1.2} />

              {/* Recuadro ampliado */}
              <rect x={bx0} y={by0} width={bx1 - bx0} height={by1 - by0} fill="none" stroke="#c9a227" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={bx1} y1={by0} x2={INSET.x} y2={INSET.y} stroke="#c9a227" strokeOpacity={0.5} strokeWidth={1} />
              <line x1={bx1} y1={by1} x2={INSET.x} y2={INSET.y + INSET.h} stroke="#c9a227" strokeOpacity={0.5} strokeWidth={1} />
              <rect x={INSET.x} y={INSET.y} width={INSET.w} height={INSET.h} className="fill-navy" stroke="#c9a227" strokeWidth={1} />
              <g clipPath="url(#fl-inset-clip)">
                <path d={pathFor(INSET_PROJ)} className="fill-navy-700" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
              </g>

              {/* Oficina central */}
              {(() => {
                const [x, y] = INSET_PROJ(hq.lng, hq.lat);
                return (
                  <g aria-label={c.hq}>
                    <rect x={x - 5} y={y - 5} width={10} height={10} fill="none" stroke="#c9a227" strokeWidth={2} transform={`rotate(45 ${x} ${y})`} />
                  </g>
                );
              })()}

              {groups.map((gr) =>
                inInset(gr.lng, gr.lat) ? <Pin key={gr.key} gr={gr} proj={INSET_PROJ} /> : <Pin key={gr.key} gr={gr} proj={MAIN} />,
              )}
            </svg>
            <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 border-2 border-gold" />
              {c.hq}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-2">
              {groups.map((gr) => (
                <button
                  key={gr.key}
                  type="button"
                  onClick={() => setActive(gr.key)}
                  aria-pressed={gr.key === activeGroup?.key}
                  className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    gr.key === activeGroup?.key ? "border-gold bg-gold text-navy" : "border-white/20 text-slate-300 hover:border-white"
                  }`}
                >
                  {gr.city}
                </button>
              ))}
            </div>

            {activeGroup && (
              <ul className="mt-6 space-y-4" aria-live="polite">
                {activeGroup.projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="group flex gap-4 border border-white/10 bg-navy/60 p-3 hover:border-gold/60">
                      <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-navy-700">
                        {p.image ? (
                          <Image src={p.image} alt="" fill sizes="128px" className="object-cover" />
                        ) : (
                          <div className="tech-grid flex h-full items-center justify-center" aria-hidden="true">
                            <MapPin className="h-6 w-6 text-gold/60" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 py-1">
                        <p className="font-display text-xl leading-tight">{p.name}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {[p.city, p.type ? g.types[p.type] : null, p.units ? `${p.units} ${g.featured.units}` : null].filter(Boolean).join(" · ")}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">{p.scope.map((s) => g.scope[s]).join(" · ")}</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                          {p.status ? g.status[p.status] : null}
                          <span className="ml-3 text-white group-hover:text-gold">{c.viewProject} →</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {unmapped.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="eyebrow text-slate-400">{c.otherProjects}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {unmapped.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="text-slate-200 hover:text-gold">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <dl className="mt-8 space-y-3 border-t border-white/10 pt-6">
              {c.markets.map((m) => (
                <div key={m.name}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{m.name}</dt>
                  <dd className="text-sm text-slate-300">{m.cities}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
