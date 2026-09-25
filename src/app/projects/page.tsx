import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { ProjectAlbums } from "@/components/gc/project-albums";
import { getProjects, groupProjectAlbums } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Projects — Multifamily, Mixed-Use & Commercial Electrical Construction",
  description:
    "Electrical construction portfolio across Florida: multifamily communities, mixed-use developments, commercial and municipal infrastructure.",
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // Proyectos, fotos y descripciones publicados desde el CRM (Supabase portfolio_gallery)
  const albums = groupProjectAlbums(await getProjects());
  return (
    <>
      <GcPageHeader page="projects" />
      <ProjectAlbums albums={albums} />
    </>
  );
}
