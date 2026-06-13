/**
 * Shared TypeScript types for the portfolio.
 * Prisma-generated types are available via @prisma/client.
 * These are convenience aliases and extended types for API responses.
 */

import type { Prisma } from "@prisma/client";

// ─── Project types ────────────────────────────────────────────────────────

export type ProjectCard = Prisma.ProjectGetPayload<{
  include: {
    projectMethods: { include: { method: true } };
    projectInstitutions: { include: { institution: true } };
    projectCollaborators: { include: { collaborator: true } };
  };
}>;

export type ProjectDetail = Prisma.ProjectGetPayload<{
  include: {
    projectMethods: { include: { method: true } };
    projectExperiences: {
      include: {
        experience: {
          include: { institution: true };
        };
      };
    };
    projectCollaborators: { include: { collaborator: { include: { institution: true } } } };
    projectInstitutions: { include: { institution: true } };
    projectOutputs: { include: { output: true } };
    projectUpdates: {
      include: { mediaAssets: true };
    };
    researchInterestProjects: { include: { researchInterest: true } };
    mediaAssets: true;
  };
}>;

// ─── Experience types ─────────────────────────────────────────────────────

export type ExperienceWithRelations = Prisma.ExperienceGetPayload<{
  include: {
    institution: true;
    experienceMethods: { include: { method: true } };
    experienceCollaborators: { include: { collaborator: true } };
    projectExperiences: {
      include: {
        project: true;
      };
    };
  };
}>;

// ─── Method types ─────────────────────────────────────────────────────────

export type MethodWithCounts = Prisma.MethodGetPayload<{
  include: {
    _count: { select: { projectMethods: true; experienceMethods: true } };
  };
}>;

// ─── Search result grouping ───────────────────────────────────────────────

export type SearchResultGroup = {
  type: "project" | "experience" | "method" | "output" | "researchInterest";
  label: string;
  items: Array<{
    id: string;
    title: string;
    href?: string;
    description?: string | null;
  }>;
};

// ─── API response envelope ────────────────────────────────────────────────

export type ApiResponse<T> = { data: T; error?: never } | { data?: never; error: string };

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedApiResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
