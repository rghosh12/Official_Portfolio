import { GraduationCap } from 'lucide-react'

export function Education() {
  return (
    <section
      id="education"
      className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-24"
      aria-labelledby="education-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="section-label mb-3">Education</p>
        <h2
          id="education-heading"
          className="font-display text-4xl text-[var(--color-ink)] leading-tight mb-12"
        >
          Academic
          <br />
          formation
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Seattle University */}
          <article className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-accent-muted)' }}
                aria-hidden="true"
              >
                <GraduationCap size={18} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--color-ink)]">Seattle University</h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-3)] mt-0.5">
                  Seattle, WA · 2021 — 2025
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-14">
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  B.S. Cell and Molecular Biology
                </p>
                <p className="text-xs text-[var(--color-ink-2)]">
                  Minor in Data Science &amp; Neuroscience
                </p>
              </div>

              <div>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1">
                  Distinctions
                </p>
                <ul className="space-y-0.5">
                  {[
                    'Honors Program',
                    'Dean\'s List',
                    'Undergraduate Research Scholar',
                  ].map((d) => (
                    <li key={d} className="flex gap-2 text-xs text-[var(--color-ink-2)]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1">
                  Research Themes
                </p>
                <div className="flex flex-wrap gap-1">
                  {[
                    'Computational neuroscience',
                    'Membrane biophysics',
                    'Molecular biology',
                    'Scientific software',
                    'Data science',
                  ].map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] px-2 py-0.5 bg-[var(--color-accent-muted)] text-[var(--color-accent)] rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1">
                  Selected Coursework
                </p>
                <p className="text-xs text-[var(--color-ink-2)] leading-relaxed">
                  Biochemistry · Molecular Biology · Biophysics · Cell Biology ·
                  Biostatistics · Scientific Computing · Organic Chemistry ·
                  Genetics · Ecology · Data Science
                </p>
              </div>
            </div>
          </article>

          {/* Navkis */}
          <article className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-moss-muted)' }}
                aria-hidden="true"
              >
                <GraduationCap size={18} style={{ color: 'var(--color-moss)' }} />
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--color-ink)]">Navkis Group of Institutions</h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-3)] mt-0.5">
                  India · Pre-university
                </p>
              </div>
            </div>

            <div className="pl-14 space-y-3">
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  Pre-University — Science Stream
                </p>
                <p className="text-xs text-[var(--color-ink-2)]">
                  Biology, Chemistry, Physics, Mathematics
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1">
                  Foundation
                </p>
                <p className="text-xs text-[var(--color-ink-2)] leading-relaxed">
                  Rigorous pre-university science training in biology, chemistry,
                  and mathematics, providing the disciplinary foundation for
                  undergraduate research in life sciences.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
