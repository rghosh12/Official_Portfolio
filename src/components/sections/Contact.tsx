import { Mail, Link2, GitBranch, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/resume";

export function Contact() {
  return (
    <section id="contact" className="px-6 sm:px-12 lg:px-24 py-20">
      <div className="max-w-4xl">
        <SectionHeading
          label="Get In Touch"
          title="Contact"
          description="Open to research collaborations, internships, and interesting conversations."
        />

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          <ContactCard
            icon={<Mail size={18} />}
            label="University Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactCard
            icon={<Mail size={18} />}
            label="Personal Email"
            value={profile.emailAlt}
            href={`mailto:${profile.emailAlt}`}
          />
          <ContactCard
            icon={<Phone size={18} />}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone}`}
          />
          <ContactCard
            icon={<Link2 size={18} />}
            label="LinkedIn"
            value="rupak-ghosh-339847239"
            href={profile.linkedin}
            external
          />
          <ContactCard
            icon={<GitBranch size={18} />}
            label="GitHub"
            value="rghosh12"
            href={profile.github}
            external
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--accent)] transition-colors group"
    >
      <span className="text-[var(--accent)] shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}
