"use client";

import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { TOURNAMENT_FLOW } from "@/lib/landing-content";

export function TournamentsSection() {
  return (
    <section
      id="tournaments"
      aria-labelledby="tournaments-heading"
      className="section-space scroll-mt-28 border-y border-white/[0.04] bg-bg-elevated/20"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <MotionReveal>
            <SectionHeading
              align="left"
              eyebrow="Real performance"
              title="Real performance — measured, understood, and turned into focus."
              description="Tournament golf is the measure that matters. JuniorGolfOS doesn't just store a number — it reads the scorecard and connects results to your child's full development picture."
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <MediaSlot
              kind="screenshot"
              label="Scorecard → focus areas"
              hint="Photo capture → extracted stats → what to work on to lower scores"
              aspect="wide"
              className="min-h-[240px]"
            />
          </MotionReveal>
        </div>

        <MotionReveal delay={0.1} className="section-stack grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOURNAMENT_FLOW.map((item, index) => (
            <GlassPanel key={item.step} className="!p-5">
              <p className="section-eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="card-title mt-2">{item.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-mid">
                {item.detail}
              </p>
            </GlassPanel>
          ))}
        </MotionReveal>

        <MotionReveal delay={0.14} className="mt-10 text-center">
          <p className="text-lg text-text-mid">
            Scores are the scoreboard.{" "}
            <span className="text-text-hi">Understanding is the competitive advantage.</span>
          </p>
        </MotionReveal>
      </Container>
    </section>
  );
}
