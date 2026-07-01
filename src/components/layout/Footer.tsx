import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 sm:px-12 lg:px-24 py-8">
      <div className="max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">{profile.name}</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            {profile.location} · {profile.email}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
