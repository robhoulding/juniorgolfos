import { proxyCreatorPost } from "@/lib/creator-proxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return proxyCreatorPost("/api/creator/newsletter", request);
}
