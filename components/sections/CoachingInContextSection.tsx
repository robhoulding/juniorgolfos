"use client";

import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { CONTEXT_CONTRAST } from "@/lib/landing-content";

export function CoachingInContextSection() {
  return (
    <section
      id="coaching-in-context"
      aria-labelledby="cic-heading"
      className="section-space scroll-mt-28"
    >
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="The intelligence layer"
            title="Knowing exactly the right thing to do — at the right time — for the player in front of you."
            description="Most apps store lessons, videos, and scores. JuniorGolfOS — powered by GolfCoachOS — builds understanding across physical, mental, skill, and performance pillars, framed for your child's age, stage, and experience."
          />
        </MotionReveal>

        <MotionReveal delay={0.06} className="section-stack mx-auto max-w-3xl text-center">
          <p className="body-copy">
            <span className="font-semibold text-emerald-300">
              Coaching in Context
            </span>{" "}
            means the platform and your coaches know who your player is today,
            what phase they&apos;re in, and what deserves attention now — not
            the same lesson for every kid.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.1} className="section-stack overflow-x-auto">
          <GlassPanel className="!p-0">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-5 py-4 font-semibold text-text-low sm:px-6">
                    Typical coaching apps
                  </th>
                  <th className="px-5 py-4 font-semibold text-emerald-400 sm:px-6">
                    JuniorGolfOS
                  </th>
                </tr>
              </thead>
              <tbody>
                {CONTEXT_CONTRAST.map((row) => (
                  <tr
                    key={row.typical}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-5 py-3.5 text-text-mid sm:px-6">
                      {row.typical}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-text-hi sm:px-6">
                      {row.jgos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassPanel>
        </MotionReveal>

        <MotionReveal delay={0.14} className="section-stack space-y-4 text-center">
          <p className="body-copy mx-auto max-w-2xl">
            Your coach may use CoachNow or similar tools to{" "}
            <span className="text-text-hi">deliver lessons</span>. JuniorGolfOS
            is the{" "}
            <span className="text-text-hi">development layer</span> — so nothing
            important about your child&apos;s journey happens in isolation.
          </p>
          <p className="text-sm text-text-low">
            Other apps ask: &ldquo;What happened at the lesson?&rdquo;
            <br />
            JuniorGolfOS asks: &ldquo;What should matter next — for this player,
            right now?&rdquo;
          </p>
        </MotionReveal>
      </Container>
    </section>
  );
}
