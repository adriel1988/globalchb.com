import { COMPANY } from "@/lib/i18n";

/** Dominio oficial (canónico). Se puede cambiar con NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://globalchb.com").replace(/\/$/, "");

/** Imagen para compartir (Open Graph / Twitter), 1200×630. */
export const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: "Global Technology & Electrical Services — Electrical construction subcontractor in Florida" };

/** Solo el despliegue de producción se indexa; vistas previas de Vercel → noindex. */
export const IS_INDEXABLE = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

/** JSON-LD base de la empresa (ElectricalContractor / GeneralContractor). */
export const businessJsonLd = {
  "@type": ["Electrician", "GeneralContractor"],
  "@id": `${SITE_URL}/#business`,
  name: COMPANY.name,
  alternateName: COMPANY.legalName,
  description:
    "State-certified electrical construction subcontractor for multifamily, mixed-use and commercial projects in Florida: electrical construction, fire alarm, low voltage, BDA/ERCS, EV infrastructure and emergency power.",
  url: SITE_URL,
  email: COMPANY.email,
  telephone: "+1-786-952-7504",
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/icon.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "4860 SW 61 Avenue",
    addressLocality: "Davie",
    addressRegion: "FL",
    postalCode: "33314",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: { "@type": "State", name: "Florida" },
  knowsLanguage: ["en", "es"],
};
