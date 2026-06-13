"use server";

import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { outputSchema, outputQuerySchema } from "@/lib/validations/output";
import { PublishStatus } from "@prisma/client";
import type { OutputInput, OutputQuery } from "@/lib/validations/output";
import { buildPaginationMeta } from "@/lib/utils";

export async function getOutputs(rawQuery: Partial<OutputQuery> = {}) {
  const query = outputQuerySchema.parse(rawQuery);
  const { page, limit, type, featured, year, projectId } = query;

  const where = {
    status: PublishStatus.PUBLISHED,
    ...(type && { type }),
    ...(featured !== undefined && { featured }),
    ...(year && {
      date: { gte: new Date(year, 0, 1), lte: new Date(year, 11, 31) },
    }),
    ...(projectId && { projectOutputs: { some: { projectId } } }),
  };

  const [total, outputs] = await Promise.all([
    db.output.count({ where }),
    db.output.findMany({
      where,
      include: {
        projectOutputs: {
          include: {
            project: { select: { id: true, title: true, slug: true } },
          },
        },
      },
      orderBy: [{ featured: "desc" }, { date: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { data: outputs, meta: buildPaginationMeta(total, page, limit) };
}

export async function createOutput(input: OutputInput) {
  const data = outputSchema.parse(input);
  const { projectIds, ...rest } = data;

  const output = await db.output.create({
    data: {
      ...rest,
      projectOutputs: { create: projectIds.map((id) => ({ projectId: id })) },
      ...(rest.status === PublishStatus.PUBLISHED && { publishedAt: new Date() }),
    },
  });

  revalidateTag("outputs");
  return output;
}

export async function updateOutput(id: string, input: Partial<OutputInput>) {
  const { projectIds, ...rest } = input;

  const output = await db.output.update({
    where: { id },
    data: {
      ...rest,
      ...(projectIds !== undefined && {
        projectOutputs: {
          deleteMany: {},
          create: projectIds.map((pid) => ({ projectId: pid })),
        },
      }),
    },
  });

  revalidateTag("outputs");
  return output;
}

export async function deleteOutput(id: string) {
  const output = await db.output.delete({ where: { id } });
  revalidateTag("outputs");
  return output;
}
