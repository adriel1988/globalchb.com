"use client";

import { useLanguage } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import type { WebTeamGroup } from "@/lib/supabase-data";

type L = { en: string; es: string };
const l = (en: string, es: string): L => ({ en, es });

/** Organigrama (estructura aprobada por la dirección). Cambios de nombres/puestos: editar este archivo. */
const CEO = { id: "3ca98e03-f8ef-4071-8b4f-88d44177b42e", name: "Adriel de León", title: l("President & CEO", "Presidente y CEO") };
const QC = {
  id: "aa60d582-3aa5-483d-8c62-da85f13b435c",
  name: "Ernesto Chavez",
  title: l("QC Division", "División de Control de Calidad"),
  note: l("Estimating & Preconstruction", "Estimación y Preconstrucción"),
  dept: l("Qualified & QC", "Calificado y Control de Calidad"),
  role: l("Operational Quality Control", "Control de calidad operativo"),
};
const VP = { id: "60c810f3-5a1f-4750-849a-9a2548636821", name: "Vladimir Suri de León", title: l("VP Operations", "VP de Operaciones"), note: l("Distribution & Execution", "Distribución y ejecución") };
const OFFICE = { id: "80ada731-aee8-45b4-a06c-8da66b31fff4", name: "Yuni Almeida", title: l("Office Manager", "Gerente de oficina"), note: l("Administration", "Administración") };

type P = { id: string; name: string };
const DEPTS: Array<{ title: L; lead?: P & { role: L }; people?: P[]; items?: L[]; note?: L }> = [
  {
    title: l("Project Management", "Gestión de proyectos"),
    lead: { id: "9ea6c663-0127-4a97-b96d-5f5ef3c1d227", name: "Vladimir Lambert", role: l("Senior Project Manager", "Gerente sénior de proyectos") },
    people: [
      { id: "46b9d90f-a41a-4ef6-93de-eaeae329a226", name: "Isaac" },
      { id: "289f491c-0b12-4156-b263-779126cda93c", name: "Claudia" },
      { id: "4f1d1f7e-793f-4000-885e-87abdd99df27", name: "Santiago" },
    ],
  },
  {
    title: l("Services Department", "Departamento de servicios"),
    lead: { id: "62efbcf5-0290-4637-813e-656b42d1b1ed", name: "Manuel", role: l("Service Operations", "Operaciones de servicio") },
  },
  {
    title: l("Fire Alarm Department", "Departamento de alarma contra incendios"),
    lead: { id: "0576df42-da30-4a3d-8045-1ad356330be4", name: "Elvis", role: l("Fire Alarm Systems", "Sistemas de alarma contra incendios") },
  },
  {
    title: l("Development & Marketing", "Desarrollo y marketing"),
    lead: { id: "0bf1053c-c4b8-4819-912a-f04ce175b0f0", name: "Marcos", role: l("Development & Marketing", "Desarrollo y marketing") },
  },
  {
    title: l("Low Voltage Division", "División de bajo voltaje"),
    note: l("Joint Venture", "Joint Venture"),
    items: [l("BDA / DAS", "BDA / DAS"), l("Access Control", "Control de acceso"), l("Network / Cameras", "Redes / Cámaras"), l("Smart Systems", "Sistemas inteligentes")],
  },
];

const SUPERINTENDENTS: P[] = [
  { id: "d4092e02-4bd8-4152-8d6f-8d4631dc3571", name: "Kelvin Avila" },
  { id: "6c69b69b-1e6e-4626-913d-93dc371d7a1f", name: "Felix Trujillo" },
  { id: "c65d6719-02f5-4255-a05f-d4273fdb109f", name: "Alejandro Pantoja" },
  { id: "ab49d6c6-8b8a-4312-b80b-7ad3555accc8", name: "Ernesto" },
  { id: "547b1c54-7023-4e82-9a93-dc92c104d5c3", name: "Fernando" },
  { id: "f7b56978-b80d-4c47-9bdd-ea9ad6a49655", name: "Pablo" },
  { id: "75a18f11-764f-49f0-8230-4c102bea91eb", name: "Jorgito" },
];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

/** Foto vertical (la misma del CRM › Equipo y Personal) o iniciales si no hay foto. */
function Portrait({ name, src, className = "" }: { name: string; src?: string | null; className?: string }) {
  return (
    <span className={`relative block aspect-[3/4] w-full overflow-hidden bg-slate-200 ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 25%" }}
        />
      ) : (
        <span aria-hidden="true" className="font-display absolute inset-0 flex items-center justify-center text-5xl text-navy/40">
          {initials(name)}
        </span>
      )}
    </span>
  );
}

function Line({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`mx-auto h-6 w-px bg-navy/30 ${className}`} />;
}

function Box({ children, dark = false, className = "" }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`border p-5 text-center ${dark ? "border-navy bg-navy text-white" : "border-navy/20 bg-white text-navy"} ${className}`}>
      {children}
    </div>
  );
}

/** Persona con foto vertical arriba y nombre/puesto debajo (todas alineadas igual). */
function Person({ p, role, src, dark = false, w }: { p: { name: string }; role?: string; src: string | null; dark?: boolean; w: string }) {
  return (
    <div className={`mx-auto ${w}`}>
      <Portrait name={p.name} src={src} />
      <p className="font-display mt-3 text-lg leading-tight">{p.name}</p>
      {role && <p className={`mt-0.5 text-sm ${dark ? "text-gold" : "text-slate-600"}`}>{role}</p>}
    </div>
  );
}

export function OrgChart({ team }: { team: WebTeamGroup[] }) {
  const { locale } = useLanguage();
  const t = (x: L) => (locale === "es" ? x.es : x.en);
  const photos = new Map<string, string | null>();
  for (const g of team ?? []) for (const m of g.members) photos.set(m.id, m.photo);
  const ph = (id: string) =>
    photos.get(id) ??
    (id === "0bf1053c-c4b8-4819-912a-f04ce175b0f0"
      ? "https://wdsellaywiykhhnnzkfm.supabase.co/storage/v1/object/public/project-photos/team/0bf1053c-c4b8-4819-912a-f04ce175b0f0-thumb.jpg"
      : null);

  return (
    <section id="org-chart" className="scroll-mt-20 bg-white py-20 sm:py-28" aria-labelledby="org-title">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="org-title"
          kicker={locale === "es" ? "Organización" : "Organization"}
          title={locale === "es" ? "Organigrama" : "Organizational Chart"}
        />

        <div className="mt-12">
          {/* CEO (sin recuadro) */}
          <div className="mx-auto w-[11.7rem] text-center">
            <Portrait name={CEO.name} src={ph(CEO.id)} />
            <p className="font-display mt-3 text-lg leading-tight text-navy">{CEO.name}</p>
            <p className="mt-0.5 text-sm uppercase tracking-wide text-gold">{t(CEO.title)}</p>
          </div>
          <Line />

          {/* QC | VP Operations | Office Manager */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <div className="text-center">
              <Box className="border-dashed">
                <p className="text-sm font-semibold uppercase tracking-wide">{t(QC.title)}</p>
              </Box>
              <div aria-hidden className="mx-auto h-4 w-px bg-navy/30" />
              <Box className="border-dashed">
                <p className="text-sm text-slate-700">{t(QC.note)}</p>
              </Box>
              <div aria-hidden className="mx-auto h-4 w-px bg-navy/30" />
              <Box className="border-dashed">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">{t(QC.dept)}</p>
                <Person p={QC} role={t(QC.role)} src={ph(QC.id)} w="w-36" />
              </Box>
            </div>
            <div className="mx-auto w-[11.7rem] text-center">
              <Portrait name={VP.name} src={ph(VP.id)} />
              <p className="font-display mt-3 text-lg leading-tight text-navy">{VP.name}</p>
              <p className="mt-0.5 text-sm uppercase tracking-wide text-gold">{t(VP.title)}</p>
              <p className="mt-0.5 text-sm text-slate-600">{t(VP.note)}</p>
            </div>
            <Box className="border-dashed">
              <Person p={OFFICE} src={ph(OFFICE.id)} w="w-36" />
              <p className="text-sm font-semibold uppercase tracking-wide">{t(OFFICE.title)}</p>
              <p className="text-sm text-slate-600">{t(OFFICE.note)}</p>
            </Box>
          </div>
          <Line />

          {/* Direct departments */}
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
            {locale === "es" ? "Departamentos directos de Operaciones" : "VP Operations — Direct Departments"}
          </p>
          <div className="border-t border-navy/30 lg:border-t-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {DEPTS.filter((d) => !d.items).map((d, idx) => (
                <div key={d.title.en} className={`flex flex-col ${idx === 0 ? "lg:col-span-2" : ""}`}>
                  <Line className="hidden lg:block" />
                  <Box className="h-full">
                    <p className="flex min-h-[3.75rem] items-start justify-center text-sm font-semibold uppercase tracking-wide text-gold">
                      <span>
                        {t(d.title)}
                        {d.note && <span className="block text-xs font-normal text-slate-500">{t(d.note)}</span>}
                      </span>
                    </p>
                    {d.lead && (
                      <div className={`mt-3 grid gap-3 ${d.people ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1"}`}>
                        <Person p={d.lead} role={t(d.lead.role)} src={ph(d.lead.id)} w={d.people ? "w-full" : "w-44"} />
                        {d.people?.map((p) => (
                          <Person key={p.id} p={p} src={ph(p.id)} w="w-full" />
                        ))}
                      </div>
                    )}
                    {d.items && (
                      <ul className="mt-3 space-y-1 text-sm">
                        {d.items.map((i) => (
                          <li key={i.en}>{t(i)}</li>
                        ))}
                      </ul>
                    )}
                  </Box>
                </div>
              ))}
            </div>
          </div>
          {/* Low Voltage (Joint Venture): sin usuarios ni fotos, tarjeta ancha */}
          {DEPTS.filter((d) => d.items).map((d) => (
            <div key={d.title.en}>
              <Line />
              <Box>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                  {t(d.title)} <span className="font-normal normal-case text-slate-600">— {t(d.note!)}</span>
                </p>
                <ul className="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-1 text-sm text-navy">
                  {d.items!.map((i) => (
                    <li key={i.en}>{t(i)}</li>
                  ))}
                </ul>
              </Box>
            </div>
          ))}
          <Line />

          {/* Field operations */}
          <Box>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              {locale === "es" ? "Operaciones de campo / Departamento técnico" : "Field Operations / Technical Department"}
            </p>
            <p className="mt-1 text-sm text-slate-600">{locale === "es" ? "Superintendentes de campo" : "Field Superintendents"}</p>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {SUPERINTENDENTS.map((p) => (
                <li key={p.id}>
                  <Person p={p} src={ph(p.id)} w="w-full" />
                </li>
              ))}
            </ul>
          </Box>
        </div>
      </div>
    </section>
  );
}
