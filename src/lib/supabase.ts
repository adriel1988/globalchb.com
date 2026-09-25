import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente público (anon key) — seguro para usar en componentes server-side de Next.js.
 * Para operaciones privilegiadas usa `supabaseAdmin` (service role, solo en server).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

/**
 * Cliente de servidor (clave secreta) — SOLO usar en Server Components, Route Handlers / Server Actions.
 * Nunca exponer al cliente.
 */
export function getServerKey() {
  // Preferida: clave `sb_secret_…` propia de la web (Supabase › Settings › API Keys).
  // Respaldo: la service_role legacy, hasta que se desactive.
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function getSupabaseAdmin() {
  const serviceRoleKey = getServerKey();
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
