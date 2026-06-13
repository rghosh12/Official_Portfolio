'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Research', href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Current', href: '#current' },
  { label: 'Methods', href: '#methods' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors focus-ring"
        >
          RG
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-mono tracking-[0.1em] uppercase text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors focus-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume link */}
        <a
          href="/resume.pdf"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono tracking-[0.1em] uppercase border border-[var(--color-border-strong)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-2)] hover:text-[var(--color-ink)] px-3 py-1.5 rounded transition-all focus-ring"
        >
          Résumé
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-1.5 text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-ring"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[var(--color-bg)] border-b border-[var(--color-border)] px-6 pb-5"
          >
            <ul className="space-y-3 pt-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-sm font-mono tracking-[0.1em] uppercase text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors py-1 focus-ring"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center text-xs font-mono tracking-[0.1em] uppercase border border-[var(--color-border-strong)] text-[var(--color-ink-2)] px-3 py-1.5 rounded focus-ring"
                  onClick={() => setOpen(false)}
                >
                  Résumé
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
