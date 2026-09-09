import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { TeamSection } from "@/components/projects-team";
import { TeamCapabilitiesSection } from "@/components/extras-sections";

export const metadata: Metadata = {
  title: "Equipo — Electricistas Certificados en el Sur de Florida",
  description:
    "Nuestro equipo: project managers, supervisores de obra y electricistas calificados. Manpower estructurado y organizado para entregar proyectos eléctricos a tiempo, con supervisión de seguridad en campo y atención bilingüe EN/ES.",
  alternates: { canonical: "/equipo" },
  openGraph: {
    title: "Equipo | Global Technology & Electrical Services",
    description:
      "Profesionales certificados detrás de cada proyecto eléctrico: managers, supervisores y electricistas calificados.",
  },
};

export default function EquipoPage() {
  return (
    <>
      <PageHeader
        es={{
          kicker: "Equipo",
          title: "El equipo detrás de cada proyecto",
          subtitle:
            "Profesionales experimentados con una cadena de mando clara: project managers, supervisores de sitio y electricistas calificados en paneles, iluminación y carga EV.",
        }}
        en={{
          kicker: "Team",
          title: "The team behind every project",
          subtitle:
            "Experienced professionals with a clear chain of command: project managers, site supervisors and qualified electricians in panels, lighting and EV charging.",
        }}
      />
      <TeamSection />
      <TeamCapabilitiesSection />
    </>
  );
}
