import { NextRequest, NextResponse } from "next/server";
import { getExperiences, getExperienceTimeline, getCurrentWork } from "@/lib/actions/experience";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    if (view === "timeline") {
      const result = await getExperienceTimeline();
      return NextResponse.json(result, {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
      });
    }

    if (view === "current") {
      const result = await getCurrentWork();
      return NextResponse.json(result, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    const query = Object.fromEntries(searchParams.entries());
    const result = await getExperiences(query);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("GET /api/experience error:", error);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}
