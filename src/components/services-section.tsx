"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useOrder } from "@/components/order-context";
import {
  HousePlug,
  Building2,
  Factory,
  Crosshair,
  PlugZap,
  Lightbulb,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  icon: string;
  category?: string | null;
  /** Tarifa de `service_catalog.rate` (0 o null = sin precio publicado). */
  rate?: number | null;
  /** `flat rate` | `per hour` | `per unit` | `per sq ft` */
  rateUnit?: string | null;
  image?: string | null;
};

const iconMap: Record<string, LucideIcon> = {
  HousePlug,
  Building2,
  Factory,
  Crosshair,
  PlugZap,
  Lightbulb,
};

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  const { t, locale } = useLanguage();
  const { openOrder } = useOrder();

  const onSelect = (name: string) => openOrder({ type: "service", name });

  return (
    <section id="services" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.services.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.services.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.services.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? HousePlug;
            const name = locale === "es" ? s.nameEs : s.nameEn;
            const desc = locale === "es" ? s.descEs : s.descEn;
            return (
              <article
                key={s.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_48px_-24px_rgba(212,160,23,0.4)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-lg font-normal leading-snug">{name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>

                <div className="mt-5 border-t border-border/70 pt-4">
                  <Button
                    className="w-full"
                    onClick={() => onSelect(name)}
                    aria-label={`${t.services.requestInfo}: ${name}`}
                  >
                    {t.services.requestInfo}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
