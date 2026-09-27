"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useGc } from "@/components/language-provider";
import { SectionHeading } from "@/components/gc/section-heading";
import { GoogleReviewsCta } from "@/components/site-info";
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
  const [touchX, setTouchX] = useState<number | null>(null);
  const photos = album?.photos ?? [];
  const n = photos.length;
  const go = (d: number) => n > 1 && setI((prev) => (prev + d + n) % n);
  // Descripción de la foto actual; si no tiene, la del proyecto
  const caption = album?.captions[i];
  const desc =
    album && caption && caption.toLowerCase() !== album.title.toLowerCase() ? caption : album ? descOf(album) : null;

  // Precarga la foto siguiente y la anterior
  useEffect(() => {
    if (n < 2) return;
    for (const k of [i + 1, i - 1 + n]) {
      const img = new window.Image();
      img.src = photos[k % n];
    }
  }, [i, n, photos]);

  // Mantiene visible la miniatura activa
  useEffect(() => {
    document.getElementById(`album-thumb-${i}`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i]);

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
      <DialogContent
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        className="top-0 left-0 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-navy p-0 text-white shadow-none sm:max-w-none"
      >
        {album && (
          <>
            {/* Barra superior */}
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-8 sm:py-4">
              <div className="min-w-0">
                <p className="eyebrow text-gold">{g.featured.kicker}</p>
                <DialogTitle className="font-display mt-1 truncate text-2xl text-white sm:text-4xl">{album.title}</DialogTitle>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                {n > 1 && (
                  <span className="stat-number text-lg text-white/70 sm:text-xl">
                    <span className="text-white">{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
                  </span>
                )}
                <DialogClose
                  className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-gold hover:bg-gold hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={g.featured.close}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </DialogClose>
              </div>
            </div>

            {/* Escenario */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden"
              onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX === null) return;
                const dx = e.changedTouches[0].clientX - touchX;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                setTouchX(null);
              }}
            >
              {/* Fondo difuminado de la misma foto */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[i]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
              <div className="tech-grid absolute inset-0" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={photos[i]}
                src={photos[i]}
                alt={`${album.title} (${i + 1}/${n})`}
                className="relative max-h-full max-w-full object-contain p-3 shadow-2xl animate-in fade-in-0 duration-300 sm:p-8"
              />
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={g.featured.prev}
                    className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/25 bg-navy/60 text-white backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-navy sm:flex lg:left-8"
                  >
                    <ChevronLeft className="h-7 w-7" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={g.featured.next}
                    className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/25 bg-navy/60 text-white backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-navy sm:flex lg:right-8"
                  >
                    <ChevronRight className="h-7 w-7" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Descripción + miniaturas */}
            <div className="relative z-10 border-t border-white/10 bg-navy px-4 py-4 sm:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <DialogDescription className={desc ? "max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base" : "sr-only"}>
                  {desc ?? album.title}
                </DialogDescription>
                {n > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[55%]">
                    {photos.map((src, j) => (
                      <button
                        id={`album-thumb-${j}`}
                        key={`${src}-${j}`}
                        type="button"
                        onClick={() => setI(j)}
                        aria-label={`${j + 1} / ${n}`}
                        aria-current={j === i}
                        className={cn(
                          "relative h-14 w-20 shrink-0 overflow-hidden border-2 transition-opacity sm:h-16 sm:w-24",
                          j === i ? "border-gold" : "border-transparent opacity-50 hover:opacity-100",
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

        {/* Reseñas de Google (solo si el CRM tiene un enlace válido guardado) */}
        <GoogleReviewsCta />
      </div>
      <AlbumViewer album={open} onClose={() => setOpen(null)} />
    </section>
  );
}
