"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/components/language-provider";

export function FaqSection() {
  const { t } = useLanguage();
  return (
    <section id="faq" className="bg-secondary/50 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t.faq.kicker}</p>
          <h2 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">{t.faq.title}</h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="mt-10 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-6">
          <Accordion type="single" collapsible>
            {t.faq.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60 last:border-b-0">
                <AccordionTrigger className="text-left text-base font-medium hover:text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
