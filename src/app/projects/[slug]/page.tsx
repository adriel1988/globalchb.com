import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/gc/project-case-study";
import { PROJECTS, getProjectBySlug } from "@/lib/featured-projects";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const where = p.city ? ` — ${p.city}, FL` : "";
  return {
    title: `${p.name}${where}`,
    description: p.summary.en,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: p.image ? { images: [{ url: p.image, alt: p.name }] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: `${SITE_URL}/projects/${project.slug}`,
    description: project.summary.en,
    image: project.image ? `${SITE_URL}${project.image}` : undefined,
    locationCreated: project.city ? { "@type": "Place", name: `${project.city}, Florida` } : undefined,
    creator: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectCaseStudy project={project} />
    </>
  );
}
