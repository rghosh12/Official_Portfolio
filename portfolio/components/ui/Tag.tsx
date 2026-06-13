'use client'

import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'moss' | 'copper' | 'mono'
  size?: 'sm' | 'md'
  className?: string
}

export function Tag({ children, variant = 'default', size = 'sm', className }: TagProps) {
  const variants = {
    default: 'bg-[var(--color-surface)] text-[var(--color-ink-2)] border border-[var(--color-border)]',
    accent: 'bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-muted)]',
    moss: 'bg-[var(--color-moss-muted)] text-[var(--color-moss)] border border-[var(--color-moss-muted)]',
    copper: 'bg-[var(--color-copper-muted)] text-[var(--color-copper)] border border-[var(--color-copper-muted)]',
    mono: 'bg-transparent text-[var(--color-ink-3)] font-mono border-0',
  }

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono tracking-wide whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
