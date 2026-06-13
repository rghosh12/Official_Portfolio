import { z } from "zod";
import { PublishStatus, OutputType } from "@prisma/client";

export const outputSchema = z.object({
  title: z.string().min(1).max(500),
  type: z.nativeEnum(OutputType).default(OutputType.JOURNAL_ARTICLE),
  date: z.coerce.date().optional().nullable(),
  authors: z.array(z.string()).default([]),
  abstract: z.string().optional().nullable(),
  citation: z.string().optional().nullable(),
  doi: z.string().max(200).optional().nullable(),
  fileUrl: z.string().url().optional().nullable(),
  externalUrl: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  institutionId: z.string().cuid().optional().nullable(),
  experienceId: z.string().cuid().optional().nullable(),
  status: z.nativeEnum(PublishStatus).default(PublishStatus.PUBLISHED),
  projectIds: z.array(z.string()).default([]),
});

export const outputQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  type: z.nativeEnum(OutputType).optional(),
  featured: z.coerce.boolean().optional(),
  year: z.coerce.number().int().optional(),
  projectId: z.string().optional(),
});

export type OutputInput = z.infer<typeof outputSchema>;
export type OutputQuery = z.infer<typeof outputQuerySchema>;
