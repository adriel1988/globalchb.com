"use client";

import { useLanguage } from "@/components/language-provider";
import { COMPANY } from "@/lib/i18n";
import { MapPin, Mail, Phone, Clock, Navigation, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const { locale } = useLanguage();

  const labels = locale === "es"
    ? {
        kicker: "Contacto",
        title: "Hablemos de tu proyecto eléctrico",
        subtitle:
          "Estamos listos para atenderte en el sur de Florida. Escríbenos por WhatsApp, envíanos un correo o visita nuestra oficina en Davie.",
        address: "Dirección",
        email: "Correo electrónico",
        phone: "Teléfono / WhatsApp",
        hours: "Horario",
        area: "Área de servicio",
        ctaPrimary: "Contactar",
        ctaSecondary: "Escríbenos por WhatsApp",
        switchHint: "Ver en inglés",
      }
    : {
        kicker: "Contact",
        title: "Let's talk about your electrical project",
        subtitle:
          "We are ready to serve you across South Florida. Message us on WhatsApp, send us an email or visit our Davie office.",
        address: "Address",
        email: "Email",
        phone: "Phone / WhatsApp",
        hours: "Business hours",
        area: "Service area",
        ctaPrimary: "Contact us",
        ctaSecondary: "Message us on WhatsApp",
        switchHint: "Ver en español",
      };

  const cards = [
    { icon: MapPin, label: labels.address, value: COMPANY.address, href: undefined as string | undefined },
    { icon: Mail, label: labels.email, value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Phone, label: labels.phone, value: COMPANY.phone, href: COMPANY.whatsapp },
    { icon: Clock, label: labels.hours, value: COMPANY.hours[locale], href: undefined },
    { icon: Navigation, label: labels.area, value: COMPANY.area[locale], href: undefined },
  ];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{labels.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{labels.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{labels.subtitle}</p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_rgba(212,160,23,0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent text-primary ring-1 ring-inset ring-primary/30">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                {href ? (
                  <ArrowUpRight
                    className="h-5 w-5 text-primary/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <dt className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed break-words">
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-primary"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
              <span
                aria-hidden="true"
                className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
