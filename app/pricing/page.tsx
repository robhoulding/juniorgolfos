import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pricing/PricingPageContent";

export const metadata: Metadata = {
  title: "Pricing — JuniorGolfOS",
  description:
    "Structure is free forever. Intelligence and Optimization add cross-pillar development analysis when your family's journey demands it.",
};

export default function PricingPage() {
  return <PricingPageContent />;
}
