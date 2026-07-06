"use client";

import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { AGE_PATHS, TEAM_MEMBERS } from "@/lib/landing-content";

export function TenYearsSection() {
  return (
    <section
      id="ten-years"
      aria-labelledby="ten-years-heading"
      className="section-space scroll-mt-28"
    >
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="The long game"
            title="One player. Every expert. One record that never resets."
            description="Junior golf is a decade-long journey. JuniorGolfOS is the infrastructure for intentional development — not season-to-season scrambling."
          />
        </MotionReveal>

        <MotionReveal delay={0.06} className="section-stack">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-text-low">
            The team on one player
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TEAM_MEMBERS.map((member) => (
              <span
                key={member}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-text-mid"
              >
                {member}
              </span>
            ))}
          </div>
          <p className="mx-auto max-w-2xl text-center body-copy">
            Separate logins, one shared development picture — private and team
            conversations included.
          </p>
        </MotionReveal>

        <div className="section-stack grid gap-5 lg:grid-cols-2">
          {AGE_PATHS.map((path, index) => (
            <MotionReveal key={path.id} delay={0.08 + index * 0.05}>
              <GlassPanel className="h-full !p-6 sm:!p-8">
                <h3 className="card-title">{path.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {path.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-mid"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.14} className="section-stack grid items-center gap-10 lg:grid-cols-2">
          <MediaSlot
            kind="screenshot"
            label="Ten-year player record"
            hint="Year 1 → Year 10 timeline · college profile from real history"
            aspect="wide"
          />
          <div className="space-y-6">
            <div>
              <h3 className="card-title">A better player</h3>
              <p className="mt-3 body-copy">
                Coordinated development across every contributor — physical,
                mental, skill, and performance analyzed together, in context,
                for your child.
              </p>
            </div>
            <div>
              <h3 className="card-title">A better golf parent</h3>
              <p className="mt-3 body-copy">
                Structure, education, and access to the world&apos;s most
                experienced long-term development coaches — happy to help your
                child succeed and help you succeed in your role.
              </p>
            </div>
            <p className="text-sm text-text-low">
              Families on GolfCoachOS compound an advantage every season.
              Families off it start over every year.
            </p>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
