import { NextRequest, NextResponse } from "next/server";
import { getOutputs } from "@/lib/actions/outputs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    const result = await getOutputs(query);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("GET /api/outputs error:", error);
    return NextResponse.json({ error: "Failed to fetch outputs" }, { status: 500 });
  }
}
