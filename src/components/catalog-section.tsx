"use client";

import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  PackageOpen,
  ShoppingCart,
  Zap,
  PlugZap,
  Lightbulb,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  photoUrls: string[] | string | null;
};

const categoryIcons: Record<string, typeof Zap> = {
  panels: Zap,
  evCharging: PlugZap,
  lighting: Lightbulb,
  protection: ShieldCheck,
};

function ProductImageGallery({
  photoUrls,
  alt,
  fallbackIcon: FallbackIcon,
}: {
  photoUrls: string[] | string | null;
  alt: string;
  fallbackIcon: React.ComponentType<any>;
}) {
  const photos = useMemo(() => {
    if (!photoUrls) return [];
    if (Array.isArray(photoUrls)) return photoUrls.map(String).filter(Boolean);
    if (typeof photoUrls === "string") {
      const trimmed = photoUrls.trim();
      if (trimmed.startsWith("[")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
        } catch {
          // fallback
        }
      }
      if (trimmed.includes(",")) {
        return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [trimmed];
    }
    return [];
  }, [photoUrls]);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="tech-grid flex aspect-[4/3] w-full items-center justify-center bg-navy text-gold">
        <FallbackIcon className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }

  const hasMultiple = photos.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group/gallery relative aspect-[4/3] w-full overflow-hidden bg-navy select-none">
      <img
        src={photos[currentIndex]}
        alt={`${alt} (${currentIndex + 1}/${photos.length})`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover/gallery:scale-105"
      />

      {hasMultiple && (
        <>
          {/* Flecha menor que (<) en la esquina izquierda transparente */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto anterior"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white/95 backdrop-blur-xs border border-white/25 transition-all hover:bg-black/65 hover:scale-110 active:scale-95 shadow-md"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
          </button>

          {/* Flecha mayor que (>) en la esquina derecha transparente */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Foto siguiente"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white/95 backdrop-blur-xs border border-white/25 transition-all hover:bg-black/65 hover:scale-110 active:scale-95 shadow-md"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
          </button>

          {/* Indicadores de paginación */}
          <div className="absolute bottom-2 inset-x-0 z-10 flex items-center justify-center gap-1 pointer-events-none">
            {photos.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-3.5 bg-gold shadow-xs" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
      <section id="catalog" className="bg-offwhite py-20 sm:py-24">
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 border border-navy/15 bg-white p-10 text-center text-slate-500">
          <PackageOpen className="h-10 w-10 text-gold" aria-hidden="true" />
          <p className="text-sm">{t.catalog.empty}</p>
        </div>
      </section>
    );
  }

  const filterCls = (on: boolean) =>
    `border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
      on ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-navy"
    }`;

  return (
    <section id="catalog" className="bg-offwhite py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.catalog.kicker}>
          <button role="tab" aria-selected={category === "all"} onClick={() => setCategory("all")} className={filterCls(category === "all")}>
            {t.catalog.all} ({products.length})
          </button>
          {categories.map(([cat, count]) => (
            <button key={cat} role="tab" aria-selected={category === cat} onClick={() => setCategory(cat)} className={filterCls(category === cat)}>
              {categoryLabels[cat] ?? cat} ({count})
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => {
            const CatIcon = categoryIcons[p.category] ?? Package;
            const name = locale === "es" ? p.nameEs : p.nameEn;
            const desc = locale === "es" ? p.descEs : p.descEn;
            return (
              <article
                key={p.id}
                className="group flex flex-col border border-navy/15 bg-white transition-colors hover:border-navy"
              >
                {/* Foto(s) del producto con visor y flechas, o icono de categoría */}
                <ProductImageGallery photoUrls={p.photoUrls} alt={name} fallbackIcon={CatIcon} />

                <div className="flex flex-1 flex-col p-5">
                  {/* Disponibilidad */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    <span aria-hidden="true" className={`h-1.5 w-1.5 ${p.inStock ? "bg-emerald-500" : "bg-slate-400"}`} />
                    <span className={p.inStock ? "text-emerald-700" : "text-slate-500"}>
                      {p.inStock ? t.catalog.inStock : t.catalog.outOfStock}
                    </span>
                  </span>

                  <h3 className="font-display mb-4 mt-3 text-2xl text-navy">{name}</h3>
                  {desc && <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{desc}</p>}

                  {/* Precio + pedir */}
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-navy/15 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.catalog.from}</p>
                      <p className="stat-number mt-1 text-3xl text-navy">
                        {formatPrice(p)}
                        {p.unit && <span className="font-sans text-xs font-normal text-slate-500"> / {p.unit}</span>}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOrder(p)}
                      aria-label={`${t.catalog.order}: ${name}`}
                      className="inline-flex h-10 items-center gap-1.5 bg-gold px-4 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-bright"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.catalog.order}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-slate-500">{t.catalog.note}</p>
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
