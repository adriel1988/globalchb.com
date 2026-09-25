"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";

/** FAQ de preconstrucción (sustituye las preguntas residenciales). */
export function GcFaqSection() {
  const c = useGc().faq;
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" kicker={c.kicker} title={c.title} />
        </div>
        <Accordion type="single" collapsible className="lg:col-span-8">
          {c.items.map((it, i) => (
            <AccordionItem key={it.q} value={`faq-${i}`} className="border-navy/15">
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">{it.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-slate-600">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
