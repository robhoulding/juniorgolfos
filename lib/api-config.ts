export const API_BASE_URL = (() => {
  const candidates = [
    process.env.NEXT_PUBLIC_GOLFCOACHOS_API_URL,
    process.env.GOLFCOACHOS_API_URL,
  ];
  for (const value of candidates) {
    const url = value?.trim().replace(/\/$/, "");
    if (url && !url.includes("juniorgolfos.com")) {
      return url;
    }
  }
  return "https://golfcoachos-api-a2r5.vercel.app";
})();

/** Fallback coach affiliate token for organic /signup (no ?coach= or ?invite=). */
export const DEFAULT_AFFILIATE_TOKEN =
  process.env.NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN?.trim() ?? "";
