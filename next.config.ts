import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Permite acceso HMR desde la red local (192.168.x.x)
  allowedDevOrigins: ["192.168.1.150", "192.168.1.*"],
  images: {
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
        // Evita que navegadores/vistas previas guarden versiones antiguas de la página en caché
        source: "/",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
