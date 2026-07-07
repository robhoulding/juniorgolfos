"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { BrandName } from "@/components/ui/BrandName";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HERO_HEADLINE_BODY, HERO_STRIP, HERO_SUBHEAD, HERO_TRUST_ITEMS } from "@/lib/landing-content";
import { IMAGES } from "@/lib/images";
import { getPlayerSignupHref, getSignupHref, LINKS } from "@/lib/links";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-[7.25rem] lg:pb-20"
    >
      <Container className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center lg:w-1/2 lg:min-w-0 lg:pr-2">
            <MotionReveal delay={0}>
              <h1 id="hero-heading" className="hero-headline">
                <BrandName name="JuniorGolfOS" /> {HERO_HEADLINE_BODY}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.05}>
              <p className="hero-subhead mt-5">{HERO_SUBHEAD}</p>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button variant="primary" size="lg" href={getSignupHref()}>
                  Start Free
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button variant="secondary" size="lg" href={getPlayerSignupHref()}>
                  I&apos;m a player
                </Button>
                <Button variant="secondary" size="lg" href={LINKS.creators}>
                  See creator wins
                </Button>
                <Button variant="secondary" size="lg" href={LINKS.create}>
                  Create &amp; earn
                </Button>
                <Button variant="secondary" size="lg" href={LINKS.coaches}>
                  Join through your coach
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.12}>
              <ul className="mt-5 space-y-2">
                {HERO_TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-mid"
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
          </div>

          <MotionReveal delay={0.08} className="lg:w-1/2 lg:min-w-0">
            <div className="media-card overflow-hidden rounded-[var(--radius-card)] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <PremiumImage
                src={IMAGES.heroDashboard.src}
                alt={IMAGES.heroDashboard.alt}
                priority
                overlay="none"
                fit="contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[1024/942] w-full bg-bg-elevated"
              />
            </div>
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
