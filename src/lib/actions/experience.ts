"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { experienceSchema, experienceQuerySchema } from "@/lib/validations/experience";
import { PublishStatus } from "@prisma/client";
import type { ExperienceInput, ExperienceQuery } from "@/lib/validations/experience";
import { buildPaginationMeta } from "@/lib/utils";

export async function getExperiences(rawQuery: Partial<ExperienceQuery> = {}) {
  const query = experienceQuerySchema.parse(rawQuery);
  const { page, limit, category, institutionId, year, current, status } = query;

  const where = {
    ...(status !== undefined ? { status } : { status: PublishStatus.PUBLISHED }),
    ...(category && { category }),
    ...(institutionId && { institutionId }),
    ...(current !== undefined && { isCurrent: current }),
    ...(year && {
      startDate: { lte: new Date(year, 11, 31) },
      OR: [{ endDate: null }, { endDate: { gte: new Date(year, 0, 1) } }],
    }),
  };

  const [total, experiences] = await Promise.all([
    db.experience.count({ where }),
    db.experience.findMany({
      where,
      include: {
        institution: { select: { id: true, name: true, shortName: true, logoUrl: true } },
        experienceMethods: { include: { method: { select: { id: true, name: true, category: true } } } },
        experienceCollaborators: {
          include: { collaborator: { select: { id: true, name: true, role: true } } },
        },
      },
      orderBy: [{ isCurrent: "desc" }, { startDate: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data: experiences, meta: buildPaginationMeta(total, page, limit) };
}

export async function getCurrentWork() {
  return db.experience.findMany({
    where: { isCurrent: true, status: PublishStatus.PUBLISHED },
    include: {
      institution: true,
      experienceMethods: { include: { method: true } },
      projectExperiences: {
        include: {
          project: {
            select: { id: true, title: true, slug: true, summary: true, status: true },
          },
        },
      },
    },
    orderBy: { displayPriority: "desc" },
  });
}

export async function getExperienceTimeline() {
  const experiences = await db.experience.findMany({
    where: { status: PublishStatus.PUBLISHED },
    include: {
      institution: { select: { id: true, name: true, shortName: true, logoUrl: true, location: true } },
      experienceMethods: { include: { method: { select: { id: true, name: true } } } },
    },
    orderBy: [{ isCurrent: "desc" }, { startDate: "desc" }],
  });

  const education = await db.education.findMany({
    where: { status: PublishStatus.PUBLISHED },
    include: {
      institution: { select: { id: true, name: true, shortName: true, logoUrl: true } },
    },
    orderBy: { startDate: "desc" },
  });

  return { experiences, education };
}

export async function createExperience(input: ExperienceInput) {
  const data = experienceSchema.parse(input);
  const { methodIds, collaboratorIds, ...rest } = data;

  const experience = await db.experience.create({
    data: {
      ...rest,
      experienceMethods: { create: methodIds.map((id) => ({ methodId: id })) },
      experienceCollaborators: { create: collaboratorIds.map((id) => ({ collaboratorId: id })) },
      ...(rest.status === PublishStatus.PUBLISHED && { publishedAt: new Date() }),
    },
  });

  revalidateTag("experience");
  revalidatePath("/");
  return experience;
}

export async function updateExperience(id: string, input: Partial<ExperienceInput>) {
  const { methodIds, collaboratorIds, ...rest } = input;

  const experience = await db.experience.update({
    where: { id },
    data: {
      ...rest,
      ...(methodIds !== undefined && {
        experienceMethods: { deleteMany: {}, create: methodIds.map((mid) => ({ methodId: mid })) },
      }),
      ...(collaboratorIds !== undefined && {
        experienceCollaborators: {
          deleteMany: {},
          create: collaboratorIds.map((cid) => ({ collaboratorId: cid })),
        },
      }),
    },
  });

  revalidateTag("experience");
  revalidatePath("/");
  return experience;
}

export async function deleteExperience(id: string) {
  const experience = await db.experience.delete({ where: { id } });
  revalidateTag("experience");
  return experience;
}
