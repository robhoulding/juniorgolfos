import { API_BASE_URL } from "@/lib/api-config";

export function creatorApiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function proxyCreatorGet(path: string): Promise<Response> {
  const upstream = await fetch(creatorApiUrl(path), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function proxyCreatorPost(
  path: string,
  request: Request,
): Promise<Response> {
  const payload = await request.text();
  const upstream = await fetch(creatorApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: payload,
    cache: "no-store",
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}
