import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/LogoMark";

type LogoProps = {
  className?: string;
  compact?: boolean;
  markOnly?: boolean;
};

export function Logo({ className, compact = false, markOnly = false }: LogoProps) {
  if (markOnly) {
    return (
      <Link
        href="/"
        className={cn("focus-ring inline-flex rounded-lg", className)}
        aria-label="JuniorGolfOS home"
      >
        <LogoMark size={compact ? 24 : 26} />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("focus-ring group inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label="JuniorGolfOS home"
    >
      <LogoMark size={compact ? 24 : 26} />

      <span className="flex flex-col gap-1">
        <span
          className={cn(
            "font-display text-[0.9375rem] font-semibold uppercase leading-none tracking-[0.04em] text-text-hi sm:text-base",
          )}
        >
          JuniorGolf
          <span className="text-emerald-400">OS</span>
        </span>

        {!compact && (
          <span className="inline-flex w-fit items-center rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-px text-[9px] font-medium uppercase tracking-[0.1em] text-text-low">
            Powered by GolfCoachOS
          </span>
        )}
      </span>
    </Link>
  );
}
