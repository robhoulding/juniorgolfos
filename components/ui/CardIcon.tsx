import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CardIconProps = {
  icon: LucideIcon;
  variant?: "emerald" | "gold";
  className?: string;
};

export function CardIcon({ icon: Icon, variant = "emerald", className }: CardIconProps) {
  return (
    <div className={cn("icon-circle", variant === "gold" && "icon-circle--gold", className)}>
      <Icon strokeWidth={1.5} aria-hidden />
    </div>
  );
}
