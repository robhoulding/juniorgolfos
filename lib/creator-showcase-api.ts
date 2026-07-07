export type CreatorShowcase = {
  stats: {
    total_paid_out_cents: number;
    paid_reward_count: number;
    featured_clip_count: number;
    teammate_signups: number;
    paid_referral_signups: number;
  };
  featured_clips: Array<{
    id: string;
    playbook_key: string;
    caption: string | null;
    video_url: string;
    player_name: string;
    featured_at: string;
  }>;
  recent_wins: Array<{
    id: string;
    player_name: string;
    reward_label: string;
    status: string;
    hold_until: string | null;
    earned_at: string;
  }>;
};

async function readJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(
      "Could not reach GolfCoachOS. Try again in a moment or email hello@juniorgolfos.com.",
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Unexpected response from server. Please try again.");
  }
}

export async function fetchCreatorShowcase(): Promise<CreatorShowcase> {
  const response = await fetch("/api/creator/showcase", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const data = await readJsonResponse<CreatorShowcase & { error?: string }>(
    response,
  );

  if (!response.ok) {
    throw new Error(data.error ?? "Could not load creator showcase.");
  }

  return data;
}

export async function subscribeCreatorNewsletter(
  email: string,
  role: "parent" | "player" = "parent",
): Promise<string> {
  const response = await fetch("/api/creator/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, role }),
  });

  const data = await readJsonResponse<{ success?: boolean; message?: string; error?: string }>(
    response,
  );

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Could not subscribe.");
  }

  return data.message ?? "You're on the list!";
}
