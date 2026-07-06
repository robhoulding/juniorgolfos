import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  size?: number;
};

/** GolfCoachOS-aligned mark — orange pathway + accent flag */
export function LogoMark({ className, size = 36 }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="jg-arc" x1="4" y1="30" x2="28" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b84f12" />
          <stop offset="0.55" stopColor="#ec691a" />
          <stop offset="1" stopColor="#f5a66b" />
        </linearGradient>
        <linearGradient id="jg-flag" x1="24" y1="7" x2="33" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec691a" />
          <stop offset="1" stopColor="#f5a66b" />
        </linearGradient>
        <filter id="jg-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M5 28.5 H31"
        stroke="#414141"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />

      <path
        d="M7 27.5 C11 27.5 14 24 17 19 C20 14 23.5 10 27.5 8.5"
        stroke="url(#jg-arc)"
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
        filter="url(#jg-glow)"
      />

      <circle cx="7" cy="27.5" r="2.25" fill="#191919" stroke="#ec691a" strokeWidth="1.25" />

      <path
        d="M27.5 8.5 V16.5"
        stroke="#f5a66b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M27.5 8.5 L33.5 10.25 L27.5 12 V8.5 Z"
        fill="url(#jg-flag)"
        stroke="#ec691a"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      <circle cx="33.5" cy="10.25" r="0.75" fill="#fde8d8" opacity="0.9" />
    </svg>
  );
}
