export const API_BASE_URL =
  process.env.NEXT_PUBLIC_GOLFCOACHOS_API_URL?.replace(/\/$/, "") ??
  "https://golfcoachos-api-a2r5.vercel.app";

/** Fallback coach affiliate token for organic /signup (no ?coach= or ?invite=). */
export const DEFAULT_AFFILIATE_TOKEN =
  process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN?.trim() ?? "";
