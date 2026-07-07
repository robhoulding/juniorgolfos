import type { Metadata } from "next";
import { CreatorHub } from "@/components/creator/CreatorHub";

export const metadata: Metadata = {
  title: "Create & Earn — JuniorGolfOS",
  description:
    "Film how you use JuniorGolfOS, submit for coach approval, and earn credits and cash bounties when your content drives signups.",
  robots: { index: false },
};

export default function CreatePage() {
  return <CreatorHub />;
}
