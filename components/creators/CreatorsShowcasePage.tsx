"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Gift, Play, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { FormField, inputClassName } from "@/components/ui/FormField";
import {
  fetchCreatorShowcase,
  subscribeCreatorNewsletter,
  type CreatorShowcase,
} from "@/lib/creator-showcase-api";
import { CREATOR_PLAYBOOK } from "@/lib/creator-playbook";
import { getPlayerSignupHref, LINKS } from "@/lib/links";

function playbookTitle(key: string): string {
  return CREATOR_PLAYBOOK.find((b) => b.key === key)?.title ?? key;
}

function winStatusLabel(status: string, holdUntil: string | null): string {
  if (status === "pending_hold" && holdUntil) {
    return `Clears ${new Date(holdUntil).toLocaleDateString()}`;
  }
  if (status === "eligible") return "Ready for payout";
  if (status === "paid") return "Paid out";
  if (status === "credited") return "Credited";
  return "";
}

export function CreatorsShowcasePage() {
  const [showcase, setShowcase] = useState<CreatorShowcase | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    fetchCreatorShowcase()
      .then(setShowcase)
      .catch(() => setLoadError("Could not load wins right now."));
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setNewsletterError(null);
    setNewsletterStatus(null);
    try {
      const message = await subscribeCreatorNewsletter(email.trim(), "parent");
      setNewsletterStatus(message);
      setEmail("");
    } catch (err) {
      setNewsletterError(
        err instanceof Error ? err.message : "Could not subscribe.",
      );
    } finally {
      setSubscribing(false);
    }
  };

  const paidOut = showcase
    ? (showcase.stats.total_paid_out_cents / 100).toFixed(0)
    : "0";

  return (
    <div className="relative py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(236,105,26,0.1),transparent_65%)]"
      />

      <Container className="relative max-w-5xl">
        <MotionReveal className="text-center">
          <p className="section-eyebrow">Creator wins</p>
          <h1 className="section-heading mx-auto mt-4">
            Real players. Real rewards.
          </h1>
          <p className="section-subhead mx-auto mt-5 max-w-2xl">
            Featured cuts from junior golfers. Cash bounties, plan credits, and
            sponsor gear — parents, this is how your kid can offset monthly fees
            by filming what they already do in the app.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" href={getPlayerSignupHref()}>
              Start as a player
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button variant="secondary" size="lg" href={LINKS.create}>
              Upload a clip
            </Button>
          </div>
        </MotionReveal>

        {showcase && (
          <MotionReveal delay={0.05} className="mt-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Paid out", value: `$${paidOut}` },
                {
                  label: "Featured clips",
                  value: String(showcase.stats.featured_clip_count),
                },
                {
                  label: "Teammate signups",
                  value: String(showcase.stats.teammate_signups),
                },
                {
                  label: "Paid upgrades",
                  value: String(showcase.stats.paid_referral_signups),
                },
              ].map((stat) => (
                <GlassPanel key={stat.label} className="p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-hi">
                    {stat.value}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </MotionReveal>
        )}

        <MotionReveal delay={0.08} className="mt-16">
          <div className="mb-6 flex items-center gap-2">
            <Play className="size-5 text-emerald-400" aria-hidden />
            <h2 className="text-lg font-semibold text-text-hi">Featured cuts</h2>
          </div>
          {loadError && (
            <p className="text-sm text-text-low">{loadError}</p>
          )}
          {showcase && showcase.featured_clips.length === 0 && (
            <GlassPanel className="p-8 text-center">
              <p className="text-sm text-text-mid">
                Featured clips land here after GolfCoachOS review. Be the first —
                upload from the creator hub.
              </p>
              <Button variant="secondary" size="sm" className="mt-4" href={LINKS.create}>
                Create &amp; earn
              </Button>
            </GlassPanel>
          )}
          {showcase && showcase.featured_clips.length > 0 && (
            <ul className="grid gap-5 sm:grid-cols-2">
              {showcase.featured_clips.map((clip) => (
                <li key={clip.id}>
                  <GlassPanel className="overflow-hidden p-0">
                    <video
                      src={clip.video_url}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-[9/16] max-h-[420px] w-full bg-black object-contain"
                    />
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                        {clip.player_name}
                      </p>
                      <p className="mt-1 font-medium text-text-hi">
                        {playbookTitle(clip.playbook_key)}
                      </p>
                      {clip.caption && (
                        <p className="mt-2 text-sm text-text-mid">{clip.caption}</p>
                      )}
                    </div>
                  </GlassPanel>
                </li>
              ))}
            </ul>
          )}
        </MotionReveal>

        <MotionReveal delay={0.1} className="mt-16">
          <div className="mb-6 flex items-center gap-2">
            <Trophy className="size-5 text-emerald-400" aria-hidden />
            <h2 className="text-lg font-semibold text-text-hi">
              What players earned
            </h2>
          </div>
          {showcase && showcase.recent_wins.length === 0 && (
            <GlassPanel className="p-8 text-center">
              <p className="text-sm text-text-mid">
                Paid bounties and sponsor rewards show here as players earn them.
                Free signups count toward the dashboard; cash requires a paid
                teammate upgrade through Stripe.
              </p>
            </GlassPanel>
          )}
          {showcase && showcase.recent_wins.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {showcase.recent_wins.map((win) => (
                <li key={win.id}>
                  <GlassPanel className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="font-medium text-text-hi">{win.player_name}</p>
                      <p className="mt-1 text-sm text-emerald-300">
                        {win.reward_label}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-text-low">
                      {winStatusLabel(win.status, win.hold_until)}
                    </span>
                  </GlassPanel>
                </li>
              ))}
            </ul>
          )}
        </MotionReveal>

        <MotionReveal delay={0.12} className="mt-16">
          <GlassPanel strong className="p-8 sm:p-10">
            <div className="flex items-start gap-3">
              <Gift className="mt-0.5 size-6 shrink-0 text-emerald-400" aria-hidden />
              <div>
                <h2 className="text-lg font-semibold text-text-hi">
                  Sponsor drops coming
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-mid">
                  TaylorMade, Callaway, and JuniorGolfOS branded gear — hats,
                  shirts, equipment discounts — for featured clips and converting
                  signups. Sponsors fund merch; you keep more cash in your pocket.
                </p>
              </div>
            </div>
          </GlassPanel>
        </MotionReveal>

        <MotionReveal delay={0.14} className="mt-16">
          <GlassPanel strong className="p-8 sm:p-10">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-6 shrink-0 text-emerald-400" aria-hidden />
              <div className="w-full">
                <h2 className="text-lg font-semibold text-text-hi">
                  Parent newsletter — wins &amp; sponsor drops
                </h2>
                <p className="mt-2 text-sm text-text-mid">
                  Monthly roundup: featured cuts that converted, what kids earned,
                  and new sponsor rewards. Forward it to your junior — or nudge
                  them to film and offset your subscription.
                </p>
                <form onSubmit={handleNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <FormField id="newsletterEmail" label="Email" className="flex-1">
                    <input
                      id="newsletterEmail"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="parent@family.com"
                      className={inputClassName}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={subscribing}
                    />
                  </FormField>
                  <Button
                    variant="primary"
                    type="submit"
                    className="sm:self-end"
                    disabled={subscribing}
                  >
                    {subscribing ? "Joining…" : "Get the wins email"}
                  </Button>
                </form>
                {newsletterStatus && (
                  <p
                    className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-100"
                    role="status"
                  >
                    {newsletterStatus}
                  </p>
                )}
                {newsletterError && (
                  <p className="mt-3 text-sm text-red-200" role="alert">
                    {newsletterError}
                  </p>
                )}
              </div>
            </div>
          </GlassPanel>
        </MotionReveal>

        <MotionReveal delay={0.16} className="mt-12 text-center">
          <p className="text-sm text-text-low">
            <Link
              href={LINKS.home}
              className="focus-ring rounded text-emerald-400 hover:text-emerald-300"
            >
              Back to home
            </Link>
          </p>
        </MotionReveal>
      </Container>
    </div>
  );
}
