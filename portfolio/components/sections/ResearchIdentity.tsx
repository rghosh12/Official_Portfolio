'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { domains } from '@/data/research'

export function ResearchIdentity() {
  const [active, setActive] = useState<string | null>(null)

  const activeDomain = domains.find((d) => d.id === active)

  return (
    <section
      id="research"
      className="max-w-6xl mx-auto px-6 py-24"
      aria-labelledby="research-heading"
    >
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <p className="section-label mb-3">Research Identity</p>
          <h2
            id="research-heading"
            className="font-display text-4xl text-[var(--color-ink)] leading-tight"
          >
            Interdisciplinary
            <br />
            by design
          </h2>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
            The common thread: quantitative methods applied to biological questions across
            scale — from molecular interactions to neural populations to ecosystem processes.
            Select a domain to explore the connections.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Domain grid */}
        <div
          className="grid sm:grid-cols-2 gap-3"
          role="list"
          aria-label="Research domains"
        >
          {domains.map((domain) => {
            const isActive = active === domain.id
            return (
              <motion.button
                key={domain.id}
                role="listitem"
                onClick={() => setActive(isActive ? null : domain.id)}
                className={`text-left p-4 rounded-lg border transition-all duration-200 focus-ring ${
                  isActive
                    ? 'border-transparent shadow-[var(--shadow-elevated)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                }`}
                style={isActive ? { backgroundColor: domain.bg, borderColor: domain.color + '40' } : {}}
                aria-expanded={isActive}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: domain.color }}
                    aria-hidden="true"
                  />
                  <h3
                    className="flex-1 font-display text-base leading-tight"
                    style={isActive ? { color: domain.color } : { color: 'var(--color-ink)' }}
                  >
                    {domain.label}
                  </h3>
                </div>
                <p className="text-xs text-[var(--color-ink-2)] leading-relaxed pl-4">
                  {domain.description}
                </p>

                {/* Connection indicators */}
                {isActive && domain.connections.length > 0 && (
                  <motion.div
                    className="mt-3 pl-4 flex flex-wrap gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {domain.connections.map((cid) => {
                      const connected = domains.find((d) => d.id === cid)
                      return connected ? (
                        <span
                          key={cid}
                          className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: connected.color + '20',
                            color: connected.color,
                          }}
                        >
                          → {connected.label}
                        </span>
                      ) : null
                    })}
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div className="sticky top-20">
          <AnimatePresence mode="wait">
            {activeDomain ? (
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.22 }}
                className="p-5 rounded-lg border border-[var(--color-border)]"
                style={{ backgroundColor: activeDomain.bg + 'aa' }}
                aria-live="polite"
                aria-label={`Details for ${activeDomain.label}`}
              >
                <div
                  className="w-8 h-0.5 mb-4"
                  style={{ backgroundColor: activeDomain.color }}
                  aria-hidden="true"
                />

                <h3
                  className="font-display text-xl mb-4"
                  style={{ color: activeDomain.color }}
                >
                  {activeDomain.label}
                </h3>

                <div className="space-y-4">
                  {activeDomain.questions.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-2">
                        Research Questions
                      </p>
                      <ul className="space-y-1.5">
                        {activeDomain.questions.map((q) => (
                          <li
                            key={q}
                            className="text-xs text-[var(--color-ink-2)] leading-relaxed flex gap-2"
                          >
                            <span
                              className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: activeDomain.color }}
                              aria-hidden="true"
                            />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeDomain.institutions.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1.5">
                        Institutions
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {activeDomain.institutions.map((inst) => (
                          <span
                            key={inst}
                            className="font-mono text-[9px] px-2 py-0.5 rounded border"
                            style={{
                              borderColor: activeDomain.color + '40',
                              color: activeDomain.color,
                            }}
                          >
                            {inst}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeDomain.methods.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1.5">
                        Methods & Tools
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {activeDomain.methods.map((m) => (
                          <span
                            key={m}
                            className="font-mono text-[9px] bg-white/60 text-[var(--color-ink-2)] px-2 py-0.5 rounded"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeDomain.projects.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1.5">
                        Related Projects
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {activeDomain.projects.map((pid) => (
                          <a
                            key={pid}
                            href={`#projects`}
                            className="font-mono text-[9px] underline underline-offset-2 focus-ring"
                            style={{ color: activeDomain.color }}
                          >
                            {pid.replace(/-/g, ' ')}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-lg border border-dashed border-[var(--color-border)] flex items-center justify-center h-48"
                aria-label="Select a domain to see details"
              >
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] text-center">
                  Select a domain
                  <br />
                  to explore connections
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
