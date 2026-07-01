import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium tracking-wide",
        variant === "default" && "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)]",
        variant === "accent" && "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
        variant === "muted" && "bg-[var(--surface-2)] text-[var(--muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
