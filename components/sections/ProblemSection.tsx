"use client";

import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";

const kidA = [
  "Lessons live in videos and group texts",
  "Fitness, mental, and skill work stay in separate silos",
  "Parents guess what to do at home",
  "Tournament results disappear when the season ends",
  "Everyone forgets. Nothing compounds.",
];

const kidB = [
  "Every lesson, practice, tournament, and expert input feeds one evolving player record",
  "Trained coaches apply long-term development science — not guesswork",
  "Parents learn how to support without over-coaching",
  "Priorities update as your child grows",
  "Ten years of intentional development compounds",
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="section-space scroll-mt-28 border-y border-white/[0.04] bg-bg-elevated/20"
    >
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="The real gap in junior golf"
            title="Two kids. Same hours. Ten years later — not the same player."
            description="It usually isn't talent. It's whether development is educated, coach-led, and connected — or scattered across memory, texts, and apps that never talk to each other."
          />
        </MotionReveal>

        <div className="section-stack grid gap-5 lg:grid-cols-2">
          <MotionReveal delay={0.05}>
            <GlassPanel className="h-full !p-6 sm:!p-8">
              <p className="section-eyebrow text-text-low">Kid A</p>
              <h3 className="card-title mt-2">Managing development the hard way</h3>
              <ul className="mt-5 space-y-3">
                {kidA.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-mid"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/20" />
                    {line}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <GlassPanel highlight className="h-full !p-6 sm:!p-8">
              <p className="section-eyebrow">Kid B</p>
              <h3 className="card-title mt-2">Building development on purpose</h3>
              <ul className="mt-5 space-y-3">
                {kidB.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-mid"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    {line}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.14} className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-mid">
            The difference is{" "}
            <span className="text-text-hi">
              education, great coaching from trained professionals, and a system
              that keeps every part of development working together.
            </span>
          </p>
        </MotionReveal>
      </Container>
    </section>
  );
}
