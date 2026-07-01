// ============================================================
// MASTER RESUME DATA — Rupak Ghosh
// This is the single source of truth for all site content.
// Update this file to update every section of the website.
// ============================================================

export const profile = {
  name: "Rupak Ghosh",
  title: "Cell & Molecular Biology | Data Science | Research",
  location: "Seattle, WA 98122",
  phone: "(206) 939-2766",
  email: "rghosh@seattleu.edu",
  emailAlt: "ruppakriki@gmail.com",
  linkedin: "https://www.linkedin.com/in/rupak-ghosh-339847239",
  linkedinHandle: "rupak-ghosh-339847239",
  github: "https://github.com/rghosh12",
  summary:
    "Undergraduate researcher and developer working across biochemistry, computational biology, data science, and full-stack engineering. Experience spanning four research institutions across two countries, with a track record of building tools, running experiments, and translating data into insight.",
} as const;

// ----------------------------------------------------------------

export const education = [
  {
    institution: "Seattle University",
    location: "Seattle, Washington, United States",
    degree: "Bachelor of Science in Cell and Molecular Biology",
    minors: ["Data Science & Applied Mathematics"],
    honors: ["University Honors"],
    gpa: "3.83 (Quarter)",
    graduation: "June 2027",
    current: true,
  },
  {
    institution: "Navkis Group of Institutions",
    location: "Bangalore, Karnataka, India",
    degree: "High School Diploma — CBSE",
    minors: [],
    honors: [],
    core: "Biology, Chemistry, Physics, Mathematics",
    gpa: "3.78 (Overall)",
    graduation: "2022",
    current: false,
  },
] as const;

// ----------------------------------------------------------------

export const experience = [
  {
    id: "ut-austin-biochem",
    org: "The University of Texas at Austin",
    role: "Research Intern — Biochemistry",
    period: "June 2026 – Present",
    duration: "1 month",
    location: "Austin, TX",
    type: "Research",
    current: true,
    bullets: ["Research @ Cockrell School of Engineering"],
    pi: null,
    collaborators: null,
  },
  {
    id: "su-it",
    org: "Seattle University",
    role: "IT Service Desk Student Technician",
    period: "May 2026 – Present",
    duration: "2 months",
    location: "Seattle, WA",
    type: "Technical",
    current: true,
    bullets: [
      "Troubleshoot hardware and software issues on Windows, macOS, Android, and iOS platforms",
      "Record, track, and manage service requests using Atlassian Jira and Atlassian Confluence",
      "Maintain professionalism and FERPA confidentiality when working with sensitive information",
      "Demonstrate excellent oral communication skills by guiding users through basic problem-solving steps",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "su-peer-advocate",
    org: "Seattle University",
    role: "Peer Advocate — Library Research",
    period: "May 2024 – Present",
    duration: "2 years 2 months",
    location: "Seattle, WA",
    type: "Academic",
    current: true,
    bullets: [
      "Guide students through Academic Writing and Academic Research resources through Ex Libris Primo",
      "Provide Lemieux Library information and service referral to students, staff, and faculty",
      "Partner with Learning Commons Partners on training, workshops, and other special projects",
      "Researched library usage, questions, and query statistics using Springshare LLC LibAnswers and LibStaffer",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "su-front-desk",
    org: "Seattle University",
    role: "Front Desk Assistant — Circulation Desk",
    period: "September 2025 – June 2026",
    duration: "10 months",
    location: "Seattle, WA",
    type: "Operations",
    current: false,
    bullets: [
      "Organized inventory of 21MM book titles using the Library of Congress classification system",
      "Managed 400,000 physical books and technology using Ex Libris Primo and Ex Libris Alma",
      "Maintained, secured, and restored a $50MM collection of paintings, sculptures, and artifacts across the premises",
      "Excelled in circulation procedures, including customer service, in-person, and contactless checkout services",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "su-orientation",
    org: "Seattle University",
    role: "Orientation Leader",
    period: "March 2026 – May 2026",
    duration: "3 months",
    location: "Seattle, WA",
    type: "Leadership",
    current: false,
    bullets: [
      "Led new undergraduate students and supporters as they began their Redhawk journey at Seattle University",
      "Supported new students' academic success by guiding resources, study strategies, and campus services",
      "Served as a representative of Seattle University and its leadership and professional development program",
      "Managed large-scale events including Redhawk Launch, Transfer Orientation, and Fall Welcome Kickoff",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "equilibrium-earth",
    org: "Equilibrium Earth",
    role: "Research and Development Intern",
    period: "July 2025 – September 2025",
    duration: "3 months",
    location: "Bangalore Urban",
    type: "Research",
    current: false,
    bullets: [
      "Developed the Enhanced Rock Weathering Carbon Project in Deccan coffee plantations of India",
      "Coordinated fundraising initiatives and market research that helped raise $3 million seed funding from VC firms",
      "Maintained data on project deployment, SOPs, collaborations, test reports, and equipment using Excel",
      "Forged relationships with research organizations and private-sector stakeholders to execute MoUs",
      "Engaged with on-ground logistics for Biochar and Silicate rock deliveries and executed soil sample analysis",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "iisc-biomaterials",
    org: "Indian Institute of Science — IISc",
    role: "Research Intern — Biomaterials Engineering",
    period: "June 2025 – July 2025",
    duration: "2 months",
    location: "Bangalore Urban",
    type: "Research",
    current: false,
    bullets: [
      "Bridged material design with translational biotherapeutics at the Interdisciplinary Center for Energy Research",
      "Characterized hydrophobic and hydrophilic cellulose channel behavior for targeted drug-delivery systems",
      "Applied graph-based molecular modeling techniques in Dassault Systèmes Materials Studio",
      "Customized a database of invasive plant species as sustainable feedstocks for cellulose nanoparticle extraction",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "su-data-science",
    org: "Seattle University College of Science and Engineering",
    role: "Research Intern — Data Science",
    period: "October 2024 – June 2025",
    duration: "9 months",
    location: "Seattle, WA",
    type: "Research",
    current: false,
    bullets: [
      "Mapped urban coyote populations across Seattle by fusing Carnivore Spotter metrics and camera-trap datasets",
      "Modeled detection correlations across 500 m and 1000 m camera-trap buffer zones using Poisson regression",
      "Correlated spatial patterns in human-coyote co-occurrence to inform urban wildlife management research",
      "Architected scalable urban carnivore monitoring through geospatial analysis in R",
    ],
    pi: "Dr. Mark Jordan",
    collaborators: "Department of Biology at Seattle University and Woodland Park Zoo",
  },
  {
    id: "iisc-microbiology",
    org: "Indian Institute of Science — IISc",
    role: "Summer Research Intern — Microbiology",
    period: "June 2024 – July 2024",
    duration: "2 months",
    location: "Bangalore Urban",
    type: "Research",
    current: false,
    bullets: [
      "Investigated molecular pathogenesis mechanisms of Salmonella Typhimurium as a primary model organism",
      "Engineered reverse primers for plasmid knockout constructions in bacterial systems",
      "Executed sterile dissection techniques on murine host organisms for downstream pathogenesis analysis",
      "Leveraged gel electrophoresis and PCR cycling to amplify expression and validate plasmid knockouts",
    ],
    pi: "Dr. Dipshikha Chakravortty",
    collaborators: "Department of Microbiology and Cell Biology at Indian Institute of Science",
  },
  {
    id: "ut-austin-lab",
    org: "Cockrell School of Engineering, The University of Texas at Austin",
    role: "Laboratory Assistant",
    period: "July 2023 – September 2023",
    duration: "3 months",
    location: "Austin, TX",
    type: "Research",
    current: false,
    bullets: [
      "Cultivated OmpF mutant cell lines for downstream protein extraction and PCR analysis",
      "Isolated bacterial colonies through controlled incubation and amplification culturing",
      "Executed Fast Protein Liquid Chromatography automation for high-resolution protein purification",
      "Formulated buffers, stocks, and aliquot reagents with precise pH probe control for experiments",
    ],
    pi: null,
    collaborators: null,
  },
  {
    id: "iisc-biophysics",
    org: "Indian Institute of Science — IISc",
    role: "Research Trainee — Molecular Biophysics",
    period: "March 2022 – August 2022",
    duration: "6 months",
    location: "Bangalore Urban",
    type: "Research",
    current: false,
    bullets: [
      "Specialized in High-Performance Liquid Chromatography for protein extraction and purification",
      "Propagated Snell conotoxin-producing cell lines and created amplification cultures for experimentation",
      "Synthesized buffers, stocks, and aliquoted reagents with precise pH control",
      "Investigated neurotoxic mechanisms of Snell conotoxins to inform peptide-based therapeutic development",
    ],
    pi: "Dr. Siddhartha Sarma",
    collaborators: "Molecular Biophysics Unit, Department of Physics at Indian Institute of Science",
  },
] as const;

// ----------------------------------------------------------------

export const researchProjects = [
  {
    id: "cancer-sim",
    title: "Multi-hit Model of Cancer Simulation",
    tags: ["Python", "NumPy", "Numba", "pandas", "matplotlib", "seaborn", "joblib", "Jupyter"],
    context: "Bioinformatics Projects Lab · Seattle University · 2025",
    bullets: [
      "Built a stochastic, multi-step cancer progression simulation in Python using NumPy for core computations and Numba to accelerate performance-critical simulation loops.",
      "Ran parameter sweeps with joblib, aggregated and analysed outputs in pandas, and produced interpretable summaries and figures with matplotlib and seaborn.",
      "Maintained clean, modular, and reproducible code in VS Code, using seeded randomness and Jupyter notebooks to ensure consistent reruns and transparent analysis.",
    ],
    link: null,
  },
  {
    id: "barn-owl-neurons",
    title: "Crosslink of Data in ICcl Neurons of Barn Owls",
    tags: ["Python", "pandas", "SciPy", "NumPy", "joblib", "PyArrow", "HDF5", "matplotlib", "seaborn", "GitHub"],
    context: "Computational Neuroscience Research · Seattle University · 2026",
    bullets: [
      "Built a cross-linked analysis pipeline for ICcl neurone ITD×ILD responses by importing CSV data with pandas and converting MATLAB (.mat) files using SciPy and NumPy into standardised, analysis-ready matrices.",
      "Automated batch computations and dataset assembly across neurons using joblib, storing cross-referenced metadata and outputs in Parquet (PyArrow) and HDF5 for fast, structured access.",
      "Generated tuning-curve visualisations and ITD×ILD heatmaps with matplotlib and seaborn, while maintaining reproducible workflows in VS Code with version control via GitHub.",
    ],
    link: null,
  },
  {
    id: "urban-wildlife",
    title: "Urban Wildlife Camera Traps & Community Reports Analysis",
    tags: ["R", "dplyr", "tidyr", "sf", "terra", "ggplot2", "tmap", "renv", "Quarto", "Git"],
    context: "Ecology Research & Poster · Seattle University · 2024",
    bullets: [
      "Integrated camera trap and Carnivore Spotter datasets in R using dplyr and tidyr for joins, cleaning, and feature engineering, with reproducible dependency management via renv.",
      "Automated spatial mapping and geodata analysis across large-scale geographic datasets using sf and terra, producing analysis-ready outputs for research use.",
      "Generated research visualisations with ggplot2 and tmap, packaging results into reproducible reports with Quarto/RMarkdown, version-controlled through Git/GitHub.",
    ],
    link: null,
  },
  {
    id: "dna-circuit",
    title: "DNA Circuit Board Perforation System",
    tags: ["DNA Self-Assembly", "Strand Displacement", "Computational Biology"],
    context: "Biophysics Research · Seattle University · 2026",
    bullets: [
      "Constructed DNA-based computational circuit boards using programmable DNA self-assembly, designed to mimic semiconductor routing layers through spatially constrained helix networks, crossovers, and strand-displacement logic motifs.",
      "Characterised electrical breakdown thresholds across different DNA geometries by varying applied field strength, ionic conditions, and scaffold packing density to determine stable operational regimes.",
      "Generated quantitative summaries and physical performance curves describing perforation thresholds, structural stability, and topology-dependent logic behaviour for candidate DNA circuit designs.",
    ],
    link: null,
  },
] as const;

export const personalProjects = [
  {
    id: "college-transfer",
    title: "College Transfer Application",
    tags: ["Python", "TypeScript", "FastAPI", "Next.js", "pgvector", "Gemini", "Celery", "Redis", "JWT"],
    context: "Full-Stack AI · Computer Science · 2026",
    bullets: [
      "Built a full-stack AI web app in FastAPI and Next.js to automate college transfer workflows, course equivalency matching, admission letter parsing, and multilingual document translation.",
      "Powered a 4-step matching pipeline (pgvector similarity search → CIP code matching → Gemini LLM reranking → confidence scoring) on 768-dimensional embeddings across 2,944 seeded US institutions.",
      "Deployed to Render and Vercel with async task processing via Celery and Redis, JWT authentication, and per-user rate limiting on all AI endpoints.",
    ],
    link: "https://college-transfer-app.vercel.app",
    linkLabel: "College Transfer App",
  },
  {
    id: "neural-pathway",
    title: "Neural Pathway Simulation",
    tags: ["Python", "FastAPI", "SQLAlchemy", "NetworkX", "Three.js", "Pydantic", "pytest"],
    context: "Neuropharmacological Visualisation Tool · 2026",
    bullets: [
      "Built a full-stack platform that simulates how drugs interact with neural receptors in real time, designed for college students who need fast, data-driven visualisations.",
      "Developed a FastAPI + SQLAlchemy backend with a NetworkX propagation engine, implementing EC50/Hill pharmacodynamic models grounded in peer-reviewed literature.",
      "Created an interactive Three.js brain visualisation where users explore dose-response curves and neurotransmitter modulation across multiple drug classes.",
      "Managed production standards throughout: Pydantic API validation, pytest coverage, citation-tracked scientific data, and full GitHub version control.",
    ],
    link: null,
    linkLabel: null,
  },
] as const;

export const miniProjects = [
  {
    id: "moba",
    title: "MoBa",
    context: "AWS PartyRock · AI App",
    description:
      "An AI-powered cafe drink recommendation app built on AWS PartyRock. Helps users quickly choose boba or cafe drinks based on mood, weather, flavor preferences, caffeine level, and add-ons. Generates personalised drink recommendations, cafe suggestions, customisation tips, and drink visuals before purchase.",
    link: "https://partyrock.aws/u/rghosh/ut6Ry2FYD/MoBa",
    linkLabel: "Try MoBa on AWS PartyRock",
  },
] as const;

export const hackathonProjects = [
  {
    id: "carta-clara",
    title: "Carta Clara",
    award: "🏆 2nd Place",
    event: "Seattle University × University of Washington AWS Hacks 2026",
    description:
      "A native iPhone app that turns frightening English mail — immigration notices, court letters, suspected scams — into a plain summary in Spanish or English, a deadline, a scam check, and a path to a free lawyer. The user picks the output language right after the splash screen, before the camera opens, so every subsequent screen renders in that language. It never gives legal advice; it refuses, visibly, whenever a question crosses that line.",
    tagline: "The letter on grandma's counter should not be a crisis.",
    link: "https://github.com/alexpicon/carta-clara-aws",
    linkLabel: "GitHub",
    tags: ["iOS", "Swift", "AWS", "NLP", "Legal Tech"],
  },
  {
    id: "seaside",
    title: "Seaside",
    award: "🏆 Special Mention · Top 10",
    event: "CascadiaJS Hackathon 2026",
    description:
      "A simulation environment that places 400+ AI agents in the city of Seattle. Each agent has a name, personality, job, home address, and daily routine. Every day, an LLM plans their entire schedule based on who they are and what's happening in the world around them.",
    tagline: null,
    link: "https://seaside-opal.vercel.app/",
    linkLabel: "Live Demo",
    tags: ["AI Agents", "LLM", "Simulation", "Next.js"],
  },
] as const;

// ----------------------------------------------------------------

export const certifications = [
  {
    name: "INSIGHT REACH Program Scholar",
    issuer: null,
    date: null,
  },
  {
    name: "AWS AI & ML Scholar",
    issuer: "Amazon Web Services",
    date: null,
  },
  {
    name: "Thermo Fisher Scientific — Genetic Sciences Job Simulation",
    issuer: "Thermo Fisher Scientific",
    date: null,
  },
] as const;

// ----------------------------------------------------------------

export const volunteering = [
  {
    role: "Student Mentor",
    org: "University Honors",
    dept: "Seattle University College of Arts and Sciences",
  },
  {
    role: "Head of Operations",
    org: "AWS Student Builder Groups at Seattle University",
    dept: null,
  },
  {
    role: "Student Advisory Board",
    org: "Seattle University College of Science and Engineering",
    dept: null,
  },
] as const;

// ----------------------------------------------------------------
// Derived helpers used by the UI

export type Experience = (typeof experience)[number];
export type ResearchProject = (typeof researchProjects)[number];
export type PersonalProject = (typeof personalProjects)[number];
export type HackathonProject = (typeof hackathonProjects)[number];
