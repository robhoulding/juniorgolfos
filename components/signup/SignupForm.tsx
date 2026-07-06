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
import { LINKS } from "@/lib/links";
import {
  invitationReasonMessage,
  SignupApiError,
  submitFamilySignup,
  validateInvitation,
  type InvitationValidation,
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
  const inviteToken =
    searchParams.get("invite")?.trim() ||
    searchParams.get("token")?.trim() ||
    "";
  const coachToken = searchParams.get("coach")?.trim() || "";
  const affiliateToken = coachToken || DEFAULT_AFFILIATE_TOKEN;

  const [form, setForm] = useState<FormState>(initialForm);
  const [invitation, setInvitation] = useState<InvitationValidation | null>(
    null,
  );
  const [invitationLoading, setInvitationLoading] = useState(Boolean(inviteToken));
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signInUrl, setSignInUrl] = useState<string | null>(null);

  const signupMode = inviteToken
    ? "invitation"
    : affiliateToken
      ? "affiliate"
      : "none";

  const canSubmit = signupMode !== "none" && !invitationLoading;

  useEffect(() => {
    if (!inviteToken) {
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
  }, [inviteToken]);

  const invitationError = useMemo(() => {
    if (!inviteToken || invitationLoading) return null;
    if (!invitation || invitation.valid) return null;
    return invitationReasonMessage(invitation.reason);
  }, [inviteToken, invitation, invitationLoading]);

  const coachBanner = useMemo(() => {
    if (invitation?.valid) {
      return `You're joining ${invitation.coach.display_name}'s development program.`;
    }
    if (signupMode === "affiliate" && coachToken) {
      return "You're signing up through your coach's link.";
    }
    if (signupMode === "affiliate" && DEFAULT_AFFILIATE_TOKEN) {
      return "Start your free family workspace on JuniorGolfOS.";
    }
    return null;
  }, [invitation, signupMode, coachToken]);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError(null);
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
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
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(13,122,86,0.08),transparent_65%)]"
        />
        <Container className="relative max-w-lg">
          <MotionReveal>
            <GlassPanel strong className="p-8 text-center sm:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <CheckCircle2 className="size-8 text-emerald-400" aria-hidden />
              </div>
              <h1 className="section-heading mx-auto mt-8">
                Your family workspace is ready.
              </h1>
              <p className="section-subhead mx-auto mt-5">
                We&apos;ve sent a confirmation email with next steps. Sign in to
                open your player dashboard — Structure is free, no credit card
                required.
              </p>
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(13,122,86,0.08),transparent_65%)]"
      />

      <Container className="relative max-w-xl">
        <MotionReveal className="text-center">
          <Logo className="mx-auto items-center" />
          <p className="section-eyebrow mt-10">Structure · Free</p>
          <h1 className="section-heading mx-auto mt-4">
            Start your family on JuniorGolfOS
          </h1>
          <p className="section-subhead mx-auto mt-5">
            Connect your coach, your player, and your development team. Upgrade
            to Intelligence or Optimization only when age, stage, and need
            require it.
          </p>
        </MotionReveal>

        {invitationLoading && (
          <MotionReveal delay={0.04} className="mt-8 text-center">
            <p className="text-sm text-text-low">Verifying your invitation…</p>
          </MotionReveal>
        )}

        {coachBanner && !invitationError && (
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

        {signupMode === "none" && !invitationLoading && (
          <MotionReveal delay={0.05} className="mt-8">
            <GlassPanel className="border-amber-500/20 bg-amber-500/5 p-5 text-center">
              <p className="text-sm text-amber-100">
                To create an account, use the invitation link from your coach or
                their signup link (with{" "}
                <code className="text-amber-50">?coach=…</code> in the URL).
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
                  disabled={submitting || !canSubmit || Boolean(invitationError)}
                >
                  {submitting ? "Creating account…" : "Start Free"}
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
