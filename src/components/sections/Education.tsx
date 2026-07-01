import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/resume";

export function Education() {
  return (
    <section id="education" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-[var(--border)]">
      <div className="max-w-4xl">
        <SectionHeading label="Background" title="Education" />

        <div className="flex flex-col gap-5">
          {education.map((edu, i) => (
            <div
              key={i}
              className="group relative bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <GraduationCap size={17} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text)] text-base">{edu.institution}</h3>
                    <p className="text-[var(--text)] text-sm mt-0.5 font-medium">{edu.degree}</p>

                    {"minors" in edu && edu.minors.length > 0 && (
                      <p className="text-xs text-[var(--muted)] mt-1">
                        Minor: {edu.minors.join(", ")}
                      </p>
                    )}
                    {"honors" in edu && edu.honors.length > 0 && (
                      <p className="text-xs text-[var(--muted)] mt-0.5">{edu.honors.join(" · ")}</p>
                    )}
                    {"core" in edu && (
                      <p className="text-xs text-[var(--muted)] mt-0.5">Core: {edu.core}</p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] justify-end mb-1">
                    <Calendar size={12} />
                    {edu.graduation}
                    {edu.current && (
                      <span className="ml-1 bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] justify-end mb-1">
                    <MapPin size={12} />
                    {edu.location}
                  </div>
                  <p className="text-xs font-semibold text-[var(--text)]">GPA: {edu.gpa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
