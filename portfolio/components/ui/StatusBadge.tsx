'use client'

import { cn } from '@/lib/utils'
import type { WorkStatus } from '@/data/currentWork'

interface StatusBadgeProps {
  status: WorkStatus | 'Active' | 'Completed' | 'Paused' | 'Published'
  pulse?: boolean
  className?: string
}

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Exploring:  { color: 'text-[var(--color-accent)]',   bg: 'bg-[var(--color-accent-muted)]',  dot: 'bg-[var(--color-accent)]' },
  Prototyping:{ color: 'text-[var(--color-moss)]',     bg: 'bg-[var(--color-moss-muted)]',    dot: 'bg-[var(--color-moss)]' },
  Validating: { color: 'text-[var(--color-copper)]',   bg: 'bg-[var(--color-copper-muted)]',  dot: 'bg-[var(--color-copper)]' },
  Writing:    { color: 'text-[var(--color-research)]', bg: 'bg-[var(--color-research-muted)]',dot: 'bg-[var(--color-research)]' },
  Deployed:   { color: 'text-[var(--color-climate)]',  bg: 'bg-[var(--color-climate-muted)]', dot: 'bg-[var(--color-climate)]' },
  Paused:     { color: 'text-[var(--color-ink-3)]',    bg: 'bg-[var(--color-surface)]',       dot: 'bg-[var(--color-ink-3)]' },
  Completed:  { color: 'text-[var(--color-ink-2)]',    bg: 'bg-[var(--color-surface)]',       dot: 'bg-[var(--color-ink-2)]' },
  Active:     { color: 'text-[var(--color-climate)]',  bg: 'bg-[var(--color-climate-muted)]', dot: 'bg-[var(--color-climate)]' },
  Published:  { color: 'text-[var(--color-moss)]',     bg: 'bg-[var(--color-moss-muted)]',    dot: 'bg-[var(--color-moss)]' },
}

export function StatusBadge({ status, pulse = false, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig['Paused']

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase',
        config.bg,
        config.color,
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full flex-shrink-0',
          config.dot,
          pulse && 'animate-pulse-dot'
        )}
        aria-hidden="true"
      />
      {status}
    </span>
  )
}
