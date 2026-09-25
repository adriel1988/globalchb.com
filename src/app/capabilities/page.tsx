import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { CapabilitiesGrid } from "@/components/gc/capabilities-grid";
import { ProposalSection } from "@/components/gc/proposal-form";

export const metadata: Metadata = {
  title: "Capabilities — Electrical, Life Safety, Critical Power, Low Voltage & EV",
  description:
    "Complete electrical construction capabilities under one contract: electrical construction, fire alarm and life safety, emergency power, low voltage, EV infrastructure, BIM and Trimble coordination.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <GcPageHeader page="capabilities" />
      <CapabilitiesGrid detailed showHeading={false} />
      <ProposalSection />
    </>
  );
}
