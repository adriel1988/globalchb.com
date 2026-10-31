"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import type { WebTeamGroup } from "@/lib/supabase-data";

const LABELS: Record<string, { es: string; en: string }> = {
  administration: { es: "Administración", en: "Administration" },
  projects: { es: "Proyectos", en: "Projects" },
  electrical: { es: "Servicios eléctricos", en: "Electrical Services" },
  procurement: { es: "Compras", en: "Procurement" },
  finance: { es: "Finanzas", en: "Finance" },
  hr: { es: "Recursos humanos", en: "Human Resources" },
};

const PREVIEW = 4;

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

const ROLES: Record<string, { es: string; en: string }> = {
  electricista: { es: "Electricista", en: "Electrician" },
  eletricista: { es: "Electricista", en: "Electrician" },
  electricidad: { es: "Electricista", en: "Electrician" },
  electrical: { es: "Eléctrico", en: "Electrical" },
  ayudante: { es: "Ayudante", en: "Helper" },
  superintendente: { es: "Superintendente", en: "Superintendent" },
  superintendent: { es: "Superintendente", en: "Superintendent" },
  "fire alarma": { es: "Alarma contra incendios", en: "Fire Alarm" },
  mecanico: { es: "Mecánico", en: "Mechanic" },
  owner: { es: "Propietario", en: "Owner" },
  "jefa contabilidad": { es: "Jefa de Contabilidad", en: "Accounting Manager" },
  "office manager": { es: "Gerente de oficina", en: "Office Manager" },
  "proger manager": { es: "Gerente de proyectos", en: "Project Manager" },
  "electrical engineer": { es: "Ingeniero eléctrico", en: "Electrical Engineer" },
  "soporte crm": { es: "Soporte CRM", en: "CRM Support" },
  "service opration maneger": { es: "Gerente de operaciones de servicio", en: "Service Operations Manager" },
  "chb electrical": { es: "Eléctrico", en: "Electrical" },
};
const HIDDEN_ROLES = ["", "staff", "crm", "department", "(rellenar)"];

function roleLabel(role: string | undefined, locale: string) {
  const k = (role ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  if (HIDDEN_ROLES.includes(k)) return "";
  const m = ROLES[k];
  return m ? (locale === "es" ? m.es : m.en) : (role ?? "");
}

function Card({ name, role, photo, eager = false }: { name: string; role?: string; photo: string | null; eager?: boolean }) {
  const { locale } = useLanguage();
  const r = roleLabel(role, locale);
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className="w-full">
      <div className={`relative aspect-square overflow-hidden ${photo ? "bg-slate-200" : "bg-navy"}`}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={(el) => {
              if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
            }}
            src={photo}
            alt={name}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <span aria-hidden="true" className="font-display absolute inset-0 flex items-center justify-center text-5xl text-white/70">
            {initials(name)}
          </span>
        )}
      </div>
      <figcaption className="mt-3 text-center">
        <span className="block text-sm font-semibold uppercase tracking-wide text-navy">{name}</span>
        {r && <span className="mt-0.5 block text-xs text-slate-500">{r}</span>}
      </figcaption>
    </figure>
  );
}

/** Equipo de Global por departamento (CRM › Equipo y Personal › icono Web). Foto + nombre, pasando en carrusel. */
export function TeamCarousel({ groups }: { groups: WebTeamGroup[] }) {
  const { locale } = useLanguage();
  const [open, setOpen] = useState<{ label: string; group: WebTeamGroup } | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!groups || groups.length === 0) return null;

  return (
    <section id="team-members" className="scroll-mt-20 overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="team-members-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="team-members-title"
          kicker={locale === "es" ? "Nuestra gente" : "Our people"}
          title={locale === "es" ? "El equipo de Global" : "The Global team"}
        />
      </div>
      <div className="mt-12 space-y-14">
        {groups.map((g) => {
          const label = LABELS[g.department] ? LABELS[g.department][locale === "es" ? "es" : "en"] : g.department;
          return (
            <div key={g.department}>
              <div className="mx-auto flex max-w-7xl items-baseline justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <h3 className="font-display text-2xl text-navy">
                  {label} <span className="text-gold">· {g.members.length}</span>
                </h3>
                {g.members.length > PREVIEW && (
                  <button
                    type="button"
                    onClick={() => setOpen({ label, group: g })}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:text-gold"
                  >
                    {locale === "es" ? "Ver más" : "See more"} →
                  </button>
                )}
              </div>
              <div className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:grid-cols-4 lg:px-8">
                {g.members.slice(0, PREVIEW).map((m) => (
                  <Card key={m.id} name={m.name} role={m.role} photo={m.photo} eager />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 p-4" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-white p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(null)} aria-label={locale === "es" ? "Cerrar" : "Close"} className="absolute right-4 top-4 text-3xl leading-none text-navy hover:text-gold">
              ×
            </button>
            <h3 className="font-display pr-10 text-3xl text-navy">
              {open.label} <span className="text-gold">· {open.group.members.length}</span>
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {open.group.members.map((m) => (
                <Card key={m.id} name={m.name} role={m.role} photo={m.photo} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
