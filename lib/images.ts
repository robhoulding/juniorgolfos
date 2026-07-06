/**
 * Premium stock photography — Unsplash (free, hotlink-friendly with attribution in alt).
 * Replace URLs here when commissioning custom photography.
 */
export const IMAGES = {
  heroDashboard: {
    src: "/images/hero-dashboard.jpg",
    alt: "GolfCoachOS player dashboard showing physical, mental, skill, and on-course performance pillars for a junior golfer",
  },
  tournamentScores: {
    src: "/images/tournament-scores.jpg",
    alt: "GolfCoachOS tournament and round scores with scorecard stats, error avoidance trends, and rolling averages",
  },
  hero: {
    src: "https://images.unsplash.com/photo-1587174485993-784922149e22?auto=format&fit=crop&w=1400&q=85",
    alt: "Golf coach guiding a junior golfer through a lesson on the course at golden hour",
  },
  college: {
    src: "https://images.unsplash.com/photo-1593111777070-4a814d873298?auto=format&fit=crop&w=1400&q=85",
    alt: "Junior golfer walking the fairway with bag in hand, preparing for tournament play",
  },
  community: {
    src: "https://images.unsplash.com/photo-1535131749006-b7f58c990339?auto=format&fit=crop&w=1400&q=85",
    alt: "Parent and junior golfer walking together on a quiet fairway at sunrise",
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
