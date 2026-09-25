"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Locale } from "@/lib/i18n";
import { gc } from "@/lib/gc-content";

type LanguageContextType = {
  locale: Locale;
  t: (typeof dict)[Locale];
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: dict.en,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inglés por defecto (mercado de developers / GCs). Siempre hidrata con "en" para que
  // SSR y cliente coincidan 100% (sin mismatch de Radix/useId); luego aplica la preferencia guardada.
  const [locale, setLocaleState] = useState<Locale>("en");

  // Lee la preferencia guardada después de montar, diferido para evitar renders en cascada
  useEffect(() => {
    const id = window.setTimeout(() => {
      const stored = window.localStorage.getItem("gchb-locale");
      if (stored === "en" || stored === "es") setLocaleState(stored);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // Sincroniza el atributo lang del documento con el idioma activo
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("gchb-locale", l);
  };
  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es");

  return (
    <LanguageContext.Provider value={{ locale, t: dict[locale], setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Contenido del sitio para developers / GCs en el idioma activo. */
export function useGc() {
  const { locale } = useContext(LanguageContext);
  return gc[locale];
}
