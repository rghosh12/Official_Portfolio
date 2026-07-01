import { MapPin, Mail, Phone, Link2, GitBranch } from "lucide-react";
import { profile } from "@/data/resume";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[92vh] flex flex-col justify-center border-b border-[var(--border)] px-6 sm:px-12 lg:px-24 py-24"
    >
      <div className="max-w-4xl">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-[var(--muted)]">Open to research & internship opportunities</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] mb-4 leading-[1.05]">
          {profile.name}
        </h1>

        {/* Title */}
        <p className="text-lg sm:text-xl text-[var(--muted)] mb-6 font-medium max-w-2xl leading-relaxed">
          Cell & Molecular Biology · Data Science · Research Software
        </p>

        {/* Summary */}
        <p className="text-base text-[var(--muted)] max-w-2xl leading-relaxed mb-10">
          {profile.summary}
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap gap-4 mb-10 text-sm text-[var(--muted)]">
          <ContactItem icon={<MapPin size={14} />} label={profile.location} />
          <ContactItem icon={<Phone size={14} />} label={profile.phone} href={`tel:${profile.phone}`} />
          <ContactItem icon={<Mail size={14} />} label={profile.email} href={`mailto:${profile.email}`} />
        </div>

        {/* CTA links */}
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Link2 size={15} />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--border)] transition-colors"
          >
            <GitBranch size={15} />
            GitHub
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text)] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--surface-2)] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const inner = (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {label}
    </span>
  );
  if (href)
    return (
      <a href={href} className="hover:text-[var(--accent)] transition-colors">
        {inner}
      </a>
    );
  return <span>{inner}</span>;
}
