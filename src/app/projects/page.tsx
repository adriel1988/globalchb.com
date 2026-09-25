import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { ProjectsIndex } from "@/components/gc/projects-index";
import { FloridaMap } from "@/components/gc/florida-map";
import { FieldGallery } from "@/components/gc/field-gallery";
import { getProjects } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Projects — Multifamily, Mixed-Use & Commercial Electrical Construction",
  description:
    "Electrical construction portfolio across Florida: multifamily communities, mixed-use developments, commercial and municipal infrastructure.",
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // Fotografía de campo publicada desde el CRM (Supabase portfolio_gallery)
  const photos = await getProjects();
  return (
    <>
      <GcPageHeader page="projects" />
      <ProjectsIndex />
      <FloridaMap />
      <FieldGallery photos={photos} />
    </>
  );
}
