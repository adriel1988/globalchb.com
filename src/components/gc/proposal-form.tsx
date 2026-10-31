"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, captchaEnabled, type TurnstileHandle } from "@/components/turnstile-widget";
import { createClient } from "@supabase/supabase-js";
import { CheckCircle2, FileUp, Loader2, Mail, Phone, X } from "lucide-react";
import { useGc, useLanguage } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { COMPANY } from "@/lib/i18n";
import { MAX_FILE_BYTES, PROPOSAL_BUCKET, type DocumentKind } from "@/lib/proposals";

type Picked = { kind: DocumentKind; file: File };
type Status = "idle" | "sending" | "uploading" | "success";

const inputCls =
  "mt-2 block h-12 w-full border border-slate-300 bg-white px-4 text-base text-navy outline-none transition-colors placeholder:text-slate-400 focus:border-navy focus:ring-2 focus:ring-navy/15";

function Field({ label, required, children, reqLabel }: { label: string; required?: boolean; children: ReactNode; reqLabel: string }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
      {label}
      {required && (
        <span className="text-gold" aria-label={reqLabel}>
          {" "}*
        </span>
      )}
      {children}
    </label>
  );
}

const formatSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** 11 — Solicitar propuesta: datos del proyecto + carga de planos al CRM. */
export function ProposalForm() {
  const c = useGc().proposal;
  const { locale } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [uploadWarning, setUploadWarning] = useState(false);
  const [scope, setScope] = useState<string[]>([]);
  const [files, setFiles] = useState<Picked[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<TurnstileHandle>(null);

  const addFiles = (kind: DocumentKind, list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    if (incoming.some((f) => f.size > MAX_FILE_BYTES)) setError(c.errors.fileSize);
    setFiles((prev) => [...prev, ...incoming.filter((f) => f.size <= MAX_FILE_BYTES).map((file) => ({ kind, file }))].slice(0, 15));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      company: get("company"),
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      projectName: get("projectName"),
      projectLocation: get("projectLocation"),
      projectType: get("projectType"),
      start: get("start"),
      bidDue: get("bidDue"),
      notes: get("notes"),
      website: get("website"),
      scope,
      locale,
      captchaToken,
      smsConsent: fd.get("smsConsent") === "on",
      page: window.location.pathname,
      utm: new URLSearchParams(
        [...new URLSearchParams(window.location.search)].filter(([k]) => k.startsWith("utm_")),
      ).toString(),
      files: files.map(({ kind, file }) => ({ kind, name: file.name, size: file.size, type: file.type })),
    };

    if (!payload.company || !payload.name || !payload.email || !payload.phone || !payload.projectName || !payload.projectLocation) {
      setError(c.errors.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError(c.errors.email);
      return;
    }
    if (!/^\+\d{8,15}$/.test(payload.phone)) {
      setError(c.errors.phone);
      return;
    }
    if (captchaEnabled && !captchaToken) {
      setError(c.errors.captcha);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 429 || res.status === 403) {
        setStatus("idle");
        setError(res.status === 429 ? c.errors.rate : c.errors.captcha);
        captchaRef.current?.reset();
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data: { leadId: string | null; uploads: { index: number; path: string; token: string | null }[] } = await res.json();

      let failed = false;
      if (data.leadId && data.uploads.length > 0) {
        setStatus("uploading");
        const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
          auth: { persistSession: false },
        }).storage.from(PROPOSAL_BUCKET);

        const uploaded: { kind: DocumentKind; name: string; path: string }[] = [];
        for (const u of data.uploads) {
          const picked = files[u.index];
          if (!picked || !u.token) {
            failed = true;
            continue;
          }
          const { error: upErr } = await storage.uploadToSignedUrl(u.path, u.token, picked.file, {
            contentType: picked.file.type || "application/octet-stream",
          });
          if (upErr) failed = true;
          else uploaded.push({ kind: picked.kind, name: picked.file.name, path: u.path });
        }

        if (uploaded.length > 0) {
          const done = await fetch("/api/proposals/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ leadId: data.leadId, files: uploaded }),
          });
          if (!done.ok) failed = true;
        }
      }

      setUploadWarning(failed);
      setStatus("success");
      setFiles([]);
      setScope([]);
      formRef.current?.reset();
    } catch {
      setStatus("idle");
      setError(c.errors.generic);
    } finally {
      // Los tokens de Turnstile son de un solo uso
      captchaRef.current?.reset();
    }
  };

  if (status === "success") {
    return (
      <div className="border border-navy/15 bg-white p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" aria-hidden="true" />
        <p className="font-display mt-5 text-4xl text-navy">{c.successTitle}</p>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">{c.successText}</p>
        {uploadWarning && (
          <p className="mx-auto mt-4 max-w-lg text-sm text-amber-700">
            {c.errors.upload}{" "}
            <a className="underline" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:bg-navy hover:text-white"
        >
          {c.another}
        </button>
      </div>
    );
  }

  const busy = status === "sending" || status === "uploading";
  const kinds: { kind: DocumentKind; label: string }[] = [
    { kind: "plans", label: c.uploads.plans },
    { kind: "specifications", label: c.uploads.specs },
    { kind: "bid_instructions", label: c.uploads.bid },
  ];

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-navy/15 bg-white p-6 sm:p-10">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="eyebrow text-gold">{c.sections.contact}</legend>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={c.fields.company} required reqLabel={c.required}>
            <input name="company" required autoComplete="organization" className={inputCls} />
          </Field>
          <Field label={c.fields.name} required reqLabel={c.required}>
            <input name="name" required autoComplete="name" className={inputCls} />
          </Field>
          <Field label={c.fields.email} required reqLabel={c.required}>
            <input name="email" type="email" required autoComplete="email" className={inputCls} />
          </Field>
          <Field label={c.fields.phone} required reqLabel={c.required}>
            <PhoneInput
              name="phone"
              required
              ariaLabelCountry={c.fields.country}
              placeholder={c.fields.phonePh}
              className={inputCls}
              selectClassName={`${inputCls} w-28 px-2`}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="eyebrow text-gold">{c.sections.project}</legend>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={c.fields.projectName} required reqLabel={c.required}>
            <input name="projectName" required className={inputCls} />
          </Field>
          <Field label={c.fields.projectLocation} required reqLabel={c.required}>
            <input name="projectLocation" required className={inputCls} />
          </Field>
          <Field label={c.fields.projectType} reqLabel={c.required}>
            <select name="projectType" defaultValue="" className={inputCls}>
              <option value="">{c.fields.select}</option>
              {c.projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label={c.fields.start} reqLabel={c.required}>
            <input name="start" type="month" className={inputCls} />
          </Field>
          <Field label={c.fields.bidDue} reqLabel={c.required}>
            <input name="bidDue" type="date" className={inputCls} />
          </Field>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">{c.fields.scope}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.scopes.map((s) => {
              const on = scope.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setScope((prev) => (on ? prev.filter((x) => x !== s) : [...prev, s]))}
                  className={`border px-3 py-2 text-sm transition-colors ${
                    on ? "border-navy bg-navy text-white" : "border-slate-300 text-slate-700 hover:border-navy"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <Field label={c.fields.notes} reqLabel={c.required}>
            <textarea name="notes" rows={4} placeholder={c.fields.notesPlaceholder} className={`${inputCls} h-auto py-3`} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="eyebrow text-gold">{c.sections.documents}</legend>
        <p className="mt-2 text-sm text-slate-500">{c.uploads.hint}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {kinds.map(({ kind, label }) => (
            <label
              key={kind}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-slate-400 bg-offwhite px-4 py-6 text-center transition-colors hover:border-navy focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/15"
            >
              <FileUp className="h-6 w-6 text-navy" aria-hidden="true" />
              <span className="text-sm font-semibold text-navy">{label}</span>
              <span className="text-xs text-slate-500">{c.uploads.choose}</span>
              <input
                type="file"
                multiple
                className="sr-only"
                accept=".pdf,.dwg,.dxf,.zip,.rvt,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={(e) => {
                  addFiles(kind, e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          ))}
        </div>
        {files.length > 0 && (
          <ul className="mt-4 divide-y divide-slate-200 border border-slate-200">
            {files.map((p, i) => (
              <li key={`${p.file.name}-${i}`} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="min-w-0 truncate">
                  <span className="mr-2 text-xs uppercase tracking-wider text-gold">{kinds.find((k) => k.kind === p.kind)?.label.split(" ").pop()}</span>
                  {p.file.name}
                  <span className="ml-2 text-slate-400">{formatSize(p.file.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  className="shrink-0 p-1 text-slate-500 hover:text-navy"
                  aria-label={`${c.uploads.remove} ${p.file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <div className="mt-6">
        <TurnstileWidget ref={captchaRef} onToken={setCaptchaToken} locale={locale} />
      </div>

      {error && (
        <p className="mt-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <label className="mt-8 flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" name="smsConsent" className="mt-0.5 h-4 w-4 shrink-0 accent-navy" />
        <span>{c.smsConsent}</span>
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          {c.consent}{" "}
          <a href="/privacy" className="underline hover:text-navy">{locale === "es" ? "Política de privacidad" : "Privacy Policy"}</a>
          {" · "}
          <a href="/terms" className="underline hover:text-navy">{locale === "es" ? "Términos" : "Terms"}</a>
        </p>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-14 items-center justify-center gap-2 bg-gold px-10 text-sm font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-gold-bright disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {status === "sending" ? c.sending : status === "uploading" ? c.uploading : c.submit}
        </button>
      </div>
    </form>
  );
}

/** Sección completa con título y contacto directo secundario (incluye WhatsApp). */
export function ProposalSection({ heading = true }: { heading?: boolean }) {
  const c = useGc().proposal;
  return (
    <section id="request-a-proposal" className="tech-grid-light scroll-mt-20 bg-offwhite py-20 sm:py-28" aria-labelledby={heading ? "rfp-title" : undefined}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          {heading && <SectionHeading id="rfp-title" kicker={c.kicker} title={c.title} subtitle={c.subtitle} />}
          <div className={heading ? "mt-10 border-t border-navy/15 pt-6" : ""}>
            <p className="eyebrow text-slate-500">{c.direct}</p>
            <ul className="mt-4 space-y-3 text-sm text-navy">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-gold">
                  <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href="tel:+17869527504" className="inline-flex items-center gap-2 hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-600 hover:text-gold">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" />
                  {c.whatsapp}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-500">{COMPANY.address}</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ProposalForm />
        </div>
      </div>
    </section>
  );
}
