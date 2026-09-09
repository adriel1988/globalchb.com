"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language-provider";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "duplicate">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setStatus(data.alreadySubscribed ? "duplicate" : "sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="newsletter" className="bg-slate-950 py-16 text-white sm:py-20" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-primary/25 bg-white/5 p-8 backdrop-blur-sm sm:p-10 lg:grid-cols-2">
          <span
            aria-hidden="true"
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          />
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400">{t.newsletter.kicker}</p>
            <h2 id="newsletter-title" className="mt-2 flex items-start gap-3 text-2xl font-normal tracking-tight sm:text-3xl">
              <Mail className="mt-1 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
              {t.newsletter.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{t.newsletter.subtitle}</p>
          </div>

          <div>
            {status === "sent" || status === "duplicate" ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-400" aria-hidden="true" />
                <p className="text-sm font-medium text-green-300">
                  {status === "sent" ? t.newsletter.success : t.newsletter.alreadySubscribed}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.newsletter.label}
                </label>
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.newsletter.emailPh}
                  className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-slate-400"
                />
                <Button type="submit" size="lg" disabled={status === "sending"} className="h-12 w-fit self-center sm:self-auto">
                  {status === "sending" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  {status === "sending" ? t.newsletter.sending : t.newsletter.register}
                </Button>
              </form>
            )}
            {status === "error" && <p className="mt-2 text-sm font-medium text-red-400">{t.newsletter.error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
