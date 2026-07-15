"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export const TRANSLATE_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "Mandarin" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "sv", label: "Swedish" },
] as const;

type Props = {
  className?: string;
  align?: "left" | "right";
};

export function GoogleTranslateMenu({ className, align = "right" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleTranslate(code: string) {
    if (code === "en") {
      window.location.href = window.location.href.split("#")[0] ?? window.location.href;
      setOpen(false);
      return;
    }
    const url = `https://translate.google.com/translate?sl=auto&tl=${encodeURIComponent(code)}&u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        className="focus-ring inline-flex size-9 items-center justify-center rounded-lg text-emerald-400 transition-colors hover:bg-white/5 hover:text-emerald-300"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Translate page"
        onClick={() => setOpen((value) => !value)}
      >
        <Globe className="size-5" strokeWidth={1.75} aria-hidden />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Languages"
          className={cn(
            "absolute top-[calc(100%+10px)] z-[100] min-w-[11.5rem] overflow-hidden rounded-xl border border-white/12 bg-[#0F1A2E] py-1 shadow-[0_12px_32px_rgba(0,0,0,0.55)]",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {TRANSLATE_LANGUAGES.map((lang, index) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm text-white/90 transition-colors hover:bg-white/[0.06] hover:text-white",
                  index > 0 && "border-t border-white/[0.08]",
                )}
                onClick={() => handleTranslate(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
