import { API_BASE_URL } from "@/lib/api-config";

export type SignupCoach = {
  coach_id: string;
  display_name: string;
  academy_name: string | null;
  headshot_url: string | null;
  photo_url: string | null;
  background_line: string | null;
};

export type InvitationValidation =
  | { valid: false; reason: string }
  | {
      valid: true;
      coach: SignupCoach;
      recipient_email: string | null;
      recipient_name: string | null;
      personal_note: string | null;
    };

export type SignupPlayerInput = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

export type SignupRequest = {
  parent: { name: string; email: string };
  players: SignupPlayerInput[];
  invitationToken?: string;
  affiliateToken?: string;
};

export type SignupSuccessResponse = {
  success: true;
  sign_in_url?: string | null;
  redirect_url?: string | null;
  player_dashboard_url?: string | null;
};

export type SignupErrorResponse = {
  error?: string;
  reason?: string;
  success?: false;
  conversion_required?: boolean;
  message?: string;
};

export class SignupApiError extends Error {
  constructor(
    message: string,
    readonly details?: SignupErrorResponse,
  ) {
    super(message);
    this.name = "SignupApiError";
  }
}

export type PlayerReferralValidation =
  | { valid: false; reason: string }
  | {
      valid: true;
      referrer: {
        player_id: string;
        first_name: string;
        display_name: string;
        coach_affiliate_token: string | null;
      };
    };

export type PlayerSignupRequest = {
  name: string;
  email: string;
  date_of_birth: string;
  affiliateToken?: string;
  playerReferralToken?: string;
};

export async function validatePlayerReferral(
  token: string,
): Promise<PlayerReferralValidation> {
  const url = new URL(`${API_BASE_URL}/api/players/referral/validate`);
  url.searchParams.set("ref", token);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    return { valid: false, reason: "not_found" };
  }

  return response.json() as Promise<PlayerReferralValidation>;
}

export type PlayerSignupSuccessResponse = SignupSuccessResponse & {
  player_referral_link?: string | null;
};

export async function submitPlayerSignup(
  request: PlayerSignupRequest,
): Promise<PlayerSignupSuccessResponse> {
  const body: Record<string, unknown> = {
    player: {
      name: request.name.trim(),
      email: request.email.trim(),
      date_of_birth: request.date_of_birth,
    },
  };

  if (request.affiliateToken) {
    body.affiliate_token = request.affiliateToken;
  }
  if (request.playerReferralToken) {
    body.player_referral_token = request.playerReferralToken;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/signup/player-start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new SignupApiError(
      "Could not reach GolfCoachOS. Check your connection and try again.",
    );
  }

  const data = (await response.json()) as
    | PlayerSignupSuccessResponse
    | SignupErrorResponse;

  if (
    !response.ok ||
    !("success" in data && data.success === true) ||
    ("conversion_required" in data && data.conversion_required)
  ) {
    throw new SignupApiError(
      signupErrorMessage(data as SignupErrorResponse),
      data as SignupErrorResponse,
    );
  }

  return data as PlayerSignupSuccessResponse;
}

export async function validateInvitation(
  token: string,
): Promise<InvitationValidation> {
  const url = new URL(`${API_BASE_URL}/api/invitations/validate`);
  url.searchParams.set("invite", token);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new SignupApiError("Could not verify your invitation. Try again.");
  }

  return response.json() as Promise<InvitationValidation>;
}

function signupErrorMessage(data: SignupErrorResponse): string {
  if (data.conversion_required) {
    return (
      data.message ??
      "This email already has a Family Platform subscription. Sign in to your existing account or contact support."
    );
  }
  if (data.reason === "invalid_affiliate") {
    return "This coach link is not valid. Ask your coach for a new signup link.";
  }
  if (data.error) return data.error;
  return "Signup failed. Please try again or contact support.";
}

export async function submitFamilySignup(
  request: SignupRequest,
): Promise<SignupSuccessResponse> {
  const isInvitation = Boolean(request.invitationToken);
  const endpoint = isInvitation
    ? `${API_BASE_URL}/api/signup/quick-start`
    : `${API_BASE_URL}/api/coaches/affiliate-signup`;

  const body: Record<string, unknown> = {
    parent: request.parent,
    players: request.players,
  };

  if (isInvitation) {
    body.invitation_token = request.invitationToken;
  } else {
    body.affiliate_token = request.affiliateToken;
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new SignupApiError(
      "Could not reach GolfCoachOS. Check your connection and try again.",
    );
  }

  const data = (await response.json()) as
    | SignupSuccessResponse
    | SignupErrorResponse;

  if (
    !response.ok ||
    !("success" in data && data.success === true) ||
    ("conversion_required" in data && data.conversion_required)
  ) {
    throw new SignupApiError(
      signupErrorMessage(data as SignupErrorResponse),
      data as SignupErrorResponse,
    );
  }

  return data as SignupSuccessResponse;
}

export function invitationReasonMessage(reason: string): string {
  switch (reason) {
    case "expired":
      return "This invitation has expired. Ask your coach to send a new one.";
    case "already_used":
      return "This invitation has already been used. Sign in to your account instead.";
    case "not_found":
      return "This invitation link is not valid. Check the link from your coach.";
    default:
      return "This invitation link is not valid.";
  }
}

export function playerReferralReasonMessage(reason: string): string {
  switch (reason) {
    case "not_found":
      return "This teammate invite link isn't valid. Ask your friend for a new one or use your coach's link.";
    case "missing_ref":
      return "This teammate invite link is incomplete.";
    default:
      return "This teammate invite link isn't valid.";
  }
}
