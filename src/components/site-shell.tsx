"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n";
import { OrderProvider } from "@/components/order-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function SiteShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <LanguageProvider initialLocale={locale}>
      <OrderProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppButton />
        </div>
      </OrderProvider>
    </LanguageProvider>
  );
}
