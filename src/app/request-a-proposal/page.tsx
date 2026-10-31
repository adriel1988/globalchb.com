import type { Metadata } from "next";
import { GcPageHeader } from "@/components/gc/gc-page-header";
import { ProposalSection } from "@/components/gc/proposal-form";

export const metadata: Metadata = {
  title: "Request a Proposal",
  description:
    "Have a project to bid? Upload plans, specifications and bid instructions and our estimating team will review your electrical scope.",
  alternates: { canonical: "/request-a-proposal" },
};

export default function RequestProposalPage() {
  return (
    <>
      <GcPageHeader page="proposal" />
      <ProposalSection heading={false} />
    </>
  );
}
