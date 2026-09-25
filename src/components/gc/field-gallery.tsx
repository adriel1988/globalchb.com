"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import type { ProjectItem } from "@/components/projects-team";

/** Fotografía de campo publicada desde el CRM (Supabase `portfolio_gallery`). */
export function FieldGallery({ photos }: { photos: ProjectItem[] }) {
  const c = useGc().gallery;
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const items = photos.filter((p) => p.image);
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="field-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="field-title" kicker={c.kicker} title={c.title} />
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <li key={`${p.id}-${i}`}>
              <button
                type="button"
                onClick={() => setSelected(p)}
                className="group relative block aspect-square w-full overflow-hidden bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={p.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image!}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {p.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
          <DialogTitle className="font-display text-2xl text-navy">{selected?.name}</DialogTitle>
          <DialogDescription className="sr-only">{selected?.name}</DialogDescription>
          {selected?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selected.image} alt={selected.name} className="mx-auto max-h-[72vh] w-auto max-w-full object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
