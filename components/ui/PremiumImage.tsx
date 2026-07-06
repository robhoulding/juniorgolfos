"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PremiumImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  overlay?: "bottom" | "full" | "none";
  fit?: "cover" | "contain";
  sizes?: string;
};

function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("image-placeholder absolute inset-0", className)}
    />
  );
}

export function PremiumImage({
  src,
  alt,
  priority = false,
  className,
  overlay = "bottom",
  fit = "cover",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: PremiumImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-bg-panel", className)}>
      {failed ? (
        <ImagePlaceholder />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-center",
            fit === "contain" ? "object-contain" : "object-cover",
          )}
          onError={() => setFailed(true)}
        />
      )}
      {overlay === "bottom" && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,8,5,0.82)_0%,rgba(2,8,5,0.2)_48%,transparent_72%)]"
        />
      )}
      {overlay === "full" && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,8,5,0.7)_0%,rgba(2,8,5,0.3)_100%)]"
        />
      )}
    </div>
  );
}
