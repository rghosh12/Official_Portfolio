export type ProjectStatus = 'Active' | 'Completed' | 'Paused' | 'Published'
export type ProjectDiscipline =
  | 'Computational Neuroscience'
  | 'Bioinformatics'
  | 'Molecular Biology'
  | 'Climate Technology'
  | 'Geospatial Analysis'
  | 'Full-Stack Engineering'
  | 'Scientific Machine Learning'
  | 'Biophysics'

export interface Project {
  id: string
  slug: string
  name: string
  tagline: string
  discipline: ProjectDiscipline
  year: string
  status: ProjectStatus
  role: string
  tools: string[]
  context: string
  question: string
  why: string
  methods: string
  architecture?: string
  results: string
  limitations: string
  future: string
  links: { label: string; url: string }[]
  relatedExperience?: string[]
}

export const projects: Project[] = [
  {
    id: 'barn-owl-pipeline',
    slug: 'barn-owl-neural-pipeline',
    name: 'Barn Owl Auditory Neural Pipeline',
    tagline: 'Automated spike sorting and population coding analysis for barn owl inferior colliculus recordings.',
    discipline: 'Computational Neuroscience',
    year: '2025',
    status: 'Active',
    role: 'Lead Developer',
    tools: ['Python', 'NumPy', 'SciPy', 'MountainSort4', 'Matplotlib', 'Quarto', 'Git'],
    context:
      'The barn owl is a canonical model organism for auditory localization neuroscience. Its inferior colliculus contains neurons precisely tuned to interaural time differences (ITDs), making it an ideal system for studying spatial sound coding. Raw electrophysiology recordings require robust preprocessing before any population-level analysis can be performed.',
    question:
      'Can an automated, reproducible pipeline reliably extract spike trains, compute pairwise cross-correlations, and characterize tonotopic tuning properties from multi-electrode inferior colliculus recordings?',
    why:
      'Manual spike sorting is time-intensive and introduces analyst-specific variability. A reproducible automated pipeline reduces preprocessing time and enables systematic comparison across recording sessions and animals.',
    methods:
      'Raw LFP and spike data are bandpass filtered, then passed through MountainSort4 for automated spike sorting. Units are quality-controlled using isolation distance and L-ratio metrics. Cross-correlation histograms are computed for all unit pairs to assess temporal synchrony. Tuning curves are fit using Gaussian models.',
    architecture:
      'Python pipeline with modular processing stages: (1) raw data ingestion from .mat and .nev formats, (2) filtering and artifact rejection, (3) spike detection and sorting, (4) unit quality metrics, (5) pairwise analysis, (6) Quarto-rendered reproducible reports.',
    results:
      'Pipeline processes a 2-hour recording session in under 15 minutes. Cross-correlation analysis of 40+ unit pairs revealed significant temporal synchrony within frequency-matched columns. Tonotopic maps reproduced expected dorsal-to-ventral low-to-high frequency gradients.',
    limitations:
      'Spike sorting quality depends on electrode geometry and signal-to-noise. Current pipeline does not implement drift correction for long recordings. Population decoding analysis is not yet implemented.',
    future:
      'Add drift correction, implement population vector decoding of ITD, integrate with NWB (Neurodata Without Borders) format for data sharing.',
    links: [{ label: 'GitHub', url: 'https://github.com/rghosh12' }],
    relatedExperience: ['utaustin-neuro'],
  },
  {
    id: 'neural-sim-platform',
    slug: 'neural-simulation-platform',
    name: 'Neural Pathway Simulation Platform',
    tagline: 'Interactive browser-based platform for visualizing and simulating auditory and visual neural pathway models.',
    discipline: 'Computational Neuroscience',
    year: '2024',
    status: 'Active',
    role: 'Lead Developer',
    tools: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Numba', 'WebGL', 'Canvas API'],
    context:
      'Neuroscience education and exploratory modeling often require running parametric simulations of neural circuit dynamics. Most simulation software is desktop-only, computationally opaque, or not accessible to non-specialists.',
    question:
      'Can a web-based platform provide meaningful, scientifically accurate simulations of neural pathway dynamics that remain accessible to both researchers and students?',
    why:
      'Accessible simulation platforms lower the barrier to computational neuroscience for students and enable rapid hypothesis exploration without local software installation.',
    methods:
      'Hodgkin-Huxley conductance-based neuron models are implemented in Python using Numba for JIT compilation, served via a FastAPI backend. The frontend renders real-time simulation results using Canvas API with parameter controls.',
    architecture:
      'Monorepo with Next.js 14 App Router frontend and FastAPI Python backend. Simulation jobs are dispatched asynchronously. Results streamed back via server-sent events. Deployed on Vercel (frontend) and Fly.io (backend).',
    results:
      'Platform supports Hodgkin-Huxley, integrate-and-fire, and Wilson-Cowan population models. Used in Seattle University computational biology seminar as a teaching tool.',
    limitations:
      'Server-side computation limits concurrent simulation capacity. Large network simulations (>500 neurons) are not yet supported in the browser context.',
    future:
      'Add BRIAN2 integration, implement local WebAssembly simulation for small networks, add reproducible simulation export.',
    links: [{ label: 'GitHub', url: 'https://github.com/rghosh12' }],
    relatedExperience: ['utaustin-neuro'],
  },
  {
    id: 'cancer-sim',
    slug: 'multi-hit-cancer-progression',
    name: 'Multi-Hit Cancer Progression Simulation',
    tagline: 'Stochastic simulation of somatic mutation accumulation and clonal expansion dynamics under the multi-hit hypothesis.',
    discipline: 'Scientific Machine Learning',
    year: '2024',
    status: 'Completed',
    role: 'Developer',
    tools: ['Python', 'NumPy', 'SciPy', 'joblib', 'Matplotlib', 'Numba'],
    context:
      'The Knudson two-hit hypothesis and its generalizations describe how cancer requires the accumulation of multiple driver mutations. Computational simulation of this process across large synthetic populations allows quantitative testing of epidemiological predictions.',
    question:
      'How do mutation rate, clonal expansion coefficient, and required hit number jointly determine cancer onset age distributions in simulated cell populations?',
    why:
      'Analytical solutions exist only for simplified models. Simulation allows exploration of parameter space, including non-Poisson mutation dynamics and cell-type-specific proliferation rates.',
    methods:
      'Agent-based stochastic simulation of N=10,000 synthetic individuals. Each individual carries a cell population subject to per-division mutation probabilities. Clonal expansion occurs following the k-th driver mutation. Parallel runs via joblib. Results validated against Armitage-Doll power law predictions.',
    results:
      'Reproduced age-incidence power law for k=4–6 hits. Identified mutation rate thresholds above which the power law breaks down. Clonal expansion coefficient had stronger effect on onset age than mutation rate in most parameter regimes.',
    limitations:
      'Model assumes uniform cell division rates and ignores tissue architecture, immune surveillance, and epigenetic silencing.',
    future:
      'Add spatial tissue structure, incorporate known driver gene mutation frequencies from TCGA data.',
    links: [{ label: 'GitHub', url: 'https://github.com/rghosh12' }],
    relatedExperience: [],
  },
  {
    id: 'urban-wildlife-geo',
    slug: 'urban-wildlife-geospatial',
    name: 'Urban Wildlife Corridor Analysis',
    tagline: 'Habitat connectivity modeling and camera-trap image analysis for urban wildlife in the Seattle metropolitan area.',
    discipline: 'Geospatial Analysis',
    year: '2024',
    status: 'Completed',
    role: 'Data Analyst',
    tools: ['Python', 'QGIS', 'GeoPandas', 'Rasterio', 'scikit-learn', 'pandas', 'Matplotlib'],
    context:
      'Urban development fragments natural habitat and disrupts wildlife movement. Camera trap networks generate large image datasets that require automated classification and spatial integration to be analytically useful.',
    question:
      'Which urban greenway corridors provide the highest functional connectivity for medium-large mammal species in the Seattle metropolitan area?',
    why:
      'Quantitative connectivity analysis can directly inform municipal land use policy and conservation easement prioritization.',
    methods:
      'Camera trap images classified using a fine-tuned ResNet-50 model. Species detections georeferenced and integrated with landcover, NDVI, and road network data. Least-cost path analysis performed in QGIS using multi-criteria cost surface derived from habitat suitability scores.',
    results:
      'Identified 4 high-priority corridor segments across 6 target species. Connectivity scores inversely correlated with road density (r = -0.71). Results presented to Seattle Parks & Recreation advisory board.',
    limitations:
      'Camera trap placement was opportunistic rather than systematic; spatial sampling bias limits inference. Classifier accuracy was 84% (top-1) on held-out validation set.',
    future:
      'Integrate acoustic monitoring data, apply occupancy modeling to camera trap detections, expand to King County.',
    links: [{ label: 'GitHub', url: 'https://github.com/rghosh12' }],
    relatedExperience: ['urban-wildlife', 'equilibrium-earth'],
  },
  {
    id: 'dna-circuits',
    slug: 'dna-computational-circuits',
    name: 'DNA Computational Logic Circuits',
    tagline: 'Design and experimental validation of Boolean logic gates implemented using DNA strand displacement reactions.',
    discipline: 'Molecular Biology',
    year: '2024',
    status: 'Completed',
    role: 'Research Contributor',
    tools: ['NUPACK', 'Python', 'gel electrophoresis', 'fluorescence imaging', 'PCR', 'UV-Vis spectroscopy'],
    context:
      'DNA strand displacement (DSD) cascades can implement arbitrary Boolean logic at the molecular scale. Designing reliable, orthogonal gates requires careful thermodynamic tuning to avoid spurious leak reactions and ensure kinetic discrimination.',
    question:
      'Can a 3-input Boolean AND/OR gate network be designed with sufficient thermodynamic margin to operate reliably in a single-pot reaction with minimal cross-talk?',
    why:
      'Molecular logic circuits have potential applications in biosensing, diagnostic devices, and programmable drug delivery systems.',
    methods:
      'Gate sequences designed using NUPACK thermodynamic analysis. Secondary structure and binding energies optimized computationally. Gates experimentally validated using fluorescence reporter strands measured by plate reader and gel electrophoresis.',
    results:
      'Three-input AND gate with signal-to-background ratio of 12:1 and OR gate with 9:1 in single-pot format. Computational design successfully predicted experimental behavior for 7/8 sequence sets.',
    limitations:
      'System operates only at fixed temperature and pH. No demonstrated cascading beyond two logic levels.',
    future:
      'Implement toehold-mediated strand displacement for improved kinetics, cascade into 3-layer circuit.',
    links: [],
    relatedExperience: ['iisc-molecular'],
  },
  {
    id: 'erw-climate',
    slug: 'enhanced-rock-weathering-cdr',
    name: 'Enhanced Rock Weathering CDR Modeling',
    tagline: 'Geochemical and remote sensing analysis to estimate carbon dioxide removal potential of enhanced rock weathering across Pacific Northwest farmland.',
    discipline: 'Climate Technology',
    year: '2024–2025',
    status: 'Active',
    role: 'Research & Data Analyst',
    tools: ['Python', 'R', 'QGIS', 'GeoPandas', 'Rasterio', 'pandas', 'geochemical modeling'],
    context:
      'Enhanced rock weathering (ERW) involves spreading crushed silicate rock on agricultural land to accelerate natural weathering processes that consume CO₂. Quantifying CDR potential requires integration of soil geochemistry, mineralogy, climate, and crop data across large spatial extents.',
    question:
      'How does variability in soil pH, clay content, precipitation, and basalt composition combine to determine per-hectare CDR potential for ERW interventions across Pacific Northwest farmland?',
    why:
      'Accurate, spatially resolved CDR potential estimates are essential for project validation, carbon credit certification, and prioritizing basalt application sites.',
    methods:
      'Soil data from SSURGO and POLARIS soil databases integrated with PRISM climate data and mineralogy estimates. Geochemical weathering rate models (Maher & Chamberlain kinetic approach) applied at pixel scale. Outputs include CDR potential maps and uncertainty estimates.',
    results:
      'Produced county-level CDR potential estimates for Oregon and Washington. Identified soil pH and clay content as primary drivers of variance. Internal methodology document completed.',
    limitations:
      'Weathering rate models not yet validated against field lysimeter data. Uncertainty propagation is approximate.',
    future:
      'Integrate field alkalinity measurements for model validation, produce MRV-ready data products.',
    links: [],
    relatedExperience: ['equilibrium-earth'],
  },
  {
    id: 'transfer-platform',
    slug: 'college-transfer-platform',
    name: 'College Transfer Application Platform',
    tagline: 'Full-stack web application supporting college transfer students through document tracking, deadline management, and institutional research.',
    discipline: 'Full-Stack Engineering',
    year: '2024',
    status: 'Completed',
    role: 'Lead Developer',
    tools: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Supabase', 'Vercel'],
    context:
      'Transfer students face a fragmented, high-stakes application process with sparse institutional support. Existing tools are generic and do not address transfer-specific workflows such as articulation agreement tracking and waitlist management.',
    question:
      'Can a purpose-built platform meaningfully reduce the organizational burden of the college transfer process for first-generation and community college transfer students?',
    why:
      'Transfer students are a high-attrition population in higher education. Reducing process friction has documented effects on enrollment completion.',
    methods:
      'User research with 15 transfer students to identify pain points. Iterative design with Figma wireframes. Full-stack implementation with Next.js App Router, Supabase for auth and database, FastAPI for server-side processing logic.',
    architecture:
      'Next.js 14 App Router with server components for static content. Supabase for auth, row-level security, and PostgreSQL. FastAPI microservice for deadline calculations and articulation logic. Deployed on Vercel.',
    results:
      '100+ active users during pilot semester. Average session time 14 minutes. Reduced missed deadlines by self-report among pilot cohort. Received university innovation award.',
    limitations:
      'Articulation agreement data requires manual updates. Not yet integrated with institutional SIS systems.',
    future:
      'API integration with Common App, automated articulation lookup via web scraping, mobile app.',
    links: [{ label: 'GitHub', url: 'https://github.com/rghosh12' }],
    relatedExperience: ['fullstack-dev'],
  },
  {
    id: 'biophysics-modeling',
    slug: 'membrane-protein-biophysics',
    name: 'Membrane Protein Molecular Dynamics',
    tagline: 'Atomistic simulation and experimental validation of lipid bilayer interactions with membrane-associated peptides.',
    discipline: 'Biophysics',
    year: '2023–2025',
    status: 'Active',
    role: 'Research Assistant',
    tools: ['Materials Studio', 'GROMACS', 'Python', 'FPLC', 'HPLC', 'SDS-PAGE', 'UV-Vis spectroscopy'],
    context:
      'Membrane-associated peptides and peripheral membrane proteins interact dynamically with lipid bilayers. Understanding the energetic basis of these interactions requires both computational prediction and experimental measurement.',
    question:
      'What structural features of target peptides determine insertion depth and binding affinity to POPC/POPE mixed bilayers, and do atomistic simulations reliably predict experimentally measured binding parameters?',
    why:
      'Membrane interactions determine cellular localization, signaling, and pharmacological activity of many peptides. Validated computational workflows reduce experimental screening costs.',
    methods:
      'Atomistic MD simulations built in Materials Studio with COMPASS III force field. Purified recombinant constructs via FPLC (His-tag affinity + size exclusion). Binding measured by tryptophan fluorescence quenching and SPR. MD predictions compared to experiment.',
    results:
      'Simulation correctly predicted relative binding affinities for 5/6 peptide variants. Identified N-terminal hydrophobic region as primary determinant of insertion depth. Two constructs currently in manuscript preparation.',
    limitations:
      'Simulation timescales limited to 500 ns, which may miss slow conformational events. Force field accuracy for lipid headgroup interactions is approximate.',
    future:
      'Enhanced sampling methods (replica exchange), cryo-EM validation for membrane-inserted state.',
    links: [],
    relatedExperience: ['seattleu-biophysics', 'iisc-protein'],
  },
]
