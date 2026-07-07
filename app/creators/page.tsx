import type { Metadata } from "next";
import { CreatorsShowcasePage } from "@/components/creators/CreatorsShowcasePage";

export const metadata: Metadata = {
  title: "Creator Wins — JuniorGolfOS",
  description:
    "Featured junior golf clips, real payout wins, and sponsor rewards. Parents — see how players offset monthly fees by creating content.",
  openGraph: {
    title: "JuniorGolfOS Creator Wins",
    description:
      "Real players. Real rewards. Featured cuts and payout wins from the JuniorGolfOS creator program.",
  },
};

export default function CreatorsPage() {
  return <CreatorsShowcasePage />;
}
