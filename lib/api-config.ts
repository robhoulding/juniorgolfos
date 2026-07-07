import { resolveApiBaseUrl } from "@/lib/golfcoachos-api-url";

export const API_BASE_URL = resolveApiBaseUrl();

/** Fallback coach affiliate token for organic /signup (no ?coach= or ?invite=). */
export const DEFAULT_AFFILIATE_TOKEN =
  process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN?.trim() ?? "";
