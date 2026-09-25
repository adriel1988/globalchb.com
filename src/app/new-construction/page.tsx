import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { GroundUpSequence } from "@/components/gc/ground-up-sequence";
import { BuiltToExecute } from "@/components/gc/built-to-execute";
import { ProposalSection } from "@/components/gc/proposal-form";

export const metadata: Metadata = {
  title: "New Construction — Ground-Up Electrical from Underground to Turnover",
  description:
    "Ground-up electrical construction: utility coordination, underground, electrical rooms, vertical distribution, life safety, testing, inspections and turnover.",
  alternates: { canonical: "/new-construction" },
};

export default function NewConstructionPage() {
  return (
    <>
      <GcPageHeader page="newConstruction" />
      <GroundUpSequence showCta={false} />
      <BuiltToExecute />
      <ProposalSection />
    </>
  );
}
