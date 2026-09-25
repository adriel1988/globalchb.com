import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { AboutContent } from "@/components/gc/about-content";
import { TeamStructure } from "@/components/gc/team-structure";
import { CapabilityScale } from "@/components/gc/capability-scale";
import { TrustedExperience } from "@/components/gc/trusted-experience";

export const metadata: Metadata = {
  title: "About — State-Certified Electrical Construction Contractor in Florida",
  description:
    "Global Technology & Electrical Services: a structured electrical construction organization from preconstruction through closeout.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <GcPageHeader page="about" />
      <AboutContent />
      <CapabilityScale />
      <TeamStructure />
      <TrustedExperience />
    </>
  );
}
