import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="tech-grid flex min-h-[80vh] items-center bg-navy pt-24 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="stat-number text-8xl text-gold sm:text-9xl">404</p>
        <h1 className="font-display mt-4 text-4xl sm:text-5xl">Page not found · Página no encontrada</h1>
        <p className="mt-4 text-slate-300">
          The page you are looking for does not exist or has moved. · La página que busca no existe o cambió de dirección.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border border-white/30 px-6 text-xs font-semibold uppercase tracking-[0.16em] hover:border-white"
          >
            Home · Inicio
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-12 items-center justify-center border border-white/30 px-6 text-xs font-semibold uppercase tracking-[0.16em] hover:border-white"
          >
            Projects · Proyectos
          </Link>
          <Link
            href="/request-a-proposal"
            className="inline-flex h-12 items-center justify-center bg-gold px-6 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:bg-gold-bright"
          >
            Request a proposal
          </Link>
        </div>
      </div>
    </section>
  );
}
