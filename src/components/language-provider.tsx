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

export const LOCALE_COOKIE = "gchb-locale";

export function LanguageProvider({ children, initialLocale = "en" }: { children: ReactNode; initialLocale?: Locale }) {
  // El servidor lee la cookie `gchb-locale` y pinta ya en ese idioma, así que
  // SSR y cliente coinciden y el texto no "brinca" al recargar. Inglés por defecto.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Migración única: preferencia antigua solo en localStorage → pasa a cookie.
  useEffect(() => {
    if (document.cookie.includes(`${LOCALE_COOKIE}=`)) return;
    const stored = window.localStorage.getItem(LOCALE_COOKIE);
    if ((stored === "en" || stored === "es") && stored !== initialLocale) {
      document.cookie = `${LOCALE_COOKIE}=${stored}; path=/; max-age=31536000; samesite=lax`;
      setLocaleState(stored);
    }
  }, [initialLocale]);

  // Sincroniza el atributo lang del documento con el idioma activo
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    try {
      window.localStorage.setItem(LOCALE_COOKIE, l);
    } catch {
      // almacenamiento no disponible
    }
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
