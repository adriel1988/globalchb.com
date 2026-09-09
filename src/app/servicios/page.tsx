import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-why-sections";
import { AssurancesSection, ServiceAreasSection } from "@/components/extras-sections";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servicios Eléctricos — Paneles, Trifásicos, Trimble y Carga EV",
  description:
    "Servicios eléctricos en el sur de Florida: paneles residenciales y comerciales, paneles trifásicos, trazado eléctrico con robot Trimble, estaciones de carga EV/RV e interruptores e iluminación interior y exterior. Permisos e inspecciones incluidos en Miami, Davie, Fort Lauderdale y alrededores.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios Eléctricos | Global Technology & Electrical Services",
    description:
      "Paneles, trifásicos, trazado Trimble, carga EV/RV e iluminación. Contratista eléctrico certificado en Florida.",
  },
};

export const dynamic = "force-dynamic";

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        es={{
          kicker: "Servicios",
          title: "Servicios eléctricos profesionales",
          subtitle:
            "Especialidades eléctricas certificadas para hogares y negocios: paneles, trifásicos, trazado con robot Trimble, carga EV/RV e iluminación. Pide tu servicio directamente desde esta página.",
        }}
        en={{
          kicker: "Services",
          title: "Professional electrical services",
          subtitle:
            "Certified electrical specialties for homes and businesses: panels, 3-phase, robot Trimble layout, EV/RV charging and lighting. Order your service directly from this page.",
        }}
      />
      <ServicesSection services={services} />
      <ProcessSection />
      <AssurancesSection />
      <ServiceAreasSection withCta />
    </>
  );
}
