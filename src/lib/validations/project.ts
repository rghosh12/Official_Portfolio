import { z } from "zod";
import { PublishStatus, ProjectStatus } from "@prisma/client";

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  subtitle: z.string().max(300).optional().nullable(),
  summary: z.string().max(500).optional().nullable(),
  fullDescription: z.string().optional().nullable(),
  problemStatement: z.string().optional().nullable(),
  researchQuestion: z.string().optional().nullable(),
  role: z.string().max(200).optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  projectStatus: z.nativeEnum(ProjectStatus).default(ProjectStatus.ACTIVE),
  discipline: z.string().max(100).optional().nullable(),
  featured: z.boolean().default(false),
  repositoryUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  posterUrl: z.string().url().optional().nullable(),
  publicationUrl: z.string().url().optional().nullable(),
  heroImageUrl: z.string().url().optional().nullable(),
  results: z.string().optional().nullable(),
  limitations: z.string().optional().nullable(),
  futureWork: z.string().optional().nullable(),
  citations: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  displayPriority: z.number().int().default(0),
  status: z.nativeEnum(PublishStatus).default(PublishStatus.DRAFT),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  seoImageUrl: z.string().url().optional().nullable(),
  methodIds: z.array(z.string()).default([]),
  experienceIds: z.array(z.string()).default([]),
  collaboratorIds: z.array(z.string()).default([]),
  institutionIds: z.array(z.string()).default([]),
  outputIds: z.array(z.string()).default([]),
  researchInterestIds: z.array(z.string()).default([]),
});

export const projectUpdateSchema = projectSchema.partial().extend({
  id: z.string().cuid(),
});

export const projectQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.nativeEnum(PublishStatus).optional(),
  projectStatus: z.nativeEnum(ProjectStatus).optional(),
  discipline: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  methodId: z.string().optional(),
  institutionId: z.string().optional(),
  year: z.coerce.number().int().optional(),
  q: z.string().max(200).optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectQuery = z.infer<typeof projectQuerySchema>;
