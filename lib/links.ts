import { DEFAULT_AFFILIATE_TOKEN } from "@/lib/api-config";

/** Central route & anchor targets */
export const LINKS = {
  signup: "/signup",
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
