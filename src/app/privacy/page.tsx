import type { Metadata } from "next";
import { PolicyPage } from "@/components/gc/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Global Technology & Electrical Services collects, uses and protects information submitted through globalchb.com, including proposal requests, product orders and SMS/WhatsApp communications.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PolicyPage kind="privacy" />;
}
