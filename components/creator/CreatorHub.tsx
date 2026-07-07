"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  Loader2,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Logo } from "@/components/ui/Logo";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { FormField, inputClassName } from "@/components/ui/FormField";
import {
  CreatorApiError,
  fetchCreatorDashboard,
  fetchCreatorRewards,
  requestCreatorUpload,
  submitCreatorContent,
  uploadCreatorVideo,
  type CreatorDashboard,
  type CreatorRewardsSummary,
} from "@/lib/creator-api";
import {
  CREATOR_PLAYBOOK,
  CREATOR_RULES,
  CREATOR_STATUS_LABELS,
  type CreatorPlaybookKey,
} from "@/lib/creator-playbook";
import { getPlayerSignupHref, LINKS } from "@/lib/links";

function CreatorFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-24">
      <Loader2 className="size-8 animate-spin text-emerald-400" aria-hidden />
    </div>
  );
}

export function CreatorHub() {
  return (
    <Suspense fallback={<CreatorFallback />}>
      <CreatorHubContent />
    </Suspense>
  );
}

function CreatorHubContent() {
  const searchParams = useSearchParams();
  const referralToken = searchParams.get("token")?.trim() || "";

  const [dashboard, setDashboard] = useState<CreatorDashboard | null>(null);
  const [rewards, setRewards] = useState<CreatorRewardsSummary | null>(null);
  const [loading, setLoading] = useState(Boolean(referralToken));
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedPlaybook, setSelectedPlaybook] =
    useState<CreatorPlaybookKey | null>(null);
  const [caption, setCaption] = useState("");
  const [requestFeatured, setRequestFeatured] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [inviteCopied, setInviteCopied] = useState(false);

  const reload = useCallback(async () => {
    if (!referralToken) return;
    setLoading(true);
    setLoadError(null);
    try {
      const [dash, rewardData] = await Promise.all([
        fetchCreatorDashboard(referralToken),
        fetchCreatorRewards(referralToken),
      ]);
      setDashboard(dash);
      setRewards(rewardData);
    } catch (err) {
      setLoadError(
        err instanceof CreatorApiError
          ? err.message
          : "Could not load creator hub.",
      );
    } finally {
      setLoading(false);
    }
  }, [referralToken]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralToken || !selectedPlaybook || !videoFile) return;

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const upload = await requestCreatorUpload({
        referralToken,
        playbookKey: selectedPlaybook,
        fileName: videoFile.name,
        contentType: videoFile.type || "video/mp4",
        fileSize: videoFile.size,
      });

      await uploadCreatorVideo(upload.upload_url, videoFile);

      const result = await submitCreatorContent({
        referralToken,
        playbookKey: selectedPlaybook,
        caption: caption.trim() || undefined,
        storagePath: upload.storage_path,
        requestFeatured,
      });

      setSubmitSuccess(result.message);
      setCaption("");
      setRequestFeatured(false);
      setVideoFile(null);
      setSelectedPlaybook(null);
      await reload();
    } catch (err) {
      setSubmitError(
        err instanceof CreatorApiError
          ? err.message
          : "Upload failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyInviteLink = async () => {
    const link = dashboard?.player.invite_link;
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setInviteCopied(true);
      window.setTimeout(() => setInviteCopied(false), 2000);
    } catch {
      setInviteCopied(false);
    }
  };

  if (!referralToken) {
    return (
      <div className="relative py-24 sm:py-28">
        <Container className="max-w-lg text-center">
          <MotionReveal>
            <Logo className="mx-auto items-center" />
            <h1 className="section-heading mx-auto mt-10">Create &amp; earn</h1>
            <p className="section-subhead mx-auto mt-5">
              Sign up as a player first — your personal creator link arrives on
              the confirmation screen.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-10"
              href={getPlayerSignupHref()}
            >
              Sign up as a player
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </MotionReveal>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(236,105,26,0.08),transparent_65%)]"
      />

      <Container className="relative max-w-4xl">
        <MotionReveal className="text-center">
          <p className="section-eyebrow">Creator program</p>
          <h1 className="section-heading mx-auto mt-4">
            Make the videos. We handle rewards.
          </h1>
          <p className="section-subhead mx-auto mt-5 max-w-2xl">
            Film how you use JuniorGolfOS, upload your clip, and share your
            tracked invite link. Rewards are automatic — link clicks and
            signups. GolfCoachOS reviews only if you opt in for featuring or
            cash bounties. Coaches are notified only when you name them.
          </p>
        </MotionReveal>

        {loading && (
          <p className="mt-10 text-center text-sm text-text-low">Loading…</p>
        )}

        {loadError && (
          <GlassPanel className="mt-10 border-amber-500/20 bg-amber-500/5 p-5 text-center">
            <p className="text-sm text-amber-100">{loadError}</p>
          </GlassPanel>
        )}

        {dashboard && rewards && (
          <>
            <MotionReveal delay={0.05} className="mt-10">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <GlassPanel className="p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                    Link clicks
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-hi">
                    {rewards.summary.referral_click_count}
                  </p>
                </GlassPanel>
                <GlassPanel className="p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                    Free signups
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-hi">
                    {rewards.summary.referral_signup_count}
                  </p>
                </GlassPanel>
                <GlassPanel className="p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                    Paid signups
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-hi">
                    {rewards.summary.referral_paid_signup_count}
                  </p>
                </GlassPanel>
                <GlassPanel className="p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                    Eligible cash
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-hi">
                    ${(rewards.summary.eligible_cash_cents / 100).toFixed(2)}
                  </p>
                </GlassPanel>
                <GlassPanel className="p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                    In hold
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-hi">
                    $
                    {(
                      (rewards.summary.pending_cash_cents -
                        rewards.summary.eligible_cash_cents) /
                      100
                    ).toFixed(2)}
                  </p>
                </GlassPanel>
              </div>

              <GlassPanel className="mt-4 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                  Your tracked invite link
                </p>
                <p className="mt-2 break-all text-sm text-text-mid">
                  {dashboard.player.invite_link}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  className="mt-4"
                  onClick={copyInviteLink}
                >
                  {inviteCopied ? "Copied!" : "Copy invite link"}
                </Button>
              </GlassPanel>
              {(dashboard.player.coach_name || dashboard.player.academy_name) && (
                <p className="mt-4 text-center text-sm text-text-low">
                  {dashboard.player.coach_name && (
                    <>Coach: {dashboard.player.coach_name}</>
                  )}
                  {dashboard.player.academy_name && (
                    <> · {dashboard.player.academy_name}</>
                  )}
                </p>
              )}
            </MotionReveal>

            <MotionReveal delay={0.08} className="mt-14">
              <div className="mb-6 flex items-center gap-2">
                <Clapperboard className="size-5 text-emerald-400" aria-hidden />
                <h2 className="text-lg font-semibold text-text-hi">
                  Content playbook — pick one to film
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {CREATOR_PLAYBOOK.map((brief) => {
                  const selected = selectedPlaybook === brief.key;
                  return (
                    <li key={brief.key}>
                      <button
                        type="button"
                        onClick={() => setSelectedPlaybook(brief.key)}
                        className={`w-full rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-emerald-500/40 bg-emerald-500/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-400">
                          {brief.pillar}
                        </p>
                        <p className="mt-2 font-semibold text-text-hi">
                          {brief.title}
                        </p>
                        <p className="mt-2 text-sm italic text-text-mid">
                          &ldquo;{brief.hook}&rdquo;
                        </p>
                        <ul className="mt-3 space-y-1.5 text-sm text-text-low">
                          {brief.beats.map((beat) => (
                            <li key={beat}>· {beat}</li>
                          ))}
                        </ul>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </MotionReveal>

            <MotionReveal delay={0.1} className="mt-10">
              <GlassPanel className="p-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden />
                  <div>
                    <p className="font-semibold text-text-hi">Filming rules</p>
                    <ul className="mt-2 space-y-1 text-sm text-text-mid">
                      {CREATOR_RULES.map((rule) => (
                        <li key={rule}>· {rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassPanel>
            </MotionReveal>

            <MotionReveal delay={0.12} className="mt-12">
              <GlassPanel strong className="p-8">
                <div className="mb-6 flex items-center gap-2">
                  <Upload className="size-5 text-emerald-400" aria-hidden />
                  <h2 className="text-lg font-semibold text-text-hi">
                    Submit your clip
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormField
                    id="creatorVideo"
                    label="Video file"
                    hint="MP4, MOV, or WebM · max 100MB · 30–60 seconds vertical"
                  >
                    <input
                      id="creatorVideo"
                      type="file"
                      accept="video/mp4,video/quicktime,video/webm,video/x-m4v"
                      className={inputClassName}
                      onChange={(e) =>
                        setVideoFile(e.target.files?.[0] ?? null)
                      }
                      disabled={submitting}
                    />
                  </FormField>

                  <FormField
                    id="creatorCaption"
                    label="Caption (optional)"
                    hint="Naming your coach or academy triggers a coach heads-up only — not a blocker"
                  >
                    <input
                      id="creatorCaption"
                      type="text"
                      maxLength={500}
                      placeholder="Uploaded my AJGA scores and goals updated…"
                      className={inputClassName}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      disabled={submitting}
                    />
                  </FormField>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 rounded border-white/20 accent-emerald-500"
                      checked={requestFeatured}
                      onChange={(e) => setRequestFeatured(e.target.checked)}
                      disabled={submitting}
                    />
                    <span className="text-sm text-text-mid">
                      <span className="font-medium text-text-hi">
                        Submit for GolfCoachOS featuring / cash bounty
                      </span>
                      <br />
                      Optional — sends this clip to our team for review. You can
                      still share immediately with your invite link either way.
                    </span>
                  </label>

                  {submitError && (
                    <p
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  {submitSuccess && (
                    <p
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                      role="status"
                    >
                      {submitSuccess}
                    </p>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={
                      submitting || !selectedPlaybook || !videoFile
                    }
                  >
                    {submitting
                      ? "Uploading…"
                      : selectedPlaybook
                        ? "Upload & share"
                        : "Select a playbook video first"}
                    {!submitting && <ArrowRight className="size-4" aria-hidden />}
                  </Button>
                </form>
              </GlassPanel>
            </MotionReveal>

            {dashboard.submissions.length > 0 && (
              <MotionReveal delay={0.14} className="mt-12">
                <div className="mb-6 flex items-center gap-2">
                  <Video className="size-5 text-emerald-400" aria-hidden />
                  <h2 className="text-lg font-semibold text-text-hi">
                    Your submissions
                  </h2>
                </div>
                <ul className="space-y-3">
                  {dashboard.submissions.map((row) => (
                    <li key={row.id}>
                      <GlassPanel className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-text-hi">
                              {CREATOR_PLAYBOOK.find((b) => b.key === row.playbook_key)
                                ?.title ?? row.playbook_key}
                            </p>
                            {row.caption && (
                              <p className="mt-1 text-sm text-text-mid">
                                {row.caption}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-text-low">
                              {new Date(row.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-text-mid">
                            {CREATOR_STATUS_LABELS[row.status] ?? row.status}
                          </span>
                        </div>
                        {(row.coach_review_note || row.platform_review_note) && (
                          <p className="mt-3 text-sm text-text-mid">
                            {row.coach_review_note ?? row.platform_review_note}
                          </p>
                        )}
                      </GlassPanel>
                    </li>
                  ))}
                </ul>
              </MotionReveal>
            )}

            <MotionReveal delay={0.16} className="mt-12 text-center">
              <GlassPanel className="border-emerald-500/20 bg-emerald-500/5 p-6">
                <CheckCircle2
                  className="mx-auto size-8 text-emerald-400"
                  aria-hidden
                />
                <p className="mt-4 text-sm leading-relaxed text-text-mid">
                  {rewards.payout_policy?.note ??
                    "Cash bounties require a paid subscription that stays active through a 30-day hold. Payouts are batched quarterly."}{" "}
                  Free signups count on your dashboard but never pay cash.
                  Coaches keep their 25% recurring commission separately.
                </p>
              </GlassPanel>
            </MotionReveal>
          </>
        )}

        <MotionReveal delay={0.18} className="mt-12 text-center">
          <p className="text-sm text-text-low">
            <Link
              href={LINKS.creators}
              className="focus-ring rounded text-emerald-400 hover:text-emerald-300"
            >
              See featured cuts &amp; payout wins
            </Link>
            {" · "}
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
