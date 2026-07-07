export const CREATOR_PLAYBOOK = [
  {
    key: "tournament_scores",
    title: "Tournament scores → real data",
    hook: "I just played a tournament — watch what happened in my app.",
    beats: [
      "Open the app and show your tournament scores going in",
      "Show the dashboard updating — trends and context, not just a number",
      "Close with your teammate invite link",
    ],
    pillar: "Performance",
  },
  {
    key: "trackman_skills",
    title: "TrackMan → Skills pillar → goals update",
    hook: "My coach said work on ball speed — look what the app did.",
    beats: [
      "Show your TrackMan or launch monitor screen",
      "Drag or import the data tile into your Skills pillar",
      "Show performance goals updating instantly on screen",
    ],
    pillar: "Skills",
  },
  {
    key: "trainer_physical",
    title: "Trainer assessment → Physical pillar",
    hook: "Just finished with my trainer — this is how we keep it on record.",
    beats: [
      "Film with your trainer or right after a session",
      "Upload their assessment to your Physical pillar",
      "Show coach, trainer, and you on the same page",
    ],
    pillar: "Physical",
  },
  {
    key: "testimonial",
    title: "Everything finally makes sense",
    hook: "Okay I need to talk about this for a second…",
    beats: [
      "Before: scattered notes and random stats. After: pillars and clear goals",
      "Optional quick montage of your other clips",
      "End with energy — share your invite link",
    ],
    pillar: "All pillars",
  },
] as const;

export type CreatorPlaybookKey = (typeof CREATOR_PLAYBOOK)[number]["key"];

export const CREATOR_RULES = [
  "30–60 seconds, vertical (9:16), good lighting",
  "Show the real app on screen for at least half the video",
  "Share using your tracked invite link — clicks and signups earn rewards automatically",
  "Coach review only if you name your coach or academy in the clip",
  "No copyrighted music; keep it authentic",
] as const;

export const CREATOR_STATUS_LABELS: Record<string, string> = {
  live: "Live — share with your invite link",
  pending_coach: "Coach heads-up (you named them)",
  pending_platform: "In GolfCoachOS review queue",
  featured: "Featured — bonus eligible",
  rejected: "Needs a reshoot",
  pending: "Submitted",
  coach_approved: "Live",
  platform_approved: "Featured",
};
