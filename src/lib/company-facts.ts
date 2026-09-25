/**
 * company-facts.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Cifras corporativas que se muestran en "Capability at Scale" y en la web.
 *
 * REGLA: solo datos verificables y actualizados. Todo lo que esté en `null`
 * NO se renderiza. Rellena cada valor cuando esté confirmado por la empresa
 * (contabilidad / aseguradora / surety / RR.HH.) y el bloque aparecerá solo.
 */

export type CompanyFacts = {
  /** Unidades multifamiliares entregadas (textos oficiales: Park @ Delray 423 + South Pointe 169 + Oakwood Village 265). */
  multifamilyUnits: number | null;
  /** Ciudades de Florida con proyectos (textos oficiales: Miami, Aventura, Coral Gables, Delray Beach, Davie, Fort Myers, Naples, Sarasota, Orlando). */
  floridaCities: number | null;
  /** Año de fundación de la empresa (p. ej. 2020). */
  establishedYear: number | null;
  /** Años de experiencia COMBINADA del equipo en construcción (cifra del equipo, no de la empresa). */
  combinedExperienceYears: number | null;
  /** Personal de campo + gestión. */
  personnel: number | null;
  /** Capacidad de fianza (bonding) en millones USD. */
  bondingCapacityM: number | null;
  /** Cobertura de seguro agregada en millones USD. */
  insuranceCoverageM: number | null;
  /** Número de licencia estatal (EC/ER). Se muestra en "Trusted Experience". */
  stateLicenseNumber: string | null;
  /**
   * Video del Hero (15–25 s, sin audio) en /public, p. ej. "/videos/hero.mp4".
   * Mientras sea null, el Hero usa un fundido cinematográfico de fotos de obra.
   */
  heroVideo: string | null;
  heroVideoPoster: string | null;
};

export const COMPANY_FACTS: CompanyFacts = {
  multifamilyUnits: 857,
  floridaCities: 9,
  establishedYear: null,
  combinedExperienceYears: null,
  personnel: null,
  bondingCapacityM: null,
  insuranceCoverageM: null,
  stateLicenseNumber: null,
  heroVideo: null,
  heroVideoPoster: null,
};

/**
 * Relaciones con GCs / developers. Solo se muestran las marcadas como
 * `authorized: true` (autorización expresa para citar el nombre en la web).
 */
export const CLIENT_EXPERIENCE: { name: string; authorized: boolean }[] = [
  { name: "ANF Construction", authorized: false },
  { name: "Thornton Construction", authorized: false },
  { name: "Kast Construction", authorized: false },
  { name: "Fifield", authorized: false },
  { name: "Strategy Group", authorized: false },
  { name: "GD Construction", authorized: false },
  { name: "13th Floor Investments", authorized: false },
  { name: "Costland Construction", authorized: false },
];
