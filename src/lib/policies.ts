import { COMPANY } from "@/lib/i18n";

// Texto legal redactado para Global Technology & Electrical Services.
// Cubre los mismos temas funcionales que la referencia gtech (datos recopilados,
// uso, comunicaciones automatizadas/SMS, terceros, seguridad, derechos, contacto)
// con redacción propia adaptada a un contratista eléctrico.

export type PolicySection = { heading: string; body: string[] };

export const privacyPolicy: Record<"es" | "en", PolicySection[]> = {
  es: [
    {
      heading: "1. Quiénes somos",
      body: [
        `${COMPANY.legalName} — Global Technology & Electrical Services ("nosotros") es un contratista eléctrico certificado por el estado y opera este sitio web para ofrecer servicios eléctricos residenciales y comerciales en Florida. Esta política explica qué información recopilamos a través del sitio, cómo la usamos y qué derechos tienes.`,
      ],
    },
    {
      heading: "2. Información que recopilamos",
      body: [
        "Datos de contacto: nombre, correo electrónico y teléfono cuando envías el formulario de contacto, te suscribes al boletín o solicitas un pedido del catálogo.",
        "Datos del proyecto: tipo de propiedad, ciudad o dirección aproximada, descripción del trabajo solicitado (panel, cargador EV, iluminación, trazado) y cualquier nota que incluyas para poder cotizar.",
        "Datos técnicos: información básica de uso del sitio (páginas visitadas, tipo de navegador) utilizada de forma agregada para mejorar la experiencia.",
      ],
    },
    {
      heading: "3. Cómo usamos tu información",
      body: [
        "Usamos tu información exclusivamente para responder consultas, preparar cotizaciones, gestionar pedidos e instalaciones, tramitar permisos e inspecciones ante las autoridades correspondientes, enviar el boletín tecnológico si te suscribes y cumplir obligaciones legales. No vendemos ni alquilamos tu información personal.",
      ],
    },
    {
      heading: "4. Comunicaciones y mensajes de texto (SMS)",
      body: [
        "Al proporcionar tu número de teléfono, aceptas recibir comunicaciones relacionadas con tu solicitud, cotización o proyecto por teléfono, correo o SMS. Puedes solicitar dejar de recibir mensajes en cualquier momento respondiendo STOP o escribiéndonos.",
      ],
    },
    {
      heading: "5. Con quién compartimos la información",
      body: [
        "Compartimos la información estrictamente necesaria con proveedores de materiales, subcontratistas especializados, autoridades de permisos e inspecciones cuando la ley lo exige, y proveedores tecnológicos (alojamiento web, correo) bajo acuerdos de confidencialidad.",
      ],
    },
    {
      heading: "6. Asistentes automatizados e inteligencia artificial",
      body: [
        "Podemos utilizar herramientas de automatización o asistentes digitales para agilizar respuestas y organizativas. Estas herramientas se usan bajo supervisión humana y no toman decisiones autónomas sobre tu proyecto ni sobre tus datos personales.",
      ],
    },
    {
      heading: "7. Seguridad",
      body: [
        "Aplicamos medidas de seguridad razonables, incluido cifrado en tránsito y acceso restringido a la información de clientes según la función de cada miembro del equipo.",
      ],
    },
    {
      heading: "8. Tus derechos",
      body: [
        `Puedes solicitar acceder, corregir o eliminar tus datos, o cancelar tu suscripción al boletín, escribiendo a ${COMPANY.email}. Respondemos las solicitudes en un plazo razonable conforme a la legislación aplicable.`,
      ],
    },
    {
      heading: "9. Contacto",
      body: [
        `${COMPANY.name} · Correo: ${COMPANY.email} · Oficina: ${COMPANY.office.es} · Horario: ${COMPANY.hours.es}.`,
      ],
    },
  ],
  en: [
    {
      heading: "1. Who we are",
      body: [
        `${COMPANY.legalName} — Global Technology & Electrical Services ("we") is a state-certified electrical contractor and operates this website to provide residential and commercial electrical services in Florida. This policy explains what information we collect through the site, how we use it, and what rights you have.`,
      ],
    },
    {
      heading: "2. Information we collect",
      body: [
        "Contact details: name, email and phone number when you submit the contact form, subscribe to the newsletter or request a catalog order.",
        "Project details: property type, city or approximate address, description of the requested work (panel, EV charger, lighting, layout) and any notes you include for quoting purposes.",
        "Technical data: basic site usage information (pages visited, browser type) used in aggregate to improve the experience.",
      ],
    },
    {
      heading: "3. How we use your information",
      body: [
        "We use your information exclusively to answer inquiries, prepare quotes, manage orders and installations, process permits and inspections with the corresponding authorities, send the technology newsletter if you subscribe, and comply with legal obligations. We do not sell or rent your personal information.",
      ],
    },
    {
      heading: "4. Communications and text messages (SMS)",
      body: [
        "By providing your phone number, you agree to receive communications related to your request, quote or project by phone, email or SMS. You can opt out at any time by replying STOP or by writing to us.",
      ],
    },
    {
      heading: "5. With whom we share the information",
      body: [
        "We share only the strictly necessary information with material suppliers, specialized subcontractors, permit and inspection authorities where required by law, and technology providers (web hosting, email) under confidentiality agreements.",
      ],
    },
    {
      heading: "6. Automated assistants and artificial intelligence",
      body: [
        "We may use automation tools or digital assistants to speed up responses and internal organization. These tools operate under human supervision and do not make autonomous decisions about your project or your personal data.",
      ],
    },
    {
      heading: "7. Security",
      body: [
        "We apply reasonable security measures, including encryption in transit and restricted access to client information based on each team member's role.",
      ],
    },
    {
      heading: "8. Your rights",
      body: [
        `You may request access to, correction of, or deletion of your data, or unsubscribe from the newsletter, by writing to ${COMPANY.email}. We respond to requests within a reasonable time in accordance with applicable law.`,
      ],
    },
    {
      heading: "9. Contact",
      body: [
        `${COMPANY.name} · Email: ${COMPANY.email} · Office: ${COMPANY.office.en} · Hours: ${COMPANY.hours.en}.`,
      ],
    },
  ],
};

export const termsOfService: Record<"es" | "en", PolicySection[]> = {
  es: [
    {
      heading: "1. Aceptación de los términos",
      body: [
        `Al utilizar este sitio web o contratar los servicios de ${COMPANY.legalName} ("Global Technology & Electrical Services", "nosotros"), aceptas estos Términos y Condiciones. Si no estás de acuerdo, por favor no utilices el sitio.`,
      ],
    },
    {
      heading: "2. Servicios",
      body: [
        "Ofrecemos servicios eléctricos residenciales y comerciales en Florida: reemplazo de paneles y subpaneles, paneles trifásicos, trazado eléctrico con tecnología Trimble, estaciones de carga para vehículos eléctricos y RV, interruptores e iluminación interior/exterior, cableado para generadores, mantenimiento, termografía y trabajos relacionados. Cada trabajo se rige por una propuesta o contrato específico que prevalece sobre estas condiciones generales en caso de conflicto.",
      ],
    },
    {
      heading: "3. Cotizaciones y pedidos del catálogo",
      body: [
        "Las solicitudes enviadas desde el catálogo o el formulario de contacto son solicitudes, no órdenes de compra confirmadas. Los precios mostrados son de referencia y se confirman por escrito según alcance, marca y disponibilidad. Un pedido queda formalizado únicamente cuando recibes nuestra confirmación o firma de contrato.",
      ],
    },
    {
      heading: "4. Permisos e inspecciones",
      body: [
        "Cuando el trabajo lo requiere, gestionamos los permisos y las inspecciones ante la autoridad correspondiente. El cliente se compromete a facilitar acceso a la propiedad y la documentación necesaria para tramitarlos.",
      ],
    },
    {
      heading: "5. Responsabilidades del cliente",
      body: [
        "El cliente declara ser propietario o contar con autorización para realizar los trabajos en la propiedad, garantizará acceso seguro y puntual al sitio, y será responsable de la exactitud de la información proporcionada para el diseño y la ejecución de la instalación.",
      ],
    },
    {
      heading: "6. Garantías y limitación de responsabilidad",
      body: [
        "Nuestros trabajos se ejecutan conforme al código eléctrico aplicable y a los estándares de la industria de la construcción. Ofrecemos garantía de mano de obra según lo establecido en cada contrato. Salvo negligencia grave, nuestra responsabilidad total se limita al valor del trabajo realizado y no cubre daños indirectos o lucro cesante.",
      ],
    },
    {
      heading: "7. Propiedad intelectual",
      body: [
        "Todo el contenido de este sitio (textos, imágenes, diseño y logotipos) pertenece a Global Technology & Electrical Services o a sus licenciantes y no puede reproducirse sin autorización escrita.",
      ],
    },
    {
      heading: "8. Comunicaciones",
      body: [
        "Al contactarnos, aceptas recibir comunicaciones por correo electrónico o teléfono relacionadas con tu solicitud. Puedes solicitar la suspensión de estas comunicaciones en cualquier momento.",
      ],
    },
    {
      heading: "9. Ley aplicable",
      body: [
        "Estos términos se rigen por las leyes del Estado de Florida, EE.UU. Cualquier controversia se someterá a los tribunales competentes de dicho estado.",
      ],
    },
    {
      heading: "10. Cambios y contacto",
      body: [
        `Podemos actualizar estos términos publicando una nueva versión en esta página. Para dudas escribe a ${COMPANY.email} o visítanos en ${COMPANY.office.es}.`,
      ],
    },
  ],
  en: [
    {
      heading: "1. Acceptance of the terms",
      body: [
        `By using this website or hiring the services of ${COMPANY.legalName} ("Global Technology & Electrical Services", "we"), you accept these Terms & Conditions. If you do not agree, please do not use the site.`,
      ],
    },
    {
      heading: "2. Services",
      body: [
        "We provide residential and commercial electrical services in Florida: panel and sub panel replacements, 3-phase panels, electrical layout with Trimble technology, RV/EV charger stations, interior/outdoor switches and lighting, generator wiring, maintenance, infrared surveys and related work. Each job is governed by a specific proposal or contract which prevails over these general conditions in case of conflict.",
      ],
    },
    {
      heading: "3. Quotes and catalog orders",
      body: [
        "Requests submitted from the catalog or contact form are requests, not confirmed purchase orders. Displayed prices are reference prices and are confirmed in writing based on scope, brand and availability. An order is only formalized when you receive our confirmation or sign a contract.",
      ],
    },
    {
      heading: "4. Permits and inspections",
      body: [
        "Where the work requires it, we process permits and inspections with the corresponding authority. The client agrees to provide access to the property and the documentation needed to process them.",
      ],
    },
    {
      heading: "5. Client responsibilities",
      body: [
        "The client declares to be the owner of or to hold authorization for the works on the property, will ensure safe and timely access to the site, and is responsible for the accuracy of the information provided for the design and execution of the installation.",
      ],
    },
    {
      heading: "6. Warranties and limitation of liability",
      body: [
        "Our work is performed in accordance with the applicable electrical code and construction industry standards. We provide a workmanship warranty as stated in each contract. Except for gross negligence, our total liability is limited to the value of the work performed and does not cover indirect damages or loss of profit.",
      ],
    },
    {
      heading: "7. Intellectual property",
      body: [
        "All content on this site (text, images, design and logos) belongs to Global Technology & Electrical Services or its licensors and may not be reproduced without written authorization.",
      ],
    },
    {
      heading: "8. Communications",
      body: [
        "By contacting us, you agree to receive communications by email or phone related to your request. You may request suspension of these communications at any time.",
      ],
    },
    {
      heading: "9. Governing law",
      body: [
        "These terms are governed by the laws of the State of Florida, USA. Any dispute shall be submitted to the competent courts of said state.",
      ],
    },
    {
      heading: "10. Changes and contact",
      body: [
        `We may update these terms by publishing a new version on this page. For questions, write to ${COMPANY.email} or visit us in ${COMPANY.office.en}.`,
      ],
    },
  ],
};
