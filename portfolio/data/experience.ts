export type ExperienceCategory =
  | 'Research'
  | 'Engineering'
  | 'Data Science'
  | 'Laboratory'
  | 'Climate'
  | 'Campus'
  | 'Leadership'

export interface Experience {
  id: string
  role: string
  institution: string
  location: string
  start: string
  end: string | 'present'
  current: boolean
  category: ExperienceCategory
  summary: string
  methods: string[]
  outcomes: string[]
  relatedProjects?: string[]
  supervisor?: string
}

export const experiences: Experience[] = [
  {
    id: 'utaustin-neuro',
    role: 'Undergraduate Research Affiliate',
    institution: 'University of Texas at Austin — Auditory Neuroscience Lab',
    location: 'Austin, TX (Remote)',
    start: 'Jan 2025',
    end: 'present',
    current: true,
    category: 'Research',
    summary:
      'Developing a neural data processing pipeline for barn owl auditory pathway recordings. Implementing spike sorting, cross-correlation analysis, and population coding models to characterize tonotopic organization in the inferior colliculus.',
    methods: ['Python', 'NumPy', 'SciPy', 'Matplotlib', 'Git', 'Jupyter', 'Signal processing', 'Spike sorting'],
    outcomes: [
      'Automated preprocessing pipeline reducing analyst time by ~60%',
      'Cross-correlation analysis of 40+ neural unit pairs',
      'Reproducible analysis notebooks using Quarto',
    ],
    relatedProjects: ['barn-owl-pipeline', 'neural-sim-platform'],
    supervisor: 'Dr. [Lab PI]',
  },
  {
    id: 'seattleu-biophysics',
    role: 'Research Assistant — Biophysics & Materials Modeling',
    institution: 'Seattle University — Department of Chemistry & Biochemistry',
    location: 'Seattle, WA',
    start: 'Sep 2023',
    end: 'present',
    current: true,
    category: 'Research',
    summary:
      'Computational and experimental research on protein stability, lipid bilayer interactions, and molecular dynamics. Uses Materials Studio for atomistic simulation and FPLC/HPLC for experimental protein purification and characterization.',
    methods: ['Materials Studio', 'FPLC', 'HPLC', 'GROMACS', 'Python', 'Molecular dynamics', 'SDS-PAGE', 'Gel filtration'],
    outcomes: [
      'Characterized binding energetics of membrane-associated peptides',
      'Developed in-house buffer preparation protocols for protein purification',
      'Contributed to two draft research manuscripts',
    ],
    relatedProjects: ['biophysics-modeling'],
    supervisor: 'Dr. [Faculty]',
  },
  {
    id: 'equilibrium-earth',
    role: 'Research & Data Analyst',
    institution: 'Equilibrium Earth',
    location: 'Seattle, WA',
    start: 'Jun 2024',
    end: 'present',
    current: true,
    category: 'Climate',
    summary:
      'Modeling enhanced rock weathering (ERW) pathways for carbon dioxide removal. Applies geochemical simulation, soil and mineralogical data analysis, and remote sensing to estimate CDR potential across target agricultural regions.',
    methods: ['Python', 'R', 'QGIS', 'pandas', 'GeoPandas', 'Rasterio', 'geochemical modeling', 'remote sensing'],
    outcomes: [
      'Built a geospatial ERW potential scoring system across Pacific Northwest farmland',
      'Automated monthly soil alkalinity monitoring pipeline',
      'Contributed to internal CDR methodology documentation',
    ],
    relatedProjects: ['erw-climate', 'urban-wildlife-geo'],
  },
  {
    id: 'iisc-molecular',
    role: 'Research Intern — Molecular Biophysics Unit',
    institution: 'Indian Institute of Science',
    location: 'Bengaluru, India',
    start: 'May 2024',
    end: 'Aug 2024',
    current: false,
    category: 'Research',
    summary:
      'Investigated DNA computational circuits and nucleic acid strand displacement reactions for programmable molecular logic. Designed and simulated Boolean logic gates using DNA hybridization thermodynamics.',
    methods: ['DNA nanotechnology', 'Python', 'NUPACK', 'strand displacement', 'gel electrophoresis', 'PCR', 'fluorescence imaging'],
    outcomes: [
      'Designed 3-input DNA AND/OR gate system with experimental validation',
      'Computational thermodynamic prediction pipeline for strand displacement networks',
      'Research summary presented internally',
    ],
    relatedProjects: ['dna-circuits'],
    supervisor: 'Dr. [MBU Faculty]',
  },
  {
    id: 'iisc-protein',
    role: 'Research Intern — Protein Chemistry & Biochemistry',
    institution: 'Indian Institute of Science',
    location: 'Bengaluru, India',
    start: 'May 2023',
    end: 'Aug 2023',
    current: false,
    category: 'Laboratory',
    summary:
      'Purified and characterized recombinant proteins using chromatographic methods. Worked on enzymatic activity assays and structural characterization of intrinsically disordered proteins.',
    methods: ['FPLC', 'HPLC', 'affinity chromatography', 'size exclusion', 'SDS-PAGE', 'Western blot', 'protein assays', 'buffer preparation'],
    outcomes: [
      'Successfully purified three recombinant protein constructs',
      'Characterized enzymatic kinetics using UV-Vis spectrophotometry',
      'Lab safety and sterile technique certification',
    ],
    relatedProjects: ['biophysics-modeling'],
  },
  {
    id: 'seattleu-microbio',
    role: 'Research Assistant — Microbiology & Cell Biology',
    institution: 'Seattle University — Biology Department',
    location: 'Seattle, WA',
    start: 'Jan 2023',
    end: 'May 2023',
    current: false,
    category: 'Laboratory',
    summary:
      'Undergraduate laboratory research examining microbial growth dynamics and cellular stress responses. Conducted aseptic culture technique, microscopy, and quantitative phenotypic analysis.',
    methods: ['Aseptic technique', 'light microscopy', 'PCR', 'gel electrophoresis', 'cell culture', 'spectrophotometry', 'R'],
    outcomes: [
      'Characterized growth curves for three bacterial strains under oxidative stress',
      'Contributed to departmental teaching lab protocol documentation',
    ],
    relatedProjects: [],
  },
  {
    id: 'urban-wildlife',
    role: 'Data Research Analyst — Urban Ecology',
    institution: 'Seattle Urban Wildlife Research Initiative',
    location: 'Seattle, WA',
    start: 'Sep 2023',
    end: 'Jun 2024',
    current: false,
    category: 'Data Science',
    summary:
      'Geospatial and statistical analysis of urban wildlife occurrence data across Seattle metropolitan corridors. Built data pipelines for camera trap image processing and habitat connectivity modeling.',
    methods: ['Python', 'QGIS', 'GeoPandas', 'pandas', 'matplotlib', 'scikit-learn', 'spatial statistics', 'habitat modeling'],
    outcomes: [
      'Processed and classified 12,000+ camera trap images',
      'Built wildlife corridor connectivity map for 6 target species',
      'Presented findings to city environmental advisory board',
    ],
    relatedProjects: ['urban-wildlife-geo'],
  },
  {
    id: 'seattleu-library',
    role: 'Research & Instruction Library Assistant',
    institution: 'Seattle University — Lemieux Library',
    location: 'Seattle, WA',
    start: 'Sep 2022',
    end: 'present',
    current: true,
    category: 'Campus',
    summary:
      'Supports library research instruction, resource navigation, and information literacy workshops for undergraduate students. Manages citation database access and assists with systematic review methodology.',
    methods: ['Research instruction', 'Zotero', 'PubMed', 'Web of Science', 'systematic review', 'information literacy'],
    outcomes: [
      'Led 14+ drop-in research workshops per academic year',
      'Supported 200+ students with literature search strategies',
    ],
    relatedProjects: [],
  },
  {
    id: 'peer-advocate',
    role: 'Peer Academic Advocate',
    institution: 'Seattle University — Student Success Center',
    location: 'Seattle, WA',
    start: 'Sep 2022',
    end: 'Jun 2024',
    current: false,
    category: 'Leadership',
    summary:
      'Provided peer academic coaching to undergraduate students on study strategies, scientific writing, and course planning. Mentored 25+ students per semester with a focus on STEM retention.',
    methods: ['Academic coaching', 'mentorship', 'scientific writing', 'program advising'],
    outcomes: [
      'Recognized by Student Success Center for exceptional mentor engagement',
      'Developed workshop on reading primary literature for first-year biology students',
    ],
    relatedProjects: [],
  },
  {
    id: 'fullstack-dev',
    role: 'Full-Stack Developer — Transfer Platform',
    institution: 'Independent / Freelance',
    location: 'Seattle, WA',
    start: 'Jan 2024',
    end: 'Aug 2024',
    current: false,
    category: 'Engineering',
    summary:
      'Designed and built a full-stack web platform for college transfer application management, supporting document tracking, deadline management, and institutional research comparison.',
    methods: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Supabase'],
    outcomes: [
      'Deployed production app with 100+ active users during pilot',
      'Built automated deadline notification system',
    ],
    relatedProjects: ['transfer-platform'],
  },
]
