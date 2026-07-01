import { MapPin, Mail, Phone, Link2, GitBranch } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/resume";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[92vh] flex flex-col justify-center border-b border-[var(--border)] px-6 sm:px-12 lg:px-24 py-24"
    >
      <div className="max-w-4xl w-full">
        {/* Top row: text left, photo right */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10 mb-10">

          {/* ── Left: text ── */}
          <div className="flex-1 min-w-0">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-[var(--muted)]">
                Open to research &amp; internship opportunities
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] mb-3 leading-[1.05]">
              {profile.name}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--muted)] mb-5 font-medium leading-relaxed">
              Cell &amp; Molecular Biology · Data Science · Research Software
            </p>

            <p className="text-base text-[var(--muted)] max-w-xl leading-relaxed mb-8">
              {profile.summary}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-[var(--muted)]">
              <ContactItem icon={<MapPin size={14} />} label={profile.location} />
              <ContactItem icon={<Phone size={14} />} label={profile.phone} href={`tel:${profile.phone}`} />
              <ContactItem icon={<Mail size={14} />} label={profile.email} href={`mailto:${profile.email}`} />
            </div>

            {/* CTAs */}
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

          {/* ── Right: profile photo ── */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700 blur-md opacity-25 scale-105" />

              {/* Photo frame */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-[var(--border)] shadow-2xl">
                <Image
                  src="/rupak-profile-new.jpg"
                  alt="Rupak Ghosh"
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover"
                  style={{ objectPosition: "50% 35%" }}
                />
              </div>

              {/* Name badge below photo */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1 shadow-sm">
                <p className="text-[11px] font-semibold text-[var(--text)] tracking-wide">Seattle University · 2027</p>
              </div>
            </div>
          </div>
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
