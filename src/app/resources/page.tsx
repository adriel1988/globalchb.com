import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { ResourcesContent } from "@/components/gc/resources-content";
import { GcFaqSection } from "@/components/gc/faq-section";
import { getServices } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Resources — Prequalification, Service Work & Product Solutions",
  description: "Prequalification package, residential and service electrical work, and product solutions.",
  alternates: { canonical: "/resources" },
};


export default async function ResourcesPage() {
  // Catálogo de servicios del CRM (Supabase service_catalog)
  const services = await getServices();
  return (
    <>
      <GcPageHeader page="resources" />
      <ResourcesContent services={services} />
      <GcFaqSection />
    </>
  );
}
