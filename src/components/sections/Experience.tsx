import { MapPin, Users, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/data/resume";

const TYPE_COLORS: Record<string, string> = {
  Research: "accent",
  Technical: "accent",
  Academic: "default",
  Operations: "default",
  Leadership: "default",
};

export function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-[var(--border)]">
      <div className="max-w-4xl">
        <SectionHeading
          label="Work History"
          title="Experience"
          description="Research, technical, and leadership roles across four institutions in the US and India."
        />

        <div className="relative pl-4">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="flex flex-col gap-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Dot */}
                <div
                  className={`absolute -left-[17px] top-2 w-2.5 h-2.5 rounded-full border-2 ${
                    exp.current
                      ? "bg-emerald-500 border-emerald-300"
                      : "bg-[var(--surface)] border-[var(--border)]"
                  }`}
                />

                <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] transition-colors">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-[var(--text)] text-sm leading-snug">{exp.role}</h3>
                      <p className="text-[var(--accent)] text-sm font-medium mt-0.5">{exp.org}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-[var(--muted)]">{exp.period}</span>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <MapPin size={11} />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Tag variant={(TYPE_COLORS[exp.type] as "accent" | "default") ?? "default"}>
                          {exp.type}
                        </Tag>
                        {exp.current && (
                          <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-1.5">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[var(--muted)] leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--muted)] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* PI / Collaborators */}
                  {(exp.pi || exp.collaborators) && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-1.5">
                      {exp.pi && (
                        <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
                          <User size={12} className="shrink-0" />
                          <span className="font-medium text-[var(--text)]">PI:</span> {exp.pi}
                        </p>
                      )}
                      {exp.collaborators && (
                        <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
                          <Users size={12} className="shrink-0" />
                          <span className="font-medium text-[var(--text)]">Collaborators:</span>{" "}
                          {exp.collaborators}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
