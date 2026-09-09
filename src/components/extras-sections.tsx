"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Crosshair,
  FileCheck2,
  HardHat,
  Languages,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

const assuranceIcons: LucideIcon[] = [FileCheck2, ShieldCheck, ClipboardCheck, Languages];

/** GARANTÍAS DE SERVICIO — respaldo incluido en cada trabajo (página /servicios) */
export function AssurancesSection() {
  const { t } = useLanguage();
  return (
    <section id="assurances" className="bg-secondary/40 py-20 sm:py-24" aria-labelledby="assurances-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.assurances.kicker}</p>
          <h2 id="assurances-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.assurances.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.assurances.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.assurances.items.map((item, i) => {
            const Icon = assuranceIcons[i] ?? ShieldCheck;
            return (
              <li
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_rgba(212,160,23,0.35)]"
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
                <h3 className="mt-4 text-base font-normal leading-snug">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** ÁREA DE SERVICIO — ciudades cubiertas (páginas /servicios y /contacto) */
export function ServiceAreasSection({ withCta = false }: { withCta?: boolean }) {
  const { t } = useLanguage();
  return (
    <section id="areas" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24" aria-labelledby="areas-title">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 50% at 50% 110%, oklch(0.695 0.133 85) 0, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.areas.kicker}</p>
          <h2 id="areas-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.areas.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.areas.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {t.areas.cities.map((city) => (
            <li
              key={city}
              className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors duration-300 hover:border-primary/50 hover:bg-white/[0.08]"
            >
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="truncate text-sm text-slate-200 transition-colors group-hover:text-white">{city}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-slate-400">{t.areas.note}</p>

        {withCta && (
          <div className="mt-8 flex justify-center">
            <Link href="/contacto">
              <Button size="lg">
                {t.nav.cta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/** FRANJA DE CIFRAS — reutiliza las estadísticas del hero (página /proyectos) */
export function StatsStrip() {
  const { t } = useLanguage();
  return (
    <section className="bg-background py-14 sm:py-16" aria-label={t.hero.stats[1].label}>
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {t.hero.stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 text-center"
          >
            <dd className="text-3xl font-normal tabular-nums text-primary sm:text-4xl">{s.value}</dd>
            <dt className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</dt>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />
          </div>
        ))}
      </dl>
    </section>
  );
}

/** CAPACIDADES DEL EQUIPO — detalle operativo (página /equipo) */
const capIcons: LucideIcon[] = [Users, HardHat, MessagesSquare, Truck];

export function TeamCapabilitiesSection() {
  const { t } = useLanguage();
  return (
    <section id="capabilities" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24" aria-labelledby="caps-title">
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
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.teamCaps.kicker}</p>
          <h2 id="caps-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.teamCaps.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.teamCaps.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.teamCaps.items.map((item, i) => {
            const Icon = capIcons[i] ?? Users;
            return (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.07]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 select-none text-7xl font-normal text-primary/10 transition-colors duration-300 group-hover:text-primary/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/35">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-normal leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** PILARES DE LA TRAYECTORIA — historia resumida (página /nosotros) */
const pillarIcons: LucideIcon[] = [BadgeCheck, Crosshair, ClipboardCheck, Users];

export function PillarsSection() {
  const { t } = useLanguage();
  return (
    <section id="pillars" className="bg-background py-20 sm:py-24" aria-labelledby="pillars-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.pillars.kicker}</p>
          <h2 id="pillars-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.pillars.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.pillars.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.pillars.items.map((item, i) => {
            const Icon = pillarIcons[i] ?? BadgeCheck;
            return (
              <li
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_rgba(212,160,23,0.35)]"
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
                <h3 className="mt-4 text-base font-normal leading-snug">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** CERTIFICACIONES Y CUMPLIMIENTO — franja final (página /nosotros) */
const certIcons: LucideIcon[] = [ShieldCheck, BadgeCheck, FileCheck2, Languages];

export function CertsSection() {
  const { t } = useLanguage();
  return (
    <section id="certs" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24" aria-labelledby="certs-title">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 15% -10%, oklch(0.695 0.133 85) 0, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.certs.kicker}</p>
          <h2 id="certs-title" className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {t.certs.title}
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.certs.items.map((item, i) => {
            const Icon = certIcons[i] ?? ShieldCheck;
            return (
              <li
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.07]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/35">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-normal leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
