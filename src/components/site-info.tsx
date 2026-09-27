"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ExternalLink, Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

/** Datos del CRM que usa todo el sitio (leídos en el servidor, en el layout). */
export type SiteInfo = {
  /** `organizations.google_reviews_url` validado; null = no se muestra nada. */
  googleReviewsUrl: string | null;
};

const SiteInfoContext = createContext<SiteInfo>({ googleReviewsUrl: null });

export function SiteInfoProvider({ value, children }: { value: SiteInfo; children: ReactNode }) {
  return <SiteInfoContext.Provider value={value}>{children}</SiteInfoContext.Provider>;
}

export function useSiteInfo() {
  return useContext(SiteInfoContext);
}

/**
 * Enlace a las reseñas de Google. Si el CRM no tiene un enlace válido guardado,
 * no renderiza nada.
 */
export function GoogleReviewsLink({ variant = "dark", className }: { variant?: "dark" | "light" | "footer"; className?: string }) {
  const { googleReviewsUrl } = useSiteInfo();
  const { locale } = useLanguage();
  if (!googleReviewsUrl) return null;

  const label = locale === "es" ? "Reseñas en Google" : "Google Reviews";
  const cta = locale === "es" ? "Ver o dejar una reseña" : "Read or leave a review";

  if (variant === "footer") {
    return (
      <a
        href={googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("group inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-gold", className)}
      >
        <span className="flex text-gold" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
        {label}
        <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-4 border px-6 py-4 transition-colors",
        variant === "dark"
          ? "border-white/15 bg-white/5 text-white hover:border-gold"
          : "border-navy/15 bg-white text-navy hover:border-navy",
        className,
      )}
    >
      <span className="flex text-gold" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-current" />
        ))}
      </span>
      <span className="text-left">
        <span className="block text-sm font-semibold">{label}</span>
        <span className={cn("block text-xs", variant === "dark" ? "text-slate-400" : "text-slate-500")}>{cta}</span>
      </span>
      <ExternalLink className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
    </a>
  );
}

/** Bloque centrado con el enlace de reseñas; sin enlace válido no ocupa espacio. */
export function GoogleReviewsCta({ variant = "light", className }: { variant?: "dark" | "light"; className?: string }) {
  const { googleReviewsUrl } = useSiteInfo();
  if (!googleReviewsUrl) return null;
  return (
    <div className={cn("mt-10 flex justify-center", className)}>
      <GoogleReviewsLink variant={variant} />
    </div>
  );
}
