"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { projectSchema, projectQuerySchema } from "@/lib/validations/project";
import { PublishStatus } from "@prisma/client";
import type { ProjectInput, ProjectQuery } from "@/lib/validations/project";
import { buildPaginationMeta } from "@/lib/utils";

const PROJECT_SELECT = {
  id: true,
  title: true,
  slug: true,
  subtitle: true,
  summary: true,
  projectStatus: true,
  discipline: true,
  featured: true,
  startDate: true,
  endDate: true,
  heroImageUrl: true,
  repositoryUrl: true,
  demoUrl: true,
  technologies: true,
  status: true,
  displayPriority: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
  projectMethods: {
    select: { method: { select: { id: true, name: true, category: true } } },
  },
  projectInstitutions: {
    select: { institution: { select: { id: true, name: true, shortName: true, logoUrl: true } } },
  },
  projectCollaborators: {
    select: { collaborator: { select: { id: true, name: true, role: true } } },
  },
  _count: { select: { projectUpdates: true } },
} as const;

// ─── Public read (list) ────────────────────────────────────────────────────

export async function getProjects(rawQuery: Partial<ProjectQuery> = {}) {
  const query = projectQuerySchema.parse(rawQuery);
  const { page, limit, status, projectStatus, discipline, featured, methodId, institutionId, year } =
    query;

  const where = {
    ...(status !== undefined ? { status } : { status: PublishStatus.PUBLISHED }),
    ...(projectStatus && { projectStatus }),
    ...(discipline && { discipline: { contains: discipline, mode: "insensitive" as const } }),
    ...(featured !== undefined && { featured }),
    ...(methodId && { projectMethods: { some: { methodId } } }),
    ...(institutionId && { projectInstitutions: { some: { institutionId } } }),
    ...(year && {
      startDate: { gte: new Date(year, 0, 1), lte: new Date(year, 11, 31) },
    }),
  };

  const [total, projects] = await Promise.all([
    db.project.count({ where }),
    db.project.findMany({
      where,
      select: PROJECT_SELECT,
      orderBy: [{ displayPriority: "desc" }, { startDate: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data: projects, meta: buildPaginationMeta(total, page, limit) };
}

export async function getFeaturedProjects() {
  return db.project.findMany({
    where: { status: PublishStatus.PUBLISHED, featured: true },
    select: PROJECT_SELECT,
    orderBy: [{ displayPriority: "desc" }, { startDate: "desc" }],
    take: 6,
  });
}

export async function getProjectBySlug(slug: string) {
  return db.project.findUnique({
    where: { slug, status: PublishStatus.PUBLISHED },
    include: {
      projectMethods: { include: { method: true } },
      projectExperiences: {
        include: {
          experience: {
            include: { institution: { select: { id: true, name: true, logoUrl: true } } },
          },
        },
      },
      projectCollaborators: { include: { collaborator: { include: { institution: true } } } },
      projectInstitutions: { include: { institution: true } },
      projectOutputs: { include: { output: true } },
      projectUpdates: {
        where: { isPublic: true },
        orderBy: { date: "desc" },
        include: { mediaAssets: true },
      },
      researchInterestProjects: { include: { researchInterest: true } },
      mediaAssets: { where: { isPublished: true }, orderBy: { displayOrder: "asc" } },
    },
  });
}

// Preview (admin only — no status filter)
export async function getProjectBySlugPreview(slug: string) {
  return db.project.findUnique({
    where: { slug },
    include: {
      projectMethods: { include: { method: true } },
      projectExperiences: { include: { experience: { include: { institution: true } } } },
      projectCollaborators: { include: { collaborator: true } },
      projectInstitutions: { include: { institution: true } },
      projectOutputs: { include: { output: true } },
      projectUpdates: { orderBy: { date: "desc" }, include: { mediaAssets: true } },
      researchInterestProjects: { include: { researchInterest: true } },
      mediaAssets: { orderBy: { displayOrder: "asc" } },
    },
  });
}

// ─── Admin mutations ───────────────────────────────────────────────────────

export async function createProject(input: ProjectInput) {
  const data = projectSchema.parse(input);
  const {
    methodIds,
    experienceIds,
    collaboratorIds,
    institutionIds,
    outputIds,
    researchInterestIds,
    ...rest
  } = data;

  const project = await db.project.create({
    data: {
      ...rest,
      projectMethods: { create: methodIds.map((id) => ({ methodId: id })) },
      projectExperiences: { create: experienceIds.map((id) => ({ experienceId: id })) },
      projectCollaborators: { create: collaboratorIds.map((id) => ({ collaboratorId: id })) },
      projectInstitutions: { create: institutionIds.map((id) => ({ institutionId: id })) },
      projectOutputs: { create: outputIds.map((id) => ({ outputId: id })) },
      researchInterestProjects: {
        create: researchInterestIds.map((id) => ({ researchInterestId: id })),
      },
      ...(rest.status === PublishStatus.PUBLISHED && { publishedAt: new Date() }),
    },
  });

  revalidateTag("projects");
  revalidatePath("/");
  return project;
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  const {
    methodIds,
    experienceIds,
    collaboratorIds,
    institutionIds,
    outputIds,
    researchInterestIds,
    ...rest
  } = input;

  // Fetch current status to detect publish transition
  const current = await db.project.findUniqueOrThrow({ where: { id }, select: { status: true, publishedAt: true } });

  const project = await db.project.update({
    where: { id },
    data: {
      ...rest,
      ...(rest.status === PublishStatus.PUBLISHED && !current.publishedAt
        ? { publishedAt: new Date() }
        : {}),
      ...(methodIds !== undefined && {
        projectMethods: {
          deleteMany: {},
          create: methodIds.map((mid) => ({ methodId: mid })),
        },
      }),
      ...(experienceIds !== undefined && {
        projectExperiences: {
          deleteMany: {},
          create: experienceIds.map((eid) => ({ experienceId: eid })),
        },
      }),
      ...(collaboratorIds !== undefined && {
        projectCollaborators: {
          deleteMany: {},
          create: collaboratorIds.map((cid) => ({ collaboratorId: cid })),
        },
      }),
      ...(institutionIds !== undefined && {
        projectInstitutions: {
          deleteMany: {},
          create: institutionIds.map((iid) => ({ institutionId: iid })),
        },
      }),
      ...(outputIds !== undefined && {
        projectOutputs: {
          deleteMany: {},
          create: outputIds.map((oid) => ({ outputId: oid })),
        },
      }),
      ...(researchInterestIds !== undefined && {
        researchInterestProjects: {
          deleteMany: {},
          create: researchInterestIds.map((rid) => ({ researchInterestId: rid })),
        },
      }),
    },
  });

  revalidateTag("projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  return project;
}

export async function deleteProject(id: string) {
  const project = await db.project.delete({ where: { id } });
  revalidateTag("projects");
  revalidatePath("/");
  return project;
}

export async function publishProject(id: string) {
  const project = await db.project.update({
    where: { id },
    data: { status: PublishStatus.PUBLISHED, publishedAt: new Date() },
  });
  revalidateTag("projects");
  revalidatePath(`/projects/${project.slug}`);
  return project;
}

export async function unpublishProject(id: string) {
  const project = await db.project.update({
    where: { id },
    data: { status: PublishStatus.DRAFT },
  });
  revalidateTag("projects");
  revalidatePath(`/projects/${project.slug}`);
  return project;
}
