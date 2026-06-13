import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--color-border)] bg-[var(--color-bg)] mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-ink-3)]">
          Rupak Ghosh &mdash; {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rghosh12"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors focus-ring"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href="https://linkedin.com/in/rupakghosh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors focus-ring"
          >
            <LinkedinIcon size={15} />
          </a>
          <a
            href="mailto:rupak.ghosh@seattleu.edu"
            aria-label="Email"
            className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors focus-ring"
          >
            <Mail size={15} />
          </a>
        </div>
        <p className="font-mono text-[10px] tracking-wide text-[var(--color-ink-3)]">
          Seattle, WA
        </p>
      </div>
    </footer>
  )
}
