import { BadgeCheck, Heart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, volunteering } from "@/data/resume";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-[var(--border)]">
      <div className="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <SectionHeading label="Credentials" title="Certifications & Licenses" />
            <div className="flex flex-col gap-3">
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4"
                >
                  <BadgeCheck size={17} className="text-[var(--accent)] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{c.name}</p>
                    {c.issuer && <p className="text-xs text-[var(--muted)] mt-0.5">{c.issuer}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteering */}
          <div>
            <SectionHeading label="Community" title="Volunteering" />
            <div className="flex flex-col gap-3">
              {volunteering.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4"
                >
                  <Heart size={16} className="text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{v.role}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{v.org}</p>
                    {v.dept && <p className="text-xs text-[var(--muted)]">{v.dept}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
