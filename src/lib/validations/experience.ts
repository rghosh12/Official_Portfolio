import { z } from "zod";
import { PublishStatus, ExperienceCategory, EmploymentType } from "@prisma/client";

export const experienceSchema = z.object({
  roleTitle: z.string().min(1).max(200),
  institutionId: z.string().cuid().optional().nullable(),
  employmentType: z.nativeEnum(EmploymentType).default(EmploymentType.RESEARCH_ASSISTANT),
  category: z.nativeEnum(ExperienceCategory).default(ExperienceCategory.RESEARCH),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  isCurrent: z.boolean().default(false),
  location: z.string().max(200).optional().nullable(),
  summary: z.string().max(500).optional().nullable(),
  longDescription: z.string().optional().nullable(),
  responsibilities: z.array(z.string()).default([]),
  outcomes: z.array(z.string()).default([]),
  supervisor: z.string().max(200).optional().nullable(),
  displayPriority: z.number().int().default(0),
  status: z.nativeEnum(PublishStatus).default(PublishStatus.DRAFT),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  methodIds: z.array(z.string()).default([]),
  collaboratorIds: z.array(z.string()).default([]),
});

export const experienceQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.nativeEnum(ExperienceCategory).optional(),
  institutionId: z.string().optional(),
  year: z.coerce.number().int().optional(),
  current: z.coerce.boolean().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ExperienceQuery = z.infer<typeof experienceQuerySchema>;
