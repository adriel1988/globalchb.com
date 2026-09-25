import type { Metadata } from "next";
import { HeroImpact } from "@/components/gc/hero-impact";
import { ProjectAlbums } from "@/components/gc/project-albums";
import { CapabilityScale } from "@/components/gc/capability-scale";
import { CapabilitiesGrid } from "@/components/gc/capabilities-grid";
import { GroundUpSequence } from "@/components/gc/ground-up-sequence";
import { BuiltToExecute } from "@/components/gc/built-to-execute";
import { TechnologySection } from "@/components/gc/technology-section";
import { TrustedExperience } from "@/components/gc/trusted-experience";
import { ProposalSection } from "@/components/gc/proposal-form";
import { GcFaqSection } from "@/components/gc/faq-section";
import { getProjects, groupProjectAlbums } from "@/lib/supabase-data";
import { COMPANY } from "@/lib/i18n";
import { SITE_URL, businessJsonLd } from "@/lib/seo";

const TITLE = "Global Technology & Electrical Services | Electrical Construction Subcontractor in Florida";
const DESCRIPTION =
  "Full-service electrical construction for multifamily, mixed-use and commercial projects in Florida. Electrical, fire alarm, low voltage, BDA/ERCS, EV infrastructure and emergency power — built for developers and general contractors.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "electrical subcontractor Florida",
    "electrical construction contractor",
    "multifamily electrical contractor",
    "mixed-use electrical contractor",
    "commercial electrical contractor South Florida",
    "fire alarm contractor Florida",
    "BDA ERCS contractor",
    "EV infrastructure contractor",
    "FPL underground utilities contractor",
    "Trimble electrical layout",
    "contratista eléctrico Florida",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: COMPANY.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/Experiencia.webp", alt: "Electrical construction on a Florida multifamily development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/Experiencia.webp"],
  },
};

/**
 * HOME — IMPACTO → PRUEBA → CAPACIDAD → SERVICIOS → CONFIANZA → CONTACTO
 * 01 Hero · 02 Proyectos (CRM) · 03 Capability at scale · 04 Capabilities ·
 * 05 Ground-up · 06 Built to execute · 07 Technology · 08 Trusted experience ·
 * 09 Request a proposal · FAQ · Footer (layout)
 */
// Lee Supabase en el servidor y cachea 5 minutos (los cambios del CRM aparecen en ≤ 5 min)
export const revalidate = 300;

export default async function Home() {
  // Proyectos publicados desde el CRM (Supabase portfolio_gallery)
  const albums = groupProjectAlbums(await getProjects());

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      businessJsonLd,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        inLanguage: ["en", "es"],
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "ItemList",
        name: "Project portfolio — Global Technology & Electrical Services",
        itemListElement: albums.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "CreativeWork", name: a.title, image: a.photos[0] },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroImpact photos={albums.flatMap((a) => a.photos)} />
      <ProjectAlbums albums={albums} limit={6} home />
      <CapabilityScale />
      <CapabilitiesGrid />
      <GroundUpSequence />
      <BuiltToExecute />
      <TechnologySection />
      <TrustedExperience />
      <ProposalSection />
      <GcFaqSection />
    </>
  );
}
