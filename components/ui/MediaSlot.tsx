import { ImageIcon, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaSlotProps = {
  kind: "screenshot" | "video";
  label: string;
  hint?: string;
  className?: string;
  aspect?: "video" | "phone" | "wide";
};

const aspectClass = {
  video: "aspect-video",
  phone: "aspect-[9/16] max-h-[520px]",
  wide: "aspect-[16/10]",
} as const;

export function MediaSlot({
  kind,
  label,
  hint,
  className,
  aspect = "wide",
}: MediaSlotProps) {
  const Icon = kind === "video" ? Play : ImageIcon;

  return (
    <div
      className={cn(
        "media-slot relative flex flex-col items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-dashed border-white/10 bg-bg-panel/80",
        aspectClass[aspect],
        className,
      )}
      role="img"
      aria-label={`${kind} placeholder: ${label}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(13,122,86,0.12),transparent_65%)]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Icon className="size-5 text-emerald-400" aria-hidden />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400/90">
          {kind === "video" ? "Video" : "Screenshot"} · {label}
        </p>
        {hint && (
          <p className="max-w-xs text-sm leading-relaxed text-text-low">{hint}</p>
        )}
      </div>
    </div>
  );
}
