"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/language-provider";
import { OrderProvider } from "@/components/order-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCta } from "@/components/gc/floating-cta";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <OrderProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingCta />
        </div>
      </OrderProvider>
    </LanguageProvider>
  );
}
