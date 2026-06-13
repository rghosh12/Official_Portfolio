import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PublishStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const withProjects = searchParams.get("projects") === "true";
    const withMethods = searchParams.get("methods") === "true";

    const interests = await db.researchInterest.findMany({
      where: { status: PublishStatus.PUBLISHED, parentId: null },
      include: {
        children: {
          where: { status: PublishStatus.PUBLISHED },
          orderBy: { displayOrder: "asc" },
        },
        ...(withProjects && {
          researchInterestProjects: {
            include: {
              project: {
                select: { id: true, title: true, slug: true, summary: true, discipline: true, status: true },
              },
            },
          },
        }),
        ...(withMethods && {
          researchInterestMethods: {
            include: {
              method: { select: { id: true, name: true, category: true } },
            },
          },
        }),
      },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(
      { data: interests },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (error) {
    console.error("GET /api/research-interests error:", error);
    return NextResponse.json({ error: "Failed to fetch research interests" }, { status: 500 });
  }
}
