"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, PackageOpen, ShoppingCart, Zap, PlugZap, Lightbulb, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useOrder } from "@/components/order-context";

export type ProductItem = {
  id: string;
  sku: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  category: string;
  price: number;
  currency: string;
  unit: string | null;
  inStock: boolean;
  photoUrls: string | null;
};

const categoryIcons: Record<string, typeof Zap> = {
  panels: Zap,
  evCharging: PlugZap,
  lighting: Lightbulb,
  protection: ShieldCheck,
};

export function CatalogSection({ products }: { products: ProductItem[] }) {
  const { t, locale } = useLanguage();
  const { openOrder } = useOrder();
  const [category, setCategory] = useState<string>("all");

  const onOrder = (p: ProductItem) =>
    openOrder({
      type: "product",
      id: p.id,
      name: p.nameEs,
      price: p.price,
      currency: p.currency,
      unit: p.unit,
    });

  const categoryLabels: Record<string, string> = {
    panels: t.catalog.categories.panels,
    evCharging: t.catalog.categories.evCharging,
    lighting: t.catalog.categories.lighting,
    protection: t.catalog.categories.protection,
  };

  const categories = useMemo(() => {
    const set = new Map<string, number>();
    products.forEach((p) => set.set(p.category, (set.get(p.category) ?? 0) + 1));
    return Array.from(set.entries());
  }, [products]);

  const filtered = category === "all" ? products : products.filter((p) => p.category === category);

  const formatPrice = (p: ProductItem) =>
    new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
      style: "currency",
      currency: p.currency,
      maximumFractionDigits: p.price % 1 === 0 ? 0 : 2,
    }).format(p.price);

  if (products.length === 0) {
    return (
      <section id="catalog" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.catalog.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.catalog.title}</h2>
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-slate-400">
            <PackageOpen className="h-10 w-10 text-primary/60" aria-hidden="true" />
            <p className="text-sm">{t.catalog.empty}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
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
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.catalog.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.catalog.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.catalog.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label={t.catalog.kicker}>
          <button
            role="tab"
            aria-selected={category === "all"}
            onClick={() => setCategory("all")}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              category === "all"
                ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(212,160,23,0.7)]"
                : "border-white/15 bg-white/5 text-slate-300 hover:border-primary/50 hover:text-white"
            }`}
          >
            {t.catalog.all} ({products.length})
          </button>
          {categories.map(([cat, count]) => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                category === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(212,160,23,0.7)]"
                  : "border-white/15 bg-white/5 text-slate-300 hover:border-primary/50 hover:text-white"
              }`}
            >
              {categoryLabels[cat] ?? cat} ({count})
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => {
            const CatIcon = categoryIcons[p.category] ?? Package;
            return (
              <article
                key={p.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.09] hover:shadow-[0_24px_48px_-24px_rgba(212,160,23,0.45)]"
              >
                {/* Foto del producto o icono de categoría */}
                {p.photoUrls ? (
                  <div className="h-40 w-full overflow-hidden rounded-xl">
                    <img
                      src={p.photoUrls}
                      alt={locale === "es" ? p.nameEs : p.nameEn}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 via-primary/12 to-transparent text-primary ring-1 ring-inset ring-primary/35">
                    <CatIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                )}

                {/* Disponibilidad */}
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${p.inStock ? "bg-emerald-400" : "bg-slate-500"}`}
                  />
                  <span className={p.inStock ? "text-emerald-400" : "text-slate-400"}>
                    {p.inStock ? t.catalog.inStock : t.catalog.outOfStock}
                  </span>
                </span>

                <h3 className="mt-2 text-base font-normal leading-snug text-white">
                  {locale === "es" ? p.nameEs : p.nameEn}
                </h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-400 line-clamp-3">
                  {locale === "es" ? p.descEs : p.descEn}
                </p>

                {/* Precio + pedir */}
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">{t.catalog.from}</p>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <p className="text-xl font-normal leading-none text-primary">
                      {formatPrice(p)}
                      {p.unit && <span className="text-xs text-slate-400"> / {p.unit}</span>}
                    </p>
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => onOrder(p)}
                      aria-label={`${t.catalog.order}: ${locale === "es" ? p.nameEs : p.nameEn}`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.catalog.order}
                    </Button>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">{t.catalog.note}</p>
      </div>
    </section>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-xl" />
      ))}
    </div>
  );
}
