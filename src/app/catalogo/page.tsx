import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { CatalogSection } from "@/components/catalog-section";
import { getProducts } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Product Catalog — Electrical Equipment & Materials",
  description:
    "Electrical equipment and materials available through Global Technology & Electrical Services: panels, EV charging, lighting and protection.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Product Catalog | Global Technology & Electrical Services",
    description: "Electrical equipment and materials available through our team.",
  },
};

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const products = await getProducts();

  return (
    <>
      <GcPageHeader page="catalog" />
      <CatalogSection products={products} />
    </>
  );
}
