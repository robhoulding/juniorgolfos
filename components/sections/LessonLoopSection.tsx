"use client";

import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { LESSON_LOOP_STEPS } from "@/lib/landing-content";

export function LessonLoopSection() {
  return (
    <section
      id="lesson-loop"
      aria-labelledby="lesson-loop-heading"
      className="section-space scroll-mt-28"
    >
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="Where improvement actually happens"
            title="From coach voice to real practice — closed, seen, and learned from."
            description="Your coach leads. The platform closes the loop. AI learns from every cycle."
          />
        </MotionReveal>

        <div className="section-stack grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            {LESSON_LOOP_STEPS.map((step, index) => (
              <MotionReveal key={step.step} delay={index * 0.05}>
                <GlassPanel interactive className="flex gap-4 !p-5 sm:!p-6">
                  <span className="section-eyebrow shrink-0 text-text-low">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="card-title">{step.title}</h3>
                    <p className="mt-2 body-copy">{step.description}</p>
                  </div>
                </GlassPanel>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal delay={0.08}>
            <MediaSlot
              kind="video"
              label="Lesson → practice loop"
              hint="30–45s: coach voice → summary → player rating → coach + AI"
              aspect="wide"
              className="min-h-[280px] lg:sticky lg:top-28"
            />
          </MotionReveal>
        </div>

        <MotionReveal delay={0.14} className="mt-10 text-center">
          <p className="body-copy mx-auto max-w-2xl">
            <span className="text-text-hi">Coach</span> leads instruction.{" "}
            <span className="text-text-hi">Player</span> does the work.{" "}
            <span className="text-text-hi">Parent</span> supports and
            encourages.{" "}
            <span className="text-text-hi">JuniorGolfOS</span> makes sure nothing
            falls through.
          </p>
        </MotionReveal>
      </Container>
    </section>
  );
}
