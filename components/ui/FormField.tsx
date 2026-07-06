import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
};

export function FormField({ id, label, children, hint, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="text-ui-sm text-text-hi">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-text-low">
          {hint}
        </p>
      )}
    </div>
  );
}

export const inputClassName =
  "focus-ring w-full rounded-xl border border-white/10 bg-bg-elevated/80 px-4 py-3 text-base text-text-hi placeholder:text-text-low transition-colors hover:border-emerald-500/25 focus:border-emerald-400/50 focus:bg-bg-panel/80";

export const selectClassName =
  "focus-ring w-full appearance-none rounded-xl border border-white/10 bg-bg-elevated/80 px-4 py-3 text-base text-text-hi transition-colors hover:border-emerald-500/25 focus:border-emerald-400/50 focus:bg-bg-panel/80";
