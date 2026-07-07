import { GOLFCOACHOS_API_URL } from "@/lib/golfcoachos-api-url";

/** Server-only backend URL for creator proxies — never the marketing site. */
export function creatorApiUrl(path: string): string {
  return `${GOLFCOACHOS_API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function proxyCreatorGet(path: string): Promise<Response> {
  try {
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
  } catch (error) {
    console.error("[creator-proxy GET]", path, error);
    return Response.json(
      { error: "Could not reach GolfCoachOS API." },
      { status: 502 },
    );
  }
}

export async function proxyCreatorPost(
  path: string,
  request: Request,
): Promise<Response> {
  try {
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
  } catch (error) {
    console.error("[creator-proxy POST]", path, error);
    return Response.json(
      { error: "Could not reach GolfCoachOS API." },
      { status: 502 },
    );
  }
}
