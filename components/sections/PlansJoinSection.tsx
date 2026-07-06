"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCards } from "@/components/pricing/PricingCards";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { LANDING_FAQ } from "@/lib/landing-content";
import { getSignupHref, LINKS } from "@/lib/links";
import { getPricingTiers } from "@/lib/pricing";

export function PlansJoinSection() {
  return (
    <>
      <section
        id="plans"
        aria-labelledby="plans-heading"
        className="section-space scroll-mt-28 border-y border-white/[0.04] bg-bg-elevated/20"
      >
        <Container>
          <MotionReveal>
            <SectionHeading
              eyebrow="Transparent by design"
              title="Structure free. Intelligence and optimization when your child's journey demands it."
              description="We don't hide the good stuff behind a trial. Upgrade when age, stage, and competitive need justify deeper analysis — not before."
            />
          </MotionReveal>

          <div className="section-stack">
            <PricingCards tiers={getPricingTiers()} />
          </div>

          <MotionReveal delay={0.1} className="section-stack grid gap-5 lg:grid-cols-2">
            <div id="join" className="scroll-mt-28">
              <GlassPanel highlight className="h-full !p-6 sm:!p-8">
              <p className="section-eyebrow">Recommended</p>
              <h3 className="card-title mt-2">My coach is on GolfCoachOS</h3>
              <p className="mt-3 body-copy">
                Ask your coach to send a family invitation. Structure is $0 when
                connected through their program. They lead instruction; you get
                the full family view automatically.
              </p>
              <Button variant="primary" size="md" className="mt-6" href={getSignupHref()}>
                I have an invitation
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              </GlassPanel>
            </div>

            <GlassPanel className="!p-6 sm:!p-8">
              <p className="section-eyebrow">Getting started</p>
              <h3 className="card-title mt-2">We&apos;re exploring on our own</h3>
              <p className="mt-3 body-copy">
                Create a free Structure account. Connect your coach when ready.
                Explore certification and community while you find the right fit.
              </p>
              <Button variant="secondary" size="md" className="mt-6" href={getSignupHref()}>
                Start Free
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </GlassPanel>
          </MotionReveal>

          <MotionReveal delay={0.14} className="section-stack text-center">
            <h3 className="card-title">You&apos;re not doing this alone.</h3>
            <p className="section-subhead mx-auto mt-3">
              Forums, guided learning, podcasts, and peer support from families
              and coaches who believe in long-term development.
            </p>
            <Button
              variant="ghost"
              size="md"
              className="mt-4"
              href={LINKS.community}
              external
            >
              Explore community
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </MotionReveal>
        </Container>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="section-space scroll-mt-28"
      >
        <Container>
          <MotionReveal>
            <SectionHeading eyebrow="FAQ" title="Questions before you begin" />
          </MotionReveal>
          <MotionReveal delay={0.08} className="section-stack mx-auto max-w-3xl">
            <FAQAccordion items={LANDING_FAQ} />
          </MotionReveal>
        </Container>
      </section>

      <section aria-labelledby="final-cta-heading" className="section-space pt-0">
        <Container>
          <MotionReveal>
            <GlassPanel strong className="relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-14">
              <p className="section-eyebrow">Join the movement</p>
              <h2 id="final-cta-heading" className="section-heading mx-auto mt-4">
                Join the coaches and families building players the right way.
              </h2>
              <p className="section-subhead mx-auto mt-5">
                Not the same coaching taught at every lesson to every player —
                coaching specifically in context to your kid.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="primary" size="lg" href={getSignupHref()}>
                  Start Free
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button variant="secondary" size="lg" href={LINKS.coaches}>
                  Join through your coach
                </Button>
                <Button variant="ghost" size="lg" href={LINKS.pricing}>
                  View pricing
                </Button>
              </div>
            </GlassPanel>
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
