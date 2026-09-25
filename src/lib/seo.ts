import { COMPANY } from "@/lib/i18n";

export const SITE_URL = "https://globalchb.com";

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
  image: `${SITE_URL}/images/Experiencia.webp`,
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
