import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectsSection } from "@/components/projects-team";
import { StatsStrip } from "@/components/extras-sections";
import { getProjects, getSettings } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Proyectos Eléctricos Realizados en el Sur de Florida",
  description:
    "Portafolio de proyectos eléctricos completados: comunidades residenciales y desarrollos en Miami, Aventura, Coral Gables, Delray Beach y el sur de Florida, con permisos e inspecciones en regla (100%).",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos | Global Technology & Electrical Services",
    description:
      "Desarrollos eléctricos completados en el sur de Florida con permisos e inspecciones en regla.",
  },
};

export const dynamic = "force-dynamic";

export default async function ProyectosPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);

  return (
    <>
      <PageHeader
        es={{
          kicker: "Proyectos",
          title: "Proyectos completados con precisión",
          subtitle:
            "Desarrollos reales que demuestran nuestra capacidad de ejecución: comunidades residenciales y proyectos comerciales en todo el sur de Florida.",
        }}
        en={{
          kicker: "Projects",
          title: "Projects completed with precision",
          subtitle:
            "Real developments that prove our execution capability: residential communities and commercial projects across South Florida.",
        }}
      />
      <ProjectsSection projects={projects} googleReviewsUrl={settings.googleReviewsUrl} />
      <StatsStrip />
    </>
  );
}
