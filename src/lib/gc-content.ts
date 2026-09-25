/**
 * gc-content.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Contenido del sitio orientado a developers y general contractors.
 * Dos versiones COMPLETAS (EN / ES). Nunca mezclar idiomas en un mismo bloque.
 * English es el idioma por defecto.
 */

export type CapabilityKey = "electrical" | "lifeSafety" | "power" | "lowVoltage" | "ev" | "technology";

const en = {
  nav: {
    projects: "Projects",
    capabilities: "Capabilities",
    newConstruction: "New Construction",
    technology: "Technology",
    about: "About",
    resources: "Resources",
    catalog: "Catalog",
    rfp: "Request a Proposal",
    menu: "Menu",
    openMenu: "Open menu",
    switchLanguage: "Cambiar a español",
    main: "Main navigation",
  },

  hero: {
    eyebrow: "Global Technology & Electrical Services",
    title: "Powering Florida's next landmarks.",
    systems: ["Electrical Construction", "Fire Alarm", "Low Voltage", "BDA/ERCS", "EV Infrastructure"],
    tagline: "Built for Developers. Trusted by General Contractors. Engineered to Deliver.",
    ctaProjects: "View our projects",
    ctaProposal: "Request a proposal",
    microbar: ["State Certified", "Multifamily", "Mixed-Use", "Commercial", "Florida"],
    mediaAlt: "Electrical construction on a Florida development",
  },

  featured: {
    kicker: "Selected Work",
    title: "Built across Florida.",
    viewCaseStudy: "View project",
    viewAll: "View all projects",
    photo: "photo",
    photos: "photos",
    prev: "Previous photo",
    next: "Next photo",
    close: "Close",
    empty: "Project gallery coming soon.",
  },

  scale: {
    kicker: "Capability at Scale",
    title: "Can we handle yours? The record says yes.",
    units: "Multifamily units delivered",
    cities: "Florida cities",
    systems: "Systems under one contract",
    personnel: "Field & management personnel",
    bonding: "Bonding capacity",
    insurance: "Insurance coverage",
    experience: "Years of combined construction experience",
    established: "Established",
    footnote: "Figures from documented project experience.",
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Complete electrical construction capabilities.",
    subtitle: "Six integrated systems, one accountable electrical partner.",
    learnMore: "Learn more",
    items: [
      {
        key: "electrical",
        title: "Electrical Construction",
        desc: "From underground and utility infrastructure to switchgear, feeders, risers, busway and branch wiring.",
        bullets: ["Underground & site electrical", "Utility infrastructure", "Electrical rooms & switchgear", "Feeders, risers & busway", "Distribution & branch wiring"],
      },
      {
        key: "lifeSafety",
        title: "Life Safety Systems",
        desc: "Fire alarm, emergency systems, smoke control interfaces and in-building emergency responder coverage.",
        bullets: ["Fire alarm systems", "Emergency systems", "Smoke control interfaces", "BDA / ERCS"],
      },
      {
        key: "power",
        title: "Emergency & Critical Power",
        desc: "Generators, automatic transfer switches and emergency distribution, including fire pump power.",
        bullets: ["Generators", "Automatic transfer switches", "Emergency distribution", "Fire pump power"],
      },
      {
        key: "lowVoltage",
        title: "Low Voltage Infrastructure",
        desc: "Pathways and backbone for telecom, access control and CCTV, coordinated with the electrical scope.",
        bullets: ["Pathways & backbone", "Telecom infrastructure", "Access control / CCTV infrastructure (per scope)"],
      },
      {
        key: "ev",
        title: "EV Infrastructure",
        desc: "EV distribution, feeders, chargers and load infrastructure sized for current and future demand.",
        bullets: ["EV distribution & feeders", "Charger installation", "Load infrastructure & management"],
      },
      {
        key: "technology",
        title: "Building Technology & Coordination",
        desc: "BIM, Trimble robotic layout, shop drawings and field documentation that keep the schedule intact.",
        bullets: ["BIM coordination", "Trimble robotic layout", "Shop drawings", "Field documentation"],
      },
    ] as { key: CapabilityKey; title: string; desc: string; bullets: string[] }[],
  },

  groundUp: {
    kicker: "New Construction",
    title: "Ground-up electrical construction.",
    subtitle: "From underground to turnover.",
    cta: "See the full sequence",
    steps: [
      { title: "Utility Coordination", items: "FPL · Transformer coordination · Duct banks · Service infrastructure" },
      { title: "Underground", items: "Building feeders · Site electrical · EV · Fire pump · Communications pathways" },
      { title: "Electrical Rooms", items: "Switchboards · Transformers · Distribution panels · CT / metering" },
      { title: "Vertical Distribution", items: "Feeders · Risers · Busway · Tap boxes" },
      { title: "Building Distribution", items: "Units · Corridors · Amenities · Mechanical systems" },
      { title: "Lighting & Controls", items: "Interior · Exterior · Emergency · Architectural systems" },
      { title: "Life Safety", items: "Fire alarm · BDA / ERCS · Emergency distribution" },
      { title: "Roof & Mechanical", items: "RTUs · Condensers · Pumps · Mechanical equipment" },
      { title: "Testing & Inspections", items: "Megger · Start-up · Fire alarm testing · AHJ inspections" },
      { title: "Turnover", items: "As-builts · Closeout documents · Training · Punch completion" },
    ],
  },

  execute: {
    kicker: "Delivery Capability",
    title: "Built to execute.",
    subtitle: "A construction organization — not just electricians.",
    phases: [
      { title: "Preconstruction", items: ["Estimating", "Scope review", "Value engineering", "Constructability"] },
      { title: "Procurement", items: ["Long-lead equipment", "Switchgear", "Generators", "Lighting", "Release schedules"] },
      { title: "Field Execution", items: ["Project management", "Supervision", "Manpower", "Production planning"] },
      { title: "Schedule Control", items: ["Look-ahead planning", "Milestones", "Manpower forecasting"] },
      { title: "QA / QC", items: ["Pre-installation", "Installation inspections", "Testing"] },
      { title: "Safety", items: ["Field compliance", "Documentation", "Training"] },
      { title: "Closeout", items: ["Inspections", "Punch", "As-builts", "Turnover"] },
    ],
  },

  technology: {
    kicker: "Technology Driven Construction",
    title: "Precision before installation. Coordination before conflict.",
    subtitle: "We use technology to reduce rework and protect the schedule.",
    items: [
      { title: "BIM & Coordination", desc: "Constructability review, coordinated shop drawings and clash reduction." },
      { title: "Robotic Layout / Trimble", desc: "Precise field layout straight from coordinated drawings." },
      { title: "Digital Project Controls", desc: "RFIs, submittals, procurement tracking, documentation and project reporting." },
      { title: "QA / QC", desc: "Documented installation inspections before concealment and energization." },
      { title: "Field Documentation", desc: "Progress verification and construction records." },
      { title: "Closeout", desc: "Testing, inspections, as-builts and turnover documentation." },
    ],
    cta: "Explore our technology",
  },

  trust: {
    kicker: "Trusted Experience",
    title: "Credentials that reduce execution risk.",
    items: [
      { title: "State Certified Electrical Contractor", desc: "Licensed by the State of Florida." },
      { title: "Insured", desc: "Certificates of insurance available with our prequalification package." },
      { title: "Bonding", desc: "Bonding information provided on request for qualified projects." },
      { title: "Safety Program", desc: "OSHA-aligned field compliance, documentation and training." },
      { title: "BIM & Trimble", desc: "Coordinated drawings and robotic layout in the field." },
      { title: "AHJ Experience", desc: "Permitting and inspections with Florida jurisdictions and FPL." },
    ],
    license: "License",
    alongside: "Experience working alongside",
  },

  team: {
    kicker: "Our Team",
    title: "Built around project execution.",
    roles: ["Executive Leadership", "Preconstruction", "Project Management", "Field Supervision", "Procurement", "QA / QC", "Safety"],
    closing: "A structured project team from preconstruction through closeout.",
    photoAlt: "Global Technology & Electrical Services field team",
  },

  about: {
    kicker: "About",
    title: "An electrical construction platform built to execute complex projects.",
    paragraphs: [
      "Global Technology & Electrical Services is a State of Florida certified electrical contractor delivering electrical construction for multifamily, mixed-use, commercial and municipal projects.",
      "Our team has worked on projects from the east to the west coast of Florida — Fort Myers, Naples, Sarasota and Orlando — and since 2020 has contracted directly with developers and general contractors.",
      "We combine field execution with preconstruction, procurement, BIM coordination and Trimble robotic layout so that general contractors get one accountable partner for the full electrical scope.",
    ],
    fieldAlt: "Global Technology crew working on underground electrical infrastructure",
  },

  resources: {
    kicker: "Resources",
    title: "Resources for owners, GCs and property managers.",
    prequal: {
      title: "Prequalification package",
      desc: "License, insurance certificates, safety program and project references for your vendor onboarding.",
      cta: "Request prequalification package",
    },
    residential: {
      title: "Residential & Service Work",
      desc: "Our service division handles electrical work for homes and existing buildings: panel upgrades, EV chargers, lighting and diagnostics.",
      empty: "Service list coming soon.",
      cta: "Request service",
    },
    products: {
      title: "Product Solutions",
      desc: "Electrical equipment and materials available through our team.",
      cta: "Browse product solutions",
    },
  },

  proposal: {
    kicker: "Request a Proposal",
    title: "Have a project to bid?",
    subtitle: "Send us your plans. Our estimating team reviews every submission and confirms receipt.",
    sections: { contact: "Contact", project: "Project", documents: "Project documents" },
    fields: {
      company: "Company",
      name: "Contact name",
      email: "Email",
      phone: "Phone",
      projectName: "Project name",
      projectLocation: "Project location",
      projectType: "Project type",
      start: "Estimated construction start",
      bidDue: "Bid due date",
      scope: "Scope requested",
      notes: "Notes",
      notesPlaceholder: "Units, stories, square footage, schedule or any detail that helps us price the work.",
      select: "Select…",
    },
    projectTypes: ["Multifamily", "Mixed-Use", "Commercial", "Hospitality", "Healthcare", "Industrial", "Municipal / Public", "Other"],
    scopes: ["Electrical Construction", "Fire Alarm", "Low Voltage", "BDA/ERCS", "EV Infrastructure", "Emergency Power / Generators", "FPL / Utility Coordination", "Lighting & Controls"],
    uploads: {
      plans: "Upload plans",
      specs: "Upload specifications",
      bid: "Upload bid instructions",
      hint: "PDF, DWG, ZIP or images · up to 50 MB per file",
      choose: "Choose files",
      remove: "Remove",
    },
    consent: "By submitting, you agree to be contacted about this project.",
    smsConsent: "I agree to receive text messages (SMS) from Global Technology & Electrical Services about this project. Message and data rates may apply. Reply STOP to opt out.",
    submit: "Request a proposal",
    sending: "Sending…",
    uploading: "Uploading documents…",
    successTitle: "Proposal request received.",
    successText: "Thank you. Our estimating team will review your project and contact you shortly.",
    another: "Submit another project",
    errors: {
      required: "Please complete the required fields.",
      email: "Please enter a valid email.",
      fileSize: "Each file must be 50 MB or less.",
      generic: "We couldn't send your request. Please try again or email us directly.",
      rate: "Too many requests. Please wait a few minutes and try again.",
      upload: "Your request was received, but some documents could not be uploaded. Please email them to us.",
    },
    direct: "Prefer to talk first?",
    whatsapp: "WhatsApp",
    required: "required",
  },

  faq: {
    kicker: "Preconstruction FAQ",
    title: "Questions GCs and developers ask us.",
    items: [
      {
        q: "What types of projects does Global Technology bid?",
        a: "Multifamily, mixed-use, commercial and municipal construction — ground-up and major renovations — where we can own the complete electrical scope.",
      },
      {
        q: "What geographic markets do you serve?",
        a: "We are headquartered in Davie and work throughout South Florida. Our team also has project experience in Southwest and Central Florida, including Fort Myers, Naples, Sarasota and Orlando.",
      },
      {
        q: "Can Global provide bonding for large construction projects?",
        a: "Bonding information is provided on request as part of our prequalification package. Contact our estimating team with your project's requirements.",
      },
      {
        q: "Do you provide BIM and electrical coordination drawings?",
        a: "Yes. We support BIM coordination and coordinated shop drawings, and use Trimble robotic layout to carry that coordination accurately into the field.",
      },
      {
        q: "Can you coordinate directly with FPL and utility providers?",
        a: "Yes. Utility coordination and FPL underground infrastructure are part of our documented project experience.",
      },
      {
        q: "What systems can Global perform under one contract?",
        a: "Electrical construction, fire alarm and life safety, low voltage infrastructure, BDA/ERCS, EV infrastructure and emergency power — coordinated by one project team.",
      },
      {
        q: "How early should Global be involved during preconstruction?",
        a: "As early as design development. Early involvement lets us review constructability, flag long-lead equipment and propose value engineering before pricing is locked.",
      },
      {
        q: "How do I submit a project for pricing?",
        a: "Use the Request a Proposal form to send your plans, specifications and bid instructions. Our estimating team confirms receipt and follows up.",
      },
    ],
  },

  footer: {
    tagline: "Electrical construction for Florida's multifamily, mixed-use and commercial projects.",
    company: "Company",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    hours: "Monday to Friday, 9:00 am – 5:00 pm",
    rights: "All rights reserved.",
    serviceArea: "Serving Florida",
  },


  pages: {
    projects: { kicker: "Projects", title: "Project portfolio.", subtitle: "Multifamily, mixed-use, commercial and infrastructure work across Florida." },
    capabilities: { kicker: "Capabilities", title: "One contract. Every electrical system.", subtitle: "Integrated electrical, life safety, power, low voltage, EV and coordination capabilities." },
    newConstruction: { kicker: "New Construction", title: "From underground to turnover.", subtitle: "How Global delivers the electrical scope of a ground-up building, phase by phase." },
    technology: { kicker: "Technology", title: "Technology driven construction.", subtitle: "Precision before installation. Coordination before conflict." },
    about: { kicker: "About", title: "Built to execute.", subtitle: "The organization behind the work." },
    resources: { kicker: "Resources", title: "Resources.", subtitle: "Prequalification, service work and product solutions." },
    catalog: { kicker: "Catalog", title: "Product catalog.", subtitle: "Electrical equipment and materials available through our team. Select a product to request it." },
    proposal: { kicker: "Estimating", title: "Request a proposal.", subtitle: "Send your plans and specifications to our estimating team." },
  },

};

export type GcContent = typeof en;

const es: GcContent = {
  nav: {
    projects: "Proyectos",
    capabilities: "Capacidades",
    newConstruction: "Obra Nueva",
    technology: "Tecnología",
    about: "Nosotros",
    resources: "Recursos",
    catalog: "Catálogo",
    rfp: "Solicitar Propuesta",
    menu: "Menú",
    openMenu: "Abrir menú",
    switchLanguage: "Switch to English",
    main: "Navegación principal",
  },

  hero: {
    eyebrow: "Global Technology & Electrical Services",
    title: "Energizamos los próximos íconos de Florida.",
    systems: ["Construcción Eléctrica", "Alarma de Incendio", "Bajo Voltaje", "BDA/ERCS", "Infraestructura EV"],
    tagline: "Hecho para developers. Respaldado por contratistas generales. Diseñado para cumplir.",
    ctaProjects: "Ver nuestros proyectos",
    ctaProposal: "Solicitar propuesta",
    microbar: ["Certificación estatal", "Multifamiliar", "Uso mixto", "Comercial", "Florida"],
    mediaAlt: "Construcción eléctrica en un desarrollo de Florida",
  },

  featured: {
    kicker: "Obras seleccionadas",
    title: "Construido en toda Florida.",
    viewCaseStudy: "Ver proyecto",
    viewAll: "Ver todos los proyectos",
    photo: "foto",
    photos: "fotos",
    prev: "Foto anterior",
    next: "Foto siguiente",
    close: "Cerrar",
    empty: "Galería de proyectos próximamente.",
  },

  scale: {
    kicker: "Capacidad a escala",
    title: "¿Podemos con su proyecto? Nuestro historial lo demuestra.",
    units: "Unidades multifamiliares entregadas",
    cities: "Ciudades de Florida",
    systems: "Sistemas en un solo contrato",
    personnel: "Personal de campo y gestión",
    bonding: "Capacidad de fianza",
    insurance: "Cobertura de seguro",
    experience: "Años de experiencia combinada en construcción",
    established: "Fundada en",
    footnote: "Cifras basadas en experiencia documentada en proyectos.",
  },

  capabilities: {
    kicker: "Capacidades",
    title: "Capacidades completas de construcción eléctrica.",
    subtitle: "Seis sistemas integrados, un solo socio eléctrico responsable.",
    learnMore: "Ver más",
    items: [
      {
        key: "electrical",
        title: "Construcción Eléctrica",
        desc: "Desde infraestructura subterránea y de servicios hasta switchgear, alimentadores, montantes, busway y circuitos derivados.",
        bullets: ["Subterráneo y electricidad de sitio", "Infraestructura de servicios", "Cuartos eléctricos y switchgear", "Alimentadores, montantes y busway", "Distribución y circuitos derivados"],
      },
      {
        key: "lifeSafety",
        title: "Sistemas de Seguridad Humana",
        desc: "Alarma de incendio, sistemas de emergencia, interfaces de control de humo y cobertura para servicios de emergencia en el edificio.",
        bullets: ["Sistemas de alarma de incendio", "Sistemas de emergencia", "Interfaces de control de humo", "BDA / ERCS"],
      },
      {
        key: "power",
        title: "Energía de Emergencia y Crítica",
        desc: "Generadores, interruptores de transferencia automática y distribución de emergencia, incluida la alimentación de bombas contra incendio.",
        bullets: ["Generadores", "Interruptores de transferencia automática", "Distribución de emergencia", "Alimentación de bomba contra incendio"],
      },
      {
        key: "lowVoltage",
        title: "Infraestructura de Bajo Voltaje",
        desc: "Canalizaciones y backbone para telecomunicaciones, control de acceso y CCTV, coordinados con el alcance eléctrico.",
        bullets: ["Canalizaciones y backbone", "Infraestructura de telecomunicaciones", "Infraestructura de control de acceso / CCTV (según alcance)"],
      },
      {
        key: "ev",
        title: "Infraestructura EV",
        desc: "Distribución, alimentadores, cargadores e infraestructura de carga dimensionados para la demanda actual y futura.",
        bullets: ["Distribución y alimentadores EV", "Instalación de cargadores", "Infraestructura y gestión de carga"],
      },
      {
        key: "technology",
        title: "Tecnología y Coordinación",
        desc: "BIM, trazado robótico Trimble, planos de taller y documentación de campo que protegen el cronograma.",
        bullets: ["Coordinación BIM", "Trazado robótico Trimble", "Planos de taller", "Documentación de campo"],
      },
    ],
  },

  groundUp: {
    kicker: "Obra Nueva",
    title: "Construcción eléctrica desde cero.",
    subtitle: "Desde el subterráneo hasta la entrega.",
    cta: "Ver la secuencia completa",
    steps: [
      { title: "Coordinación con la compañía eléctrica", items: "FPL · Coordinación de transformadores · Bancos de ductos · Infraestructura de acometida" },
      { title: "Subterráneo", items: "Alimentadores del edificio · Electricidad de sitio · EV · Bomba contra incendio · Canalizaciones de comunicaciones" },
      { title: "Cuartos Eléctricos", items: "Tableros principales · Transformadores · Paneles de distribución · CT / medición" },
      { title: "Distribución Vertical", items: "Alimentadores · Montantes · Busway · Cajas de derivación" },
      { title: "Distribución del Edificio", items: "Unidades · Corredores · Amenidades · Sistemas mecánicos" },
      { title: "Iluminación y Controles", items: "Interior · Exterior · Emergencia · Sistemas arquitectónicos" },
      { title: "Seguridad Humana", items: "Alarma de incendio · BDA / ERCS · Distribución de emergencia" },
      { title: "Techo y Mecánica", items: "RTUs · Condensadoras · Bombas · Equipos mecánicos" },
      { title: "Pruebas e Inspecciones", items: "Megger · Puesta en marcha · Pruebas de alarma de incendio · Inspecciones de la autoridad" },
      { title: "Entrega", items: "Planos as-built · Documentos de cierre · Capacitación · Cierre de punch list" },
    ],
  },

  execute: {
    kicker: "Capacidad de ejecución",
    title: "Hechos para ejecutar.",
    subtitle: "Una organización de construcción, no solo electricistas.",
    phases: [
      { title: "Preconstrucción", items: ["Estimación", "Revisión de alcance", "Ingeniería de valor", "Constructibilidad"] },
      { title: "Compras", items: ["Equipos de largo plazo de entrega", "Switchgear", "Generadores", "Iluminación", "Calendarios de liberación"] },
      { title: "Ejecución en campo", items: ["Gestión de proyecto", "Supervisión", "Mano de obra", "Planificación de producción"] },
      { title: "Control de cronograma", items: ["Planificación anticipada", "Hitos", "Pronóstico de mano de obra"] },
      { title: "QA / QC", items: ["Preinstalación", "Inspecciones de instalación", "Pruebas"] },
      { title: "Seguridad", items: ["Cumplimiento en campo", "Documentación", "Capacitación"] },
      { title: "Cierre", items: ["Inspecciones", "Punch list", "Planos as-built", "Entrega"] },
    ],
  },

  technology: {
    kicker: "Construcción impulsada por tecnología",
    title: "Precisión antes de instalar. Coordinación antes del conflicto.",
    subtitle: "Usamos tecnología para reducir retrabajos y proteger el cronograma.",
    items: [
      { title: "BIM y Coordinación", desc: "Revisión de constructibilidad, planos de taller coordinados y reducción de interferencias." },
      { title: "Trazado Robótico / Trimble", desc: "Trazado preciso en campo directamente desde los planos coordinados." },
      { title: "Control Digital del Proyecto", desc: "RFIs, submittals, seguimiento de compras, documentación y reportes del proyecto." },
      { title: "QA / QC", desc: "Inspecciones documentadas antes de cerrar muros y energizar." },
      { title: "Documentación de Campo", desc: "Verificación de avance y registros de construcción." },
      { title: "Cierre", desc: "Pruebas, inspecciones, planos as-built y documentación de entrega." },
    ],
    cta: "Conocer nuestra tecnología",
  },

  trust: {
    kicker: "Experiencia confiable",
    title: "Credenciales que reducen el riesgo de ejecución.",
    items: [
      { title: "Contratista eléctrico certificado por el estado", desc: "Licenciado por el Estado de Florida." },
      { title: "Asegurados", desc: "Certificados de seguro disponibles en nuestro paquete de precalificación." },
      { title: "Fianzas", desc: "Información de fianzas disponible bajo solicitud para proyectos calificados." },
      { title: "Programa de seguridad", desc: "Cumplimiento en campo alineado con OSHA, documentación y capacitación." },
      { title: "BIM y Trimble", desc: "Planos coordinados y trazado robótico en campo." },
      { title: "Experiencia con autoridades", desc: "Permisos e inspecciones con jurisdicciones de Florida y FPL." },
    ],
    license: "Licencia",
    alongside: "Experiencia trabajando junto a",
  },

  team: {
    kicker: "Nuestro equipo",
    title: "Organizados para ejecutar proyectos.",
    roles: ["Dirección ejecutiva", "Preconstrucción", "Gestión de proyectos", "Supervisión de campo", "Compras", "QA / QC", "Seguridad"],
    closing: "Un equipo de proyecto estructurado desde la preconstrucción hasta el cierre.",
    photoAlt: "Equipo de campo de Global Technology & Electrical Services",
  },

  about: {
    kicker: "Nosotros",
    title: "Una plataforma de construcción eléctrica hecha para ejecutar proyectos complejos.",
    paragraphs: [
      "Global Technology & Electrical Services es un contratista eléctrico certificado por el Estado de Florida que ejecuta construcción eléctrica para proyectos multifamiliares, de uso mixto, comerciales y municipales.",
      "Nuestro equipo ha trabajado en proyectos de costa a costa de Florida — Fort Myers, Naples, Sarasota y Orlando — y desde 2020 contrata directamente con developers y contratistas generales.",
      "Combinamos la ejecución en campo con preconstrucción, compras, coordinación BIM y trazado robótico Trimble, para que el contratista general tenga un único socio responsable de todo el alcance eléctrico.",
    ],
    fieldAlt: "Cuadrilla de Global Technology trabajando en infraestructura eléctrica subterránea",
  },

  resources: {
    kicker: "Recursos",
    title: "Recursos para propietarios, contratistas generales y administradores.",
    prequal: {
      title: "Paquete de precalificación",
      desc: "Licencia, certificados de seguro, programa de seguridad y referencias de proyectos para su registro de proveedores.",
      cta: "Solicitar paquete de precalificación",
    },
    residential: {
      title: "Servicio residencial y mantenimiento",
      desc: "Nuestra división de servicio atiende trabajos eléctricos en viviendas y edificios existentes: cambio de paneles, cargadores EV, iluminación y diagnóstico.",
      empty: "Lista de servicios próximamente.",
      cta: "Solicitar servicio",
    },
    products: {
      title: "Soluciones de producto",
      desc: "Equipos y materiales eléctricos disponibles a través de nuestro equipo.",
      cta: "Ver soluciones de producto",
    },
  },

  proposal: {
    kicker: "Solicitar propuesta",
    title: "¿Tiene un proyecto para cotizar?",
    subtitle: "Envíenos sus planos. Nuestro equipo de estimación revisa cada solicitud y confirma su recepción.",
    sections: { contact: "Contacto", project: "Proyecto", documents: "Documentos del proyecto" },
    fields: {
      company: "Empresa",
      name: "Nombre de contacto",
      email: "Correo electrónico",
      phone: "Teléfono",
      projectName: "Nombre del proyecto",
      projectLocation: "Ubicación del proyecto",
      projectType: "Tipo de proyecto",
      start: "Inicio estimado de construcción",
      bidDue: "Fecha límite de oferta",
      scope: "Alcance solicitado",
      notes: "Notas",
      notesPlaceholder: "Unidades, pisos, superficie, cronograma o cualquier detalle que nos ayude a cotizar.",
      select: "Seleccione…",
    },
    projectTypes: ["Multifamiliar", "Uso mixto", "Comercial", "Hotelero", "Salud", "Industrial", "Municipal / Público", "Otro"],
    scopes: ["Construcción eléctrica", "Alarma de incendio", "Bajo voltaje", "BDA/ERCS", "Infraestructura EV", "Energía de emergencia / Generadores", "Coordinación FPL / servicios", "Iluminación y controles"],
    uploads: {
      plans: "Subir planos",
      specs: "Subir especificaciones",
      bid: "Subir instrucciones de oferta",
      hint: "PDF, DWG, ZIP o imágenes · hasta 50 MB por archivo",
      choose: "Elegir archivos",
      remove: "Quitar",
    },
    consent: "Al enviar, acepta que le contactemos sobre este proyecto.",
    smsConsent: "Acepto recibir mensajes de texto (SMS) de Global Technology & Electrical Services sobre este proyecto. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para darse de baja.",
    submit: "Solicitar propuesta",
    sending: "Enviando…",
    uploading: "Subiendo documentos…",
    successTitle: "Solicitud de propuesta recibida.",
    successText: "Gracias. Nuestro equipo de estimación revisará su proyecto y le contactará en breve.",
    another: "Enviar otro proyecto",
    errors: {
      required: "Complete los campos obligatorios.",
      email: "Introduzca un correo electrónico válido.",
      fileSize: "Cada archivo debe pesar 50 MB o menos.",
      generic: "No pudimos enviar su solicitud. Inténtelo de nuevo o escríbanos directamente.",
      rate: "Demasiados envíos. Espere unos minutos e inténtelo de nuevo.",
      upload: "Recibimos su solicitud, pero algunos documentos no se pudieron subir. Envíenoslos por correo.",
    },
    direct: "¿Prefiere hablar primero?",
    whatsapp: "WhatsApp",
    required: "obligatorio",
  },

  faq: {
    kicker: "Preguntas de preconstrucción",
    title: "Lo que nos preguntan contratistas generales y developers.",
    items: [
      {
        q: "¿Qué tipo de proyectos cotiza Global Technology?",
        a: "Construcción multifamiliar, de uso mixto, comercial y municipal — obra nueva y renovaciones mayores — donde podamos asumir el alcance eléctrico completo.",
      },
      {
        q: "¿En qué mercados trabajan?",
        a: "Nuestra oficina central está en Davie y trabajamos en todo el sur de Florida. El equipo también tiene experiencia en proyectos del suroeste y centro de Florida, incluidos Fort Myers, Naples, Sarasota y Orlando.",
      },
      {
        q: "¿Puede Global ofrecer fianzas para proyectos grandes?",
        a: "La información de fianzas se entrega bajo solicitud como parte de nuestro paquete de precalificación. Contacte a nuestro equipo de estimación con los requisitos de su proyecto.",
      },
      {
        q: "¿Ofrecen BIM y planos de coordinación eléctrica?",
        a: "Sí. Apoyamos la coordinación BIM y los planos de taller coordinados, y usamos trazado robótico Trimble para llevar esa coordinación con precisión al campo.",
      },
      {
        q: "¿Pueden coordinar directamente con FPL y otras compañías de servicios?",
        a: "Sí. La coordinación con la compañía eléctrica y la infraestructura subterránea de FPL forman parte de nuestra experiencia documentada.",
      },
      {
        q: "¿Qué sistemas puede ejecutar Global en un solo contrato?",
        a: "Construcción eléctrica, alarma de incendio y seguridad humana, infraestructura de bajo voltaje, BDA/ERCS, infraestructura EV y energía de emergencia — coordinados por un mismo equipo de proyecto.",
      },
      {
        q: "¿En qué momento de la preconstrucción conviene involucrar a Global?",
        a: "Desde el desarrollo del diseño. Una participación temprana nos permite revisar constructibilidad, identificar equipos de largo plazo de entrega y proponer ingeniería de valor antes de cerrar precios.",
      },
      {
        q: "¿Cómo envío un proyecto para cotización?",
        a: "Use el formulario Solicitar propuesta para enviar planos, especificaciones e instrucciones de oferta. Nuestro equipo de estimación confirma la recepción y da seguimiento.",
      },
    ],
  },

  footer: {
    tagline: "Construcción eléctrica para proyectos multifamiliares, de uso mixto y comerciales en Florida.",
    company: "Empresa",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Política de privacidad",
    terms: "Términos del servicio",
    hours: "Lunes a viernes, 9:00 am – 5:00 pm",
    rights: "Todos los derechos reservados.",
    serviceArea: "Trabajamos en Florida",
  },


  pages: {
    projects: { kicker: "Proyectos", title: "Portafolio de proyectos.", subtitle: "Obras multifamiliares, de uso mixto, comerciales y de infraestructura en toda Florida." },
    capabilities: { kicker: "Capacidades", title: "Un contrato. Todos los sistemas eléctricos.", subtitle: "Capacidades integradas en electricidad, seguridad humana, energía, bajo voltaje, EV y coordinación." },
    newConstruction: { kicker: "Obra Nueva", title: "Desde el subterráneo hasta la entrega.", subtitle: "Cómo Global ejecuta el alcance eléctrico de un edificio nuevo, fase por fase." },
    technology: { kicker: "Tecnología", title: "Construcción impulsada por tecnología.", subtitle: "Precisión antes de instalar. Coordinación antes del conflicto." },
    about: { kicker: "Nosotros", title: "Hechos para ejecutar.", subtitle: "La organización detrás de cada obra." },
    resources: { kicker: "Recursos", title: "Recursos.", subtitle: "Precalificación, servicio y soluciones de producto." },
    catalog: { kicker: "Catálogo", title: "Catálogo de productos.", subtitle: "Equipos y materiales eléctricos disponibles a través de nuestro equipo. Seleccione un producto para solicitarlo." },
    proposal: { kicker: "Estimación", title: "Solicitar propuesta.", subtitle: "Envíe sus planos y especificaciones a nuestro equipo de estimación." },
  },

};

export const gc = { en, es } as const;
