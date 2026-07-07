/** Production GolfCoachOS API — not the marketing site. */
export const GOLFCOACHOS_API_URL = "https://golfcoachos-api-a2r5.vercel.app";

function isApiDeploymentUrl(url: string): boolean {
  if (!url) return false;
  if (url.includes("juniorgolfos.com")) return false;
  if (url.includes("golfcoachos.com") && !url.includes("golfcoachos-api")) {
    return false;
  }
  if (url.includes("golfacademyos.com")) return false;
  return url.includes("golfcoachos-api") || url.includes("vercel.app");
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
