import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline underline-offset-4 text-sm font-medium",
        className
      )}
    >
      {children}
      <ExternalLinkIcon size={12} className="opacity-70" />
    </a>
  );
}
