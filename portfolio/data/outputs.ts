export type OutputType =
  | 'Poster'
  | 'Research Summary'
  | 'Technical Report'
  | 'Essay'
  | 'Lab Manual'
  | 'Presentation'
  | 'Documentation'

export interface Output {
  id: string
  title: string
  type: OutputType
  year: string
  venue?: string
  description: string
  relatedProject?: string
  link?: string
}

export const outputs: Output[] = [
  {
    id: 'cancer-sim-poster',
    title: 'Stochastic Simulation of Multi-Hit Cancer Progression: Parameter Sensitivity Analysis',
    type: 'Poster',
    year: '2024',
    venue: 'Seattle University Undergraduate Research Symposium',
    description:
      'Presented stochastic simulation results for multi-hit carcinogenesis models. Highlighted parameter regimes where Armitage-Doll power law breaks down and discussed implications for cancer epidemiology.',
    relatedProject: 'cancer-sim',
  },
  {
    id: 'wildlife-report',
    title: 'Urban Wildlife Corridor Connectivity in the Seattle Metropolitan Area: A Geospatial Analysis',
    type: 'Research Summary',
    year: '2024',
    venue: 'Seattle Urban Wildlife Research Initiative — Internal Report',
    description:
      'Technical summary of habitat connectivity modeling methods and results. Includes least-cost path maps, species-specific connectivity scores, and policy recommendations for greenway prioritization.',
    relatedProject: 'urban-wildlife-geo',
  },
  {
    id: 'dna-circuit-report',
    title: 'Design and Experimental Validation of 3-Input DNA Boolean Logic Gates',
    type: 'Research Summary',
    year: '2024',
    venue: 'IISc Molecular Biophysics Unit — Internship Report',
    description:
      'Technical report documenting NUPACK-based design workflow, experimental validation protocol, and performance characterization of DNA strand displacement logic gates.',
    relatedProject: 'dna-circuits',
  },
  {
    id: 'erw-methodology',
    title: 'Enhanced Rock Weathering CDR Potential Assessment: Methods and Data Sources',
    type: 'Technical Report',
    year: '2025',
    venue: 'Equilibrium Earth — Internal Methodology Document',
    description:
      'Internal documentation of data sources (SSURGO, POLARIS, PRISM), geochemical weathering rate model implementation, and uncertainty quantification approach for CDR potential estimation.',
    relatedProject: 'erw-climate',
  },
  {
    id: 'barn-owl-quarto',
    title: 'Barn Owl IC Recording Pipeline: Analysis Notebook',
    type: 'Documentation',
    year: '2025',
    venue: 'UT Austin — Laboratory Documentation',
    description:
      'Quarto-rendered reproducible analysis notebook documenting the full preprocessing, spike sorting, and cross-correlation pipeline for barn owl inferior colliculus recordings.',
    relatedProject: 'barn-owl-pipeline',
  },
  {
    id: 'transfer-platform-docs',
    title: 'College Transfer Platform: Technical Architecture and User Research Summary',
    type: 'Documentation',
    year: '2024',
    venue: 'Project Documentation',
    description:
      'Technical documentation covering system architecture, database schema, API design, and user research findings from pilot deployment.',
    relatedProject: 'transfer-platform',
  },
  {
    id: 'neuro-sim-presentation',
    title: 'Building Accessible Neural Simulation Tools for Undergraduate Education',
    type: 'Presentation',
    year: '2024',
    venue: 'Seattle University STEM Faculty Seminar',
    description:
      'Presentation on the design rationale, technical architecture, and pedagogical outcomes of the browser-based neural pathway simulation platform.',
    relatedProject: 'neural-sim-platform',
  },
  {
    id: 'info-literacy-workshop',
    title: 'Reading Primary Scientific Literature: A Workshop for First-Year Biology Students',
    type: 'Lab Manual',
    year: '2023',
    venue: 'Seattle University — Peer Academic Advocate Program',
    description:
      'A guided workshop curriculum for undergraduate students learning to read, annotate, and critically evaluate primary research articles in the life sciences.',
    relatedProject: undefined,
  },
]
