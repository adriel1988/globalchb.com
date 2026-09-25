"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  let el = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  return new Promise((resolve, reject) => {
    if (!el) {
      el = document.createElement("script");
      el.src = SCRIPT_SRC;
      el.async = true;
      el.defer = true;
      document.head.appendChild(el);
    }
    el.addEventListener("load", () => resolve(), { once: true });
    el.addEventListener("error", () => reject(new Error("turnstile script")), { once: true });
  });
}

export type TurnstileHandle = { reset: () => void };

/** Widget de Cloudflare Turnstile. Sin NEXT_PUBLIC_TURNSTILE_SITE_KEY no renderiza nada. */
export const TurnstileWidget = forwardRef<TurnstileHandle, { onToken: (token: string) => void; locale?: string }>(
  function TurnstileWidget({ onToken, locale }, ref) {
    const box = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);
    const cb = useRef(onToken);
    cb.current = onToken;

    useImperativeHandle(ref, () => ({
      reset: () => {
        cb.current("");
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      },
    }));

    useEffect(() => {
      if (!SITE_KEY || !box.current) return;
      let cancelled = false;
      loadScript()
        .then(() => {
          if (cancelled || !box.current || !window.turnstile) return;
          widgetId.current = window.turnstile.render(box.current, {
            sitekey: SITE_KEY,
            language: locale ?? "auto",
            theme: "light",
            callback: (t: string) => cb.current(t),
            "expired-callback": () => cb.current(""),
            "error-callback": () => cb.current(""),
          });
        })
        .catch(() => cb.current(""));
      return () => {
        cancelled = true;
        if (widgetId.current) window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      };
    }, [locale]);

    if (!SITE_KEY) return null;
    return <div ref={box} className="min-h-[65px]" />;
  },
);

export const captchaEnabled = Boolean(SITE_KEY);
