import type { FAQItem } from "@/components/ui/FAQAccordion";

export const HERO_HEADLINE =
  "JuniorGolfOS connects your coach, your practice, your tournaments, your goals, your support team, and your development into one proven long-term player development system.";

export const HERO_SUBHEAD =
  "Built on the Coaching in Context™ philosophy, JuniorGolfOS helps your coach, your family, and your support team stay aligned around one player—so no important part of your child's golf journey happens in isolation.";

export const HERO_TRUST_ITEMS = [
  "Works with your current coach and their technology",
  "Foundation is genuinely free",
  "Upgrade only as your athlete's needs grow",
] as const;

export const HERO_STRIP = [
  {
    label: "Built for families",
    line: "Your coach leads; the system connects everything",
  },
  {
    label: "Competitive advantage",
    line: "Every lesson, practice, and tournament compounds",
  },
  {
    label: "Real structure, free",
    line: "Not a trial — a complete starting point",
  },
  {
    label: "Coaching in Context",
    line: "The right work, for your child, right now",
  },
  {
    label: "Whole team, one player",
    line: "Coach, fitness, mental, parents — one record",
  },
  {
    label: "Join the movement",
    line: "Learn from coaches who've built players for decades",
  },
] as const;

export const CONTEXT_CONTRAST = [
  { typical: "Organize lessons", jgos: "Organize development" },
  { typical: "Store videos", jgos: "Build the player" },
  { typical: "Send messages", jgos: "Coordinate the entire team" },
  { typical: "Record practice", jgos: "Learn from every practice" },
  { typical: "Save scores", jgos: "Understand why scores change" },
  { typical: "One coach", jgos: "Entire development team" },
  { typical: "Static information", jgos: "Continuous intelligence" },
] as const;

export const EVERY_DAY_ITEMS = [
  "Updated player dashboard from real entries across the team",
  "Priorities reframed for age, stage, and experience",
  "Lesson summary and practice plan when your coach logs a session",
  "Practice accountability — your child rates practice; coach and AI see it",
  "Tournament intelligence when scorecards are captured",
  "Goal tracking across every area of the game",
  "Long-term player record that never resets each season",
  "AI-identified changing priorities (Intelligence & Optimization tiers)",
  "PHV, emotional, and performance pattern awareness (paid tiers)",
  "Parent guidance — certification + 9 AI specialist agents",
  "Community — forums, guidance, podcasts, peer support",
  "College profile growing from real history (Optimization tier)",
] as const;

export const DASHBOARD_INPUTS = [
  "Tournament scorecard (photo capture)",
  "Workout or physical session",
  "Mental coach input",
  "Practice session result and player rating",
  "Coach lesson voice note and practice plan",
  "Team member notes from any pillar",
  "Goals, assessments, and performance entries",
] as const;

export const LESSON_LOOP_STEPS = [
  {
    step: "01",
    title: "Coach records ~60 seconds",
    description:
      "After an in-person or online lesson, your coach captures a short voice note.",
  },
  {
    step: "02",
    title: "AI summary + practice plan",
    description:
      "Families receive parent-readable language — what was worked on, what clicked, and what to focus on before the next session.",
  },
  {
    step: "03",
    title: "Player rates practice",
    description:
      "Your child completes practice and taps how it went. One tap. Real accountability.",
  },
  {
    step: "04",
    title: "Coach sees it. AI sees it.",
    description:
      "Your coach knows practice happened. The platform incorporates it into your child's developing picture.",
  },
] as const;

export const TOURNAMENT_FLOW = [
  { step: "Capture", detail: "Photo of the tournament scorecard" },
  { step: "Extract", detail: "Every metric compiled automatically" },
  { step: "Analyze", detail: "Stats connected across pillars, in context to your player" },
  { step: "Focus", detail: "Clear direction on what to work on to lower scores" },
] as const;

export const TEAM_MEMBERS = [
  "Coach",
  "Fitness",
  "Mental",
  "Putting",
  "Physio",
  "Technology inputs",
  "Parents",
] as const;

export const AGE_PATHS = [
  {
    id: "building",
    title: "Building years (≈ 8–12)",
    points: [
      "Enjoyment, movement, confidence, healthy habits",
      "Parent education prevents over-coaching",
      "Structure tier covers the essentials",
    ],
  },
  {
    id: "competitive",
    title: "Competitive years (≈ 13–17)",
    points: [
      "Tournament intelligence, trend analysis, PHV awareness",
      "College-path profile from real history",
      "Intelligence and Optimization when the journey demands it",
    ],
  },
] as const;

export const LANDING_FAQ: FAQItem[] = [
  {
    question: "My coach uses CoachNow. Why do we need JuniorGolfOS?",
    answer:
      "CoachNow and similar apps are excellent for delivering lessons — video, messaging, and session storage. JuniorGolfOS is the development layer: every practice, tournament, team input, and goal feeds one intelligent player record, analyzed in context to your child. Many families use both: the coach's lesson tool plus JuniorGolfOS for coordinated long-term development.",
  },
  {
    question: "Do parents enter swing data or launch monitor numbers?",
    answer:
      "No. Coaches, players, and team members contribute pillar-specific input. Parents receive the interpreted picture, certification education, and access to AI specialists — so you support development without becoming the technical coach.",
  },
  {
    question: "Is Structure really free forever?",
    answer:
      "Yes. Structure is not a time-limited trial. When your coach connects you through GolfCoachOS, the family platform layer is $0. Self-serve families get the same Structure tier free to start. You upgrade only when you want deeper intelligence or optimization.",
  },
  {
    question: "When should we upgrade to Intelligence or Optimization?",
    answer:
      "Most families move to Intelligence when they want cross-pillar patterns, growth-stage guidance, and priorities beyond the latest scorecard. Optimization fits competitive juniors when tournament trends, college-path visibility, and advanced analysis matter. Upgrade anytime; no lock-in on monthly plans.",
  },
];
