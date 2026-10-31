"use client";

import { useLanguage } from "@/components/language-provider";
import { privacyPolicy, termsOfService } from "@/lib/policies";

const TOKEN = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/** Convierte URLs y emails del texto en enlaces clicables. */
function linkify(text: string) {
  return text.split(TOKEN).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    return (
      <a
        key={i}
        href={href}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-navy underline underline-offset-2 hover:text-gold"
      >
        {part}
      </a>
    );
  });
}

/** Página legal pública e indexable (Privacidad / Términos). */
export function PolicyPage({ kind }: { kind: "privacy" | "terms" }) {
  const { locale, t } = useLanguage();
  const sections = (kind === "privacy" ? privacyPolicy : termsOfService)[locale];
  const title = kind === "privacy" ? t.policies.privacyTitle : t.policies.termsTitle;
  const updated = kind === "privacy" ? t.policies.privacyUpdated : t.policies.termsUpdated;

  return (
    <>
      <section className="tech-grid relative overflow-hidden bg-navy pb-14 pt-36 text-white sm:pb-16 sm:pt-40">
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {updated}
          </p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">{title}</h1>
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
          {sections.map((s, idx) => (
            <div key={s.heading || `s-${idx}`}>
              {s.heading ? <h2 className="font-display text-2xl text-navy">{s.heading}</h2> : null}
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 break-words text-base leading-relaxed text-slate-600">
                  {linkify(p)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
