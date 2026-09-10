import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { WhyUsSection, ProcessSection } from "@/components/process-why-sections";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection, TeamSection } from "@/components/projects-team";
import { CompanySection, StoriesSection, HorizonSection } from "@/components/about-sections";
import { CatalogSection } from "@/components/catalog-section";
import { FaqSection } from "@/components/faq-contact-sections";
import { ContactSection } from "@/components/contact-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { getProjects, getServices, getProducts, getSettings } from "@/lib/supabase-data";
import { COMPANY } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    absolute: "Global Technology & Electrical Services | Contratista Eléctrico Certificado en Florida",
  },
  description:
    "Contratista eléctrico certificado por el estado con más de 7 años de experiencia combinada. Paneles residenciales y comerciales, paneles trifásicos, trazado eléctrico con robot Trimble, estaciones de carga EV/RV e iluminación interior y exterior en el sur de Florida. Atención bilingüe EN/ES.",
  keywords: [
    "electrical contractor Florida",
    "electricista Miami",
    "contratista eléctrico certificado",
    "electrical panel replacement",
    "reemplazo de panel eléctrico",
    "commercial electrical panels",
    "3 phase panel replacement",
    "EV charger installation Miami",
    "instalación cargador vehículo eléctrico",
    "Trimble electrical layout",
    "residential electrician",
    "commercial electrician South Florida",
    "Global Technology and Electrical Services",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Global Technology & Electrical Services",
    title: "Global Technology & Electrical Services | Contratista Eléctrico Certificado en Florida",
    description:
      "Más de 7 años de experiencia combinada en proyectos eléctricos residenciales y comerciales: paneles, trifásicos, trazado Trimble, carga EV/RV e iluminación en el sur de Florida.",
    images: [{ url: "/images/hero-brand-panoramic.png", width: 1376, height: 768, alt: "Torres de transmisión eléctrica de alto voltaje al atardecer — Global Technology & Electrical Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Technology & Electrical Services | State-Certified Electrical Contractor",
    description: "Residential and commercial electrical contractor in South Florida: panels, 3-phase, Trimble layout, EV/RV chargers and lighting.",
    images: ["/images/hero-brand-panoramic.png"],
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, projects, products, settings] = await Promise.all([getServices(), getProjects(), getProducts(), getSettings()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Electrician"],
        "@id": "https://globalchb.com/#business",
        name: COMPANY.name,
        alternateName: COMPANY.legalName,
        description:
          "Contratista eléctrico certificado por el estado en Florida: paneles residenciales y comerciales, paneles trifásicos, trazado eléctrico con robot Trimble, estaciones de carga EV/RV e iluminación interior y exterior.",
        url: "https://globalchb.com",
        email: COMPANY.email,
        telephone: "+1-786-952-7504",
        image: "https://globalchb.com/images/hero-brand-panoramic.png",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "4860 SW 61 Avenue",
          addressLocality: "Davie",
          addressRegion: "FL",
          postalCode: "33314",
          addressCountry: "US",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        areaServed: [
          { "@type": "State", name: "Florida" },
          { "@type": "City", name: "Miami" },
          { "@type": "City", name: "Aventura" },
          { "@type": "City", name: "Coral Gables" },
          { "@type": "City", name: "Delray Beach" },
          { "@type": "City", name: "Davie" },
        ],
        knowsLanguage: ["es", "en"],
        sameAs: ["https://gtech.globalchb.com", "https://wa.me/17869527504"],
      },
      {
        "@type": "WebSite",
        "@id": "https://globalchb.com/#website",
        url: "https://globalchb.com",
        name: COMPANY.name,
        inLanguage: ["es", "en"],
        publisher: { "@id": "https://globalchb.com/#business" },
      },
      {
        "@type": "ItemList",
        name: "Catálogo de servicios eléctricos — Global Technology & Electrical Services",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            serviceType: s.nameEs,
            alternateName: s.nameEn,
            description: s.descEs,
            provider: { "@id": "https://globalchb.com/#business" },
            areaServed: "US-FL",
          },
        })),
      },
      {
        "@type": "ItemList",
        name: "Proyectos realizados — Global Technology & Electrical Services",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.name,
            image: p.image ? `https://globalchb.com${p.image}` : undefined,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServicesSection services={services} />
      <ProcessSection />
      <WhyUsSection />
      <ProjectsSection projects={projects} googleReviewsUrl={settings.googleReviewsUrl} />
      <CompanySection />
      <StoriesSection />
      <TeamSection />
      <CatalogSection products={products} />
      <HorizonSection />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
