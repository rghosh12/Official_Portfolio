# Rupak Ghosh - Portfolio

Modern, responsive portfolio website showcasing research experience, projects, and academic achievements in Cell & Molecular Biology and Data Science.

## 🚀 Tech Stack

- **Framework:** Next.js 15.3.4 (App Router)
- **UI Library:** React 19.1.0
- **Language:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React
- **Deployment:** Optimized for Vercel, Netlify, or static export

## ✨ Features

- 🎨 Modern, clean design with dark mode support
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized performance with Next.js 15
- 🔍 SEO-friendly with metadata and sitemaps
- ♿ Accessible with semantic HTML and ARIA labels
- 🎯 Single source of truth for all content
- 🚀 Fast page loads with image optimization

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rghosh12/Official_Portfolio.git

# Navigate to project directory
cd Official_Portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Type Checking

```bash
# Run TypeScript type checking
npm run type-check
```

## 📝 Updating Content

All portfolio content is managed through a single file for easy updates:

**`src/data/resume.ts`** - The single source of truth for:
- Profile information
- Education history
- Work experience
- Research projects
- Personal & hackathon projects
- Certifications
- Volunteering activities

Simply edit this file and the entire website updates automatically. TypeScript ensures type safety across all content.

## 🎨 Customization

### Colors & Theme

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --surface:   #ffffff;
  --surface-2: #f8f8f7;
  --border:    #e5e5e3;
  --text:      #1a1a18;
  --muted:     #6b6b67;
  --accent:    #1d4ed8;
}
```

### Fonts

Fonts are loaded via Google Fonts in `src/app/layout.tsx`. Currently using:
- **Inter** - Primary sans-serif
- **JetBrains Mono** - Monospace for code

## 📂 Project Structure

```
Official_Portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── globals.css     # Global styles
│   │   ├── robots.ts       # SEO robots.txt
│   │   └── sitemap.ts      # SEO sitemap
│   ├── components/
│   │   ├── layout/         # Nav, Footer
│   │   ├── sections/       # Hero, Education, Experience, etc.
│   │   └── ui/             # Reusable UI components
│   ├── data/
│   │   └── resume.ts       # Single source of truth
│   └── lib/
│       └── utils.ts        # Utility functions
├── public/                  # Static assets
├── RESUME.md               # Content documentation
└── package.json

```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

### Static Export

```bash
# Add to next.config.ts
output: 'export'

# Build static files
npm run build

# Deploy 'out' folder to any static host
```

## 📄 License

This project is open source and available for personal use.

## 👤 Contact

**Rupak Ghosh**
- Email: rghosh@seattleu.edu
- LinkedIn: [linkedin.com/in/rupak-ghosh-339847239](https://www.linkedin.com/in/rupak-ghosh-339847239)
- GitHub: [github.com/rghosh12](https://github.com/rghosh12)

---

Built with ❤️ using Next.js and React
