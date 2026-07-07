import { proxyToGolfCoachApi } from "@/lib/golfcoachos-proxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return proxyToGolfCoachApi("/api/coaches/affiliate-signup", request);
}
