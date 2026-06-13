'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  label: string
  radius: number
}

const NODES_DATA = [
  'Computational Neuroscience',
  'Bioinformatics',
  'Molecular Biology',
  'Biophysics',
  'Climate Analytics',
  'Scientific ML',
  'Scientific Software',
  'Cell Biology',
]

const EDGES = [
  [0, 1], [0, 5], [0, 3], [1, 2], [1, 5], [2, 3],
  [3, 6], [4, 5], [4, 6], [5, 6], [1, 7], [2, 7],
]

function useNetworkCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function init() {
      const W = canvas!.offsetWidth
      const H = canvas!.offsetHeight
      canvas!.width = W
      canvas!.height = H

      nodes = NODES_DATA.map((label, i) => {
        const angle = (i / NODES_DATA.length) * Math.PI * 2
        const r = Math.min(W, H) * 0.32
        return {
          x: W / 2 + r * Math.cos(angle) + (Math.random() - 0.5) * 30,
          y: H / 2 + r * Math.sin(angle) + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          label,
          radius: 3.5,
        }
      })
    }

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      if (!prefersReducedMotion) {
        nodes.forEach((n) => {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 40 || n.x > W - 40) n.vx *= -1
          if (n.y < 20 || n.y > H - 20) n.vy *= -1
        })
      }

      // Edges
      ctx.strokeStyle = 'rgba(75, 63, 138, 0.12)'
      ctx.lineWidth = 1
      EDGES.forEach(([a, b]) => {
        if (!nodes[a] || !nodes[b]) return
        ctx.beginPath()
        ctx.moveTo(nodes[a].x, nodes[a].y)
        ctx.lineTo(nodes[b].x, nodes[b].y)
        ctx.stroke()
      })

      // Nodes + labels
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(75, 63, 138, 0.55)'
        ctx.fill()

        ctx.font = '9px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(17, 17, 8, 0.4)'
        ctx.textAlign = 'center'
        ctx.fillText(n.label, n.x, n.y - 8)
      })

      animId = requestAnimationFrame(draw)
    }

    init()
    if (!prefersReducedMotion) draw()
    else draw()

    const ro = new ResizeObserver(() => {
      init()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [canvasRef])
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useNetworkCanvas(canvasRef)

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col"
      aria-label="Introduction"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 grid-line opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative flex-1 max-w-6xl mx-auto w-full px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: identity */}
        <div>
          <motion.p
            className="section-label mb-5"
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Research Portfolio
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-6xl text-[var(--color-ink)] mb-5 leading-[1.08]"
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Rupak
            <br />
            Ghosh
          </motion.h1>

          <motion.p
            className="text-base text-[var(--color-ink-2)] leading-relaxed max-w-sm mb-6"
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Cell and molecular biology researcher working across computational neuroscience,
            bioinformatics, biophysics, climate technology, and scientific software.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            {[
              'Seattle University',
              'B.S. Cell & Molecular Biology',
              'Honors Program',
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink-3)] border border-[var(--color-border)] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-3 mb-10"
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <a
              href="mailto:rupak.ghosh@seattleu.edu"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white text-xs font-mono tracking-widest uppercase rounded hover:bg-[var(--color-accent-light)] transition-colors focus-ring"
            >
              <Mail size={12} />
              Contact
            </a>
            <a
              href="/resume.pdf"
              className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border-strong)] text-[var(--color-ink-2)] text-xs font-mono tracking-widest uppercase rounded hover:border-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors focus-ring"
            >
              Résumé
            </a>
            <a
              href="https://github.com/rghosh12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors focus-ring"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/rupakghosh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors focus-ring"
            >
              <LinkedinIcon size={16} />
            </a>
          </motion.div>

          {/* Current work indicator */}
          <motion.div
            className="flex items-start gap-3 border-l-2 border-[var(--color-accent)] pl-4"
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-3)] mb-0.5">
                Currently
              </p>
              <p className="text-sm text-[var(--color-ink-2)]">
                Neural data analysis at UT Austin · ERW modeling at Equilibrium Earth ·
                Membrane-protein MD at Seattle University
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: network canvas */}
        <motion.div
          className="hidden md:block relative h-[420px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          aria-hidden="true"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ imageRendering: 'crisp-edges' }}
          />
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-3)]">
                Research domains
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <a
          href="#research"
          className="flex flex-col items-center gap-1.5 text-[var(--color-ink-3)] hover:text-[var(--color-ink-2)] transition-colors focus-ring"
          aria-label="Scroll to research section"
        >
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Explore</span>
          <ArrowDown size={13} className="animate-bounce" />
        </a>
      </motion.div>

      {/* Vertical trajectory line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-px w-px h-16 bg-gradient-to-b from-[var(--color-border)] to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
