import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteShell } from "@/components/site-shell";
import { getGoogleReviewsUrl } from "@/lib/supabase-data";
import { IS_INDEXABLE, OG_IMAGE, SITE_URL } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  applicationName: "Global Technology & Electrical Services",
  openGraph: {
    type: "website",
    siteName: "Global Technology & Electrical Services",
    locale: "en_US",
    alternateLocale: ["es_US"],
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  // Vistas previas de Vercel: no indexar (solo producción en globalchb.com)
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  // Google Search Console / Bing Webmaster Tools: el código de verificación va en variables de entorno
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Idioma elegido por el visitante (cookie) → la página se pinta ya en ese idioma
  const locale = (await cookies()).get("gchb-locale")?.value === "es" ? "es" : "en";
  // Enlace de reseñas de Google del CRM (organizations.google_reviews_url); null = no se muestra
  const googleReviewsUrl = await getGoogleReviewsUrl();
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${barlowCondensed.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SiteShell locale={locale} siteInfo={{ googleReviewsUrl }}>{children}</SiteShell>
        <Toaster />
      </body>
    </html>
  );
}
