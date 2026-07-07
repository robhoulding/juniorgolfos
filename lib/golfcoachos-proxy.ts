import { GOLFCOACHOS_API_URL } from "@/lib/golfcoachos-api-url";

export async function proxyToGolfCoachApi(
  path: string,
  request?: Request,
): Promise<Response> {
  try {
    const url = `${GOLFCOACHOS_API_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const init: RequestInit = {
      headers: {
        Accept: "application/json",
        ...(request ? { "Content-Type": "application/json" } : {}),
      },
      cache: "no-store",
    };

    if (request) {
      init.method = request.method;
      init.body = await request.text();
    }

    const upstream = await fetch(url, init);
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("[golfcoachos-proxy]", path, error);
    return Response.json(
      { error: "Could not reach GolfCoachOS API." },
      { status: 502 },
    );
  }
}
