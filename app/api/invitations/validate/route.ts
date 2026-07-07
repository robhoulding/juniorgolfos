import { proxyToGolfCoachApi } from "@/lib/golfcoachos-proxy";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const invite = request.nextUrl.searchParams.get("invite");
  const qs = invite ? `?invite=${encodeURIComponent(invite)}` : "";
  return proxyToGolfCoachApi(`/api/invitations/validate${qs}`);
}
