import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { ProjectAlbums } from "@/components/gc/project-albums";
import { BuiltToExecute } from "@/components/gc/built-to-execute";
import { getProjects, groupProjectAlbums } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Electrical construction portfolio across Florida: multifamily communities, mixed-use developments, commercial and municipal infrastructure.",
  alternates: { canonical: "/projects" },
};


export default async function ProjectsPage() {
  // Proyectos, fotos y descripciones publicados desde el CRM (Supabase portfolio_gallery)
  const albums = groupProjectAlbums(await getProjects(), { keepWithoutPhoto: true }); // TEMPORAL (pruebas de diseño): muestra tarjetas sin foto
  return (
    <>
      <GcPageHeader page="projects" />
      <ProjectAlbums albums={albums} />
      <BuiltToExecute />
    </>
  );
}
