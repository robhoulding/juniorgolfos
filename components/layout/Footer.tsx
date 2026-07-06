import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { getSignupHref, LINKS } from "@/lib/links";

const footerLinks = {
  Product: [
    { label: "The Advantage", href: LINKS.problem },
    { label: "Coaching in Context", href: LINKS.coachingInContext },
    { label: "Every Day", href: LINKS.everyDay },
    { label: "Structure · Intelligence · Optimization", href: LINKS.pricing },
    { label: "FAQ", href: LINKS.faq },
  ],
  Ecosystem: [
    { label: "GolfCoachOS", href: LINKS.golfCoachOS, external: true },
    { label: "GolfAcademyOS", href: LINKS.golfAcademyOS, external: true },
    { label: "Join through your coach", href: LINKS.coaches },
    { label: "Community", href: LINKS.community, external: true },
  ],
  Company: [
    { label: "Contact", href: "mailto:hello@juniorgolfos.com" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-elevated/80 pt-16 pb-10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-mid">
              JuniorGolfOS connects your coach, practice, tournaments, goals,
              and entire support team into one development system — so no
              important part of your child&apos;s golf journey happens in
              isolation.
            </p>
            <div className="mt-6">
              <Button variant="primary" size="sm" href={getSignupHref()}>
                Start Free
              </Button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="section-eyebrow mb-4 text-text-low">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring rounded text-sm text-text-mid transition-colors hover:text-emerald-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="focus-ring rounded text-sm text-text-mid transition-colors hover:text-emerald-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-low">
            © {new Date().getFullYear()} JuniorGolfOS.com. All rights reserved.
          </p>
          <p className="text-xs text-text-low">
            Powered by{" "}
            <a
              href={LINKS.golfCoachOS}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded text-emerald-400/80 hover:text-emerald-300"
            >
              GolfCoachOS
            </a>
            {" · "}Player data belongs to your family
          </p>
        </div>
      </Container>
    </footer>
  );
}
