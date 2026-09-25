"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import type { ProjectAlbum } from "@/lib/supabase-data";
import { cn } from "@/lib/utils";

/** Descripción útil: se omite si el CRM repite el título. */
const descOf = (a: ProjectAlbum) =>
  a.description && a.description.toLowerCase() !== a.title.toLowerCase() ? a.description : null;

function AlbumCard({ album, index, large, onOpen }: { album: ProjectAlbum; index: number; large: boolean; onOpen: () => void }) {
  const g = useGc();
  const desc = descOf(album);
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative flex overflow-hidden bg-navy-800 text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        large ? "min-h-[28rem] sm:col-span-2 lg:row-span-2 lg:min-h-[40rem]" : "min-h-[22rem]",
      )}
      aria-label={`${g.featured.viewCaseStudy}: ${album.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={album.photos[0]}
        alt={album.title}
        loading={index < 3 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" aria-hidden="true" />
      <span aria-hidden="true" className="stat-number absolute left-5 top-5 text-lg text-white/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/30 bg-navy/40 backdrop-blur-sm transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy"
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="relative mt-auto w-full p-6 sm:p-8">
        <h3 className={cn("font-display", large ? "text-4xl sm:text-5xl" : "text-3xl")}>{album.title}</h3>
        {desc && <p className="mt-2 line-clamp-2 text-sm text-slate-300">{desc}</p>}
        <p className="mt-4 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          <span className="inline-flex items-center gap-1.5 text-gold">
            <Images className="h-4 w-4" aria-hidden="true" />
            {album.photos.length} {album.photos.length === 1 ? g.featured.photo : g.featured.photos}
          </span>
          <span className="text-white group-hover:text-gold">{g.featured.viewCaseStudy} →</span>
        </p>
      </div>
    </button>
  );
}

function AlbumViewer({ album, onClose }: { album: ProjectAlbum | null; onClose: () => void }) {
  const g = useGc();
  const [i, setI] = useState(0);
  const photos = album?.photos ?? [];
  const n = photos.length;
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  return (
    <Dialog
      open={album !== null}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setI(0);
        }
      }}
    >
      <DialogContent className="max-h-[94vh] overflow-y-auto sm:max-w-5xl">
        {album && (
          <>
            <DialogTitle className="font-display pr-8 text-3xl text-navy">{album.title}</DialogTitle>
            <DialogDescription className={descOf(album) ? "text-base text-slate-600" : "sr-only"}>
              {descOf(album) ?? album.title}
            </DialogDescription>
            <div
              className="relative flex items-center justify-center bg-navy"
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") go(-1);
                if (e.key === "ArrowRight") go(1);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[i]} alt={`${album.title} (${i + 1}/${n})`} className="max-h-[68vh] w-auto max-w-full object-contain" />
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={g.featured.prev}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/60 text-white hover:bg-gold hover:text-navy"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={g.featured.next}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/60 text-white hover:bg-gold hover:text-navy"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <span className="stat-number absolute bottom-3 right-3 bg-navy/70 px-2 py-1 text-sm text-white">
                    {i + 1} / {n}
                  </span>
                </>
              )}
            </div>
            {n > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((src, j) => (
                  <button
                    key={`${src}-${j}`}
                    type="button"
                    onClick={() => setI(j)}
                    aria-label={`${j + 1} / ${n}`}
                    aria-current={j === i}
                    className={cn("h-16 w-24 shrink-0 overflow-hidden border-2", j === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100")}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Proyectos publicados desde el CRM (Supabase `portfolio_gallery`). */
export function ProjectAlbums({ albums, limit, home = false }: { albums: ProjectAlbum[]; limit?: number; home?: boolean }) {
  const g = useGc();
  const c = g.featured;
  const [open, setOpen] = useState<ProjectAlbum | null>(null);
  const list = typeof limit === "number" ? albums.slice(0, limit) : albums;

  return (
    <section id="selected-work" className="scroll-mt-20 bg-offwhite py-20 sm:py-28" aria-labelledby={home ? "selected-work-title" : undefined}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {home && (
          <SectionHeading
            id="selected-work-title"
            kicker={c.kicker}
            title={c.title}
            action={
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-navy hover:text-gold">
                {c.viewAll}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
        )}

        {list.length === 0 ? (
          <p className={cn("border border-navy/15 bg-white p-10 text-center text-slate-500", home && "mt-12")}>{c.empty}</p>
        ) : (
          <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", home && "mt-12")}>
            {list.map((a, i) => (
              <AlbumCard key={a.key} album={a} index={i} large={i === 0 && list.length >= 3} onOpen={() => setOpen(a)} />
            ))}
          </div>
        )}
      </div>
      <AlbumViewer album={open} onClose={() => setOpen(null)} />
    </section>
  );
}
