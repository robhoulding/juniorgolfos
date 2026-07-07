"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Logo } from "@/components/ui/Logo";
import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  FormField,
  inputClassName,
  selectClassName,
} from "@/components/ui/FormField";
import { DEFAULT_AFFILIATE_TOKEN } from "@/lib/api-config";
import { getCreateHref, getPlayerSignupHref, LINKS } from "@/lib/links";
import {
  invitationReasonMessage,
  playerReferralReasonMessage,
  SignupApiError,
  submitFamilySignup,
  submitPlayerSignup,
  validateCoachAffiliate,
  validateInvitation,
  validatePlayerReferral,
  type CoachAffiliateValidation,
  type InvitationValidation,
  type PlayerReferralValidation,
} from "@/lib/signup-api";
import {
  ageToDateOfBirth,
  familyNameToLastName,
  parentNameToLastName,
  parsePlayerName,
} from "@/lib/signup-form-helpers";

const PRIMARY_GOALS = [
  { value: "", label: "Select a primary goal" },
  { value: "long-term-development", label: "Long-term skill development" },
  { value: "tournament-prep", label: "Tournament preparation" },
  { value: "college-path", label: "College recruiting path" },
  { value: "confidence-enjoyment", label: "Building confidence & enjoyment" },
  { value: "physical-development", label: "Physical & athletic development" },
] as const;

type FormState = {
  familyName: string;
  parentName: string;
  parentEmail: string;
  playerName: string;
  playerAge: string;
  primaryGoal: string;
};

const initialForm: FormState = {
  familyName: "",
  parentName: "",
  parentEmail: "",
  playerName: "",
  playerAge: "",
  primaryGoal: "",
};

type PlayerFormState = {
  name: string;
  email: string;
  playerAge: string;
};

const initialPlayerForm: PlayerFormState = {
  name: "",
  email: "",
  playerAge: "",
};

function familySignupHref(coach?: string): string {
  const params = new URLSearchParams();
  if (coach?.trim()) {
    params.set("coach", coach.trim());
  }
  const query = params.toString();
  return query ? `${LINKS.signup}?${query}` : LINKS.signup;
}

function referralTokenFromLink(link: string): string | null {
  try {
    return new URL(link).searchParams.get("ref");
  } catch {
    return null;
  }
}

function SignupFormFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-24">
      <Loader2 className="size-8 animate-spin text-emerald-400" aria-hidden />
    </div>
  );
}

export function SignupForm() {
  return (
    <Suspense fallback={<SignupFormFallback />}>
      <SignupFormContent />
    </Suspense>
  );
}

function SignupFormContent() {
  const searchParams = useSearchParams();
  const isPlayerMode = searchParams.get("role") === "player";
  const playerRefToken = searchParams.get("ref")?.trim() || "";
  const inviteToken =
    searchParams.get("invite")?.trim() ||
    searchParams.get("token")?.trim() ||
    "";
  const coachToken = searchParams.get("coach")?.trim() || "";

  const [form, setForm] = useState<FormState>(initialForm);
  const [playerForm, setPlayerForm] = useState<PlayerFormState>(initialPlayerForm);
  const [invitation, setInvitation] = useState<InvitationValidation | null>(
    null,
  );
  const [playerReferral, setPlayerReferral] =
    useState<PlayerReferralValidation | null>(null);
  const [coachAffiliate, setCoachAffiliate] =
    useState<CoachAffiliateValidation | null>(null);
  const [invitationLoading, setInvitationLoading] = useState(
    Boolean(inviteToken) && !isPlayerMode,
  );
  const [playerReferralLoading, setPlayerReferralLoading] = useState(
    Boolean(playerRefToken) && isPlayerMode,
  );
  const [coachAffiliateLoading, setCoachAffiliateLoading] = useState(
    Boolean(coachToken || DEFAULT_AFFILIATE_TOKEN) &&
      !inviteToken &&
      !(isPlayerMode && playerRefToken),
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signInUrl, setSignInUrl] = useState<string | null>(null);
  const [playerReferralLink, setPlayerReferralLink] = useState<string | null>(
    null,
  );
  const [referralCopied, setReferralCopied] = useState(false);

  const effectiveCoachToken = useMemo(() => {
    if (coachToken) {
      if (coachAffiliate?.valid && coachAffiliate.affiliate_token) {
        return coachAffiliate.affiliate_token;
      }
      return coachToken;
    }
    if (
      playerReferral?.valid &&
      playerReferral.referrer.coach_affiliate_token
    ) {
      return playerReferral.referrer.coach_affiliate_token;
    }
    if (DEFAULT_AFFILIATE_TOKEN) {
      if (coachAffiliate?.valid && coachAffiliate.affiliate_token) {
        return coachAffiliate.affiliate_token;
      }
      return DEFAULT_AFFILIATE_TOKEN;
    }
    return "";
  }, [coachToken, playerReferral, coachAffiliate]);

  const affiliateToken = effectiveCoachToken;

  const signupMode = isPlayerMode
    ? playerRefToken && playerReferral?.valid
      ? "player-referral"
      : affiliateToken
        ? "affiliate"
        : "none"
    : inviteToken
      ? "invitation"
      : affiliateToken
        ? "affiliate"
        : "none";

  const canSubmit = isPlayerMode
    ? signupMode !== "none" &&
      !playerReferralLoading &&
      !coachAffiliateLoading
    : signupMode !== "none" &&
      !invitationLoading &&
      !coachAffiliateLoading;

  useEffect(() => {
    if (!inviteToken || isPlayerMode) {
      setInvitationLoading(false);
      return;
    }

    let cancelled = false;
    setInvitationLoading(true);

    validateInvitation(inviteToken)
      .then((result) => {
        if (cancelled) return;
        setInvitation(result);
        if (result.valid) {
          setForm((prev) => ({
            ...prev,
            parentEmail: result.recipient_email?.trim() || prev.parentEmail,
            parentName: result.recipient_name?.trim() || prev.parentName,
          }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInvitation({ valid: false, reason: "not_found" });
        }
      })
      .finally(() => {
        if (!cancelled) setInvitationLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [inviteToken, isPlayerMode]);

  useEffect(() => {
    if (!isPlayerMode || !playerRefToken) {
      setPlayerReferralLoading(false);
      return;
    }

    let cancelled = false;
    setPlayerReferralLoading(true);

    validatePlayerReferral(playerRefToken)
      .then((result) => {
        if (!cancelled) setPlayerReferral(result);
      })
      .catch(() => {
        if (!cancelled) {
          setPlayerReferral({ valid: false, reason: "not_found" });
        }
      })
      .finally(() => {
        if (!cancelled) setPlayerReferralLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isPlayerMode, playerRefToken]);

  useEffect(() => {
    const rawCoachToken =
      coachToken ||
      (!inviteToken && !(isPlayerMode && playerRefToken)
        ? DEFAULT_AFFILIATE_TOKEN
        : "");

    if (!rawCoachToken.trim() || inviteToken || (isPlayerMode && playerRefToken)) {
      setCoachAffiliateLoading(false);
      setCoachAffiliate(null);
      return;
    }

    let cancelled = false;
    setCoachAffiliateLoading(true);

    validateCoachAffiliate(rawCoachToken)
      .then((result) => {
        if (!cancelled) setCoachAffiliate(result);
      })
      .catch(() => {
        if (!cancelled) {
          setCoachAffiliate({ valid: false, reason: "not_found" });
        }
      })
      .finally(() => {
        if (!cancelled) setCoachAffiliateLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [coachToken, inviteToken, isPlayerMode, playerRefToken]);

  const invitationError = useMemo(() => {
    if (!inviteToken || invitationLoading) return null;
    if (!invitation || invitation.valid) return null;
    return invitationReasonMessage(invitation.reason);
  }, [inviteToken, invitation, invitationLoading]);

  const playerReferralError = useMemo(() => {
    if (!isPlayerMode || !playerRefToken || playerReferralLoading) return null;
    if (!playerReferral || playerReferral.valid) return null;
    return playerReferralReasonMessage(playerReferral.reason);
  }, [isPlayerMode, playerRefToken, playerReferral, playerReferralLoading]);

  const coachAffiliateError = useMemo(() => {
    const rawCoachToken =
      coachToken ||
      (!inviteToken && !(isPlayerMode && playerRefToken)
        ? DEFAULT_AFFILIATE_TOKEN
        : "");
    if (!rawCoachToken.trim() || inviteToken || coachAffiliateLoading) {
      return null;
    }
    if (isPlayerMode && playerRefToken && playerReferralLoading) return null;
    if (!coachAffiliate || coachAffiliate.valid) return null;
    return "This coach link is not valid. Ask your coach for a new signup link.";
  }, [
    coachToken,
    inviteToken,
    isPlayerMode,
    playerRefToken,
    coachAffiliate,
    coachAffiliateLoading,
    playerReferralLoading,
  ]);

  const coachBanner = useMemo(() => {
    if (isPlayerMode && playerReferral?.valid) {
      return `${playerReferral.referrer.first_name} invited you to join their team on JuniorGolfOS.`;
    }
    if (invitation?.valid) {
      return `You're joining ${invitation.coach.display_name}'s development program.`;
    }
    if (signupMode === "affiliate" && coachAffiliate?.valid) {
      const name = coachAffiliate.display_name?.trim();
      return name
        ? `You're joining ${name}'s program on JuniorGolfOS.`
        : "You're signing up through your coach's link.";
    }
    if (signupMode === "affiliate" && coachToken) {
      return "You're signing up through your coach's link.";
    }
    if (signupMode === "affiliate" && DEFAULT_AFFILIATE_TOKEN) {
      return isPlayerMode
        ? "Create your free player profile on JuniorGolfOS."
        : "Start your free family workspace on JuniorGolfOS.";
    }
    return null;
  }, [invitation, isPlayerMode, playerReferral, signupMode, coachToken]);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError(null);
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const updatePlayer =
    (field: keyof PlayerFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setPlayerForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const copyReferralLink = async () => {
    if (!playerReferralLink) return;
    try {
      await navigator.clipboard.writeText(playerReferralLink);
      setReferralCopied(true);
      window.setTimeout(() => setReferralCopied(false), 2000);
    } catch {
      setReferralCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      if (isPlayerMode) {
        const age = Number(playerForm.playerAge);
        const date_of_birth = ageToDateOfBirth(age);

        const result = await submitPlayerSignup({
          name: playerForm.name.trim(),
          email: playerForm.email.trim(),
          date_of_birth,
          affiliateToken: effectiveCoachToken || undefined,
          playerReferralToken: playerRefToken || undefined,
        });

        setSignInUrl(result.sign_in_url ?? result.redirect_url ?? null);
        setPlayerReferralLink(result.player_referral_link ?? null);
        setSubmitted(true);
        return;
      }

      const age = Number(form.playerAge);
      const fallbackLastName =
        parentNameToLastName(form.parentName) ||
        familyNameToLastName(form.familyName);
      const player = parsePlayerName(form.playerName, fallbackLastName);
      const date_of_birth = ageToDateOfBirth(age);

      const result = await submitFamilySignup({
        parent: {
          name: form.parentName.trim(),
          email: form.parentEmail.trim(),
        },
        players: [{ ...player, date_of_birth }],
        invitationToken: inviteToken || undefined,
        affiliateToken: inviteToken ? undefined : affiliateToken,
      });

      const nextUrl = result.sign_in_url ?? result.redirect_url ?? null;
      setSignInUrl(nextUrl);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof SignupApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative min-h-[70vh] py-24 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(236,105,26,0.08),transparent_65%)]"
        />
        <Container className="relative max-w-lg">
          <MotionReveal>
            <GlassPanel strong className="p-8 text-center sm:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <CheckCircle2 className="size-8 text-emerald-400" aria-hidden />
              </div>
              <h1 className="section-heading mx-auto mt-8">
                {isPlayerMode
                  ? "Your player profile is ready."
                  : "Your family workspace is ready."}
              </h1>
              <p className="section-subhead mx-auto mt-5">
                {isPlayerMode
                  ? "Check your email for next steps, then sign in to open your dashboard. Invite teammates with your link below — Structure is free."
                  : "We've sent a confirmation email with next steps. Sign in to open your player dashboard — Structure is free, no credit card required."}
              </p>
              {isPlayerMode && playerReferralLink && (
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-400">
                    Invite your teammates
                  </p>
                  <p className="mt-2 break-all text-sm text-text-mid">
                    {playerReferralLink}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    className="mt-4"
                    onClick={copyReferralLink}
                  >
                    {referralCopied ? "Copied!" : "Copy invite link"}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-3 w-full"
                    href={getCreateHref(
                      referralTokenFromLink(playerReferralLink) ?? undefined,
                    )}
                  >
                    Create content &amp; earn
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              )}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {signInUrl ? (
                  <Button variant="primary" size="lg" href={signInUrl}>
                    Sign in to your dashboard
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                ) : (
                  <Button variant="primary" href={LINKS.golfCoachOS}>
                    Go to GolfCoachOS
                  </Button>
                )}
                <Button variant="secondary" href={LINKS.home}>
                  Back to home
                </Button>
              </div>
            </GlassPanel>
          </MotionReveal>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative min-h-[70vh] py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(236,105,26,0.08),transparent_65%)]"
      />

      <Container className="relative max-w-xl">
        <MotionReveal className="text-center">
          <Logo className="mx-auto items-center" />
          <p className="section-eyebrow mt-10">Structure · Free</p>
          <h1 className="section-heading mx-auto mt-4">
            {isPlayerMode
              ? "Join JuniorGolfOS as a player"
              : "Start your family on JuniorGolfOS"}
          </h1>
          <p className="section-subhead mx-auto mt-5">
            {isPlayerMode
              ? "Build your development profile, connect with your coach, and invite teammates. Upgrade only when you need more."
              : "Connect your coach, your player, and your development team. Upgrade to Intelligence or Optimization only when age, stage, and need require it."}
          </p>
          <p className="mt-5 text-sm text-text-low">
            {isPlayerMode ? (
              <>
                Parent setting up for a junior?{" "}
                <Link
                  href={familySignupHref(coachToken)}
                  className="focus-ring rounded text-emerald-400 hover:text-emerald-300"
                >
                  Use family signup
                </Link>
              </>
            ) : (
              <>
                Junior golfer signing up yourself?{" "}
                <Link
                  href={getPlayerSignupHref({ coach: coachToken })}
                  className="focus-ring rounded text-emerald-400 hover:text-emerald-300"
                >
                  I&apos;m a player
                </Link>
              </>
            )}
          </p>
        </MotionReveal>

        {(invitationLoading || playerReferralLoading || coachAffiliateLoading) && (
          <MotionReveal delay={0.04} className="mt-8 text-center">
            <p className="text-sm text-text-low">
              {playerReferralLoading
                ? "Verifying your teammate invite…"
                : coachAffiliateLoading
                  ? "Verifying your coach link…"
                : "Verifying your invitation…"}
            </p>
          </MotionReveal>
        )}

        {coachBanner && !invitationError && !playerReferralError && !coachAffiliateError && (
          <MotionReveal delay={0.04} className="mt-8">
            <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100">
              {coachBanner}
            </p>
          </MotionReveal>
        )}

        {invitation?.valid && invitation.personal_note && (
          <MotionReveal delay={0.05} className="mt-4">
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm italic text-text-mid">
              &ldquo;{invitation.personal_note}&rdquo;
            </p>
          </MotionReveal>
        )}

        {invitationError && (
          <MotionReveal delay={0.05} className="mt-8">
            <GlassPanel className="border-amber-500/20 bg-amber-500/5 p-5 text-center">
              <p className="text-sm text-amber-100">{invitationError}</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                href={LINKS.golfCoachOS}
              >
                Sign in instead
              </Button>
            </GlassPanel>
          </MotionReveal>
        )}

        {playerReferralError && (
          <MotionReveal delay={0.05} className="mt-8">
            <GlassPanel className="border-amber-500/20 bg-amber-500/5 p-5 text-center">
              <p className="text-sm text-amber-100">{playerReferralError}</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                href={getPlayerSignupHref({ coach: coachToken })}
              >
                Continue without teammate link
              </Button>
            </GlassPanel>
          </MotionReveal>
        )}

        {coachAffiliateError && (
          <MotionReveal delay={0.05} className="mt-8">
            <GlassPanel className="border-amber-500/20 bg-amber-500/5 p-5 text-center">
              <p className="text-sm text-amber-100">{coachAffiliateError}</p>
              <p className="mt-3 text-xs text-text-mid">
                In GolfCoachOS, open your affiliate link and copy the code after{" "}
                <code className="text-amber-50">coach=</code> in the URL. Paste
                that into Vercel as{" "}
                <code className="text-amber-50">NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN</code>
                , or share a link like{" "}
                <code className="text-amber-50">juniorgolfos.com/signup?coach=YOUR_CODE</code>.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                href={LINKS.golfCoachOS}
              >
                Open GolfCoachOS
              </Button>
            </GlassPanel>
          </MotionReveal>
        )}

        {signupMode === "none" &&
          !invitationLoading &&
          !playerReferralLoading &&
          !coachAffiliateLoading && (
          <MotionReveal delay={0.05} className="mt-8">
            <GlassPanel className="border-amber-500/20 bg-amber-500/5 p-5 text-center">
              <p className="text-sm text-amber-100">
                {isPlayerMode
                  ? "To create a player account, use your coach's signup link or a teammate invite."
                  : "To create an account, use the invitation link from your coach or their signup link (with "}
                {!isPlayerMode && (
                  <code className="text-amber-50">?coach=…</code>
                )}
                {!isPlayerMode && " in the URL)."}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                href={LINKS.home}
              >
                Back to home
              </Button>
            </GlassPanel>
          </MotionReveal>
        )}

        <MotionReveal delay={0.08} className="mt-12">
          <GlassPanel strong className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {isPlayerMode ? (
                <>
                  <FormField id="playerFullName" label="Your name">
                    <input
                      id="playerFullName"
                      name="playerFullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className={inputClassName}
                      value={playerForm.name}
                      onChange={updatePlayer("name")}
                      disabled={
                        !canSubmit ||
                        Boolean(playerReferralError && playerRefToken)
                      }
                    />
                  </FormField>

                  <div className="grid gap-5 sm:grid-cols-[1.4fr_0.6fr]">
                    <FormField id="playerEmail" label="Your email">
                      <input
                        id="playerEmail"
                        name="playerEmail"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        className={inputClassName}
                        value={playerForm.email}
                        onChange={updatePlayer("email")}
                        disabled={
                          !canSubmit ||
                          Boolean(playerReferralError && playerRefToken)
                        }
                      />
                    </FormField>

                    <FormField id="playerSelfAge" label="Your age">
                      <input
                        id="playerSelfAge"
                        name="playerSelfAge"
                        type="number"
                        required
                        min={13}
                        max={22}
                        inputMode="numeric"
                        placeholder="Age"
                        className={inputClassName}
                        value={playerForm.playerAge}
                        onChange={updatePlayer("playerAge")}
                        disabled={
                          !canSubmit ||
                          Boolean(playerReferralError && playerRefToken)
                        }
                      />
                    </FormField>
                  </div>
                </>
              ) : (
                <>
              <FormField id="familyName" label="Family name">
                <input
                  id="familyName"
                  name="familyName"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="e.g. The Mitchell Family"
                  className={inputClassName}
                  value={form.familyName}
                  onChange={update("familyName")}
                  disabled={!canSubmit || Boolean(invitationError)}
                />
              </FormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="parentName" label="Parent name">
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={inputClassName}
                    value={form.parentName}
                    onChange={update("parentName")}
                    disabled={!canSubmit || Boolean(invitationError)}
                  />
                </FormField>

                <FormField id="parentEmail" label="Parent email">
                  <input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@family.com"
                    className={inputClassName}
                    value={form.parentEmail}
                    onChange={update("parentEmail")}
                    disabled={!canSubmit || Boolean(invitationError)}
                  />
                </FormField>
              </div>

              <div className="grid gap-5 sm:grid-cols-[1.4fr_0.6fr]">
                <FormField id="playerName" label="Player name">
                  <input
                    id="playerName"
                    name="playerName"
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Junior golfer's name"
                    className={inputClassName}
                    value={form.playerName}
                    onChange={update("playerName")}
                    disabled={!canSubmit || Boolean(invitationError)}
                  />
                </FormField>

                <FormField id="playerAge" label="Player age">
                  <input
                    id="playerAge"
                    name="playerAge"
                    type="number"
                    required
                    min={5}
                    max={22}
                    inputMode="numeric"
                    placeholder="Age"
                    className={inputClassName}
                    value={form.playerAge}
                    onChange={update("playerAge")}
                    disabled={!canSubmit || Boolean(invitationError)}
                  />
                </FormField>
              </div>

              <FormField
                id="primaryGoal"
                label="Primary goal for your child"
                hint="Helps us personalize your family's starting view."
              >
                <div className="relative">
                  <select
                    id="primaryGoal"
                    name="primaryGoal"
                    required
                    className={selectClassName}
                    value={form.primaryGoal}
                    onChange={update("primaryGoal")}
                    disabled={!canSubmit || Boolean(invitationError)}
                  >
                    {PRIMARY_GOALS.map((opt) => (
                      <option
                        key={opt.value || "placeholder"}
                        value={opt.value}
                        disabled={opt.value === ""}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </FormField>
                </>
              )}

              {error && (
                <p
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <div className="border-t border-white/5 pt-6">
                <p className="mb-5 text-center text-xs leading-relaxed text-text-low">
                  Structure is free forever. Powered by GolfCoachOS.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={
                    submitting ||
                    !canSubmit ||
                    Boolean(invitationError) ||
                    Boolean(coachAffiliateError) ||
                    Boolean(playerReferralError && playerRefToken)
                  }
                >
                  {submitting
                    ? "Creating account…"
                    : isPlayerMode
                      ? "Create player account"
                      : "Start Free"}
                  {!submitting && <ArrowRight className="size-4" aria-hidden />}
                </Button>
              </div>
            </form>
          </GlassPanel>
        </MotionReveal>

        <MotionReveal delay={0.12} className="mt-10 text-center">
          <p className="text-sm text-text-low">
            Already have an account?{" "}
            <Link
              href={`${LINKS.golfCoachOS}/sign-in`}
              className="focus-ring rounded text-emerald-400 hover:text-emerald-300"
            >
              Sign in
            </Link>{" "}
            · Questions?{" "}
            <a
              href="mailto:hello@juniorgolfos.com"
              className="focus-ring rounded text-emerald-400 hover:text-emerald-300"
            >
              hello@juniorgolfos.com
            </a>
          </p>
        </MotionReveal>
      </Container>
    </div>
  );
}
