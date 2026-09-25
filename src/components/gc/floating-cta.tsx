"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import { useGc } from "@/components/language-provider";

/** CTA flotante principal: Request a Proposal (WhatsApp pasa a opción secundaria en Contacto). */
export function FloatingCta() {
  const g = useGc();
  const pathname = usePathname();
  if (pathname === "/request-a-proposal") return null;

  return (
    <Link
      href="/request-a-proposal"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 bg-gold px-5 text-xs font-semibold uppercase tracking-[0.16em] text-navy shadow-xl shadow-black/30 transition-colors hover:bg-gold-bright md:bottom-6 md:right-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      {g.floatingCta}
    </Link>
  );
}
