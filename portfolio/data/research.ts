export interface ResearchDomain {
  id: string
  label: string
  description: string
  color: string
  bg: string
  projects: string[]
  methods: string[]
  institutions: string[]
  questions: string[]
  connections: string[]
}

export const domains: ResearchDomain[] = [
  {
    id: 'comp-neuro',
    label: 'Computational Neuroscience',
    description:
      'Quantitative modeling of neural computation, sensory processing, and circuit dynamics using electrophysiology data and biophysical simulation.',
    color: '#2D5A8E',
    bg: '#E6EEF6',
    projects: ['barn-owl-pipeline', 'neural-sim-platform', 'cancer-sim'],
    methods: ['Spike sorting', 'Cross-correlation analysis', 'Hodgkin-Huxley modeling', 'Python', 'NumPy', 'SciPy'],
    institutions: ['University of Texas at Austin', 'Seattle University'],
    questions: [
      'How do auditory brainstem populations encode spatial sound?',
      'What is the population code for ITD in the inferior colliculus?',
      'Can browser-based tools democratize neural simulation?',
    ],
    connections: ['bioinformatics', 'sci-ml', 'biophysics'],
  },
  {
    id: 'bioinformatics',
    label: 'Bioinformatics',
    description:
      'Computational analysis of biological sequence, structural, and omics data. Pipeline development for reproducible analysis of large-scale datasets.',
    color: '#4A6741',
    bg: '#E8EEE6',
    projects: ['barn-owl-pipeline', 'cancer-sim', 'dna-circuits'],
    methods: ['Python', 'R', 'Quarto', 'Biopython', 'Sequence alignment', 'Pipeline development'],
    institutions: ['Seattle University', 'Indian Institute of Science'],
    questions: [
      'How do mutation accumulation dynamics produce observed cancer age-incidence patterns?',
      'Can DNA computational circuits be designed from thermodynamic first principles?',
    ],
    connections: ['comp-neuro', 'mol-cell-bio', 'sci-ml'],
  },
  {
    id: 'mol-cell-bio',
    label: 'Molecular & Cellular Biology',
    description:
      'Experimental investigation of cellular mechanisms, gene expression, protein function, and molecular pathway dynamics.',
    color: '#8C4A3A',
    bg: '#F6EAE7',
    projects: ['dna-circuits', 'biophysics-modeling'],
    methods: ['PCR', 'Gel electrophoresis', 'Cell culture', 'Microscopy', 'Western blot', 'Aseptic technique'],
    institutions: ['Seattle University', 'Indian Institute of Science'],
    questions: [
      'What cellular mechanisms underlie the stress responses observed in bacterial populations?',
      'Can programmable DNA circuits implement diagnostic biosensing?',
    ],
    connections: ['biophysics', 'bioinformatics'],
  },
  {
    id: 'biophysics',
    label: 'Biophysics',
    description:
      'Quantitative characterization of biological systems using physical measurement and atomistic simulation — with emphasis on membrane-protein interactions.',
    color: '#6B4FA0',
    bg: '#EDE8F6',
    projects: ['biophysics-modeling'],
    methods: ['FPLC', 'HPLC', 'Materials Studio', 'GROMACS', 'MD simulation', 'Fluorescence spectroscopy', 'SPR'],
    institutions: ['Seattle University', 'Indian Institute of Science'],
    questions: [
      'What structural determinants govern peptide insertion depth into lipid bilayers?',
      'Can atomistic MD simulations reliably predict experimental binding affinities?',
    ],
    connections: ['mol-cell-bio', 'sci-ml', 'comp-neuro'],
  },
  {
    id: 'sci-ml',
    label: 'Scientific Machine Learning',
    description:
      'Application of machine learning to scientific data — including image classification, surrogate modeling, and physics-informed neural networks.',
    color: '#4B3F8A',
    bg: '#EBE8F6',
    projects: ['cancer-sim', 'urban-wildlife-geo', 'neural-sim-platform'],
    methods: ['Python', 'scikit-learn', 'PyTorch', 'Numba', 'ResNet', 'Surrogate modeling'],
    institutions: ['Seattle University', 'Equilibrium Earth'],
    questions: [
      'How can deep learning accelerate classification of camera trap wildlife images?',
      'Can surrogate ML models replace expensive geochemical simulations for ERW prediction?',
    ],
    connections: ['bioinformatics', 'comp-neuro', 'climate'],
  },
  {
    id: 'climate',
    label: 'Climate & Environmental Analytics',
    description:
      'Data-driven analysis of carbon removal pathways, geochemical processes, and ecosystem dynamics. Focus on enhanced rock weathering and geospatial monitoring.',
    color: '#3D7A5E',
    bg: '#E5F2EC',
    projects: ['erw-climate', 'urban-wildlife-geo'],
    methods: ['QGIS', 'GeoPandas', 'Rasterio', 'R', 'Geochemical modeling', 'Remote sensing', 'Spatial statistics'],
    institutions: ['Equilibrium Earth'],
    questions: [
      'What is the per-hectare CDR potential of ERW in Pacific Northwest agricultural soils?',
      'How do soil geochemistry and climate interact to determine weathering rates?',
    ],
    connections: ['sci-ml', 'bioinformatics'],
  },
  {
    id: 'sci-software',
    label: 'Scientific Software',
    description:
      'Engineering human-centered research tools and platforms — pipelines, simulation interfaces, data portals, and reproducible analysis environments.',
    color: '#8C5E3C',
    bg: '#F4EDE5',
    projects: ['neural-sim-platform', 'barn-owl-pipeline', 'transfer-platform'],
    methods: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Git', 'Quarto'],
    institutions: ['Seattle University', 'UT Austin'],
    questions: [
      'How should scientific simulation tools be designed for non-specialist users?',
      'What makes a research data pipeline reproducible rather than just automated?',
    ],
    connections: ['comp-neuro', 'climate', 'bioinformatics'],
  },
]
