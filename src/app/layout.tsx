import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteShell } from "@/components/site-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Global Technology & Electrical Services | Electrical Construction Subcontractor in Florida",
    template: "%s | Global Technology & Electrical Services",
  },
  description:
    "State-certified electrical construction subcontractor for multifamily, mixed-use and commercial projects in Florida: electrical, fire alarm, low voltage, BDA/ERCS, EV infrastructure and emergency power.",
  metadataBase: new URL("https://globalchb.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Idioma elegido por el visitante (cookie) → la página se pinta ya en ese idioma
  const locale = (await cookies()).get("gchb-locale")?.value === "es" ? "es" : "en";
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${barlowCondensed.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SiteShell locale={locale}>{children}</SiteShell>
        <Toaster />
      </body>
    </html>
  );
}
