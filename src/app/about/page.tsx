import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { AboutContent } from "@/components/gc/about-content";
import { TeamStructure } from "@/components/gc/team-structure";
import { CapabilityScale } from "@/components/gc/capability-scale";
import { OrgChart } from "@/components/gc/org-chart";
import { getTeam } from "@/lib/supabase-data";
import { TrustedExperience } from "@/components/gc/trusted-experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Global Technology & Electrical Services: a structured electrical construction organization from preconstruction through closeout.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <>
      <GcPageHeader page="about" />
      <AboutContent />
      <CapabilityScale />
      <TeamStructure />
      <OrgChart team={team} />
      <TrustedExperience />
    </>
  );
}
