/**
 * proposals.ts — constantes compartidas del formulario "Request a Proposal".
 * Los planos se suben DIRECTAMENTE del navegador a Supabase Storage con URLs
 * firmadas de un solo uso (evita el límite de tamaño de cuerpo de las funciones).
 */

export const PROPOSAL_BUCKET = "project-documents";
export const PROPOSAL_FOLDER = "web_proposals";
export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_FILES = 15;

export const DOCUMENT_KINDS = ["plans", "specifications", "bid_instructions"] as const;
export type DocumentKind = (typeof DOCUMENT_KINDS)[number];

export type ProposalFileMeta = { kind: DocumentKind; name: string; size: number; type: string };

/** Nombre de archivo seguro para la ruta de Storage. */
export function safeFileName(name: string) {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(-120);
  return cleaned || "file";
}
