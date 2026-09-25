import type { Metadata } from "next";
import { HeroImpact } from "@/components/gc/hero-impact";
import { FeaturedProjects } from "@/components/gc/featured-projects";
import { CapabilityScale } from "@/components/gc/capability-scale";
import { CapabilitiesGrid } from "@/components/gc/capabilities-grid";
import { GroundUpSequence } from "@/components/gc/ground-up-sequence";
import { BuiltToExecute } from "@/components/gc/built-to-execute";
import { TechnologySection } from "@/components/gc/technology-section";
import { CaseStudiesSection } from "@/components/gc/case-studies";
import { FloridaMap } from "@/components/gc/florida-map";
import { TrustedExperience } from "@/components/gc/trusted-experience";
import { ProposalSection } from "@/components/gc/proposal-form";
import { GcFaqSection } from "@/components/gc/faq-section";
import { PROJECTS } from "@/lib/featured-projects";
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
 * 01 Hero · 02 Featured projects · 03 Capability at scale · 04 Capabilities ·
 * 05 Ground-up · 06 Built to execute · 07 Technology · 08 Case studies ·
 * 09 Florida map · 10 Trusted experience · 11 Request a proposal · FAQ · 12 Footer (layout)
 */
export default function Home() {
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
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/projects/${p.slug}`,
          name: p.name,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroImpact />
      <FeaturedProjects />
      <CapabilityScale />
      <CapabilitiesGrid />
      <GroundUpSequence />
      <BuiltToExecute />
      <TechnologySection />
      <CaseStudiesSection />
      <FloridaMap />
      <TrustedExperience />
      <ProposalSection />
      <GcFaqSection />
    </>
  );
}
