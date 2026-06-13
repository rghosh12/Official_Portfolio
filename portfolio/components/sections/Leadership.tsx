import { Users, BookOpen, MessageSquare, Lightbulb } from 'lucide-react'

const roles = [
  {
    icon: Users,
    title: 'Peer Academic Advocate',
    org: 'Seattle University Student Success Center',
    dates: '2022 — 2024',
    description:
      'Provided peer academic coaching to undergraduate students on study strategies, scientific writing, and course planning. Developed and led a workshop on reading primary scientific literature for first-year biology students. Mentored 25+ students per semester, with a focus on STEM retention.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-muted)',
  },
  {
    icon: BookOpen,
    title: 'Research & Instruction Library Assistant',
    org: 'Lemieux Library, Seattle University',
    dates: '2022 — Present',
    description:
      'Supports library research instruction and information literacy workshops. Assists with systematic review methodology, citation database navigation, and literature search strategy. Led 14+ drop-in research workshops annually and supported 200+ students.',
    color: 'var(--color-moss)',
    bg: 'var(--color-moss-muted)',
  },
  {
    icon: MessageSquare,
    title: 'Student Advisory Board Member',
    org: 'Seattle University Biology Department',
    dates: '2023 — 2024',
    description:
      'Participated in departmental curriculum review and student feedback processes. Represented undergraduate research student perspectives on course design, laboratory access, and mentorship programming.',
    color: 'var(--color-copper)',
    bg: 'var(--color-copper-muted)',
  },
  {
    icon: Lightbulb,
    title: 'Research Workshop Facilitator',
    org: 'Seattle University',
    dates: '2023 — Present',
    description:
      'Developed and delivered standalone workshops on scientific literature reading, citation management, and research methodology for undergraduate students across disciplines. Materials available through the university library.',
    color: 'var(--color-research)',
    bg: 'var(--color-research-muted)',
  },
]

export function Leadership() {
  return (
    <section
      id="leadership"
      className="max-w-6xl mx-auto px-6 py-24"
      aria-labelledby="leadership-heading"
    >
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <div>
          <p className="section-label mb-3">Leadership & Service</p>
          <h2
            id="leadership-heading"
            className="font-display text-4xl text-[var(--color-ink)] leading-tight"
          >
            Mentorship
            <br />
            &amp; institutional work
          </h2>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-md">
            Peer mentorship, advisory participation, and library instruction reflect a
            consistent commitment to supporting other students and contributing to
            departmental and campus community.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <article
              key={role.title}
              className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-bg)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div className="flex items-start gap-4 mb-3">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: role.bg }}
                  aria-hidden="true"
                >
                  <Icon size={14} style={{ color: role.color }} />
                </div>
                <div>
                  <h3 className="font-display text-base text-[var(--color-ink)] leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-xs text-[var(--color-ink-2)] mt-0.5">{role.org}</p>
                  <p className="font-mono text-[10px] text-[var(--color-ink-3)] mt-0.5">{role.dates}</p>
                </div>
              </div>
              <p className="text-xs text-[var(--color-ink-2)] leading-relaxed pl-12">
                {role.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
