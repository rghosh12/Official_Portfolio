'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Calendar } from 'lucide-react'
import { experiences, type ExperienceCategory } from '@/data/experience'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Tag } from '@/components/ui/Tag'

const CATEGORIES: ExperienceCategory[] = [
  'Research', 'Engineering', 'Data Science', 'Laboratory', 'Climate', 'Campus', 'Leadership',
]

const categoryColors: Record<ExperienceCategory, string> = {
  Research:       'var(--color-research)',
  Engineering:    'var(--color-engineering)',
  'Data Science': 'var(--color-accent)',
  Laboratory:     'var(--color-lab)',
  Climate:        'var(--color-climate)',
  Campus:         'var(--color-ink-3)',
  Leadership:     'var(--color-leadership)',
}

const categoryBg: Record<ExperienceCategory, string> = {
  Research:       'var(--color-research-muted)',
  Engineering:    'var(--color-engineering-muted)',
  'Data Science': 'var(--color-accent-muted)',
  Laboratory:     'var(--color-lab-muted)',
  Climate:        'var(--color-climate-muted)',
  Campus:         'var(--color-surface)',
  Leadership:     'var(--color-leadership-muted)',
}

function ExperienceCard({ exp, isOpen, onToggle }: {
  exp: typeof experiences[0]
  isOpen: boolean
  onToggle: () => void
}) {
  const color = categoryColors[exp.category]
  const bg = categoryBg[exp.category]

  return (
    <motion.article
      layout
      className="border border-[var(--color-border)] rounded-lg overflow-hidden"
      style={isOpen ? { borderColor: color + '50', backgroundColor: bg + '80' } : {}}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4 focus-ring group"
        aria-expanded={isOpen}
      >
        {/* Category dot + line */}
        <div className="flex flex-col items-center mt-1 flex-shrink-0">
          <div
            className="w-2.5 h-2.5 rounded-full ring-2 ring-[var(--color-bg)]"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {exp.current && (
                  <StatusBadge status="Active" pulse />
                )}
                <span
                  className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: bg, color }}
                >
                  {exp.category}
                </span>
              </div>
              <h3 className="font-display text-base text-[var(--color-ink)] leading-tight">
                {exp.role}
              </h3>
            </div>
            <ChevronDown
              size={14}
              className={`flex-shrink-0 text-[var(--color-ink-3)] transition-transform duration-200 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </div>

          <p className="text-xs text-[var(--color-ink-2)] mb-2 font-medium">{exp.institution}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-ink-3)]">
              <Calendar size={9} aria-hidden="true" />
              {exp.start} — {exp.end === 'present' ? 'Present' : exp.end}
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-ink-3)]">
              <MapPin size={9} aria-hidden="true" />
              {exp.location}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-9 space-y-4">
              <div className="w-full h-px bg-[var(--color-border)]" aria-hidden="true" />

              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">{exp.summary}</p>

              {exp.outcomes.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-2">
                    Selected Outcomes
                  </p>
                  <ul className="space-y-1" role="list">
                    {exp.outcomes.map((o) => (
                      <li key={o} className="flex gap-2 text-xs text-[var(--color-ink-2)]">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-border-strong)] flex-shrink-0" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.methods.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-2">
                    Methods & Tools
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {exp.methods.map((m) => (
                      <Tag key={m} size="sm">{m}</Tag>
                    ))}
                  </div>
                </div>
              )}

              {exp.supervisor && (
                <p className="font-mono text-[10px] text-[var(--color-ink-3)]">
                  Supervisor: {exp.supervisor}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function Timeline() {
  const [activeCategories, setActiveCategories] = useState<Set<ExperienceCategory>>(new Set())
  const [openEntries, setOpenEntries] = useState<Set<string>>(new Set())

  const toggleCategory = (cat: ExperienceCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const toggleEntry = (id: string) => {
    setOpenEntries((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = activeCategories.size === 0
    ? experiences
    : experiences.filter((e) => activeCategories.has(e.category))

  return (
    <section
      id="experience"
      className="max-w-6xl mx-auto px-6 py-24"
      aria-labelledby="experience-heading"
    >
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <p className="section-label mb-3">Experience</p>
          <h2
            id="experience-heading"
            className="font-display text-4xl text-[var(--color-ink)] leading-tight"
          >
            Research &
            <br />
            professional record
          </h2>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
            A chronological record of research appointments, technical roles, laboratory work,
            and campus leadership. Select a category to filter.
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter by category"
      >
        {CATEGORIES.map((cat) => {
          const active = activeCategories.has(cat)
          const color = categoryColors[cat]
          const bg = categoryBg[cat]
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all duration-150 focus-ring"
              style={
                active
                  ? { backgroundColor: bg, color, borderColor: color + '60' }
                  : { borderColor: 'var(--color-border)', color: 'var(--color-ink-2)' }
              }
              aria-pressed={active}
            >
              {cat}
            </button>
          )
        })}
        {activeCategories.size > 0 && (
          <button
            onClick={() => setActiveCategories(new Set())}
            className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-ink-3)] hover:text-[var(--color-ink-2)] transition-colors focus-ring"
          >
            Clear ×
          </button>
        )}
      </div>

      {/* Timeline entries */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-px bg-[var(--color-border)]"
          aria-hidden="true"
        />

        <motion.div layout className="space-y-3 pl-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ExperienceCard
                  exp={exp}
                  isOpen={openEntries.has(exp.id)}
                  onToggle={() => toggleEntry(exp.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-sm text-[var(--color-ink-3)] font-mono py-8 text-center">
              No entries for selected filters.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
