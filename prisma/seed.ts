/**
 * Prisma Seed Script — Rupak Ghosh Research Portfolio
 *
 * Run with: npm run prisma:seed
 *
 * Creates initial content based on Rupak's research profile:
 * - Education at Seattle University
 * - Research at UT Austin, Seattle University, IISc
 * - Projects: computational neuroscience, cancer sim, urban wildlife,
 *   neural pathways, DNA circuits, college transfer platform
 * - Methods, institutions, collaborators, research interests
 */

import { PrismaClient, PublishStatus, ExperienceCategory, EmploymentType, ProjectStatus, OutputType, InstitutionType, MediaType } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding portfolio database...");

  // ─── Institutions ──────────────────────────────────────────────────────────

  const seattleU = await db.institution.upsert({
    where: { id: "inst-seattle-u" },
    update: {},
    create: {
      id: "inst-seattle-u",
      name: "Seattle University",
      shortName: "SU",
      location: "Seattle, WA",
      type: InstitutionType.UNIVERSITY,
      website: "https://www.seattleu.edu",
      description:
        "Jesuit university in Seattle known for science education and community-engaged research.",
    },
  });

  const utAustin = await db.institution.upsert({
    where: { id: "inst-ut-austin" },
    update: {},
    create: {
      id: "inst-ut-austin",
      name: "University of Texas at Austin",
      shortName: "UT Austin",
      location: "Austin, TX",
      type: InstitutionType.UNIVERSITY,
      website: "https://www.utexas.edu",
      description: "Research university with top-ranked programs in neuroscience, computation, and engineering.",
    },
  });

  const iisc = await db.institution.upsert({
    where: { id: "inst-iisc" },
    update: {},
    create: {
      id: "inst-iisc",
      name: "Indian Institute of Science",
      shortName: "IISc",
      location: "Bangalore, India",
      type: InstitutionType.UNIVERSITY,
      website: "https://www.iisc.ac.in",
      description:
        "India's premier research institution for science and engineering, Bangalore.",
    },
  });

  const equilibriumEarth = await db.institution.upsert({
    where: { id: "inst-equilibrium-earth" },
    update: {},
    create: {
      id: "inst-equilibrium-earth",
      name: "Equilibrium Earth",
      shortName: "Equilibrium",
      location: "Remote",
      type: InstitutionType.NONPROFIT,
      description:
        "Climate technology organization focused on geospatial analysis and environmental data.",
    },
  });

  console.log("✅ Institutions created");

  // ─── Methods ───────────────────────────────────────────────────────────────

  const methodData = [
    // Computational
    { name: "Python", category: "Programming Languages" },
    { name: "R", category: "Programming Languages" },
    { name: "MATLAB", category: "Programming Languages" },
    { name: "JavaScript", category: "Programming Languages" },
    { name: "TypeScript", category: "Programming Languages" },
    { name: "C++", category: "Programming Languages" },
    { name: "SQL", category: "Programming Languages" },
    // Neuroscience
    { name: "Hodgkin-Huxley Modeling", category: "Computational Neuroscience", description: "Biophysical modeling of neuronal action potentials and membrane dynamics" },
    { name: "Differential Equation Solving", category: "Mathematical Methods", description: "Numerical integration of ODEs/PDEs for biological systems modeling" },
    { name: "Neural Network Simulation", category: "Computational Neuroscience" },
    { name: "Spike Train Analysis", category: "Computational Neuroscience" },
    { name: "Synaptic Plasticity Modeling", category: "Computational Neuroscience" },
    // Bioinformatics
    { name: "Sequence Alignment", category: "Bioinformatics" },
    { name: "Phylogenetic Analysis", category: "Bioinformatics" },
    { name: "Genomic Data Analysis", category: "Bioinformatics" },
    { name: "Protein Structure Prediction", category: "Bioinformatics" },
    // Deep Learning / ML
    { name: "Deep Learning", category: "Machine Learning" },
    { name: "Convolutional Neural Networks", category: "Machine Learning" },
    { name: "Recurrent Neural Networks", category: "Machine Learning" },
    { name: "PyTorch", category: "Machine Learning Frameworks" },
    { name: "TensorFlow", category: "Machine Learning Frameworks" },
    { name: "Scikit-learn", category: "Machine Learning Frameworks" },
    // Geospatial
    { name: "Geospatial Analysis", category: "Environmental Methods", description: "Spatial data processing for environmental and ecological research" },
    { name: "GIS (QGIS/ArcGIS)", category: "Environmental Methods" },
    { name: "Remote Sensing", category: "Environmental Methods" },
    { name: "Satellite Imagery Analysis", category: "Environmental Methods" },
    // Biology lab
    { name: "Cell Culture", category: "Laboratory Methods" },
    { name: "PCR", category: "Laboratory Methods", description: "Polymerase Chain Reaction for DNA amplification" },
    { name: "Western Blotting", category: "Laboratory Methods" },
    { name: "Fluorescence Microscopy", category: "Laboratory Methods" },
    { name: "Flow Cytometry", category: "Laboratory Methods" },
    { name: "DNA Gel Electrophoresis", category: "Laboratory Methods" },
    // Agent-based / simulation
    { name: "Agent-Based Modeling", category: "Simulation Methods" },
    { name: "Monte Carlo Simulation", category: "Simulation Methods" },
    { name: "Stochastic Modeling", category: "Simulation Methods" },
    // Full-stack
    { name: "Next.js", category: "Web Development" },
    { name: "React", category: "Web Development" },
    { name: "PostgreSQL", category: "Databases" },
    { name: "Prisma ORM", category: "Databases" },
    { name: "REST API Design", category: "Web Development" },
  ];

  const methods: Record<string, Awaited<ReturnType<typeof db.method.upsert>>> = {};
  for (const m of methodData) {
    const method = await db.method.upsert({
      where: { name: m.name },
      update: {},
      create: m,
    });
    methods[m.name] = method;
  }

  console.log(`✅ ${methodData.length} methods created`);

  // ─── Research Interests ────────────────────────────────────────────────────

  const interestData = [
    {
      id: "ri-compneuro",
      name: "Computational Neuroscience",
      description:
        "Mathematical and computational modeling of neuronal dynamics, synaptic plasticity, and neural circuit function. Current questions focus on how information is encoded in spike trains and how biophysical parameters shape network-level behavior.",
      currentQuestions: [
        "How do ion channel kinetics determine firing pattern diversity across neuron types?",
        "What computational mechanisms underlie working memory in prefrontal circuits?",
        "How do astrocyte-neuron interactions shape neural dynamics?",
      ],
      displayOrder: 1,
    },
    {
      id: "ri-bioinformatics",
      name: "Bioinformatics and Genomics",
      description:
        "Computational approaches to biological sequence analysis, comparative genomics, and multi-omics data integration.",
      currentQuestions: [
        "How can integrative multi-omics approaches reveal novel cancer driver mechanisms?",
        "What machine learning methods best capture gene regulatory network dynamics?",
      ],
      displayOrder: 2,
    },
    {
      id: "ri-climate",
      name: "Climate Technology and Geospatial Analysis",
      description:
        "Application of remote sensing, GIS, and machine learning to environmental monitoring, urban ecology, and climate impact assessment.",
      currentQuestions: [
        "How can satellite-derived land use data improve urban wildlife corridor modeling?",
        "What data pipelines support real-time climate monitoring at local scales?",
      ],
      displayOrder: 3,
    },
    {
      id: "ri-cancer-bio",
      name: "Cancer Biology and Tumor Dynamics",
      description:
        "Computational modeling of tumor growth, cell population dynamics, and therapeutic response.",
      currentQuestions: [
        "How do stochastic cell fate decisions contribute to tumor heterogeneity?",
        "What mathematical frameworks best describe the emergence of treatment resistance?",
      ],
      displayOrder: 4,
    },
    {
      id: "ri-synthetic-bio",
      name: "Synthetic Biology and DNA Computing",
      description:
        "Design of genetic circuits and DNA-based computational systems for biological applications.",
      currentQuestions: [
        "How can DNA strand displacement reactions implement logic circuits?",
        "What design principles maximize the orthogonality of synthetic gene networks?",
      ],
      displayOrder: 5,
    },
    {
      id: "ri-full-stack",
      name: "Research Software and Full-Stack Development",
      description:
        "Building reliable, maintainable software tools for scientific research, data archiving, and academic infrastructure.",
      currentQuestions: [],
      displayOrder: 6,
    },
  ];

  const interests: Record<string, Awaited<ReturnType<typeof db.researchInterest.upsert>>> = {};
  for (const ri of interestData) {
    const interest = await db.researchInterest.upsert({
      where: { id: ri.id },
      update: {},
      create: {
        ...ri,
        status: PublishStatus.PUBLISHED,
      },
    });
    interests[ri.id] = interest;
  }

  console.log("✅ Research interests created");

  // ─── Person ────────────────────────────────────────────────────────────────

  await db.person.upsert({
    where: { id: "rupak-ghosh" },
    update: {},
    create: {
      id: "rupak-ghosh",
      fullName: "Rupak Ghosh",
      professionalTitle: "Cell & Molecular Biology Researcher",
      shortBio:
        "Interdisciplinary researcher working across computational neuroscience, bioinformatics, climate technology, and full-stack development.",
      longBio:
        "I'm a Cell and Molecular Biology student at Seattle University with research experience spanning computational neuroscience at UT Austin, geospatial analysis for climate technology, cancer biology simulation, synthetic biology, and full-stack software development. My work connects biological and computational approaches to study complex systems — from how neurons encode information to how urban landscapes shape wildlife corridors. I'm interested in how computation can help us understand living systems and how software infrastructure can support reproducible, open science.",
      location: "Seattle, WA",
      githubUrl: "https://github.com/rghosh12",
      researchStatement:
        "My research interests sit at the intersection of computation and biology. I'm drawn to questions about how biological systems process information — whether that means modeling ion channel dynamics in neurons, simulating cancer cell population evolution, or analyzing satellite data to map urban wildlife corridors. I approach these problems with mathematical modeling, bioinformatics pipelines, and machine learning, while maintaining a commitment to reproducible, well-documented code.",
    },
  });

  console.log("✅ Person profile created");

  // ─── Education ────────────────────────────────────────────────────────────

  await db.education.upsert({
    where: { id: "edu-seattleu-bs" },
    update: {},
    create: {
      id: "edu-seattleu-bs",
      institutionId: seattleU.id,
      degree: "Bachelor of Science",
      major: "Cell and Molecular Biology",
      minors: ["Computer Science", "Mathematics"],
      startDate: new Date("2022-09-01"),
      expectedGradDate: new Date("2026-05-01"),
      showGpa: false,
      description:
        "Pursuing a B.S. in Cell and Molecular Biology with minors in Computer Science and Mathematics. Coursework emphasizes molecular mechanisms of disease, cellular signaling, computational approaches to biology, and mathematical modeling.",
      selectedCoursework: [
        "Molecular Biology",
        "Biochemistry",
        "Cell Signaling",
        "Bioinformatics",
        "Calculus I–III",
        "Linear Algebra",
        "Data Structures",
        "Algorithms",
        "Genetics",
        "Immunology",
      ],
      honors: ["Dean's List"],
      displayPriority: 10,
      status: PublishStatus.PUBLISHED,
    },
  });

  console.log("✅ Education created");

  // ─── Experience ────────────────────────────────────────────────────────────

  const expCompNeuro = await db.experience.upsert({
    where: { id: "exp-ut-compneuro" },
    update: {},
    create: {
      id: "exp-ut-compneuro",
      roleTitle: "Undergraduate Research Associate — Computational Neuroscience",
      institutionId: utAustin.id,
      employmentType: EmploymentType.RESEARCH_ASSISTANT,
      category: ExperienceCategory.RESEARCH,
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-31"),
      isCurrent: false,
      location: "Austin, TX",
      summary:
        "Developed biophysical neuron models and simulated neural circuit dynamics to investigate mechanisms of information encoding in cortical networks.",
      longDescription:
        "Worked in a computational neuroscience laboratory at UT Austin implementing Hodgkin-Huxley style neuron models and multi-compartment simulations. Extended existing Python simulation pipelines to explore how variations in sodium channel kinetics affect action potential propagation. Conducted parameter sweeps to characterize bifurcation behavior in small recurrent networks. Analyzed spike train statistics using information-theoretic measures.",
      responsibilities: [
        "Implemented and extended Hodgkin-Huxley neuron models in Python",
        "Designed parameter sweep experiments to characterize firing pattern diversity",
        "Analyzed spike train statistics using mutual information and entropy measures",
        "Maintained a reproducible simulation pipeline with versioned data outputs",
        "Presented findings in weekly lab meetings",
      ],
      outcomes: [
        "Built a reusable Python library for single-neuron parameter sweeps",
        "Characterized the bifurcation behavior of a cortical interneuron model",
        "Contributed to understanding of how ion channel heterogeneity shapes network dynamics",
      ],
      supervisor: "PI, UT Austin Computational Neuroscience Lab",
      displayPriority: 90,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  // Link methods to experience
  const compNeuroMethods = ["Python", "Hodgkin-Huxley Modeling", "Differential Equation Solving", "Spike Train Analysis", "Neural Network Simulation", "MATLAB"];
  for (const mName of compNeuroMethods) {
    if (methods[mName]) {
      await db.experienceMethod.upsert({
        where: { experienceId_methodId: { experienceId: expCompNeuro.id, methodId: methods[mName].id } },
        update: {},
        create: { experienceId: expCompNeuro.id, methodId: methods[mName].id },
      }).catch(() => {});
    }
  }

  const expSeattleUResearch = await db.experience.upsert({
    where: { id: "exp-seattleu-research" },
    update: {},
    create: {
      id: "exp-seattleu-research",
      roleTitle: "Undergraduate Researcher — Molecular Biology",
      institutionId: seattleU.id,
      employmentType: EmploymentType.RESEARCH_ASSISTANT,
      category: ExperienceCategory.RESEARCH,
      startDate: new Date("2023-01-01"),
      isCurrent: true,
      location: "Seattle, WA",
      summary:
        "Conducting research in a molecular biology laboratory at Seattle University, with projects spanning cancer cell biology, synthetic biology, and bioinformatics.",
      responsibilities: [
        "Performing cell culture and maintenance of mammalian cell lines",
        "Running PCR, gel electrophoresis, and Western blotting assays",
        "Designing computational analysis pipelines for genomic data",
        "Contributing to experimental design and literature review",
      ],
      displayPriority: 85,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const expEquilibrium = await db.experience.upsert({
    where: { id: "exp-equilibrium-earth" },
    update: {},
    create: {
      id: "exp-equilibrium-earth",
      roleTitle: "Geospatial Research Analyst",
      institutionId: equilibriumEarth.id,
      employmentType: EmploymentType.CONTRACT,
      category: ExperienceCategory.RESEARCH,
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-12-31"),
      isCurrent: false,
      location: "Remote",
      summary:
        "Applied GIS and remote sensing methods to analyze satellite imagery for urban wildlife corridor mapping and climate impact assessment.",
      responsibilities: [
        "Processed and analyzed satellite imagery datasets using Python and QGIS",
        "Built geospatial data pipelines for land use classification",
        "Contributed to urban wildlife habitat connectivity analysis",
        "Prepared reports and data visualizations for stakeholder communication",
      ],
      outcomes: [
        "Delivered a reproducible land use change analysis pipeline",
        "Produced corridor connectivity maps used in downstream conservation planning",
      ],
      displayPriority: 80,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const expIisc = await db.experience.upsert({
    where: { id: "exp-iisc-research" },
    update: {},
    create: {
      id: "exp-iisc-research",
      roleTitle: "Research Intern — Synthetic Biology / DNA Circuits",
      institutionId: iisc.id,
      employmentType: EmploymentType.INTERNSHIP,
      category: ExperienceCategory.RESEARCH,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-04-30"),
      isCurrent: false,
      location: "Bangalore, India",
      summary:
        "Investigated DNA strand displacement cascade circuits and computational frameworks for engineering robust genetic switches.",
      responsibilities: [
        "Reviewed literature on DNA computing and strand displacement systems",
        "Designed and simulated DNA circuit logic gates in Python",
        "Analyzed thermodynamic constraints on toehold-mediated strand displacement",
        "Contributed to manuscript preparation and data figures",
      ],
      displayPriority: 75,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  console.log("✅ Experience entries created");

  // ─── Projects ─────────────────────────────────────────────────────────────

  const projCompNeuro = await db.project.upsert({
    where: { id: "proj-compneuro-hh" },
    update: {},
    create: {
      id: "proj-compneuro-hh",
      title: "Cortical Neuron Dynamics: Hodgkin-Huxley Modeling",
      slug: "cortical-neuron-hodgkin-huxley",
      subtitle: "Biophysical simulation of firing pattern diversity in cortical interneurons",
      summary:
        "Implemented Hodgkin-Huxley style biophysical models to characterize how ion channel kinetics shape action potential firing patterns and small network dynamics.",
      fullDescription:
        "This project explored how heterogeneity in voltage-gated ion channel parameters produces the diversity of firing patterns observed across cortical neuron types. I implemented single-compartment and multi-compartment neuron models in Python, extending the classical Hodgkin-Huxley framework with fast-spiking sodium channels and A-type potassium channels characteristic of cortical interneurons. Parameter sweeps over channel conductance densities revealed bifurcation behaviors — transitions between tonic firing, bursting, and quiescence — that map onto experimentally observed neuron classes. The project culminated in a small recurrent network simulation demonstrating how interneuron heterogeneity shapes synchrony and oscillatory dynamics.",
      problemStatement:
        "Cortical networks exhibit highly diverse firing behaviors despite being built from common biophysical components. Understanding how ion channel composition determines neuron type identity — and how this diversity serves computation — requires systematic, parameterized simulation.",
      researchQuestion:
        "How do variations in fast-inactivating potassium channel conductance density shift cortical interneuron firing mode, and how does this translate into network-level synchrony patterns?",
      role: "Lead researcher and programmer",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-31"),
      projectStatus: ProjectStatus.COMPLETED,
      discipline: "Computational Neuroscience",
      featured: true,
      repositoryUrl: "https://github.com/rghosh12",
      results:
        "Characterized three distinct firing modes (tonic, adapting, bursting) as a function of A-type K⁺ conductance. Demonstrated that interneuron heterogeneity in a 20-neuron recurrent network reduces pathological synchrony. Built a reusable Python simulation library.",
      limitations:
        "Single-compartment models omit dendritic computation. Simulations use idealized synaptic conductances. Parameter ranges were constrained by literature values from rodent recordings.",
      futureWork:
        "Extend to multi-compartment models with active dendrites. Incorporate calcium dynamics and calcium-dependent K⁺ channels. Connect to in vivo electrophysiology datasets.",
      technologies: ["Python", "NumPy", "SciPy", "Matplotlib", "Jupyter"],
      displayPriority: 100,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const projCancerSim = await db.project.upsert({
    where: { id: "proj-cancer-sim" },
    update: {},
    create: {
      id: "proj-cancer-sim",
      title: "Stochastic Cancer Cell Population Dynamics",
      slug: "cancer-cell-population-simulation",
      subtitle: "Agent-based simulation of tumor growth and therapeutic response",
      summary:
        "Built an agent-based model to simulate cancer cell population dynamics under selective pressure, studying the emergence of drug resistance and tumor heterogeneity.",
      fullDescription:
        "Implemented a stochastic, agent-based simulation framework in Python to study how heterogeneous cancer cell populations evolve under selective pressure from chemotherapy. Each simulated cell carries a stochastic set of trait parameters governing proliferation rate, apoptosis sensitivity, and drug efflux capacity. The simulation tracks clonal evolution over multiple treatment cycles, allowing observation of resistance emergence as a population-level phenomenon. I analyzed how treatment timing and dosing affect the probability and speed of resistance development.",
      problemStatement:
        "Drug resistance is the leading cause of cancer treatment failure. Understanding the evolutionary dynamics through which resistant clones emerge requires models that capture stochastic individual-cell behavior within a population context.",
      researchQuestion:
        "Under what treatment schedules does adaptive drug resistance most reliably emerge, and how does initial intratumor heterogeneity affect the probability of resistance?",
      role: "Lead developer and researcher",
      startDate: new Date("2023-09-01"),
      endDate: new Date("2024-01-31"),
      projectStatus: ProjectStatus.COMPLETED,
      discipline: "Computational Biology / Cancer Biology",
      featured: true,
      results:
        "Showed that pulsed high-dose treatment regimens delay but do not eliminate resistance emergence. Demonstrated that higher initial heterogeneity correlates with faster resistance selection. Simulation results qualitatively match published experimental evolution data.",
      limitations:
        "Omits spatial tumor structure and microenvironmental effects. Drug pharmacokinetics are simplified. Validated only against qualitative experimental patterns.",
      futureWork:
        "Incorporate spatial lattice model. Add drug pharmacokinetics. Fit model parameters to experimental clonal dynamics data.",
      technologies: ["Python", "NumPy", "Pandas", "Matplotlib", "Mesa (ABM)"],
      displayPriority: 95,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const projUrbanWildlife = await db.project.upsert({
    where: { id: "proj-urban-wildlife" },
    update: {},
    create: {
      id: "proj-urban-wildlife",
      title: "Urban Wildlife Corridor Analysis",
      slug: "urban-wildlife-corridor-analysis",
      subtitle: "Geospatial modeling of habitat connectivity in urbanized landscapes",
      summary:
        "Analyzed satellite-derived land use data to map wildlife habitat corridors in urbanized regions, informing conservation planning and urban green space policy.",
      fullDescription:
        "Using multi-year Landsat and Sentinel-2 imagery, I developed a geospatial analysis pipeline to classify land cover types and model wildlife movement corridor quality across a Pacific Northwest urban region. The pipeline combines supervised classification with connectivity analysis to identify bottlenecks and priority conservation areas. Results were visualized as GIS-compatible maps delivered to conservation planning stakeholders.",
      role: "Lead geospatial analyst",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-12-31"),
      projectStatus: ProjectStatus.COMPLETED,
      discipline: "Environmental Science / Geospatial Analysis",
      featured: true,
      results:
        "Identified three critical corridor bottlenecks at highway-greenspace intersections. Produced reproducible land cover classification achieving 89% accuracy on validation data.",
      technologies: ["Python", "QGIS", "Google Earth Engine", "Scikit-learn", "GeoPandas", "Rasterio"],
      displayPriority: 90,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const projDnaCircuits = await db.project.upsert({
    where: { id: "proj-dna-circuits" },
    update: {},
    create: {
      id: "proj-dna-circuits",
      title: "DNA Strand Displacement Circuit Design",
      slug: "dna-strand-displacement-circuits",
      subtitle: "Computational design and simulation of DNA-based logic gates",
      summary:
        "Designed and computationally simulated DNA strand displacement cascade circuits, exploring toehold thermodynamics and logic gate robustness.",
      fullDescription:
        "Investigated the computational properties of DNA strand displacement (DSD) systems for implementing logic circuits. Using thermodynamic modeling and kinetic simulation, I designed NOT, AND, and threshold gates using toehold-mediated displacement reactions. Analyzed the sensitivity of gate behavior to strand length, toehold strength, and concentration ratios. Contributed to a theoretical framework for designing modular, orthogonal DNA circuit libraries.",
      role: "Research intern",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-04-30"),
      projectStatus: ProjectStatus.COMPLETED,
      discipline: "Synthetic Biology / DNA Computing",
      featured: false,
      technologies: ["Python", "NUPACK", "Visual DSD", "Matplotlib"],
      displayPriority: 80,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const projTransferPlatform = await db.project.upsert({
    where: { id: "proj-transfer-platform" },
    update: {},
    create: {
      id: "proj-transfer-platform",
      title: "College Transfer Information Platform",
      slug: "college-transfer-platform",
      subtitle: "Full-stack web application for transfer student resource navigation",
      summary:
        "Built a full-stack web platform to help community college students navigate the transfer process, aggregating requirements, deadlines, and resources across institutions.",
      fullDescription:
        "Designed and developed a full-stack web application to address the information fragmentation that makes college transfer unnecessarily difficult for community college students. The platform aggregates transfer admission requirements, deadlines, and articulation agreements from multiple institutions into a unified, searchable interface. Built with Next.js, PostgreSQL, and a REST API, with a focus on accessibility and mobile responsiveness.",
      role: "Lead developer",
      startDate: new Date("2023-03-01"),
      endDate: new Date("2023-09-01"),
      projectStatus: ProjectStatus.COMPLETED,
      discipline: "Full-Stack Software Development",
      featured: true,
      repositoryUrl: "https://github.com/rghosh12",
      technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      displayPriority: 85,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const projNeuralPathway = await db.project.upsert({
    where: { id: "proj-neural-pathway" },
    update: {},
    create: {
      id: "proj-neural-pathway",
      title: "Neural Pathway Simulation: Sensory Integration",
      slug: "neural-pathway-sensory-integration",
      subtitle: "Network-level simulation of multisensory integration in thalamo-cortical circuits",
      summary:
        "Simulated thalamo-cortical relay circuits to study how converging sensory inputs are integrated and filtered before reaching cortical processing stages.",
      fullDescription:
        "Built a conductance-based network simulation of thalamo-cortical circuits to investigate how thalamic relay neurons selectively transmit and gate sensory information to cortex. The simulation incorporated both thalamocortical and corticothalamic feedback pathways, allowing study of how top-down signals modulate sensory throughput. Used the simulation to test hypotheses about attentional gating and sensory filtering.",
      role: "Computational modeler",
      startDate: new Date("2024-09-01"),
      projectStatus: ProjectStatus.ACTIVE,
      discipline: "Computational Neuroscience",
      featured: false,
      technologies: ["Python", "Brian2", "NumPy", "Matplotlib"],
      displayPriority: 88,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  console.log("✅ Projects created");

  // ─── Link projects to methods ─────────────────────────────────────────────

  const projectMethodLinks: Array<{ projectId: string; methods: string[] }> = [
    {
      projectId: projCompNeuro.id,
      methods: ["Python", "Hodgkin-Huxley Modeling", "Differential Equation Solving", "Spike Train Analysis", "Neural Network Simulation"],
    },
    {
      projectId: projCancerSim.id,
      methods: ["Python", "Agent-Based Modeling", "Monte Carlo Simulation", "Stochastic Modeling"],
    },
    {
      projectId: projUrbanWildlife.id,
      methods: ["Python", "Geospatial Analysis", "GIS (QGIS/ArcGIS)", "Remote Sensing", "Satellite Imagery Analysis"],
    },
    {
      projectId: projDnaCircuits.id,
      methods: ["Python", "Stochastic Modeling"],
    },
    {
      projectId: projTransferPlatform.id,
      methods: ["Python", "JavaScript", "TypeScript", "PostgreSQL", "Next.js", "React", "Prisma ORM", "REST API Design"],
    },
    {
      projectId: projNeuralPathway.id,
      methods: ["Python", "Hodgkin-Huxley Modeling", "Differential Equation Solving", "Neural Network Simulation", "Synaptic Plasticity Modeling"],
    },
  ];

  for (const { projectId, methods: mNames } of projectMethodLinks) {
    for (const mName of mNames) {
      if (methods[mName]) {
        await db.projectMethod.upsert({
          where: { projectId_methodId: { projectId, methodId: methods[mName].id } },
          update: {},
          create: { projectId, methodId: methods[mName].id },
        }).catch(() => {});
      }
    }
  }

  // ─── Link projects to experience ──────────────────────────────────────────

  const projectExpLinks = [
    { projectId: projCompNeuro.id, experienceId: expCompNeuro.id },
    { projectId: projNeuralPathway.id, experienceId: expCompNeuro.id },
    { projectId: projCancerSim.id, experienceId: expSeattleUResearch.id },
    { projectId: projUrbanWildlife.id, experienceId: expEquilibrium.id },
    { projectId: projDnaCircuits.id, experienceId: expIisc.id },
  ];

  for (const link of projectExpLinks) {
    await db.projectExperience.upsert({
      where: { projectId_experienceId: link },
      update: {},
      create: link,
    }).catch(() => {});
  }

  // ─── Link projects to institutions ────────────────────────────────────────

  const projectInstLinks = [
    { projectId: projCompNeuro.id, institutionId: utAustin.id },
    { projectId: projNeuralPathway.id, institutionId: utAustin.id },
    { projectId: projCancerSim.id, institutionId: seattleU.id },
    { projectId: projUrbanWildlife.id, institutionId: equilibriumEarth.id },
    { projectId: projDnaCircuits.id, institutionId: iisc.id },
    { projectId: projTransferPlatform.id, institutionId: seattleU.id },
  ];

  for (const link of projectInstLinks) {
    await db.projectInstitution.upsert({
      where: { projectId_institutionId: link },
      update: {},
      create: link,
    }).catch(() => {});
  }

  // ─── Link research interests to projects ──────────────────────────────────

  const interestProjectLinks = [
    { researchInterestId: interests["ri-compneuro"].id, projectId: projCompNeuro.id },
    { researchInterestId: interests["ri-compneuro"].id, projectId: projNeuralPathway.id },
    { researchInterestId: interests["ri-cancer-bio"].id, projectId: projCancerSim.id },
    { researchInterestId: interests["ri-climate"].id, projectId: projUrbanWildlife.id },
    { researchInterestId: interests["ri-synthetic-bio"].id, projectId: projDnaCircuits.id },
    { researchInterestId: interests["ri-full-stack"].id, projectId: projTransferPlatform.id },
  ];

  for (const link of interestProjectLinks) {
    await db.researchInterestProject.upsert({
      where: { researchInterestId_projectId: link },
      update: {},
      create: link,
    }).catch(() => {});
  }

  // ─── Research interest → method links ─────────────────────────────────────

  const interestMethodLinks = [
    { interest: "ri-compneuro", methods: ["Python", "Hodgkin-Huxley Modeling", "Differential Equation Solving", "Spike Train Analysis", "Neural Network Simulation", "MATLAB"] },
    { interest: "ri-bioinformatics", methods: ["Python", "R", "Sequence Alignment", "Phylogenetic Analysis", "Genomic Data Analysis"] },
    { interest: "ri-climate", methods: ["Python", "Geospatial Analysis", "GIS (QGIS/ArcGIS)", "Remote Sensing", "Satellite Imagery Analysis"] },
    { interest: "ri-cancer-bio", methods: ["Python", "Agent-Based Modeling", "Monte Carlo Simulation", "Stochastic Modeling"] },
    { interest: "ri-synthetic-bio", methods: ["Python", "Stochastic Modeling"] },
    { interest: "ri-full-stack", methods: ["Python", "JavaScript", "TypeScript", "Next.js", "React", "PostgreSQL", "Prisma ORM", "REST API Design"] },
  ];

  for (const { interest, methods: mNames } of interestMethodLinks) {
    const interestId = interests[interest]?.id;
    if (!interestId) continue;
    for (const mName of mNames) {
      if (methods[mName]) {
        await db.researchInterestMethod.upsert({
          where: { researchInterestId_methodId: { researchInterestId: interestId, methodId: methods[mName].id } },
          update: {},
          create: { researchInterestId: interestId, methodId: methods[mName].id },
        }).catch(() => {});
      }
    }
  }

  console.log("✅ All relationships linked");

  // ─── External Links ────────────────────────────────────────────────────────

  await db.externalLink.createMany({
    data: [
      { label: "GitHub", url: "https://github.com/rghosh12", category: "Social", displayOrder: 1 },
      { label: "LinkedIn", url: "https://linkedin.com/in/rupakghosh", category: "Social", displayOrder: 2 },
    ],
    skipDuplicates: true,
  });

  console.log("\n✅ Seed complete!");
  console.log("   Institutions: 4");
  console.log(`   Methods: ${methodData.length}`);
  console.log("   Research interests: 6");
  console.log("   Education: 1");
  console.log("   Experience: 4");
  console.log("   Projects: 6");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
