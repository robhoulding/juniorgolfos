import { getSignupHref } from "@/lib/links";

export type PricingTier = {
  id: string;
  name: string;
  displayName: string;
  eyebrow: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "foundation",
    name: "Foundation",
    displayName: "Structure",
    eyebrow: "Free forever",
    price: "$0",
    period: "",
    description:
      "Every family starting the connected journey — a complete coach-connected home, not a trial.",
    features: [
      "Coach-connected family profile",
      "Lesson summaries & practice plans",
      "Lesson → practice accountability loop",
      "Tournament schedule & key dates",
      "Secure messaging with your coach",
      "Goal tracking & long-term player record",
      "Parent & player certification access",
      "Community: forums, guidance, podcasts",
    ],
    cta: "Start Free",
    ctaHref: "/signup",
    highlighted: false,
  },
  {
    id: "development-intelligence",
    name: "Development Intelligence",
    displayName: "Intelligence",
    eyebrow: "Development",
    price: "$15",
    period: "/month",
    description:
      "For families who want the long game, not just last week — cross-pillar patterns and growth-stage guidance.",
    features: [
      "Everything in Structure",
      "Cross-pillar development analysis across sessions",
      "PHV-aware and growth-stage guidance",
      "Emotional and performance pattern awareness",
      "AI priorities that update as your child develops",
      "Practice & tournament journal with coach visibility",
      "Monthly development themes for family conversation",
    ],
    cta: "Go Deeper",
    ctaHref: "/signup?plan=development",
    highlighted: true,
    badge: "Most families upgrade here",
  },
  {
    id: "performance-family",
    name: "Performance Family",
    displayName: "Optimization",
    eyebrow: "Performance",
    price: "$25",
    period: "/month",
    description:
      "For serious competitive families — advanced analysis, college-path visibility, and exportable reports.",
    features: [
      "Everything in Intelligence",
      "Advanced performance pattern analysis & trend alerts",
      "Multi-coach academy visibility when enrolled in a program",
      "College-path milestones & recruiting readiness view",
      "Exportable development reports for coach & advisor meetings",
      "Shared parent access for both guardians",
      "Priority family support",
    ],
    cta: "Go Performance",
    ctaHref: "/signup?plan=performance",
    highlighted: false,
  },
];

function tierSignupHref(tierId: string): string {
  if (tierId === "development-intelligence") return getSignupHref("development");
  if (tierId === "performance-family") return getSignupHref("performance");
  return getSignupHref();
}

/** Pricing tiers with signup URLs that include your coach affiliate token when configured. */
export function getPricingTiers(): PricingTier[] {
  return PRICING_TIERS.map((tier) => ({
    ...tier,
    ctaHref: tierSignupHref(tier.id),
  }));
}

export const PRICING_FAQ = [
  {
    question: "Is Structure really free forever?",
    answer:
      "Yes. Structure is not a time-limited trial. When your coach connects you through GolfCoachOS, the family platform layer is $0. Self-serve families get the same Structure tier free to start.",
  },
  {
    question: "When should we upgrade to Intelligence?",
    answer:
      "Most families upgrade when they want cross-pillar patterns, growth-stage guidance, and priorities beyond the latest scorecard.",
  },
  {
    question: "Can we switch plans later?",
    answer:
      "Absolutely. Upgrade when your junior's development demands more insight, downgrade if your needs change. No penalties, no lock-in on monthly plans.",
  },
  {
    question: "Do we still need a GolfCoachOS coach?",
    answer:
      "The richest experience comes through a coach on GolfCoachOS. Your coach sends an invitation that connects your family profile to their program. You can also explore Structure directly while you find the right coach fit.",
  },
];
