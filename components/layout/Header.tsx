"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSignupHref, LINKS } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { label: "The Advantage", href: LINKS.problem },
  { label: "Coaching in Context", href: LINKS.coachingInContext },
  { label: "Every Day", href: LINKS.everyDay },
  { label: "Pricing", href: LINKS.pricing },
  { label: "FAQ", href: LINKS.faq },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-panel-strong border-b border-white/[0.04] py-2.5" : "py-3.5",
      )}
    >
      <Container as="nav" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring rounded-md text-ui-sm text-text-mid transition-colors hover:text-emerald-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" href={LINKS.coaches}>
              Join through coach
            </Button>
            <Button variant="primary" size="sm" href={getSignupHref()}>
              Start Free
            </Button>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex size-10 items-center justify-center rounded-lg text-text-hi md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 top-[72px] z-40 md:hidden",
          mobileOpen ? "visible" : "invisible",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-bg-base/80 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "glass-panel-strong relative mx-4 mt-2 rounded-[1.5rem] p-6 transition-all duration-300",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0",
          )}
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring block rounded-lg px-3 py-3 text-ui text-text-hi hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
            <Button
              variant="secondary"
              size="md"
              href={LINKS.coaches}
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Join through coach
            </Button>
            <Button
              variant="primary"
              size="md"
              href={getSignupHref()}
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Start Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
