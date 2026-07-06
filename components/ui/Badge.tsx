import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "emerald" | "gold" | "muted";
  className?: string;
};

export function Badge({
  children,
  variant = "emerald",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variant === "emerald" &&
          "border border-emerald-500/30 bg-emerald-950/60 text-emerald-300",
        variant === "gold" &&
          "border border-gold-500/30 bg-gold-500/10 text-gold-400",
        variant === "muted" &&
          "border border-white/10 bg-white/5 text-text-mid",
        className,
      )}
    >
      {children}
    </span>
  );
}
