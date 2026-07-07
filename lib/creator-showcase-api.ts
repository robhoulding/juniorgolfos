import { API_BASE_URL } from "@/lib/api-config";

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

export async function fetchCreatorShowcase(): Promise<CreatorShowcase> {
  const response = await fetch(`${API_BASE_URL}/api/creator/showcase`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "Could not load creator showcase.");
  }

  return data as CreatorShowcase;
}

export async function subscribeCreatorNewsletter(
  email: string,
  role: "parent" | "player" = "parent",
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/creator/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, role }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Could not subscribe.");
  }

  return data.message as string;
}
