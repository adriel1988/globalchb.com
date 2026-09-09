import { db } from "@/lib/db";
import type { ServiceItem } from "@/components/services-section";
import type { ProductItem } from "@/components/catalog-section";
import type { ProjectItem } from "@/components/projects-team";

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const services = await db.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return services.map((s) => ({
      id: s.id,
      slug: s.slug,
      nameEs: s.nameEs,
      nameEn: s.nameEn,
      descEs: s.descEs,
      descEn: s.descEn,
      icon: s.icon,
    })) as ServiceItem[];
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<ProductItem[]> {
  try {
    const products = await db.product.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return products.map((p) => ({
      id: p.id,
      sku: p.sku,
      nameEs: p.nameEs,
      nameEn: p.nameEn,
      descEs: p.descEs,
      descEn: p.descEn,
      category: p.category,
      price: p.price,
      currency: p.currency,
      unit: p.unit,
      inStock: p.inStock,
    })) as ProductItem[];
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const projects = await db.project.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      location: p.location,
      image: p.image,
      descEs: p.descEs,
      descEn: p.descEn,
      category: p.category,
    })) as ProjectItem[];
  } catch {
    return [];
  }
}
