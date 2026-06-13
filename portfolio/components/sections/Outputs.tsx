'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Presentation, BookOpen, ClipboardList, FlaskConical } from 'lucide-react'
import { outputs, type OutputType } from '@/data/outputs'

const OUTPUT_TYPES: OutputType[] = [
  'Poster', 'Research Summary', 'Technical Report', 'Documentation', 'Presentation', 'Lab Manual', 'Essay',
]

const typeConfig: Record<OutputType, { icon: React.ElementType; color: string; bg: string }> = {
  'Poster':           { icon: Presentation, color: 'var(--color-accent)',   bg: 'var(--color-accent-muted)' },
  'Research Summary': { icon: BookOpen,     color: 'var(--color-research)', bg: 'var(--color-research-muted)' },
  'Technical Report': { icon: ClipboardList,color: 'var(--color-copper)',   bg: 'var(--color-copper-muted)' },
  'Essay':            { icon: FileText,     color: 'var(--color-moss)',     bg: 'var(--color-moss-muted)' },
  'Lab Manual':       { icon: FlaskConical, color: 'var(--color-lab)',      bg: 'var(--color-lab-muted)' },
  'Presentation':     { icon: Presentation, color: 'var(--color-engineering)', bg: 'var(--color-engineering-muted)' },
  'Documentation':    { icon: FileText,     color: 'var(--color-ink-2)',    bg: 'var(--color-surface)' },
}

export function Outputs() {
  const [filterType, setFilterType] = useState<OutputType | null>(null)
  const [filterYear, setFilterYear] = useState<string | null>(null)

  const years = [...new Set(outputs.map((o) => o.year))].sort((a, b) => b.localeCompare(a))

  const filtered = outputs.filter((o) => {
    if (filterType && o.type !== filterType) return false
    if (filterYear && o.year !== filterYear) return false
    return true
  })

  return (
    <section
      id="outputs"
      className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-24"
      aria-labelledby="outputs-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <p className="section-label mb-3">Writing & Research Outputs</p>
            <h2
              id="outputs-heading"
              className="font-display text-4xl text-[var(--color-ink)] leading-tight"
            >
              Posters, reports
              <br />
              &amp; documentation
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
              Research outputs including posters, technical reports, research summaries,
              and instructional materials. Filterable by output type and year.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            <button
              onClick={() => setFilterType(null)}
              className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all focus-ring ${
                filterType === null
                  ? 'bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)]'
                  : 'border-[var(--color-border)] text-[var(--color-ink-2)]'
              }`}
              aria-pressed={filterType === null}
            >
              All types
            </button>
            {OUTPUT_TYPES.filter((t) => outputs.some((o) => o.type === t)).map((type) => {
              const cfg = typeConfig[type]
              const active = filterType === type
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(active ? null : type)}
                  className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all focus-ring"
                  style={
                    active
                      ? { backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.color + '50' }
                      : { borderColor: 'var(--color-border)', color: 'var(--color-ink-2)' }
                  }
                  aria-pressed={active}
                >
                  {type}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by year">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setFilterYear(filterYear === year ? null : year)}
                className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all focus-ring ${
                  filterYear === year
                    ? 'bg-[var(--color-ink-2)] text-[var(--color-bg)] border-[var(--color-ink-2)]'
                    : 'border-[var(--color-border)] text-[var(--color-ink-3)]'
                }`}
                aria-pressed={filterYear === year}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Output list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((output) => {
              const cfg = typeConfig[output.type]
              const Icon = cfg.icon
              return (
                <motion.article
                  key={output.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-4 flex items-start gap-4 hover:border-[var(--color-border-strong)] transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: cfg.bg }}
                    aria-hidden="true"
                  >
                    <Icon size={13} style={{ color: cfg.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: cfg.bg, color: cfg.color }}
                          >
                            {output.type}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--color-ink-3)]">
                            {output.year}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium text-[var(--color-ink)] leading-snug mb-1">
                          {output.title}
                        </h3>
                        {output.venue && (
                          <p className="font-mono text-[10px] text-[var(--color-ink-3)] mb-1">
                            {output.venue}
                          </p>
                        )}
                        <p className="text-xs text-[var(--color-ink-2)] leading-relaxed">
                          {output.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-sm text-[var(--color-ink-3)] font-mono text-center py-8">
              No outputs match selected filters.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
