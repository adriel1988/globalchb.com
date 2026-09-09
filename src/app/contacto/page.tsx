import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/faq-contact-sections";
import { ServiceAreasSection } from "@/components/extras-sections";

export const metadata: Metadata = {
  title: "Contacto — Teléfono, WhatsApp, Email y Dirección en Davie, FL",
  description:
    "Contacta a Global Technology & Electrical Services: 4860 SW 61 Avenue, Davie FL 33314 · +1 (786) 952-7504 · hello@inbox.globalchb.com. Atención bilingüe EN/ES de lunes a viernes en Miami, Fort Lauderdale y todo el sur de Florida.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Global Technology & Electrical Services",
    description:
      "Dirección, teléfono, WhatsApp y correo electrónico. Atención bilingüe en el sur de Florida.",
  },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        es={{
          kicker: "Contacto",
          title: "Estamos listos para atenderte",
          subtitle:
            "Global Technology & Electrical Services — Davie, Florida. Teléfono, WhatsApp, correo y horarios de atención en un solo lugar.",
        }}
        en={{
          kicker: "Contact",
          title: "We are ready to serve you",
          subtitle:
            "Global Technology & Electrical Services — Davie, Florida. Phone, WhatsApp, email and business hours in one place.",
        }}
      />
      <ContactSection />
      <FaqSection />
      <ServiceAreasSection />
    </>
  );
}
