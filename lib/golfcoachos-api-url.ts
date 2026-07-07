/** Production GolfCoachOS API — not the marketing site. */
export const GOLFCOACHOS_API_URL = "https://golfcoachos-api-a2r5.vercel.app";

function isApiDeploymentUrl(url: string): boolean {
  if (!url) return false;
  // Only the GolfCoachOS API deployment — never marketing sites or JuniorGolfOS Vercel URLs.
  return url.includes("golfcoachos-api");
}

export function resolveApiBaseUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_GOLFCOACHOS_API_URL,
    process.env.GOLFCOACHOS_API_URL,
  ];
  for (const value of candidates) {
    const url = value?.trim().replace(/\/$/, "");
    if (url && isApiDeploymentUrl(url)) {
      return url;
    }
  }
  return GOLFCOACHOS_API_URL;
}
