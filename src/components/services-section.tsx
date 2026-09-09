"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
};

const iconMap: Record<string, LucideIcon> = {
  HousePlug,
  Building2,
  Factory,
  Crosshair,
  PlugZap,
  Lightbulb,
};

const serviceImages: Record<string, string> = {
  "residential-panel-replacement": "/images/svc-residential-panel.png",
  "commercial-panel-replacement": "/images/svc-commercial-panel.png",
  "3-phase-panel-replacement": "/images/svc-3phase.png",
  "electrical-layout-trimble": "/images/svc-trimble.png",
  "ev-rv-charger-stations": "/images/svc-ev-charger.png",
  "switches-lighting-interior-outdoor": "/images/svc-lighting.png",
};

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  const { t, locale } = useLanguage();
  const { openOrder } = useOrder();
  const [detail, setDetail] = useState<ServiceItem | null>(null);

  const onSelect = (name: string) => openOrder({ type: "service", name });

  const detailName = detail ? (locale === "es" ? detail.nameEs : detail.nameEn) : "";
  const detailDesc = detail ? (locale === "es" ? detail.descEs : detail.descEn) : "";

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
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? HousePlug;
            const name = locale === "es" ? s.nameEs : s.nameEn;
            const desc = locale === "es" ? s.descEs : s.descEn;
            const img = serviceImages[s.slug];
            return (
              <article
                key={s.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_48px_-24px_rgba(212,160,23,0.4)]"
              >
                {/* Imagen */}
                <div className="relative h-48 w-full overflow-hidden bg-secondary">
                  {img ? (
                    <Image
                      src={img}
                      alt={name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 to-secondary" aria-hidden="true">
                      <Icon className="h-14 w-14 text-primary/40" />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
                    aria-hidden="true"
                  />
                  {/* Número de ficha */}
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 rounded-md border border-white/20 bg-black/40 px-2 py-0.5 text-xs font-normal tabular-nums text-white/90 backdrop-blur-sm"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Chip dorado flotante sobre el borde imagen/contenido */}
                <span className="absolute left-5 top-48 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg ring-4 ring-card">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                {/* Contenido */}
                <div className="flex flex-1 flex-col p-5 pt-9">
                  <h3 className="text-lg font-normal leading-snug">{name}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>

                  <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-4">
                    <Button
                      className="flex-1"
                      onClick={() => onSelect(name)}
                      aria-label={`${t.services.requestInfo}: ${name}`}
                    >
                      {t.services.requestInfo}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setDetail(s)}
                      aria-label={`${t.services.learnMore}: ${name}`}
                    >
                      {t.services.learnMore}
                    </Button>
                  </div>
                </div>

                {/* Filete dorado superior al hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>

      <Dialog open={detail !== null} onOpenChange={(open) => !open && setDetail(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogDescription className="sr-only">
            {detail ? (locale === "es" ? detail.nameEs : detail.nameEn) : t.services.learnMore}
          </DialogDescription>
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-6 text-lg leading-snug">
                  {locale === "es" ? detail.nameEs : detail.nameEn}
                </DialogTitle>
              </DialogHeader>
              <div className="relative h-52 overflow-hidden rounded-xl">
                <Image
                  src={serviceImages[detail.slug] ?? "/images/about-company.png"}
                  alt={locale === "es" ? detail.nameEs : detail.nameEn}
                  fill
                  sizes="(min-width: 640px) 512px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{detailDesc}</p>
              <Button
                className="w-fit justify-self-end"
                onClick={() => {
                  const name = locale === "es" ? detail.nameEs : detail.nameEn;
                  setDetail(null);
                  onSelect(name);
                }}
              >
                {t.services.requestInfo}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
