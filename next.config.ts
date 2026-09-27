import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Permite acceso HMR desde la red local (192.168.x.x)
  allowedDevOrigins: ["192.168.1.150", "192.168.1.*"],
  images: {
    // Máxima calidad: el optimizador nunca recomprime por debajo de 100
    // (Next 16 usa [75] por defecto). La resolución se sirve según el
    // tamaño de pantalla y la densidad (retina), hasta el tamaño original.
    qualities: [100],
    remotePatterns: [
      // Supabase Storage — permite cargar imágenes desde cualquier proyecto Supabase
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Cabeceras de seguridad básicas en todo el sitio
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Las URLs *.vercel.app (incluida la de producción) no se indexan: el sitio oficial es globalchb.com
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  // Rutas antiguas (ES) → nueva arquitectura orientada a GCs / developers
  async redirects() {
    return [
      { source: "/proyectos", destination: "/projects", permanent: true },
      { source: "/nosotros", destination: "/about", permanent: true },
      { source: "/equipo", destination: "/about#team", permanent: true },
      { source: "/servicios", destination: "/capabilities", permanent: true },
      { source: "/contacto", destination: "/request-a-proposal", permanent: true },
    ];
  },
};

export default nextConfig;
