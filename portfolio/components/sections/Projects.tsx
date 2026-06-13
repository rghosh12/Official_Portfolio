'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { projects, type ProjectDiscipline } from '@/data/projects'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Tag } from '@/components/ui/Tag'

const DISCIPLINES: ProjectDiscipline[] = [
  'Computational Neuroscience',
  'Bioinformatics',
  'Molecular Biology',
  'Biophysics',
  'Climate Technology',
  'Geospatial Analysis',
  'Full-Stack Engineering',
  'Scientific Machine Learning',
]

const disciplineColors: Record<ProjectDiscipline, { fg: string; bg: string }> = {
  'Computational Neuroscience': { fg: 'var(--color-research)', bg: 'var(--color-research-muted)' },
  'Bioinformatics':             { fg: 'var(--color-moss)', bg: 'var(--color-moss-muted)' },
  'Molecular Biology':          { fg: 'var(--color-lab)', bg: 'var(--color-lab-muted)' },
  'Biophysics':                 { fg: 'var(--color-engineering)', bg: 'var(--color-engineering-muted)' },
  'Climate Technology':         { fg: 'var(--color-climate)', bg: 'var(--color-climate-muted)' },
  'Geospatial Analysis':        { fg: 'var(--color-climate)', bg: 'var(--color-climate-muted)' },
  'Full-Stack Engineering':     { fg: 'var(--color-copper)', bg: 'var(--color-copper-muted)' },
  'Scientific Machine Learning':{ fg: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
}

function ProjectCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
  const colors = disciplineColors[project.discipline]

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-bg)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card)] transition-all duration-200 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      aria-label={`View details for ${project.name}`}
    >
      {/* Discipline bar */}
      <div
        className="h-0.5 w-12 mb-4 rounded-full"
        style={{ backgroundColor: colors.fg }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
          style={{ backgroundColor: colors.bg, color: colors.fg }}
        >
          {project.discipline}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-display text-lg text-[var(--color-ink)] leading-tight mb-2">
        {project.name}
      </h3>

      <p className="text-xs text-[var(--color-ink-2)] leading-relaxed mb-4">
        {project.tagline}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {project.tools.slice(0, 3).map((t) => (
            <Tag key={t} size="sm">{t}</Tag>
          ))}
          {project.tools.length > 3 && (
            <Tag size="sm" variant="mono">+{project.tools.length - 3}</Tag>
          )}
        </div>
        <div className="flex items-center gap-2 text-[var(--color-ink-3)]">
          <span className="font-mono text-[9px]">{project.year}</span>
          <span className="font-mono text-[9px]">{project.role}</span>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectDetail({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const colors = disciplineColors[project.discipline]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-end"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 h-screen w-full max-w-xl bg-[var(--color-bg)] border-l border-[var(--color-border)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`Project details: ${project.name}`}
      >
        {/* Close */}
        <div className="sticky top-0 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)] px-6 py-3 flex items-center justify-between z-10">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)]">
            Case Study
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors focus-ring"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                style={{ backgroundColor: colors.bg, color: colors.fg }}
              >
                {project.discipline}
              </span>
              <StatusBadge status={project.status} />
              <span className="font-mono text-[10px] text-[var(--color-ink-3)]">{project.year}</span>
            </div>
            <h2 className="font-display text-2xl text-[var(--color-ink)] mb-2">{project.name}</h2>
            <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">{project.tagline}</p>
          </div>

          <div
            className="h-px bg-[var(--color-border)]"
            style={{ background: `linear-gradient(to right, ${colors.fg}40, var(--color-border))` }}
            aria-hidden="true"
          />

          {/* Content sections */}
          {[
            { label: 'Context', content: project.context },
            { label: 'Research Question', content: project.question },
            { label: 'Why It Matters', content: project.why },
            { label: 'Methods', content: project.methods },
            ...(project.architecture ? [{ label: 'Architecture', content: project.architecture }] : []),
            { label: 'Results', content: project.results },
            { label: 'Limitations', content: project.limitations },
            { label: 'Future Work', content: project.future },
          ].map(({ label, content }) => (
            <div key={label}>
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-2">
                {label}
              </p>
              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">{content}</p>
            </div>
          ))}

          {/* Tools */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-2">
              Tools & Methods
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tools.map((t) => (
                <Tag key={t} size="sm">{t}</Tag>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wide border border-[var(--color-border-strong)] text-[var(--color-ink-2)] rounded hover:border-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors focus-ring"
                >
                  {link.label}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectDiscipline | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = filter ? projects.filter((p) => p.discipline === filter) : projects
  const selectedProject = projects.find((p) => p.id === selected)

  return (
    <section
      id="projects"
      className="max-w-6xl mx-auto px-6 py-24"
      aria-labelledby="projects-heading"
    >
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <p className="section-label mb-3">Projects</p>
          <h2
            id="projects-heading"
            className="font-display text-4xl text-[var(--color-ink)] leading-tight"
          >
            Selected
            <br />
            project archive
          </h2>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
            Research projects, scientific software, and data analysis work. Select any project
            to view context, methods, results, and limitations.
          </p>
        </div>
      </div>

      {/* Discipline filters */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter by discipline"
      >
        <button
          onClick={() => setFilter(null)}
          className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all duration-150 focus-ring ${
            filter === null
              ? 'bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)]'
              : 'border-[var(--color-border)] text-[var(--color-ink-2)]'
          }`}
          aria-pressed={filter === null}
        >
          All
        </button>
        {DISCIPLINES.map((d) => {
          const colors = disciplineColors[d]
          const active = filter === d
          return (
            <button
              key={d}
              onClick={() => setFilter(active ? null : d)}
              className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all duration-150 focus-ring"
              style={
                active
                  ? { backgroundColor: colors.bg, color: colors.fg, borderColor: colors.fg + '50' }
                  : { borderColor: 'var(--color-border)', color: 'var(--color-ink-2)' }
              }
              aria-pressed={active}
            >
              {d}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelected(project.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
