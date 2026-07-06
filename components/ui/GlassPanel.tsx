import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  highlight?: boolean;
  interactive?: boolean;
};

export function GlassPanel({
  children,
  className,
  strong = false,
  highlight = false,
  interactive = false,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        strong ? "glass-panel-strong" : "glass-panel",
        highlight && "card-highlight",
        interactive && "card-interactive",
        className,
      )}
    >
      {children}
    </div>
  );
}
