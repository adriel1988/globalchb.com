import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteShell } from "@/components/site-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Global Technology & Electrical Services | Contratista Eléctrico Certificado en Florida",
    template: "%s | Global Technology & Electrical Services",
  },
  description:
    "Contratista eléctrico certificado por el estado con más de 7 años de experiencia combinada. Paneles residenciales y comerciales, trifásicos, trazado Trimble, carga EV/RV e iluminación en el sur de Florida.",
  metadataBase: new URL("https://globalchb.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SiteShell>{children}</SiteShell>
        <Toaster />
      </body>
    </html>
  );
}
