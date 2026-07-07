import { API_BASE_URL } from "@/lib/api-config";
import type { CreatorPlaybookKey } from "@/lib/creator-playbook";

export class CreatorApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreatorApiError";
  }
}

export type CreatorSubmission = {
  id: string;
  playbook_key: string;
  caption: string | null;
  status: string;
  coach_review_note: string | null;
  platform_review_note: string | null;
  created_at: string;
  updated_at: string;
};

export type CreatorDashboard = {
  player: {
    id: string;
    display_name: string;
    account_credits: number;
    coach_name: string | null;
    academy_name: string | null;
    referral_click_count: number;
    referral_signup_count: number;
    referral_paid_signup_count: number;
    invite_link: string;
  };
  submissions: CreatorSubmission[];
};

export type CreatorRewardsSummary = {
  summary: {
    account_credits: number;
    referral_click_count: number;
    referral_signup_count: number;
    referral_paid_signup_count: number;
    pending_cash_cents: number;
    eligible_cash_cents: number;
    total_rewards: number;
  };
  payout_policy?: {
    hold_days: number;
    cadence: string;
    note: string;
  };
  rewards: Array<{
    id: string;
    reward_type: string;
    amount_cents: number | null;
    credit_amount: number | null;
    reason: string;
    status: string;
    hold_until: string | null;
    eligible_at: string | null;
    created_at: string;
  }>;
};

export async function fetchCreatorDashboard(
  referralToken: string,
): Promise<CreatorDashboard> {
  const url = new URL(`${API_BASE_URL}/api/creator/content`);
  url.searchParams.set("token", referralToken);

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new CreatorApiError(data.error ?? "Could not load creator dashboard.");
  }

  return data as CreatorDashboard;
}

export async function fetchCreatorRewards(
  referralToken: string,
): Promise<CreatorRewardsSummary> {
  const url = new URL(`${API_BASE_URL}/api/creator/rewards`);
  url.searchParams.set("token", referralToken);

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new CreatorApiError(data.error ?? "Could not load rewards.");
  }

  return data as CreatorRewardsSummary;
}

export async function requestCreatorUpload(params: {
  referralToken: string;
  playbookKey: CreatorPlaybookKey;
  fileName: string;
  contentType: string;
  fileSize: number;
}): Promise<{
  upload_url: string;
  storage_path: string;
  public_url: string;
}> {
  const response = await fetch(`${API_BASE_URL}/api/creator/content/request-upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referral_token: params.referralToken,
      playbook_key: params.playbookKey,
      file_name: params.fileName,
      content_type: params.contentType,
      file_size: params.fileSize,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new CreatorApiError(data.error ?? "Could not prepare upload.");
  }

  return data;
}

export async function submitCreatorContent(params: {
  referralToken: string;
  playbookKey: CreatorPlaybookKey;
  caption?: string;
  storagePath: string;
  requestFeatured?: boolean;
}): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/creator/content/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referral_token: params.referralToken,
      playbook_key: params.playbookKey,
      caption: params.caption,
      storage_path: params.storagePath,
      request_featured: params.requestFeatured === true,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new CreatorApiError(data.error ?? "Submission failed.");
  }

  return { message: data.message as string };
}

export async function uploadCreatorVideo(
  uploadUrl: string,
  file: File,
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "video/mp4" },
    body: file,
  });

  if (!response.ok) {
    throw new CreatorApiError("Video upload failed. Try again or use a smaller file.");
  }
}
