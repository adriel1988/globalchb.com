import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { ResourcesContent } from "@/components/gc/resources-content";
import { GcFaqSection } from "@/components/gc/faq-section";
import { getProducts, getServices } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Prequalification package for general contractors, residential and service electrical work in South Florida, and electrical product solutions from Global Technology.",
  alternates: { canonical: "/resources" },
};


export default async function ResourcesPage() {
  // Catálogo de servicios del CRM (Supabase service_catalog)
  const [services, products] = await Promise.all([getServices(), getProducts()]);
  return (
    <>
      <GcPageHeader page="resources" />
      <ResourcesContent services={services} products={products} />
      <GcFaqSection />
    </>
  );
}
