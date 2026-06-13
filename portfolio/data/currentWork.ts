export type WorkStatus =
  | 'Exploring'
  | 'Prototyping'
  | 'Validating'
  | 'Writing'
  | 'Deployed'
  | 'Paused'
  | 'Completed'

export interface CurrentWorkItem {
  id: string
  title: string
  status: WorkStatus
  lastUpdated: string
  question: string
  milestone: string
  openProblems: string[]
  methods: string[]
  nextStep: string
  repoOrDoc?: string
  relatedProject?: string
}

export const currentWork: CurrentWorkItem[] = [
  {
    id: 'barn-owl-pop-coding',
    title: 'Population Coding Analysis — Barn Owl IC',
    status: 'Prototyping',
    lastUpdated: 'Jun 2025',
    question:
      'Do inferior colliculus neuron populations encode ITD through rate coding, temporal coding, or a mixed strategy across frequency channels?',
    milestone: 'Implementing cross-correlation analysis across 40 sorted unit pairs from 3 recording sessions.',
    openProblems: [
      'Drift correction for extended recordings not yet implemented',
      'Unclear whether sorted units represent single units or multi-unit activity in lower SNR electrodes',
    ],
    methods: ['Python', 'MountainSort4', 'SciPy', 'Quarto', 'cross-correlation analysis'],
    nextStep: 'Compute signal and noise correlations across frequency-matched and -unmatched unit pairs.',
    repoOrDoc: 'https://github.com/rghosh12',
    relatedProject: 'barn-owl-pipeline',
  },
  {
    id: 'erw-validation',
    title: 'ERW Field Validation & MRV Data Products',
    status: 'Validating',
    lastUpdated: 'May 2025',
    question:
      'Do geochemical weathering rate models calibrated on laboratory kinetics accurately predict field-measured soil alkalinity changes after basalt application?',
    milestone: 'Comparing modeled vs. measured alkalinity across 6 field sites with 12-month basalt application history.',
    openProblems: [
      'Soil pH and moisture data collection has gaps for two sites',
      'Uncertainty propagation in multi-step geochemical model not yet fully characterized',
    ],
    methods: ['Python', 'R', 'geochemical modeling', 'spatial statistics', 'QGIS'],
    nextStep: 'Complete field data integration and produce site-level CDR estimate with confidence intervals.',
    relatedProject: 'erw-climate',
  },
  {
    id: 'md-enhanced-sampling',
    title: 'Enhanced Sampling MD for Membrane Peptides',
    status: 'Exploring',
    lastUpdated: 'Apr 2025',
    question:
      'Can replica exchange molecular dynamics (REMD) resolve slow membrane insertion conformational transitions missed by conventional 500 ns simulations?',
    milestone: 'Literature review of REMD protocols for lipid bilayer systems; evaluating GPU cluster access for production runs.',
    openProblems: [
      'Computational resource access for REMD scale is not confirmed',
      'Optimal replica temperature ladder for POPC systems not established',
    ],
    methods: ['GROMACS', 'REMD', 'Materials Studio', 'Python', 'bash scripting'],
    nextStep: 'Submit GPU cluster allocation request; run test REMD on peptide in water to validate protocol.',
    relatedProject: 'biophysics-modeling',
  },
  {
    id: 'portfolio-site',
    title: 'Research Portfolio Website',
    status: 'Deployed',
    lastUpdated: 'Jun 2025',
    question:
      'How do you build a research portfolio that communicates scientific depth without resorting to résumé formatting?',
    milestone: 'Initial deployment with all major sections complete.',
    openProblems: [
      'Case study pages need richer media and citations',
      'Current work section needs automated "last updated" from GitHub activity',
    ],
    methods: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    nextStep: 'Add MDX-based case study pages with full citations and methodology diagrams.',
    repoOrDoc: 'https://github.com/rghosh12/Official_Portfolio',
    relatedProject: 'transfer-platform',
  },
]
