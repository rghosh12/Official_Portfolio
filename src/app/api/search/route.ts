import { NextRequest, NextResponse } from "next/server";
import { search, autocomplete } from "@/lib/actions/search";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const mode = searchParams.get("mode"); // "autocomplete" or full search

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  // Rate limit search: 30 req/min per IP
  const rl = await rateLimit(`search:${ip}`, { limit: 30, window: 60 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    if (mode === "autocomplete") {
      const suggestions = await autocomplete(q);
      return NextResponse.json({ suggestions });
    }

    const results = await search({ q, limit: searchParams.get("limit") ?? 10 });
    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
