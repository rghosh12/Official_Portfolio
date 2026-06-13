export interface MethodItem {
  name: string
  relatedProjects?: string[]
  relatedExperience?: string[]
}

export interface MethodCategory {
  id: string
  label: string
  items: MethodItem[]
}

export const methodCategories: MethodCategory[] = [
  {
    id: 'programming',
    label: 'Programming & Computation',
    items: [
      { name: 'Python', relatedProjects: ['barn-owl-pipeline', 'cancer-sim', 'urban-wildlife-geo', 'erw-climate'] },
      { name: 'TypeScript', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
      { name: 'R', relatedProjects: ['erw-climate', 'urban-wildlife-geo'] },
      { name: 'Bash / Shell scripting' },
      { name: 'SQL', relatedProjects: ['transfer-platform'] },
      { name: 'Git & GitHub' },
      { name: 'Jupyter Notebooks' },
      { name: 'Quarto', relatedProjects: ['barn-owl-pipeline'] },
    ],
  },
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    items: [
      { name: 'NumPy', relatedProjects: ['barn-owl-pipeline', 'cancer-sim'] },
      { name: 'pandas', relatedProjects: ['erw-climate', 'urban-wildlife-geo'] },
      { name: 'SciPy', relatedProjects: ['barn-owl-pipeline', 'cancer-sim'] },
      { name: 'Matplotlib', relatedProjects: ['barn-owl-pipeline', 'cancer-sim'] },
      { name: 'joblib / parallel computing', relatedProjects: ['cancer-sim'] },
      { name: 'Numba (JIT)', relatedProjects: ['neural-sim-platform', 'cancer-sim'] },
      { name: 'Statistical modeling' },
    ],
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    items: [
      { name: 'scikit-learn', relatedProjects: ['urban-wildlife-geo'] },
      { name: 'PyTorch (introductory)', relatedProjects: ['urban-wildlife-geo'] },
      { name: 'Transfer learning / ResNet', relatedProjects: ['urban-wildlife-geo'] },
      { name: 'Surrogate modeling' },
      { name: 'NUPACK (DNA thermodynamics)', relatedProjects: ['dna-circuits'] },
    ],
  },
  {
    id: 'geospatial',
    label: 'Geospatial Research',
    items: [
      { name: 'QGIS', relatedProjects: ['urban-wildlife-geo', 'erw-climate'] },
      { name: 'GeoPandas', relatedProjects: ['urban-wildlife-geo', 'erw-climate'] },
      { name: 'Rasterio', relatedProjects: ['urban-wildlife-geo', 'erw-climate'] },
      { name: 'Remote sensing analysis', relatedProjects: ['erw-climate'] },
      { name: 'Least-cost path analysis', relatedProjects: ['urban-wildlife-geo'] },
      { name: 'Habitat suitability modeling', relatedProjects: ['urban-wildlife-geo'] },
    ],
  },
  {
    id: 'laboratory',
    label: 'Biological Laboratory Methods',
    items: [
      { name: 'Aseptic technique', relatedExperience: ['seattleu-microbio', 'iisc-protein'] },
      { name: 'Sterile cell culture', relatedExperience: ['seattleu-microbio'] },
      { name: 'Light microscopy', relatedExperience: ['seattleu-microbio'] },
      { name: 'Spectrophotometry (UV-Vis)', relatedExperience: ['iisc-protein'] },
      { name: 'Fluorescence spectroscopy', relatedExperience: ['seattleu-biophysics'] },
      { name: 'Surface plasmon resonance (SPR)', relatedExperience: ['seattleu-biophysics'] },
      { name: 'Fluorescence plate reader', relatedExperience: ['iisc-molecular'] },
    ],
  },
  {
    id: 'protein-purification',
    label: 'Protein Purification',
    items: [
      { name: 'FPLC (fast protein liquid chromatography)', relatedExperience: ['seattleu-biophysics', 'iisc-protein'] },
      { name: 'HPLC', relatedExperience: ['seattleu-biophysics', 'iisc-protein'] },
      { name: 'Affinity chromatography (His-tag)', relatedExperience: ['iisc-protein'] },
      { name: 'Size exclusion chromatography', relatedExperience: ['iisc-protein', 'seattleu-biophysics'] },
      { name: 'Ion exchange chromatography', relatedExperience: ['seattleu-biophysics'] },
      { name: 'Buffer preparation', relatedExperience: ['iisc-protein', 'seattleu-biophysics'] },
    ],
  },
  {
    id: 'mol-bio',
    label: 'Molecular Biology',
    items: [
      { name: 'PCR & qPCR', relatedExperience: ['seattleu-microbio', 'iisc-molecular'] },
      { name: 'Gel electrophoresis', relatedExperience: ['seattleu-microbio', 'iisc-molecular', 'iisc-protein'] },
      { name: 'Western blotting', relatedExperience: ['iisc-protein'] },
      { name: 'SDS-PAGE', relatedExperience: ['iisc-protein', 'seattleu-biophysics'] },
      { name: 'Cloning & transformation (basic)', relatedExperience: ['seattleu-microbio'] },
      { name: 'DNA strand displacement (DSD)', relatedExperience: ['iisc-molecular'] },
    ],
  },
  {
    id: 'visualization',
    label: 'Scientific Visualization',
    items: [
      { name: 'Matplotlib', relatedProjects: ['barn-owl-pipeline', 'cancer-sim'] },
      { name: 'Quarto / R Markdown', relatedProjects: ['barn-owl-pipeline'] },
      { name: 'QGIS map design', relatedProjects: ['urban-wildlife-geo', 'erw-climate'] },
      { name: 'Canvas API / WebGL', relatedProjects: ['neural-sim-platform'] },
      { name: 'SVG-based data visualization' },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Engineering',
    items: [
      { name: 'Next.js (App Router)', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
      { name: 'React / TypeScript', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
      { name: 'FastAPI (Python)', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
      { name: 'PostgreSQL / Supabase', relatedProjects: ['transfer-platform'] },
      { name: 'Tailwind CSS', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
      { name: 'Vercel / Fly.io deployment', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
      { name: 'REST API design', relatedProjects: ['neural-sim-platform', 'transfer-platform'] },
    ],
  },
  {
    id: 'documentation',
    label: 'Research Documentation',
    items: [
      { name: 'Quarto / RMarkdown', relatedProjects: ['barn-owl-pipeline'] },
      { name: 'Scientific writing (methods, results)' },
      { name: 'Zotero & citation management', relatedExperience: ['seattleu-library'] },
      { name: 'Literature review methodology', relatedExperience: ['seattleu-library'] },
      { name: 'Poster design (research)', relatedProjects: ['cancer-sim', 'urban-wildlife-geo'] },
      { name: 'Lab notebook practice' },
    ],
  },
]
