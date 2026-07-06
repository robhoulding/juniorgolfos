import type { Metadata } from "next";
import { SignupForm } from "@/components/signup/SignupForm";

export const metadata: Metadata = {
  title: "Start Free — JuniorGolfOS",
  description:
    "Create your JuniorGolfOS family account. Structure is free forever — powered by GolfCoachOS Coaching in Context intelligence.",
  robots: { index: false },
};

export default function SignupPage() {
  return <SignupForm />;
}
