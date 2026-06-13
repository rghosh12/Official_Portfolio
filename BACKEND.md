# Backend Architecture — Rupak Ghosh Research Portfolio

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL via Neon or Supabase |
| ORM | Prisma 6 |
| Authentication | NextAuth v5 (credentials) |
| Validation | Zod |
| File Storage | Vercel Blob |
| Email | Nodemailer (SMTP) |
| Rate Limiting | Upstash Redis (in-memory fallback) |
| Image Processing | Sharp |
| Deployment | Vercel |

---

## Setup

### 1. Database

Create a PostgreSQL database on [Neon](https://neon.tech) or [Supabase](https://supabase.com).

Copy the connection strings into `.env.local`:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

For Neon/Supabase with connection pooling, `DATABASE_URL` uses the pooled URL and `DIRECT_URL` uses the direct connection (required for migrations).

### 2. Run migrations

```bash
npx prisma migrate dev --name init
```

### 3. Seed initial data

```bash
npm run prisma:seed
```

This seeds:
- 4 institutions (Seattle University, UT Austin, IISc, Equilibrium Earth)
- 6 research interests with current questions
- ~35 methods across 8 categories
- 1 education entry
- 4 experience entries
- 6 projects with full descriptions and linked relationships

### 4. Set up authentication

Generate a secret:

```bash
openssl rand -base64 32
```

Hash a password for admin login:

```bash
node -e "const b=require('bcryptjs'); b.hash('yourpassword',10).then(h=>console.log(h))"
```

Set in `.env.local`:

```env
AUTH_SECRET="generated-secret"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD_HASH="$2b$10$..."
```

### 5. File storage (optional, required for media uploads)

Create a Vercel Blob store and add the token:

```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

### 6. Email (optional, required for contact form notifications)

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="you@gmail.com"
SMTP_PASS="app-password"
CONTACT_EMAIL_TO="you@example.com"
```

---

## Data Model

### Entity Relationship Summary

```
Person (1)
 └── one profile record

Institution (many)
 ├── Experience (many) ←→ Method (many-to-many)
 ├── Education (many)
 └── Collaborator (many)

Project (many)
 ├── ←→ Method (many-to-many via ProjectMethod)
 ├── ←→ Experience (many-to-many via ProjectExperience)
 ├── ←→ Collaborator (many-to-many via ProjectCollaborator)
 ├── ←→ Institution (many-to-many via ProjectInstitution)
 ├── ←→ Output (many-to-many via ProjectOutput)
 ├── ←→ ResearchInterest (many-to-many via ResearchInterestProject)
 ├── ProjectUpdate (many)
 └── MediaAsset (many)

ResearchInterest (many, hierarchical)
 ├── ←→ Method (many-to-many)
 └── ←→ Project (many-to-many)

Output (publications, posters, reports)
 └── ←→ Project (many-to-many)

ContactSubmission
AuditLog
ExternalLink
```

### Publish Status Lifecycle

```
DRAFT → IN_REVIEW → PUBLISHED → ARCHIVED
```

All public API endpoints filter by `status: PUBLISHED`. Admin endpoints see all statuses. Draft content is never exposed through public routes.

---

## API Reference

### Public Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/projects` | List projects (paginated, filterable) |
| GET | `/api/projects/[slug]` | Project detail by slug |
| GET | `/api/experience` | List experience / timeline / current work |
| GET | `/api/methods` | List methods and categories |
| GET | `/api/outputs` | List publications and outputs |
| GET | `/api/research-interests` | Research interests with projects/methods |
| GET | `/api/search?q=...` | Full-text search across all entities |
| GET | `/api/search?q=...&mode=autocomplete` | Autocomplete suggestions |
| POST | `/api/contact` | Submit contact form |

### Query Parameters

#### `/api/projects`
- `status` — DRAFT/IN_REVIEW/PUBLISHED/ARCHIVED (default: PUBLISHED)
- `projectStatus` — PLANNING/ACTIVE/PAUSED/COMPLETED/PUBLISHED/ARCHIVED
- `discipline` — text filter
- `featured` — true/false
- `methodId` — filter by method ID
- `institutionId` — filter by institution ID
- `year` — filter by year
- `page`, `limit` — pagination (default 1, 20)

#### `/api/experience`
- `view` — "timeline" | "current" (special response shapes)
- `category` — RESEARCH/INDUSTRY/TEACHING/etc.
- `current` — true/false
- `institutionId`
- `year`

#### `/api/outputs`
- `type` — JOURNAL_ARTICLE/POSTER/TECHNICAL_REPORT/etc.
- `featured` — true/false
- `year`
- `projectId`

### Admin Endpoints (require authentication)

| Method | Path | Description |
|---|---|---|
| POST | `/api/admin/upload` | Upload media file |

---

## Admin Interface

Access the admin at `/admin`. Authenticate at `/admin/login`.

### Dashboard
- Stats: published/draft project counts, experience entries, outputs, unread messages, media count
- Quick links to all admin sections
- Recently updated projects table

### Admin sections
- `/admin/projects` — create, edit, publish/unpublish projects
- `/admin/experience` — manage experience timeline
- `/admin/education` — manage education entries
- `/admin/outputs` — manage publications and outputs
- `/admin/methods` — manage research methods
- `/admin/research-interests` — manage research interest taxonomy
- `/admin/collaborators` — manage collaborators
- `/admin/institutions` — manage institutions
- `/admin/media` — browse uploaded media assets
- `/admin/contact` — view and manage contact submissions
- `/admin/links` — manage external links

---

## Server Actions

The primary data layer uses Next.js Server Actions in `src/lib/actions/`:

- `projects.ts` — CRUD + publish/unpublish, featured management
- `experience.ts` — CRUD, timeline query, current work query
- `methods.ts` — CRUD, category listing
- `outputs.ts` — CRUD with project linking
- `contact.ts` — validated submission with honeypot, rate limiting, email notification
- `search.ts` — full-text search across all entity types

---

## Search

Search is implemented using Prisma `contains` with `mode: "insensitive"` (maps to `ILIKE` in PostgreSQL). Queries run in parallel across:

- Project titles, summaries, descriptions, disciplines
- Experience role titles, summaries
- Method names, categories, descriptions
- Output titles, abstracts
- Research interest names, descriptions

Results are grouped by entity type. Use `/api/search?q=...&mode=autocomplete` for real-time suggestions.

**Future enhancement**: Add a `tsvector` generated column and `GIN` index to `Project`, `Experience`, and `Output` for faster FTS at scale.

---

## File Upload Pipeline

1. Client POSTs a `multipart/form-data` request to `/api/admin/upload`
2. MIME type is validated against an allowlist (images + PDFs + presentations)
3. File size is validated (20MB max)
4. File is uploaded to Vercel Blob with a timestamped name
5. For images, Sharp extracts dimensions
6. A `MediaAsset` record is created in the database with the blob URL
7. `isPublished` is initially `false` — assets become public when the parent entity is published

---

## Security Checklist

- [x] Input validation with Zod on all API routes and server actions
- [x] NextAuth v5 JWT session for admin routes
- [x] Middleware enforces authentication on `/admin/*` and `/api/admin/*`
- [x] Rate limiting on contact (3/10min) and search (30/min) endpoints
- [x] Honeypot field on contact form
- [x] MIME type allowlist on file uploads (blocks executables)
- [x] File size limits on uploads
- [x] Parameterized queries via Prisma (prevents SQL injection)
- [x] `PublishStatus.PUBLISHED` filter on all public queries (no draft leakage)
- [x] Security headers via `next.config.ts` (X-Frame-Options, X-Content-Type-Options, etc.)
- [x] Admin credentials stored as bcrypt hash, not plaintext
- [x] Environment variable validation at startup

---

## Performance

- **ISR**: `export const revalidate = 300` on public pages (5-minute cache)
- **Tag-based invalidation**: `revalidateTag("projects")` on admin mutations
- **Database indexes**: on `slug`, `status`, `featured`, join table foreign keys
- **Parallel queries**: `Promise.all` used throughout for concurrent DB calls
- **Pagination**: all list endpoints paginate (default limit 20)
- **CDN**: Vercel Edge Network caches static and ISR pages

---

## Adding New Content Types

1. Add the model to `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add-<model>`
3. Create a Zod schema in `src/lib/validations/<model>.ts`
4. Create server actions in `src/lib/actions/<model>.ts`
5. Add a public API route in `src/app/api/<model>/route.ts`
6. Add an admin page in `src/app/admin/<model>/page.tsx`
7. Add to the sitemap if the content is page-level
8. Add seed data to `prisma/seed.ts` if initial data is needed

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. The `vercel.json` build command runs `prisma generate && next build`
5. Run migrations against production database from your local machine:
   ```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   ```
6. Run the seed against production:
   ```bash
   DATABASE_URL="<production-url>" npm run prisma:seed
   ```

---

## Development Commands

```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run prisma:studio    # Open Prisma Studio (database GUI)
npm run prisma:migrate   # Create and apply migration
npm run prisma:seed      # Seed initial data
npm run prisma:generate  # Regenerate Prisma client
npm run type-check       # TypeScript type checking
npm run lint             # ESLint
```
