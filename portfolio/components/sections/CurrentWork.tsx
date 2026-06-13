'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, AlertCircle } from 'lucide-react'
import { currentWork } from '@/data/currentWork'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Tag } from '@/components/ui/Tag'

export function CurrentWork() {
  return (
    <section
      id="current"
      className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-24"
      aria-labelledby="current-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div>
            <p className="section-label mb-3">Current Work</p>
            <h2
              id="current-heading"
              className="font-display text-4xl text-[var(--color-ink)] leading-tight"
            >
              Active &
              <br />
              in progress
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
              What I am actively working on right now. Each entry reflects current research
              questions, open problems, and next steps rather than polished outcomes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {currentWork.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-5 flex flex-col gap-4"
            >
              {/* Status + date */}
              <div className="flex items-center justify-between gap-2">
                <StatusBadge
                  status={item.status}
                  pulse={['Prototyping', 'Validating', 'Exploring'].includes(item.status)}
                />
                <span className="font-mono text-[10px] text-[var(--color-ink-3)]">
                  Updated {item.lastUpdated}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg text-[var(--color-ink)] leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-ink-2)] leading-relaxed">
                  {item.question}
                </p>
              </div>

              {/* Current milestone */}
              <div className="p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)] text-xs text-[var(--color-ink-2)] leading-relaxed">
                <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)] block mb-1">
                  Current Milestone
                </span>
                {item.milestone}
              </div>

              {/* Open problems */}
              {item.openProblems.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertCircle size={10} className="text-[var(--color-copper)]" aria-hidden="true" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)]">
                      Open Problems
                    </span>
                  </div>
                  <ul className="space-y-1" role="list">
                    {item.openProblems.map((p) => (
                      <li key={p} className="flex gap-2 text-[11px] text-[var(--color-ink-2)]">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-copper)] flex-shrink-0" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1">
                  {item.methods.slice(0, 3).map((m) => (
                    <Tag key={m} size="sm">{m}</Tag>
                  ))}
                </div>
                {item.repoOrDoc && (
                  <a
                    href={item.repoOrDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors focus-ring"
                  >
                    Repo
                    <ArrowUpRight size={10} aria-hidden="true" />
                  </a>
                )}
              </div>

              {/* Next step */}
              <div className="border-t border-[var(--color-border)] pt-3">
                <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)]">
                  Next →{' '}
                </span>
                <span className="text-[11px] text-[var(--color-ink-2)]">{item.nextStep}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
