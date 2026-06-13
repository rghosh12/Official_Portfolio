"use server";

import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { PublishStatus } from "@prisma/client";
import { z } from "zod";

const methodSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string().max(100).optional().nullable(),
  description: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
});

export async function getMethods(category?: string) {
  return db.method.findMany({
    where: category ? { category: { equals: category, mode: "insensitive" } } : undefined,
    include: {
      projectMethods: {
        include: {
          project: {
            select: { id: true, title: true, slug: true, discipline: true, status: true },
          },
        },
      },
      experienceMethods: {
        include: {
          experience: {
            select: { id: true, roleTitle: true, status: true },
          },
        },
      },
      _count: { select: { projectMethods: true, experienceMethods: true } },
    },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
}

export async function getMethodCategories() {
  const methods = await db.method.findMany({
    where: { category: { not: null } },
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return methods.map((m) => m.category!).filter(Boolean);
}

export async function createMethod(input: z.infer<typeof methodSchema>) {
  const data = methodSchema.parse(input);
  const method = await db.method.create({ data });
  revalidateTag("methods");
  return method;
}

export async function updateMethod(id: string, input: Partial<z.infer<typeof methodSchema>>) {
  const method = await db.method.update({ where: { id }, data: input });
  revalidateTag("methods");
  return method;
}

export async function deleteMethod(id: string) {
  const method = await db.method.delete({ where: { id } });
  revalidateTag("methods");
  return method;
}
