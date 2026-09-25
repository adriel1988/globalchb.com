import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { TechnologySection } from "@/components/gc/technology-section";
import { CapabilitiesGrid } from "@/components/gc/capabilities-grid";
import { ProposalSection } from "@/components/gc/proposal-form";

export const metadata: Metadata = {
  title: "Technology Driven Construction — BIM, Trimble Layout & Project Controls",
  description:
    "BIM coordination, Trimble robotic layout, digital project controls, QA/QC and closeout documentation that reduce rework and protect the schedule.",
  alternates: { canonical: "/technology" },
};

export default function TechnologyPage() {
  return (
    <>
      <GcPageHeader page="technology" />
      <TechnologySection showCta={false} />
      <CapabilitiesGrid />
      <ProposalSection />
    </>
  );
}
