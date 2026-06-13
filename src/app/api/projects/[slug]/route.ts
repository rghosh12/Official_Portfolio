import { NextRequest, NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/actions/projects";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const project = await getProjectBySlug(params.slug);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error(`GET /api/projects/${params.slug} error:`, error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
