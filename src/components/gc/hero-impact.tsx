"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useGc } from "@/components/language-provider";
import { COMPANY_FACTS } from "@/lib/company-facts";

/**
 * Secuencia cinematográfica mientras no exista el video real del Hero:
 * edificio → subterráneo → cuarto eléctrico → switchgear → trazado → edificio terminado.
 * Cuando COMPANY_FACTS.heroVideo tenga valor, se reproduce el video (sin audio).
 */
const FRAMES = [
  "/images/Experiencia.webp",
  "/images/about-company.webp",
  "/images/svc-commercial-panel.png",
  "/images/svc-3phase.png",
  "/images/svc-trimble.png",
  "/images/proj-southpoint.png",
];
const FRAME_MS = 4200;

export function HeroImpact() {
  const c = useGc().hero;
  const [frame, setFrame] = useState(0);
  const video = COMPANY_FACTS.heroVideo;

  useEffect(() => {
    if (video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), FRAME_MS);
    return () => window.clearInterval(id);
  }, [video]);

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white">
      <div className="absolute inset-0" aria-hidden="true">
        {video ? (
          <video
            className="h-full w-full object-cover"
            src={video}
            poster={COMPANY_FACTS.heroVideoPoster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          FRAMES.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${i === frame ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${i === frame ? "animate-kenburns" : ""}`}
              />
            </div>
          ))
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div className="tech-grid absolute inset-0 opacity-60" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6 lg:px-8">
        <p className="eyebrow flex items-center gap-3 text-gold">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          {c.eyebrow}
        </p>
        <h1 className="font-display mt-6 max-w-5xl text-[3.4rem] sm:text-7xl lg:text-[7.5rem]">{c.title}</h1>
        <p className="mt-8 flex max-w-4xl flex-wrap gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-[0.14em] text-slate-200 sm:text-base">
          {c.systems.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="text-gold">•</span>}
              {s}
            </span>
          ))}
        </p>
        <p className="mt-4 max-w-3xl text-base text-slate-400 sm:text-lg">{c.tagline}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex h-14 items-center justify-center gap-2 border border-white/40 px-8 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white hover:text-navy"
          >
            {c.ctaProjects}
          </Link>
          <Link
            href="/request-a-proposal"
            className="inline-flex h-14 items-center justify-center gap-2 bg-gold px-8 text-sm font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-gold-bright"
          >
            {c.ctaProposal}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-navy/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pb-4 sm:pr-24 lg:px-8 lg:pr-24">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            {c.microbar.map((m, i) => (
              <li key={m} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/25" />}
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
