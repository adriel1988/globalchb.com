import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const services = [
  {
    slug: "residential-panel-replacement",
    nameEs: "Reemplazo de Panel Eléctrico Residencial y Subpaneles",
    nameEn: "Residential Electrical Panel Replacement & Sub Panels",
    descEs:
      "Los paneles eléctricos se vuelven obsoletos o insuficientes con el tiempo. Disparos frecuentes del interruptor, luces que parpadean y tomacorrientes calientes son señales de que necesitas un panel nuevo. Instalamos paneles y subpaneles nuevos con permisos e inspecciones incluidas.",
    descEn:
      "Electrical panels become outdated or insufficient over time. Frequent breaker trips, flickering lights and warm outlets are signs you need a new panel. We install new panels and sub panels with permits and inspections included.",
    icon: "HousePlug",
    sortOrder: 1,
  },
  {
    slug: "commercial-panel-replacement",
    nameEs: "Reemplazo de Paneles Comerciales",
    nameEn: "Commercial Panel Replacements",
    descEs:
      "Un sistema eléctrico funcional es esencial para que tu negocio opere de forma segura y eficiente. Instalamos paneles que proporcionan tomacorrientes y circuitos dedicados para todo tipo de equipos, maximizando la capacidad operativa y la seguridad de empleados y clientes.",
    descEn:
      "A functional electrical system is essential to keep your business running safely and efficiently. We install panels that provide the outlets and dedicated circuits needed to power all kinds of equipment, maximizing operational capabilities and the safety of employees and customers.",
    icon: "Building2",
    sortOrder: 2,
  },
  {
    slug: "3-phase-panel-replacement",
    nameEs: "Reemplazo de Panel Trifásico (3 Fases)",
    nameEn: "3-Phase Panel Replacement",
    descEs:
      "El sistema trifásico es esencial en paneles eléctricos comerciales: suministra energía de forma confiable y eficiente a edificios con alta demanda como fábricas, edificios de oficinas u hospitales, ayudando a reducir costos de energía y operar con mayor eficiencia.",
    descEn:
      "The three-phase system is essential for commercial electrical panels: it reliably and efficiently supplies electricity to high-demand buildings such as factories, office buildings or hospitals, helping businesses reduce energy costs and operate more efficiently.",
    icon: "Factory",
    sortOrder: 3,
  },
  {
    slug: "electrical-layout-trimble",
    nameEs: "Trazado Eléctrico con Robot Trimble",
    nameEn: "Electrical Layout with Trimble Robot",
    descEs:
      "Usamos la tecnología Trimble para garantizar precisión y minimizar riesgos en el trazado de dispositivos eléctricos y perforaciones de losa. Sus herramientas avanzadas de medición y modelado permiten mediciones exactas del sitio y colocación precisa de componentes en obra.",
    descEn:
      "We use Trimble technology to ensure precision and minimize risks when planning electrical device layouts and slab penetrations. Its advanced measurement and modeling tools allow accurate site measurements and precise placement of electrical components on site.",
    icon: "Crosshair",
    sortOrder: 4,
  },
  {
    slug: "ev-rv-charger-stations",
    nameEs: "Estaciones de Carga para Vehículos Eléctricos (EV) y RV",
    nameEn: "RV/EV Charger Stations",
    descEs:
      "Somos pioneros en el cableado e instalación de estaciones de carga avanzadas para vehículos eléctricos y RV. Preparamos construcciones nuevas para alinearse con la creciente demanda de la industria EV y equipamos propiedades existentes con infraestructura de carga moderna.",
    descEn:
      "We are pioneers in the wiring and installation of advanced vehicle charger stations. We prepare new construction to align with the evolving needs of the EV industry and equip existing properties with modern charging infrastructure.",
    icon: "PlugZap",
    sortOrder: 5,
  },
  {
    slug: "switches-lighting-interior-outdoor",
    nameEs: "Interruptores e Iluminación para Interior y Exterior",
    nameEn: "Switch & Lights for Interior/Outdoor",
    descEs:
      "Sistemas eléctricos nuevos, casa inteligente, cableado para construcción nueva con permisos e inspecciones, mejoras y ampliaciones, actualización de calentadores de agua, cableado de potencia para generadores e interruptores de transferencia para huracanes, cableado de control y alto voltaje, mantenimiento, estudios infrarrojos, troubleshooting y pruebas.",
    descEn:
      "New electrical systems, smart home, new construction wiring with permits and inspections, upgrades, renovations and expansions, water heater upgrades, power wiring for generators and hurricane transfer switches, control and high-voltage wiring, maintenance, infrared surveys, troubleshooting and testing.",
    icon: "Lightbulb",
    sortOrder: 6,
  },
];

const products = [
  {
    sku: "PAN-200A-40",
    nameEs: "Panel eléctrico residencial 200A",
    nameEn: "Residential electrical panel 200A",
    descEs: "Panel interior de 200 amperios, 40 espacios, listo para instalación con nuevos circuitos.",
    descEn: "200 amp indoor panel, 40 spaces, ready for installation with new circuits.",
    category: "panels",
    price: 1850,
    unit: "instalado",
    inStock: true,
    sortOrder: 1,
  },
  {
    sku: "PAN-SUB-100",
    nameEs: "Subpanel 100A",
    nameEn: "100A sub panel",
    descEs: "Subpanel de 100 amperios para ampliaciones, talleres, anexos o áreas de alta demanda.",
    descEn: "100 amp sub panel for additions, workshops, annexes or high-demand areas.",
    category: "panels",
    price: 650,
    unit: "instalado",
    inStock: true,
    sortOrder: 2,
  },
  {
    sku: "PAN-3P-400",
    nameEs: "Panel trifásico comercial 400A",
    nameEn: "Commercial 3-phase panel 400A",
    descEs: "Panel trifásico de 400 amperios para edificios comerciales e industriales de alta demanda.",
    descEn: "400 amp three-phase panel for high-demand commercial and industrial buildings.",
    category: "panels",
    price: 4900,
    unit: "instalado",
    inStock: false,
    sortOrder: 3,
  },
  {
    sku: "EV-L2-48A",
    nameEs: "Cargador EV Nivel 2 · 48A",
    nameEn: "EV Level 2 charger · 48A",
    descEs: "Cargador de pared Nivel 2, 48 amperios, WiFi y app móvil. Incluye instalación en garaje.",
    descEn: "Level 2 wall charger, 48 amps, Wi-Fi and mobile app. Garage installation included.",
    category: "evCharging",
    price: 890,
    unit: "instalado",
    inStock: true,
    sortOrder: 4,
  },
  {
    sku: "EV-RV-50A",
    nameEs: "Toma para RV 50A",
    nameEn: "RV 50A outlet",
    descEs: "Instalación de tomacorriente para RV de 50 amperios con protección dedicada.",
    descEn: "50 amp RV outlet installation with dedicated protection.",
    category: "evCharging",
    price: 320,
    unit: "instalado",
    inStock: true,
    sortOrder: 5,
  },
  {
    sku: "LTS-DIM-SMART",
    nameEs: "Interruptor dimmer inteligente",
    nameEn: "Smart dimmer switch",
    descEs: "Interruptor dimmer WiFi compatible con asistentes de voz; control desde el celular.",
    descEn: "Wi-Fi dimmer switch compatible with voice assistants; control from your phone.",
    category: "lighting",
    price: 95,
    unit: "c/u",
    inStock: true,
    sortOrder: 6,
  },
  {
    sku: "LTS-LED-6IN",
    nameEs: "Luminaria LED empotrable 6\"",
    nameEn: "6\" LED recessed light",
    descEs: "LED empotrable 6 pulgadas, 12W, temperatura de color cálida, ideal para interiores.",
    descEn: "6-inch recessed LED, 12W, warm color temperature, ideal for interiors.",
    category: "lighting",
    price: 45,
    unit: "c/u",
    inStock: true,
    sortOrder: 7,
  },
  {
    sku: "LTS-FLD-30W",
    nameEs: "Proyector LED exterior 30W",
    nameEn: "30W outdoor LED flood light",
    descEs: "Proyector LED para exteriores resistente a la intemperie, 30W de alta luminosidad.",
    descEn: "Weatherproof outdoor LED flood light, 30W high brightness.",
    category: "lighting",
    price: 75,
    unit: "c/u",
    inStock: true,
    sortOrder: 8,
  },
  {
    sku: "PRT-SURGE-WH",
    nameEs: "Supresor de picos para toda la casa",
    nameEn: "Whole-home surge protector",
    descEs: "Protección contra picos instalada en el panel para resguardar tus equipos y electrodomésticos.",
    descEn: "Panel-mounted surge protection to safeguard your equipment and appliances.",
    category: "protection",
    price: 380,
    unit: "instalado",
    inStock: true,
    sortOrder: 9,
  },
  {
    sku: "PRT-ATS-200",
    nameEs: "Interruptor de transferencia automático 200A",
    nameEn: "200A automatic transfer switch",
    descEs: "Transferencia automática 200A para generador de respaldo: prepara tu casa para huracanes.",
    descEn: "200A automatic transfer switch for backup generator: get your home hurricane-ready.",
    category: "protection",
    price: 1250,
    unit: "instalado",
    inStock: false,
    sortOrder: 10,
  },
  {
    sku: "PAN-150A-30",
    nameEs: "Panel eléctrico residencial 150A",
    nameEn: "150A residential electrical panel",
    descEs: "Panel principal de 150 amperios con 30 espacios, ideal para viviendas medianas y ampliaciones.",
    descEn: "150 amp main panel with 30 spaces, ideal for mid-size homes and additions.",
    category: "panels",
    price: 1350,
    unit: "instalado",
    inStock: true,
    sortOrder: 11,
  },
  {
    sku: "PAN-3P-200",
    nameEs: "Panel trifásico comercial 200A",
    nameEn: "200A commercial 3-phase panel",
    descEs: "Panel trifásico de 200 amperios para comercios y edificios de oficinas.",
    descEn: "200 amp three-phase panel for retail stores and office buildings.",
    category: "panels",
    price: 3200,
    unit: "instalado",
    inStock: true,
    sortOrder: 12,
  },
  {
    sku: "EV-L2-DUAL",
    nameEs: "Estación de carga EV doble Nivel 2",
    nameEn: "Dual Level 2 EV charging station",
    descEs: "Dos puertos de carga Nivel 2 en una sola estación, ideal para condominios y garajes compartidos.",
    descEn: "Two Level 2 charging ports in a single station, ideal for condominiums and shared garages.",
    category: "evCharging",
    price: 1450,
    unit: "instalado",
    inStock: true,
    sortOrder: 13,
  },
  {
    sku: "EV-RV-30A",
    nameEs: "Toma para RV 30A",
    nameEn: "30A RV outlet",
    descEs: "Tomacorriente dedicado para RV de 30 amperios con protección contra fugas.",
    descEn: "Dedicated 30 amp RV outlet with ground-fault protection.",
    category: "evCharging",
    price: 240,
    unit: "instalado",
    inStock: true,
    sortOrder: 14,
  },
  {
    sku: "LTS-FLD-100W",
    nameEs: "Proyector LED exterior 100W",
    nameEn: "100W outdoor LED flood light",
    descEs: "Proyector LED de alta potencia para áreas amplias, patios y estacionamientos.",
    descEn: "High-power LED flood light for wide areas, backyards and parking lots.",
    category: "lighting",
    price: 120,
    unit: "c/u",
    inStock: true,
    sortOrder: 15,
  },
  {
    sku: "LTS-PANEL-24W",
    nameEs: "Panel de iluminación LED 24W",
    nameEn: "24W LED light panel",
    descEs: "Panel LED delgado de 24W con luz uniforme para cocinas, oficinas y locales.",
    descEn: "Slim 24W LED panel with uniform light for kitchens, offices and stores.",
    category: "lighting",
    price: 28,
    unit: "c/u",
    inStock: true,
    sortOrder: 16,
  },
  {
    sku: "PRT-GFCI-20A",
    nameEs: "Interruptor GFCI 20A",
    nameEn: "20A GFCI breaker",
    descEs: "Protección contra fugas de corriente para baños, cocinas y áreas húmedas.",
    descEn: "Ground-fault protection for bathrooms, kitchens and wet areas.",
    category: "protection",
    price: 85,
    unit: "instalado",
    inStock: true,
    sortOrder: 17,
  },
  {
    sku: "PRT-MTS-50",
    nameEs: "Interruptor de transferencia manual 50A",
    nameEn: "50A manual transfer switch",
    descEs: "Transferencia manual 50A para generadores portátiles: energía de respaldo en temporada de huracanes.",
    descEn: "50A manual transfer switch for portable generators: backup power during hurricane season.",
    category: "protection",
    price: 420,
    unit: "instalado",
    inStock: true,
    sortOrder: 18,
  },
];

const projects = [
  { slug: "ferrari-boutique-aventura-mall", name: "Ferrari Boutique Aventura Mall", location: "Aventura, FL", image: "/images/proj-ferrari.png", sortOrder: 1, category: "commercial", descEs: "Iluminación arquitectónica, circuitos dedicados y sistema eléctrico completo para boutique de lujo en el corazón de Aventura Mall.", descEn: "Architectural lighting, dedicated circuits and a complete electrical system for a luxury boutique in the heart of Aventura Mall." },
  { slug: "coral-square-miami", name: "Coral Square Miami", location: "Miami, FL", image: "/images/proj-coral-square.png", sortOrder: 2, category: "commercial", descEs: "Infraestructura eléctrica y alumbrado para locales y áreas comunes del centro comercial.", descEn: "Electrical infrastructure and lighting for retail spaces and common areas of the shopping center." },
  { slug: "parking-garage-7-coral-gables", name: "Parking Garage 7 @ City of Coral Gables", location: "Coral Gables, FL", image: "/images/proj-parking-garage.png", sortOrder: 3, category: "commercial", descEs: "Iluminación LED, alimentación de ascensores y ventilación para garaje público municipal.", descEn: "LED lighting, elevator power and ventilation for a municipal public parking garage." },
  { slug: "the-kavista-apartments", name: "The Kavista Apartments", location: "South Florida", image: "/images/proj-kavista.png", sortOrder: 4, category: "residential", descEs: "Cableado eléctrico completo, paneles y carga EV para comunidad de apartamentos de nueva construcción.", descEn: "Complete electrical wiring, panels and EV charging for a new-construction apartment community." },
  { slug: "south-point-mix-use", name: "South Point Mix Use", location: "South Florida", image: "/images/proj-southpoint.png", sortOrder: 5, category: "mixed", descEs: "Instalación eléctrica de uso mixto: unidades residenciales, locales comerciales y áreas comunes.", descEn: "Mixed-use electrical installation: residential units, retail spaces and common areas." },
  { slug: "parks-delray", name: "Parks @ Delray", location: "Delray Beach, FL", image: "/images/proj-parks-delray.png", sortOrder: 6, category: "residential", descEs: "Paneles, cableado y luminarias para comunidad residencial de nueva construcción en Delray Beach.", descEn: "Panels, wiring and fixtures for a new-construction residential community in Delray Beach." },
  { slug: "club-house-parks-delray", name: "Club House Parks @ Delray", location: "Delray Beach, FL", image: "/images/proj-clubhouse.png", sortOrder: 7, category: "residential", descEs: "Sistema eléctrico y iluminación para club house y zonas de amenidades de la comunidad.", descEn: "Electrical system and lighting for the community clubhouse and amenity areas." },
  { slug: "avida-aventura-apartments", name: "AVIDA Aventura Apartments", location: "Aventura, FL", image: "/images/proj-avida.png", sortOrder: 8, category: "residential", descEs: "Trazado con robot Trimble, paneles y estaciones de carga EV para apartamentos de lujo.", descEn: "Trimble robot layout, panels and EV charging stations for luxury apartments." },
  { slug: "metropolitan-coral-square", name: "Metropolitan Coral Square", location: "Miami, FL", image: "/images/proj-metropolitan.png", sortOrder: 9, category: "commercial", descEs: "Reemplazo de paneles y alumbrado interior/exterior para desarrollo comercial.", descEn: "Panel replacements and interior/exterior lighting for a commercial development." },
];

async function main() {
  const counts = {
    services: await db.service.count(),
    products: await db.product.count(),
    projects: await db.project.count(),
  };

  if (counts.services === 0) {
    for (const s of services) await db.service.create({ data: s });
    console.log(`Seeded ${services.length} services`);
  } else {
    console.log(`Services already seeded (${counts.services}), skipping`);
  }

  if (counts.products === 0) {
    for (const p of products) await db.product.create({ data: p });
    console.log(`Seeded ${products.length} products`);
  } else {
    console.log(`Products already seeded (${counts.products}), skipping`);
  }

  if (counts.projects === 0) {
    for (const p of projects) await db.project.create({ data: p });
    console.log(`Seeded ${projects.length} projects`);
  } else {
    console.log(`Projects already seeded (${counts.projects}), skipping`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
