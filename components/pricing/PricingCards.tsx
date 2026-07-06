"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MotionReveal, MotionStagger } from "@/components/ui/MotionReveal";
import { fadeUp } from "@/lib/motion";
import type { PricingTier } from "@/lib/pricing";

type PricingCardsProps = {
  tiers: PricingTier[];
  compact?: boolean;
};

export function PricingCards({ tiers, compact = false }: PricingCardsProps) {
  return (
    <MotionStagger className="grid items-stretch gap-5 lg:grid-cols-3">
      {tiers.map((plan, index) => {
        const features = compact ? plan.features.slice(0, 5) : plan.features;

        return (
          <MotionReveal key={plan.id} variants={fadeUp} delay={index * 0.06} className="h-full">
            <GlassPanel
              highlight={plan.highlighted}
              className="relative flex h-full min-h-[400px] flex-col !p-6"
            >
              {plan.badge && (
                <Badge variant="gold" className="absolute -top-2.5 left-6">
                  {plan.badge}
                </Badge>
              )}

              <p className="section-eyebrow">{plan.eyebrow}</p>
              <h3 className="card-title mt-2">{plan.displayName}</h3>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="price-display">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-text-mid">{plan.period}</span>
                )}
              </div>

              <p className="mt-3 body-copy">
                {compact ? plan.description.split(".")[0] + "." : plan.description}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-text-mid">
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {compact && plan.features.length > 5 && (
                <p className="mt-2 text-xs text-text-low">
                  + {plan.features.length - 5} more on the pricing page
                </p>
              )}

              <Button
                variant={plan.highlighted ? "primary" : "secondary"}
                size="md"
                className="mt-6 w-full"
                href={plan.ctaHref}
              >
                {plan.cta}
              </Button>
            </GlassPanel>
          </MotionReveal>
        );
      })}
    </MotionStagger>
  );
}
