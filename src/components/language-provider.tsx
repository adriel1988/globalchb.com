"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Dict, type Locale } from "@/lib/i18n";

type LanguageContextType = {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "es",
  t: dict.es,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Siempre hidrata con "es" para que SSR y cliente coincidan 100% (sin mismatch de Radix/useId)
  const [locale, setLocaleState] = useState<Locale>("es");

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
