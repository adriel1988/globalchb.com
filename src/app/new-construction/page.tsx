import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { GroundUpSequence } from "@/components/gc/ground-up-sequence";
import { ProjectAlbums } from "@/components/gc/project-albums";
import { getNewConstructionGallery, groupProjectAlbums } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "New Construction",
  description:
    "Ground-up electrical construction: utility coordination, underground, electrical rooms, vertical distribution, life safety, testing, inspections and turnover.",
  alternates: { canonical: "/new-construction" },
};

export default async function NewConstructionPage() {
  // Fotos y descripción publicadas desde el CRM (Publicidad › sección Obra nueva)
  const albums = groupProjectAlbums(await getNewConstructionGallery(), { keepWithoutPhoto: true });
  return (
    <>
      <GcPageHeader page="newConstruction" />
      <ProjectAlbums albums={albums} embedded />
      <GroundUpSequence showCta={false} />
    </>
  );
}
