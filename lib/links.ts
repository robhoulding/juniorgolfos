import { DEFAULT_AFFILIATE_TOKEN } from "@/lib/api-config";

/** Central route & anchor targets */
export const LINKS = {
  signup: "/signup",
  create: "/create",
  creators: "/creators",
  pricing: "/pricing",
  coaches: "/#join",
  problem: "/#problem",
  coachingInContext: "/#coaching-in-context",
  everyDay: "/#every-day",
  lessonLoop: "/#lesson-loop",
  tournaments: "/#tournaments",
  tenYears: "/#ten-years",
  plans: "/#plans",
  faq: "/#faq",
  home: "/",
  golfCoachOS: "https://golfcoachos.com",
  golfAcademyOS: "https://golfacademyos.com",
  varsityGolfOS: "https://www.varsitygolfos.com",
  collegeGolfOS: "https://www.collegegolfos.com",
  community: "https://golfcoachos.com",
} as const;

/** Signup URL for CTAs — includes coach affiliate token when configured. */
export function getSignupHref(plan?: string): string {
  const params = new URLSearchParams();
  if (DEFAULT_AFFILIATE_TOKEN) {
    params.set("coach", DEFAULT_AFFILIATE_TOKEN);
  }
  if (plan) {
    params.set("plan", plan);
  }
  const query = params.toString();
  return query ? `${LINKS.signup}?${query}` : LINKS.signup;
}

/** Teen / player self-signup — optional teammate ref and coach attribution. */
export function getPlayerSignupHref(options?: {
  ref?: string;
  coach?: string;
}): string {
  const params = new URLSearchParams();
  params.set("role", "player");
  const coach = options?.coach?.trim() || DEFAULT_AFFILIATE_TOKEN;
  if (coach) {
    params.set("coach", coach);
  }
  if (options?.ref?.trim()) {
    params.set("ref", options.ref.trim());
  }
  return `${LINKS.signup}?${params.toString()}`;
}

/** Creator hub — pass player referral token from signup. */
export function getCreateHref(referralToken?: string): string {
  if (!referralToken?.trim()) {
    return LINKS.create;
  }
  const params = new URLSearchParams();
  params.set("token", referralToken.trim());
  return `${LINKS.create}?${params.toString()}`;
}
