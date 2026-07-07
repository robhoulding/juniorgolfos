import { proxyToGolfCoachApi } from "@/lib/golfcoachos-proxy";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  const qs = ref ? `?ref=${encodeURIComponent(ref)}` : "";
  return proxyToGolfCoachApi(`/api/players/referral/validate${qs}`);
}
