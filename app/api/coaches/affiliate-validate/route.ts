import { proxyToGolfCoachApi } from "@/lib/golfcoachos-proxy";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const coach = request.nextUrl.searchParams.get("coach");
  const qs = coach ? `?coach=${encodeURIComponent(coach)}` : "";
  return proxyToGolfCoachApi(`/api/coaches/affiliate-validate${qs}`);
}
