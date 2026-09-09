import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CompanySection, StoriesSection, HorizonSection } from "@/components/about-sections";
import { PillarsSection, CertsSection } from "@/components/extras-sections";

export const metadata: Metadata = {
  title: "Nosotros — Contratista Eléctrico Certificado en Florida",
  description:
    "Conoce a Global Technology & Electrical Services: contratista eléctrico certificado por el estado de Florida con más de 7 años de experiencia combinada en proyectos residenciales y comerciales. Licencia estatal, seguros vigentes y equipo bilingüe EN/ES.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros | Global Technology & Electrical Services",
    description:
      "Quiénes somos: contratista eléctrico certificado en Florida, vanguardia en innovación eléctrica y construcción.",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        es={{
          kicker: "Nosotros",
          title: "Una empresa construida sobre precisión y confianza",
          subtitle:
            "Contratista eléctrico certificado por el estado de Florida. Más de 7 años de experiencia combinada al servicio de hogares y negocios del sur de Florida.",
        }}
        en={{
          kicker: "About us",
          title: "A company built on precision and trust",
          subtitle:
            "State-certified electrical contractor in Florida. Over 7 years of combined experience serving homes and businesses across South Florida.",
        }}
      />
      <CompanySection />
      <PillarsSection />
      <StoriesSection />
      <HorizonSection />
      <CertsSection />
    </>
  );
}
