export type PolicySection = { heading: string; body: string[] };

const CO = "Global Technology & Electrical Services, Inc.";
const MAIL = "hello@inbox.globalchb.com";
const ADDR = "4860 SW 61 Avenue, Davie, FL 33314";

export const privacyPolicy: Record<"es" | "en", PolicySection[]> = {
  es: [
    {
      heading: "",
      body: [
        `${CO} ("Global Technology", "nosotros") es un contratista eléctrico con sede en Florida. Esta política explica qué información recopilamos cuando visita globalchb.com, solicita una propuesta, hace un pedido de producto o se comunica con nosotros, y cómo la usamos y protegemos.`,
      ],
    },
    {
      heading: "1. Información que recopilamos",
      body: [
        "Información que usted nos da: nombre, empresa, email, teléfono, detalles del proyecto (alcance, ubicación, cronograma), planos y especificaciones que adjunte, productos solicitados y cualquier mensaje que nos envíe por formulario, email, WhatsApp o SMS.",
        "Información técnica: dirección IP, tipo de navegador y dispositivo, páginas visitadas y registros del servidor, necesarios para operar y proteger el sitio.",
        "Cookies: usamos una cookie funcional (gchb-locale) para recordar su idioma y los servicios de seguridad de Cloudflare Turnstile para evitar envíos automáticos. No usamos cookies publicitarias ni seguimiento entre sitios. Si en el futuro añadimos analítica, actualizaremos esta política.",
      ],
    },
    {
      heading: "2. Cómo usamos la información",
      body: [
        "Para responder a su solicitud, preparar propuestas y estimados, coordinar y ejecutar proyectos, procesar pedidos de productos, enviarle comunicaciones sobre su proyecto, proteger el sitio contra spam y abuso, cumplir obligaciones legales y mejorar nuestros servicios.",
      ],
    },
    {
      heading: "3. Archivos y planos que nos envía",
      body: [
        "Los planos y documentos que adjunte se guardan en un almacenamiento privado, solo accesible por el personal autorizado de Global Technology que prepara su propuesta. No los publicamos ni los compartimos con otros clientes.",
      ],
    },
    {
      heading: "4. Con quién compartimos información",
      body: [
        "No vendemos ni alquilamos su información personal. Solo la compartimos con proveedores que nos ayudan a operar el sitio y atenderle, bajo obligaciones de confidencialidad: alojamiento web (Vercel), base de datos y almacenamiento (Supabase), correo electrónico transaccional (Resend), verificación anti-spam (Cloudflare) y mensajería (Meta WhatsApp Business y Twilio). También podemos divulgarla cuando la ley lo exija o para proteger nuestros derechos.",
      ],
    },
    {
      heading: "5. Asistentes de inteligencia artificial",
      body: [
        "Podemos usar asistentes de IA (Andrew / Sofía) para responder consultas por WhatsApp, SMS o email. Estos asistentes no comparten información financiera interna, datos de otros clientes ni datos de empleados, y derivan a una persona del equipo cualquier solicitud que exceda su autorización. Usted puede pedir hablar con una persona en cualquier momento.",
      ],
    },
    {
      heading: "6. Mensajes de texto (SMS) y WhatsApp",
      body: [
        "Si marca la casilla de consentimiento SMS en nuestro formulario o nos escribe por mensajería, acepta recibir mensajes sobre su proyecto: confirmaciones, seguimiento y comunicación general sobre nuestros servicios (normalmente de 1 a 4 mensajes por semana). Pueden aplicarse tarifas de mensajes y datos. El consentimiento no es condición para contratar nuestros servicios.",
        "Puede responder STOP en cualquier momento para dejar de recibir mensajes, o HELP para obtener ayuda. También puede escribirnos a " + MAIL + ".",
        "No se compartirá información de teléfono móvil con terceros o afiliados con fines de marketing o promoción. Los datos de mensajería no se usan para segmentación publicitaria.",
        "Los mensajes de WhatsApp se rigen además por las políticas de WhatsApp Business (https://www.whatsapp.com/legal/business-policy/) y de Meta (https://www.facebook.com/privacy/policy/). Los SMS y llamadas se gestionan con Twilio (https://www.twilio.com/legal/privacy).",
      ],
    },
    {
      heading: "7. Conservación y seguridad",
      body: [
        "Conservamos la información el tiempo necesario para atender su solicitud, ejecutar el proyecto y cumplir obligaciones legales, contables y contractuales. Aplicamos cifrado en tránsito, controles de acceso por rol y almacenamiento privado para documentos. Ningún sistema es 100 % seguro, pero trabajamos para proteger su información.",
      ],
    },
    {
      heading: "8. Sus derechos y opciones",
      body: [
        "Puede solicitar acceso, corrección o eliminación de su información personal, o dejar de recibir comunicaciones, escribiéndonos a " + MAIL + ". Responderemos dentro de un plazo razonable y conforme a la ley aplicable.",
      ],
    },
    {
      heading: "9. Menores de edad",
      body: [
        "Este sitio está dirigido a empresas y profesionales de la construcción. No recopilamos a sabiendas información de menores de 18 años.",
      ],
    },
    {
      heading: "10. Enlaces a terceros",
      body: [
        "El sitio puede enlazar a páginas de terceros (por ejemplo, Google o WhatsApp). No controlamos sus prácticas de privacidad; le recomendamos leer sus políticas.",
      ],
    },
    {
      heading: "11. Cambios a esta política",
      body: [
        "Podemos actualizar esta política. La fecha de la última actualización aparece al inicio de esta página y los cambios rigen desde su publicación.",
      ],
    },
    {
      heading: "12. Contacto",
      body: [CO, `Email: ${MAIL}`, `Dirección: ${ADDR}`, "Teléfono: +1 (786) 952-7504", "Área de servicio: Florida"],
    },
  ],
  en: [
    {
      heading: "",
      body: [
        `${CO} ("Global Technology", "we", "us") is a Florida-based electrical contractor. This policy explains what information we collect when you visit globalchb.com, request a proposal, place a product order or contact us, and how we use and protect it.`,
      ],
    },
    {
      heading: "1. Information We Collect",
      body: [
        "Information you give us: name, company, email, phone, project details (scope, location, schedule), plans and specifications you attach, products requested, and any message you send us through a form, email, WhatsApp or SMS.",
        "Technical information: IP address, browser and device type, pages visited and server logs, needed to operate and protect the site.",
        "Cookies: we use one functional cookie (gchb-locale) to remember your language, and Cloudflare Turnstile security services to prevent automated submissions. We do not use advertising cookies or cross-site tracking. If we add analytics in the future, we will update this policy.",
      ],
    },
    {
      heading: "2. How We Use Information",
      body: [
        "To respond to your request, prepare proposals and estimates, coordinate and execute projects, process product orders, communicate with you about your project, protect the site from spam and abuse, meet legal obligations and improve our services.",
      ],
    },
    {
      heading: "3. Files and Plans You Send Us",
      body: [
        "Plans and documents you attach are stored in private storage, accessible only to authorized Global Technology staff preparing your proposal. We do not publish them or share them with other clients.",
      ],
    },
    {
      heading: "4. Who We Share Information With",
      body: [
        "We do not sell or rent your personal information. We share it only with service providers that help us operate the site and serve you, under confidentiality obligations: web hosting (Vercel), database and storage (Supabase), transactional email (Resend), anti-spam verification (Cloudflare) and messaging (Meta WhatsApp Business and Twilio). We may also disclose it when required by law or to protect our rights.",
      ],
    },
    {
      heading: "5. Artificial Intelligence Assistants",
      body: [
        "We may use AI assistants (Andrew / Sofía) to answer inquiries via WhatsApp, SMS or email. These assistants do not share internal financial information, other clients' data or employee data, and they escalate to a team member any request beyond their authorization. You may ask to speak with a person at any time.",
      ],
    },
    {
      heading: "6. Text Messages (SMS) and WhatsApp",
      body: [
        "If you check the SMS consent box on our form or message us, you agree to receive messages about your project: confirmations, follow-ups and general communication about our services (typically 1–4 messages per week). Message and data rates may apply. Consent is not a condition of purchasing our services.",
        "You may reply STOP at any time to opt out, or HELP for assistance. You can also contact us at " + MAIL + ".",
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Messaging data is not used for advertising targeting.",
        "WhatsApp messages are also governed by WhatsApp Business policies (https://www.whatsapp.com/legal/business-policy/) and Meta's privacy policy (https://www.facebook.com/privacy/policy/). SMS and voice are handled through Twilio (https://www.twilio.com/legal/privacy).",
      ],
    },
    {
      heading: "7. Retention and Security",
      body: [
        "We keep information as long as needed to handle your request, perform the project and meet legal, accounting and contractual obligations. We use encryption in transit, role-based access controls and private storage for documents. No system is 100% secure, but we work to protect your information.",
      ],
    },
    {
      heading: "8. Your Rights and Choices",
      body: [
        "You may request access to, correction of or deletion of your personal information, or opt out of communications, by contacting us at " + MAIL + ". We will respond within a reasonable time and as required by applicable law.",
      ],
    },
    {
      heading: "9. Children",
      body: [
        "This site is directed to construction businesses and professionals. We do not knowingly collect information from anyone under 18.",
      ],
    },
    {
      heading: "10. Third-Party Links",
      body: [
        "The site may link to third-party pages (for example, Google or WhatsApp). We do not control their privacy practices; please review their policies.",
      ],
    },
    {
      heading: "11. Changes to This Policy",
      body: [
        "We may update this policy. The date of the latest update appears at the top of this page and changes apply from the time they are posted.",
      ],
    },
    {
      heading: "12. Contact",
      body: [CO, `Email: ${MAIL}`, `Address: ${ADDR}`, "Phone: +1 (786) 952-7504", "Service area: Florida"],
    },
  ],
};

export const termsOfService: Record<"es" | "en", PolicySection[]> = {
  es: [
    {
      heading: "",
      body: [
        `Estos términos regulan el uso del sitio globalchb.com, operado por ${CO}. Al usar el sitio usted acepta estos términos; si no está de acuerdo, no lo utilice.`,
      ],
    },
    {
      heading: "1. Uso del sitio",
      body: [
        "Puede usar el sitio para conocer nuestros servicios, solicitar propuestas y pedir productos. No puede usarlo para fines ilegales, enviar información falsa, intentar acceder sin autorización a nuestros sistemas, ni enviar contenido malicioso o spam.",
      ],
    },
    {
      heading: "2. Información del sitio",
      body: [
        "Procuramos que el contenido (servicios, proyectos, fotos, productos y precios) sea exacto y actual, pero puede cambiar sin previo aviso y no constituye una oferta vinculante. Las fotos de proyectos son referenciales.",
      ],
    },
    {
      heading: "3. Propuestas, estimados y pedidos",
      body: [
        "Enviar un formulario no crea un contrato. Toda propuesta, estimado o precio, incluidos los preparados con ayuda de herramientas de inteligencia artificial, es referencial hasta que Global Technology lo revise y lo confirme por escrito. Los pedidos de productos están sujetos a disponibilidad y a confirmación.",
      ],
    },
    {
      heading: "4. Contenido que usted envía",
      body: [
        "Usted garantiza que tiene derecho a compartir los planos, documentos y datos que nos envía. Los usaremos solo para atender su solicitud según nuestra Política de Privacidad.",
      ],
    },
    {
      heading: "5. Propiedad intelectual",
      body: [
        "Los textos, logotipos, fotografías, diseños y demás contenido del sitio pertenecen a Global Technology o a sus licenciantes y están protegidos por la ley. No puede copiarlos ni usarlos con fines comerciales sin nuestra autorización escrita.",
      ],
    },
    {
      heading: "6. Comunicaciones automatizadas",
      body: [
        "Podemos comunicarnos con usted por email, WhatsApp, SMS y llamadas, y usar asistentes de inteligencia artificial (Andrew / Sofía) para responder consultas. Usted puede estar interactuando con un asistente de IA y puede pedir hablar con una persona en cualquier momento. Los mensajes SMS se rigen por la sección 6 de nuestra Política de Privacidad (responda STOP para darse de baja). Las comunicaciones por WhatsApp y Twilio están sujetas también a los términos de esas plataformas.",
      ],
    },
    {
      heading: "7. Enlaces de terceros",
      body: [
        "El sitio puede enlazar a sitios de terceros. No somos responsables de su contenido ni de sus prácticas.",
      ],
    },
    {
      heading: "8. Exclusión de garantías",
      body: [
        'El sitio se ofrece "tal cual" y "según disponibilidad". No garantizamos que funcione sin interrupciones ni errores.',
      ],
    },
    {
      heading: "9. Limitación de responsabilidad",
      body: [
        "En la medida permitida por la ley, Global Technology no será responsable de daños indirectos, incidentales o consecuentes derivados del uso del sitio. Esto no limita las obligaciones que surjan de un contrato de servicios firmado.",
      ],
    },
    {
      heading: "10. Ley aplicable",
      body: [
        "Estos términos se rigen por las leyes del Estado de Florida, EE. UU. Cualquier disputa se someterá a los tribunales competentes del condado de Broward, Florida.",
      ],
    },
    {
      heading: "11. Cambios",
      body: [
        "Podemos modificar estos términos en cualquier momento. La versión vigente es la publicada en esta página, con su fecha de actualización.",
      ],
    },
    {
      heading: "12. Contacto",
      body: [CO, `Email: ${MAIL}`, `Dirección: ${ADDR}`, "Teléfono: +1 (786) 952-7504"],
    },
  ],
  en: [
    {
      heading: "",
      body: [
        `These terms govern your use of globalchb.com, operated by ${CO}. By using the site you accept these terms; if you do not agree, please do not use it.`,
      ],
    },
    {
      heading: "1. Use of the Site",
      body: [
        "You may use the site to learn about our services, request proposals and order products. You may not use it for unlawful purposes, submit false information, attempt unauthorized access to our systems, or send malicious content or spam.",
      ],
    },
    {
      heading: "2. Site Information",
      body: [
        "We strive to keep content (services, projects, photos, products and prices) accurate and current, but it may change without notice and is not a binding offer. Project photos are for reference.",
      ],
    },
    {
      heading: "3. Proposals, Estimates and Orders",
      body: [
        "Submitting a form does not create a contract. Any proposal, estimate or price, including those prepared with the help of artificial intelligence tools, is for reference until Global Technology reviews and confirms it in writing. Product orders are subject to availability and confirmation.",
      ],
    },
    {
      heading: "4. Content You Submit",
      body: [
        "You represent that you have the right to share the plans, documents and data you send us. We will use them only to handle your request in accordance with our Privacy Policy.",
      ],
    },
    {
      heading: "5. Intellectual Property",
      body: [
        "The text, logos, photographs, designs and other content on the site belong to Global Technology or its licensors and are protected by law. You may not copy or use them commercially without our written permission.",
      ],
    },
    {
      heading: "6. Automated Communications",
      body: [
        "We may contact you by email, WhatsApp, SMS and voice, and may use artificial intelligence assistants (Andrew / Sofía) to answer inquiries. You may be interacting with an AI assistant and may ask to speak with a person at any time. SMS messages are governed by section 6 of our Privacy Policy (reply STOP to opt out). WhatsApp and Twilio communications are also subject to those platforms' terms.",
      ],
    },
    {
      heading: "7. Third-Party Links",
      body: [
        "The site may link to third-party sites. We are not responsible for their content or practices.",
      ],
    },
    {
      heading: "8. Disclaimer of Warranties",
      body: [
        'The site is provided "as is" and "as available". We do not guarantee uninterrupted or error-free operation.',
      ],
    },
    {
      heading: "9. Limitation of Liability",
      body: [
        "To the extent permitted by law, Global Technology will not be liable for indirect, incidental or consequential damages arising from use of the site. This does not limit obligations arising under a signed services contract.",
      ],
    },
    {
      heading: "10. Governing Law",
      body: [
        "These terms are governed by the laws of the State of Florida, USA. Any dispute will be submitted to the competent courts of Broward County, Florida.",
      ],
    },
    {
      heading: "11. Changes",
      body: [
        "We may modify these terms at any time. The version in effect is the one posted on this page, with its update date.",
      ],
    },
    {
      heading: "12. Contact",
      body: [CO, `Email: ${MAIL}`, `Address: ${ADDR}`, "Phone: +1 (786) 952-7504"],
    },
  ],
};
