import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CatalogSection } from "@/components/catalog-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Catálogo de Productos Eléctricos — Paneles, Cargadores EV y Más",
  description:
    "Catálogo de productos eléctricos para pedir directamente: paneles de 150A, 200A y trifásicos, estaciones de carga EV/RV, iluminación LED y protección. Disponibilidad en tiempo real en el sur de Florida.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo | Global Technology & Electrical Services",
    description:
      "Productos eléctricos listos para pedir: paneles, cargadores EV/RV, iluminación y protección eléctrica.",
  },
};

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        es={{
          kicker: "Catálogo",
          title: "Productos eléctricos listos para pedir",
          subtitle:
            "Explora nuestro catálogo y solicita tus productos directamente: paneles, estaciones de carga EV/RV, iluminación y protección eléctrica con entrega en el sur de Florida.",
        }}
        en={{
          kicker: "Catalog",
          title: "Electrical products ready to order",
          subtitle:
            "Browse our catalog and request products directly: panels, EV/RV charging stations, lighting and electrical protection with delivery across South Florida.",
        }}
      />
      <CatalogSection products={products} />
      <NewsletterSection />
    </>
  );
}
