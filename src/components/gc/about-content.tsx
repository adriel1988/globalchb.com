"use client";

import Image from "next/image";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";

export function AboutContent() {
  const c = useGc().about;
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading kicker={c.kicker} title={c.title} />
          <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-600">
            {c.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-navy">
          <Image src="/images/about-company.webp" alt={c.fieldAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
