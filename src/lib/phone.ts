/**
 * phone.ts — teléfonos en formato E.164 (+<código país><número>, 8–15 dígitos).
 * Se usa en el navegador (selector de país + número) y en el servidor (validación).
 */

export const COUNTRY_CODES: { iso: string; dial: string; label: string }[] = [
  { iso: "US", dial: "1", label: "🇺🇸 +1" },
  { iso: "ES", dial: "34", label: "🇪🇸 +34" },
  { iso: "MX", dial: "52", label: "🇲🇽 +52" },
  { iso: "CO", dial: "57", label: "🇨🇴 +57" },
  { iso: "VE", dial: "58", label: "🇻🇪 +58" },
  { iso: "CU", dial: "53", label: "🇨🇺 +53" },
  { iso: "DO", dial: "1", label: "🇩🇴 +1" },
  { iso: "PR", dial: "1", label: "🇵🇷 +1" },
  { iso: "AR", dial: "54", label: "🇦🇷 +54" },
  { iso: "PE", dial: "51", label: "🇵🇪 +51" },
  { iso: "CL", dial: "56", label: "🇨🇱 +56" },
  { iso: "BR", dial: "55", label: "🇧🇷 +55" },
  { iso: "CA", dial: "1", label: "🇨🇦 +1" },
  { iso: "GB", dial: "44", label: "🇬🇧 +44" },
];

/**
 * Normaliza a E.164. Acepta:
 *  - un número internacional completo ("+34 604 98 97 42", "0034…"),
 *  - o un número nacional + código de país del selector ("604989742", dial "34").
 * Devuelve null si no es un teléfono válido.
 */
export function toE164(raw: string, dial = "1"): string | null {
  const text = (raw ?? "").trim();
  if (!text) return null;
  let digits = text.replace(/\D/g, "");
  if (text.startsWith("+")) {
    // ya trae código de país
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else {
    // Número nacional: quitar el 0 inicial de marcación nacional (ES/GB/…) salvo en +1
    if (dial !== "1") digits = digits.replace(/^0+/, "");
    // En +1 aceptar "1XXXXXXXXXX"
    if (dial === "1" && digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
    digits = dial + digits;
  }
  if (digits.length < 8 || digits.length > 15 || digits.startsWith("0")) return null;
  return `+${digits}`;
}
