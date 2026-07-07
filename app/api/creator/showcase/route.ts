import { proxyCreatorGet } from "@/lib/creator-proxy";

export const dynamic = "force-dynamic";

export async function GET() {
  return proxyCreatorGet("/api/creator/showcase");
}
