'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { methodCategories } from '@/data/methods'

export function Methods() {
  const [activeCategory, setActiveCategory] = useState<string>(methodCategories[0].id)

  const active = methodCategories.find((c) => c.id === activeCategory)!

  return (
    <section
      id="methods"
      className="max-w-6xl mx-auto px-6 py-24"
      aria-labelledby="methods-heading"
    >
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <div>
          <p className="section-label mb-3">Methods & Tools</p>
          <h2
            id="methods-heading"
            className="font-display text-4xl text-[var(--color-ink)] leading-tight"
          >
            A structured
            <br />
            methods index
          </h2>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
            Organized by domain rather than proficiency. Each method links to the projects
            and positions where it was applied.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        {/* Category sidebar */}
        <nav aria-label="Method categories">
          <ul className="space-y-0.5" role="list">
            {methodCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono tracking-wide transition-all duration-150 focus-ring ${
                    activeCategory === cat.id
                      ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-medium'
                      : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]'
                  }`}
                  aria-current={activeCategory === cat.id ? 'true' : undefined}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Items panel */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="border border-[var(--color-border)] rounded-lg p-6"
          aria-live="polite"
          aria-label={`Methods in ${active.label}`}
        >
          <h3 className="font-display text-xl text-[var(--color-ink)] mb-5">{active.label}</h3>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0">
            {active.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="group flex items-start gap-3 py-2.5 border-b border-[var(--color-border)] last:border-b-0"
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-ink)] leading-snug">{item.name}</p>
                  {(item.relatedProjects?.length || item.relatedExperience?.length) ? (
                    <div className="mt-0.5 flex flex-wrap gap-1">
                      {item.relatedProjects?.map((pid) => (
                        <a
                          key={pid}
                          href="#projects"
                          className="font-mono text-[9px] tracking-wide text-[var(--color-accent)] hover:underline focus-ring"
                        >
                          {pid.replace(/-/g, ' ')}
                        </a>
                      ))}
                      {item.relatedExperience?.map((eid) => (
                        <a
                          key={eid}
                          href="#experience"
                          className="font-mono text-[9px] tracking-wide text-[var(--color-moss)] hover:underline focus-ring"
                        >
                          {eid.replace(/-/g, ' ')}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
