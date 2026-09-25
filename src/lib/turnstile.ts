/**
 * Verificación de Cloudflare Turnstile en el servidor.
 * Variables de entorno (Vercel):
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  — clave pública del widget
 *   TURNSTILE_SECRET_KEY            — clave secreta (solo servidor)
 * Si TURNSTILE_SECRET_KEY no está definida, la verificación se omite (desarrollo
 * local) y queda registrado en el log; en producción debe estar configurada.
 */
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — captcha check skipped");
    return true;
  }
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verify error:", err);
    return false;
  }
}
