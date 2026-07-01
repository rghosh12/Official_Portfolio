interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-2">
        {label}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3">{title}</h2>
      {description && (
        <p className="text-[var(--muted)] text-base max-w-2xl">{description}</p>
      )}
    </div>
  );
}
