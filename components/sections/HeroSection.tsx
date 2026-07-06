"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HERO_STRIP } from "@/lib/landing-content";
import { getSignupHref, LINKS } from "@/lib/links";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-[7.25rem] lg:pb-20"
    >
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <MotionReveal delay={0}>
              <p className="section-eyebrow">
                For families who take junior golf seriously
              </p>
            </MotionReveal>

            <MotionReveal delay={0.05}>
              <h1 id="hero-heading" className="hero-headline mt-3">
                Built for families seeking proven guidance from the world&apos;s
                most experienced long-term development coaches.
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="hero-subhead mt-5">
                Coaching that gives players a{" "}
                <span className="text-emerald-300">competitive advantage</span> —
                because every part of their development works together, in
                context, over time.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.12}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-mid">
                Not another lesson app. The family connection to GolfCoachOS —
                where trained professionals, your child&apos;s full development
                picture, and continuous intelligence meet.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="primary" size="lg" href={getSignupHref()}>
                  Start Free
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button variant="secondary" size="lg" href={LINKS.coaches}>
                  Join through your coach
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.18}>
              <p className="trust-line mt-5">
                Structure is free forever · Upgrade when age, stage, and need
                require it · Powered by GolfCoachOS
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.08}>
            <MediaSlot
              kind="video"
              label="Connected development"
              hint="60–90s: lesson → practice → tournament → dashboard → ten-year arc"
              aspect="wide"
              className="min-h-[260px] lg:min-h-[340px]"
            />
          </MotionReveal>
        </div>

        <MotionReveal delay={0.2} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HERO_STRIP.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                {item.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-mid">
                {item.line}
              </p>
            </div>
          ))}
        </MotionReveal>
      </Container>
    </section>
  );
}
