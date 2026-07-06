import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="section-eyebrow mb-3">{eyebrow}</p>}
      <Tag
        className={cn(
          "section-heading",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "section-subhead mt-4",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
