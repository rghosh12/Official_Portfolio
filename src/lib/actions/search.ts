"use server";

import { db } from "@/lib/db";
import { PublishStatus } from "@prisma/client";
import { z } from "zod";

const searchQuerySchema = z.object({
  q: z.string().min(1).max(200).trim(),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchResult = {
  projects: Array<{
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    discipline: string | null;
  }>;
  experiences: Array<{
    id: string;
    roleTitle: string;
    summary: string | null;
    institution: { name: string } | null;
  }>;
  methods: Array<{ id: string; name: string; category: string | null; description: string | null }>;
  outputs: Array<{ id: string; title: string; type: string; date: Date | null }>;
  researchInterests: Array<{ id: string; name: string; description: string | null }>;
};

export async function search(rawQuery: unknown): Promise<SearchResult> {
  const { q, limit } = searchQuerySchema.parse(rawQuery);

  // Use PostgreSQL full-text search via Prisma raw + contain fallback
  const searchTerms = q
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => `%${t}%`);

  const likeCondition = (field: string) =>
    searchTerms.map(() => `${field} ILIKE $1`).join(" OR ").replace(/\$1/g, "?");

  // Use contains mode which maps to ILIKE in Postgres
  const [projects, experiences, methods, outputs, researchInterests] = await Promise.all([
    db.project.findMany({
      where: {
        status: PublishStatus.PUBLISHED,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
          { fullDescription: { contains: q, mode: "insensitive" } },
          { discipline: { contains: q, mode: "insensitive" } },
          { technologies: { has: q } },
        ],
      },
      select: { id: true, title: true, slug: true, summary: true, discipline: true },
      take: limit,
    }),
    db.experience.findMany({
      where: {
        status: PublishStatus.PUBLISHED,
        OR: [
          { roleTitle: { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
          { longDescription: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        roleTitle: true,
        summary: true,
        institution: { select: { name: true } },
      },
      take: limit,
    }),
    db.method.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { id: true, name: true, category: true, description: true },
      take: limit,
    }),
    db.output.findMany({
      where: {
        status: PublishStatus.PUBLISHED,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { abstract: { contains: q, mode: "insensitive" } },
          { citation: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { id: true, title: true, type: true, date: true },
      take: limit,
    }),
    db.researchInterest.findMany({
      where: {
        status: PublishStatus.PUBLISHED,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { id: true, name: true, description: true },
      take: limit,
    }),
  ]);

  return { projects, experiences, methods, outputs, researchInterests };
}

// Lightweight autocomplete
export async function autocomplete(q: string): Promise<string[]> {
  if (!q || q.length < 2) return [];

  const [projects, methods, interests] = await Promise.all([
    db.project.findMany({
      where: { status: PublishStatus.PUBLISHED, title: { startsWith: q, mode: "insensitive" } },
      select: { title: true },
      take: 5,
    }),
    db.method.findMany({
      where: { name: { startsWith: q, mode: "insensitive" } },
      select: { name: true },
      take: 5,
    }),
    db.researchInterest.findMany({
      where: { name: { startsWith: q, mode: "insensitive" } },
      select: { name: true },
      take: 5,
    }),
  ]);

  const suggestions = [
    ...projects.map((p) => p.title),
    ...methods.map((m) => m.name),
    ...interests.map((i) => i.name),
  ];

  return Array.from(new Set(suggestions)).slice(0, 10);
}
