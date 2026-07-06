import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "btn-primary",
  secondary: "btn-glass",
  ghost: "text-text-mid hover:text-text-hi hover:bg-white/[0.04] border border-transparent",
  gold:
    "bg-gradient-to-r from-gold-500 to-gold-400 text-bg-base shadow-[0_4px_24px_rgba(201,162,39,0.25)] hover:shadow-[0_8px_32px_rgba(201,162,39,0.35)]",
} as const;

const sizes = {
  sm: "px-5 py-2.5 text-ui-sm rounded-2xl",
  md: "px-7 py-3.5 text-ui-sm rounded-2xl",
  lg: "px-9 py-4 text-ui rounded-2xl",
} as const;

type SharedProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = SharedProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

type ButtonAsButton = SharedProps & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2.5 font-body transition-all duration-500",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorProps } = rest;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
