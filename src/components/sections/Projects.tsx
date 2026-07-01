import { GitBranch, ExternalLink as ExtIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/ExternalLink";
import {
  researchProjects,
  personalProjects,
  miniProjects,
  hackathonProjects,
} from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-[var(--border)]">
      <div className="max-w-4xl">
        <SectionHeading
          label="Work"
          title="Projects"
          description="Research, personal, and hackathon builds."
        />

        {/* Research Projects */}
        <ProjectGroup title="Research Projects">
          {researchProjects.map((p) => (
            <ProjectCard key={p.id}>
              <ProjectCardHeader title={p.title} context={p.context} />
              <BulletList bullets={p.bullets} />
              <TagRow tags={p.tags} />
              {p.link && <ExternalLink href={p.link}>View Project</ExternalLink>}
            </ProjectCard>
          ))}
        </ProjectGroup>

        {/* Personal Projects */}
        <ProjectGroup title="Personal Projects">
          {personalProjects.map((p) => (
            <ProjectCard key={p.id}>
              <ProjectCardHeader title={p.title} context={p.context} />
              <BulletList bullets={p.bullets} />
              <TagRow tags={p.tags} />
              {p.link && <ExternalLink href={p.link}>{p.linkLabel ?? "View Project"}</ExternalLink>}
            </ProjectCard>
          ))}
        </ProjectGroup>

        {/* Hackathon Projects */}
        <ProjectGroup title="Hackathon Projects">
          {hackathonProjects.map((p) => (
            <ProjectCard key={p.id} highlight>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {p.award}
                </span>
                <span className="text-xs text-[var(--muted)]">— {p.event}</span>
              </div>
              <ProjectCardHeader title={p.title} />
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">{p.description}</p>
              {p.tagline && (
                <p className="text-sm italic text-[var(--muted)] mb-3 border-l-2 border-[var(--accent)] pl-3">
                  &ldquo;{p.tagline}&rdquo;
                </p>
              )}
              <TagRow tags={p.tags} />
              {p.link && (
                <ExternalLink href={p.link}>
                  {p.linkLabel === "GitHub" ? (
                    <><GitBranch size={13} /> {p.linkLabel}</>
                  ) : (
                    <><ExtIcon size={13} /> {p.linkLabel}</>
                  )}
                </ExternalLink>
              )}
            </ProjectCard>
          ))}
        </ProjectGroup>

        {/* Mini Projects */}
        <ProjectGroup title="Mini Projects">
          {miniProjects.map((p) => (
            <ProjectCard key={p.id}>
              <ProjectCardHeader title={p.title} context={p.context} />
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">{p.description}</p>
              {p.link && <ExternalLink href={p.link}>{p.linkLabel}</ExternalLink>}
            </ProjectCard>
          ))}
        </ProjectGroup>
      </div>
    </section>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ProjectGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] mb-4 flex items-center gap-2">
        <span className="w-4 h-px bg-[var(--border)]" />
        {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function ProjectCard({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-colors hover:border-[var(--accent)] ${
        highlight
          ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"
          : "bg-[var(--surface-2)] border-[var(--border)]"
      }`}
    >
      {children}
    </div>
  );
}

function ProjectCardHeader({
  title,
  context,
}: {
  title: string;
  context?: string;
}) {
  return (
    <div className="mb-3">
      <h4 className="font-semibold text-[var(--text)] text-base leading-snug">{title}</h4>
      {context && <p className="text-xs text-[var(--muted)] mt-0.5">{context}</p>}
    </div>
  );
}

function BulletList({ bullets }: { bullets: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 mb-3">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2 text-sm text-[var(--muted)] leading-relaxed">
          <span className="mt-2 w-1 h-1 rounded-full bg-[var(--muted)] shrink-0" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function TagRow({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}
