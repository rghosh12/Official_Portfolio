import { Mail, FileDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

const collaborationAreas = [
  'Computational neuroscience — electrophysiology analysis, spike sorting, neural modeling',
  'Bioinformatics pipelines — reproducible analysis workflows, data processing',
  'Scientific software — research tools, simulation interfaces, data platforms',
  'Climate and geospatial analysis — ERW, habitat modeling, remote sensing',
  'Biophysics — molecular dynamics, protein characterization',
]

export function Contact() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto px-6 py-24"
      aria-labelledby="contact-heading"
    >
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="section-label mb-3">Contact</p>
          <h2
            id="contact-heading"
            className="font-display text-4xl text-[var(--color-ink)] leading-tight mb-5"
          >
            Get in
            <br />
            touch
          </h2>
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed mb-8 max-w-sm">
            I am available for research collaborations, graduate program discussions,
            and conversations about scientific software. Direct email is the most
            reliable way to reach me.
          </p>

          <div className="space-y-3">
            <a
              href="mailto:rupak.ghosh@seattleu.edu"
              className="flex items-center gap-3 group focus-ring rounded"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-muted)] flex items-center justify-center flex-shrink-0">
                <Mail size={15} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)]">Email</p>
                <p className="text-sm text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  rupak.ghosh@seattleu.edu
                </p>
              </div>
            </a>

            <a
              href="https://github.com/rghosh12"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group focus-ring rounded"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                <GithubIcon size={15} className="text-[var(--color-ink-2)]" />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)]">GitHub</p>
                <p className="text-sm text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  github.com/rghosh12
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/rupakghosh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group focus-ring rounded"
            >
              <div className="w-9 h-9 rounded-lg bg-[#E8F0F8] flex items-center justify-center flex-shrink-0">
                <LinkedinIcon size={15} className="text-[#0077B5]" />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)]">LinkedIn</p>
                <p className="text-sm text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  linkedin.com/in/rupakghosh
                </p>
              </div>
            </a>

            <a
              href="/resume.pdf"
              className="flex items-center gap-3 group focus-ring rounded"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--color-moss-muted)] flex items-center justify-center flex-shrink-0">
                <FileDown size={15} style={{ color: 'var(--color-moss)' }} aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--color-ink-3)]">Résumé</p>
                <p className="text-sm text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  Download PDF
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Collaboration areas */}
        <div>
          <div className="border border-[var(--color-border)] rounded-lg p-6">
            <div
              className="h-0.5 w-8 bg-[var(--color-accent)] mb-5"
              aria-hidden="true"
            />
            <h3 className="font-display text-xl text-[var(--color-ink)] mb-4">
              Areas of potential collaboration
            </h3>

            <ul className="space-y-2.5" role="list">
              {collaborationAreas.map((area) => (
                <li key={area} className="flex gap-3 text-sm text-[var(--color-ink-2)]">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0"
                    aria-hidden="true"
                  />
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-ink-3)] mb-1">
                Current availability
              </p>
              <p className="text-sm text-[var(--color-ink-2)]">
                Available for research conversations, graduate program discussions,
                and technical collaborations. Response time: 48–72 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
