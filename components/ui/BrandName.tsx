type BrandNameProps = {
  name: string;
  className?: string;
};

/** Renders product names with orange "OS" suffix — JuniorGolfOS, GolfCoachOS, etc. */
export function BrandName({ name, className }: BrandNameProps) {
  if (!name.endsWith("OS")) {
    return <span className={className}>{name}</span>;
  }

  return (
    <span className={className}>
      {name.slice(0, -2)}
      <span className="text-emerald-400">OS</span>
    </span>
  );
}
