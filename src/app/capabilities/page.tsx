import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { CapabilitiesGrid } from "@/components/gc/capabilities-grid";
import { TechnologySection } from "@/components/gc/technology-section";
import { getCapabilities } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Complete electrical construction capabilities under one contract: electrical construction, fire alarm and life safety, emergency power, low voltage, EV infrastructure, BIM and Trimble coordination, plus the technology that keeps projects on schedule.",
  alternates: { canonical: "/capabilities" },
};

export default async function CapabilitiesPage() {
  // Capacidades publicadas desde el CRM (Supabase web_capabilities)
  const items = await getCapabilities();
  return (
    <>
      <GcPageHeader page="capabilities" />
      <CapabilitiesGrid detailed showHeading={false} items={items} />
      <TechnologySection showCta={false} />
    </>
  );
}
