"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PricingCards } from "@/components/pricing/PricingCards";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { getPricingTiers, PRICING_FAQ } from "@/lib/pricing";
import { getSignupHref } from "@/lib/links";

export function PricingPageContent() {
  return (
    <>
      <section
        aria-labelledby="pricing-hero-heading"
        className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14"
      >
        <Container className="relative text-center">
          <MotionReveal>
            <SectionHeading
              as="h1"
              eyebrow="Transparent by design"
              title={
                <>
                  Structure free.{" "}
                  <span className="text-gradient-emerald">
                    Intelligence when you&apos;re ready.
                  </span>
                </>
              }
              description="Structure gives every family a connected development home — not a trial. Upgrade to Intelligence or Optimization when age, stage, and competitive need justify deeper analysis."
            />
            <div className="mt-6">
              <Button variant="primary" size="lg" href={getSignupHref()}>
                Start Free
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <section aria-labelledby="pricing-tiers-heading" className="section-space pt-0">
        <Container>
          <MotionReveal>
            <SectionHeading
              eyebrow="Plans"
              title="Three depths. One connected development system."
              description="No hidden fees. No bait-and-switch trials. Choose what fits your family now — and change anytime."
            />
          </MotionReveal>
          <div className="section-stack">
            <PricingCards tiers={getPricingTiers()} />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="pricing-faq-heading"
        className="section-space border-t border-white/[0.04] bg-bg-elevated/20"
      >
        <Container>
          <MotionReveal>
            <SectionHeading
              eyebrow="Pricing FAQ"
              title="Questions about plans & billing"
            />
          </MotionReveal>
          <MotionReveal className="section-stack mx-auto max-w-3xl" delay={0.08}>
            <FAQAccordion items={PRICING_FAQ} />
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
