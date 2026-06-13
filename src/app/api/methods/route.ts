import { NextRequest, NextResponse } from "next/server";
import { getMethods, getMethodCategories } from "@/lib/actions/methods";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const view = searchParams.get("view");

    if (view === "categories") {
      const categories = await getMethodCategories();
      return NextResponse.json({ data: categories });
    }

    const methods = await getMethods(category);
    return NextResponse.json(
      { data: methods },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (error) {
    console.error("GET /api/methods error:", error);
    return NextResponse.json({ error: "Failed to fetch methods" }, { status: 500 });
  }
}
