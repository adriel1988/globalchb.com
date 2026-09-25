"use client";

import { useState } from "react";
import { COUNTRY_CODES, toE164 } from "@/lib/phone";
import { cn } from "@/lib/utils";

/**
 * Teléfono internacional: selector de país + número libre (sin máscara).
 * Envía en el formulario el campo oculto `name` ya en formato E.164.
 */
export function PhoneInput({
  name,
  id,
  required,
  className,
  selectClassName,
  placeholder,
  ariaLabelCountry,
}: {
  name: string;
  id?: string;
  required?: boolean;
  className?: string;
  selectClassName?: string;
  placeholder?: string;
  ariaLabelCountry: string;
}) {
  const [iso, setIso] = useState("US");
  const [value, setValue] = useState("");
  const dial = COUNTRY_CODES.find((c) => c.iso === iso)?.dial ?? "1";
  const e164 = toE164(value, dial) ?? "";

  return (
    <div className="flex w-full min-w-0 gap-2">
      <select
        aria-label={ariaLabelCountry}
        value={iso}
        onChange={(e) => setIso(e.target.value)}
        className={cn("shrink-0", selectClassName)}
      >
        {COUNTRY_CODES.map((c) => (
          <option key={c.iso} value={c.iso}>
            {c.label}
          </option>
        ))}
      </select>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required={required}
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          // Si pega un número con "+código", se respeta tal cual
        }}
        placeholder={placeholder}
        className={cn("w-0 min-w-0 flex-1", className)}
      />
      <input type="hidden" name={name} value={e164 || value} />
    </div>
  );
}
