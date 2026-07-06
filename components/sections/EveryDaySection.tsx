"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  DASHBOARD_INPUTS,
  EVERY_DAY_ITEMS,
} from "@/lib/landing-content";

export function EveryDaySection() {
  return (
    <section
      id="every-day"
      aria-labelledby="every-day-heading"
      className="section-space scroll-mt-28 border-y border-white/[0.04] bg-bg-elevated/20"
    >
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="A living development picture"
            title="Every day, an updated picture of your player — built from real life, not guesswork."
            description="The player dashboard refreshes whenever something meaningful is added — by your coach, your player, or anyone on the development team. Every update is framed for your child's age, stage, and experience."
          />
        </MotionReveal>

        <div className="section-stack grid items-start gap-10 lg:grid-cols-2">
          <MotionReveal delay={0.05}>
            <div>
              <p className="section-eyebrow mb-4">What updates the dashboard</p>
              <ul className="space-y-2.5">
                {DASHBOARD_INPUTS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-mid"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 body-copy">
                You don&apos;t enter launch monitor data. You{" "}
                <span className="text-text-hi">see the picture</span> your
                coaches and team are building — and you know how to support it at
                home.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <MediaSlot
              kind="screenshot"
              label="Parent daily view"
              hint="Today's picture of your player — annotated receipt, not raw analytics"
              aspect="phone"
              className="mx-auto w-full max-w-sm"
            />
          </MotionReveal>
        </div>

        <MotionReveal delay={0.12} className="section-stack">
          <p className="section-eyebrow text-center">Every day your family gets</p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {EVERY_DAY_ITEMS.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-text-mid"
              >
                <Check
                  className="mt-0.5 size-3.5 shrink-0 text-emerald-400"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </section>
  );
}
