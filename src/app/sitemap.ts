import type { MetadataRoute } from "next";

const BASE = "https://globalchb.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
    { path: "/servicios", priority: 0.9, changeFrequency: "weekly" },
    { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/equipo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/catalogo", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contacto", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        es: `${BASE}${path}`,
        en: `${BASE}${path}`,
      },
    },
  }));
}
