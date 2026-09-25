/**
 * featured-projects.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Portafolio de proyectos de construcción (datos curados, bilingües).
 * Alimenta: Featured Projects (Home), /projects, /projects/[slug] (case studies)
 * y el mapa de Florida.
 *
 * Reglas:
 *  - `partner` (GC / developer) solo se muestra si `partnerAuthorized: true`.
 *  - Campos en `null` no se renderizan (unidades, pisos, SF, ciudad…).
 *  - `caseStudy` (challenge / solution / result) solo se muestra cuando existe.
 *    Completa estos textos con la información técnica real de cada obra.
 *  - Las fotos del CRM (Supabase `portfolio_gallery`) siguen mostrándose en
 *    /projects como "Field Photography"; esta lista no las reemplaza.
 */

export type ProjectType =
  | "multifamily"
  | "mixedUse"
  | "commercial"
  | "municipal"
  | "utility"
  | "townhomes"
  | "medical"
  | "amenity"
  | "residential";

export type ScopeKey =
  | "electrical"
  | "utility"
  | "lowVoltage"
  | "fireAlarm"
  | "bda"
  | "emergencyPower"
  | "ev"
  | "lighting";

export type ProjectStatus = "completed" | "underConstruction";

type Bi = { en: string; es: string };

export type ConstructionProject = {
  slug: string;
  name: string;
  city: string | null;
  /** Coordenadas para el mapa (solo si la ciudad está confirmada). */
  coords: { lat: number; lng: number } | null;
  type: ProjectType | null;
  units: number | null;
  stories: number | null;
  squareFeet: number | null;
  scope: ScopeKey[];
  partner: string | null;
  partnerAuthorized: boolean;
  status: ProjectStatus | null;
  image: string | null;
  gallery: string[];
  /** Orden en la Home (1 = tarjeta grande 2×). null = no aparece en la Home. */
  featuredRank: number | null;
  summary: Bi;
  caseStudy: { challenge: Bi; solution: Bi; result: Bi } | null;
};

export const CITY_COORDS = {
  aventura: { lat: 25.9565, lng: -80.1392 },
  delray: { lat: 26.4615, lng: -80.0728 },
  coralGables: { lat: 25.7215, lng: -80.2684 },
  fortMyers: { lat: 26.6406, lng: -81.8723 },
  bayHarbor: { lat: 25.8876, lng: -80.1312 },
  davie: { lat: 26.0629, lng: -80.2331 },
} as const;

export const PROJECTS: ConstructionProject[] = [
  {
    slug: "avida-aventura-station",
    name: "AVIDA Aventura Station",
    city: "Aventura",
    coords: CITY_COORDS.aventura,
    type: "multifamily",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: "Strategy Group / Fifield",
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-avida.png",
    gallery: [],
    featuredRank: 1,
    summary: {
      en: "Premier multifamily development in Aventura. Electrical construction delivered to the project's design intent, coordinated with the general contractor and developer.",
      es: "Desarrollo multifamiliar de primer nivel en Aventura. Construcción eléctrica ejecutada según la intención de diseño del proyecto, coordinada con el contratista general y el developer.",
    },
    caseStudy: null,
  },
  {
    slug: "park-at-delray-phase-1",
    name: "Park @ Delray — Phase I",
    city: "Delray Beach",
    coords: CITY_COORDS.delray,
    type: "multifamily",
    units: 423,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-clubhouse.png",
    gallery: [],
    featuredRank: 2,
    summary: {
      en: "423-unit garden-style multifamily community. Full electrical construction across residential buildings, site and amenities.",
      es: "Comunidad multifamiliar estilo jardín de 423 unidades. Construcción eléctrica completa en edificios residenciales, sitio y amenidades.",
    },
    caseStudy: null,
  },
  {
    slug: "south-pointe-mixed-use",
    name: "South Pointe Mixed-Use",
    city: null,
    coords: null,
    type: "mixedUse",
    units: 169,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-southpoint.png",
    gallery: [],
    featuredRank: 3,
    summary: {
      en: "169-unit mixed-use development combining residential and commercial occupancies.",
      es: "Desarrollo de uso mixto de 169 unidades que combina ocupaciones residenciales y comerciales.",
    },
    caseStudy: null,
  },
  {
    slug: "metropolitan-coral-square",
    name: "Metropolitan Coral Square",
    city: null,
    coords: null,
    type: "mixedUse",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: "Kast Construction / Brack Group",
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-metropolitan.png",
    gallery: ["/images/proj-coral-square.png"],
    featuredRank: 4,
    summary: {
      en: "Large-scale mixed-use development. Electrical construction focused on efficiency and long-term durability.",
      es: "Desarrollo de uso mixto a gran escala. Construcción eléctrica enfocada en eficiencia y durabilidad a largo plazo.",
    },
    caseStudy: null,
  },
  {
    slug: "parking-garage-7-coral-gables",
    name: "Parking Garage 7",
    city: "Coral Gables",
    coords: CITY_COORDS.coralGables,
    type: "municipal",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical", "lighting"],
    partner: "Thornton Construction / City of Coral Gables",
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-parking-garage.png",
    gallery: [],
    featuredRank: 5,
    summary: {
      en: "Municipal parking structure for the City of Coral Gables. Electrical installations built to the city's infrastructure standards.",
      es: "Estructura de estacionamiento municipal para la Ciudad de Coral Gables. Instalaciones eléctricas construidas según los estándares de infraestructura de la ciudad.",
    },
    caseStudy: null,
  },
  {
    slug: "kavista-apartments",
    name: "Kavista Apartments",
    city: null,
    coords: null,
    type: "multifamily",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: "ANF Construction",
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-kavista.png",
    gallery: [],
    featuredRank: 6,
    summary: {
      en: "Modern multifamily project. Electrical construction with integration of current building systems.",
      es: "Proyecto multifamiliar moderno. Construcción eléctrica con integración de sistemas actuales del edificio.",
    },
    caseStudy: null,
  },
  {
    slug: "park-at-delray-phase-2",
    name: "Park @ Delray — Phase II",
    city: "Delray Beach",
    coords: CITY_COORDS.delray,
    type: "utility",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["utility", "electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "FPL underground utilities and service infrastructure preparing the site for the next phases of the development.",
      es: "Infraestructura subterránea de FPL y acometidas de servicio que preparan el sitio para las siguientes fases del desarrollo.",
    },
    caseStudy: {
      challenge: {
        en: "Underground utility infrastructure had to be in place ahead of vertical construction, without constraining the future phases of the community.",
        es: "La infraestructura subterránea debía quedar lista antes de la construcción vertical, sin limitar las fases futuras de la comunidad.",
      },
      solution: {
        en: "Coordinated FPL underground utility scope and service pathways, sequenced with site work.",
        es: "Alcance subterráneo de FPL y canalizaciones de servicio coordinados y secuenciados con los trabajos de sitio.",
      },
      result: {
        en: "Utility infrastructure delivered, enabling the development's future phases.",
        es: "Infraestructura de utility entregada, habilitando las fases futuras del desarrollo.",
      },
    },
  },
  {
    slug: "oakwood-village-fort-myers",
    name: "Oakwood Village",
    city: "Fort Myers",
    coords: CITY_COORDS.fortMyers,
    type: "multifamily",
    units: 265,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "265-unit multifamily community in Southwest Florida.",
      es: "Comunidad multifamiliar de 265 unidades en el suroeste de Florida.",
    },
    caseStudy: null,
  },
  {
    slug: "ferrari-aventura-mall",
    name: "Ferrari Boutique — Aventura Mall",
    city: "Aventura",
    coords: CITY_COORDS.aventura,
    type: "commercial",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical", "lighting"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: "/images/proj-ferrari.png",
    gallery: [],
    featuredRank: null,
    summary: {
      en: "High-end retail build-out inside Aventura Mall.",
      es: "Adecuación comercial de alta gama dentro de Aventura Mall.",
    },
    caseStudy: null,
  },
  {
    slug: "vista-lago-townhomes",
    name: "Vista Lago Townhomes",
    city: null,
    coords: null,
    type: "townhomes",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["utility", "electrical"],
    partner: "Costland Construction",
    partnerAuthorized: false,
    status: "completed",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "FPL and utility services for a townhome community.",
      es: "Servicios de FPL y utility para una comunidad de townhomes.",
    },
    caseStudy: null,
  },
  {
    slug: "bella-vista-apartments",
    name: "Bella Vista Apartments",
    city: null,
    coords: null,
    type: "multifamily",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["utility", "lowVoltage"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "FPL and low-voltage infrastructure for a multifamily development.",
      es: "Infraestructura de FPL y bajo voltaje para un desarrollo multifamiliar.",
    },
    caseStudy: null,
  },
  {
    slug: "med-squared",
    name: "Med Squared",
    city: null,
    coords: null,
    type: "medical",
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "completed",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "Medical and commercial building with comprehensive electrical construction.",
      es: "Edificio médico y comercial con construcción eléctrica integral.",
    },
    caseStudy: null,
  },
  {
    slug: "9927-east-bay-harbor",
    name: "9927 East Bay Harbor",
    city: "Bay Harbor Islands",
    coords: CITY_COORDS.bayHarbor,
    type: null,
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "underConstruction",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "Active project — electrical construction in progress.",
      es: "Proyecto activo — construcción eléctrica en curso.",
    },
    caseStudy: null,
  },
  {
    slug: "9781-east-bay-harbor",
    name: "9781 East Bay Harbor",
    city: "Bay Harbor Islands",
    coords: CITY_COORDS.bayHarbor,
    type: null,
    units: null,
    stories: null,
    squareFeet: null,
    scope: ["electrical"],
    partner: null,
    partnerAuthorized: false,
    status: "underConstruction",
    image: null,
    gallery: [],
    featuredRank: null,
    summary: {
      en: "Active project — electrical construction in progress.",
      es: "Proyecto activo — construcción eléctrica en curso.",
    },
    caseStudy: null,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featuredRank !== null).sort(
  (a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0),
);

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Cifras derivadas SOLO de los datos documentados arriba. */
export const PORTFOLIO_STATS = {
  projects: PROJECTS.length,
  multifamilyUnits: PROJECTS.reduce((sum, p) => sum + (p.units ?? 0), 0),
  cities: new Set(PROJECTS.map((p) => p.city).filter(Boolean)).size,
};
