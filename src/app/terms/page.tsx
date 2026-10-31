import type { Metadata } from "next";
import { PolicyPage } from "@/components/gc/policy-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing the use of globalchb.com, proposal requests, product orders and communications with Global Technology & Electrical Services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <PolicyPage kind="terms" />;
}
