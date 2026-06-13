import { NextRequest, NextResponse } from "next/server";
import { submitContact } from "@/lib/actions/contact";
import { contactSchema } from "@/lib/validations/contact";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // Rate limit: 3 contact submissions per 10 minutes per IP
  const rl = await rateLimit(`contact:${ip}`, { limit: 3, window: 600 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Add IP to body for logging
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const result = await submitContact({ ...parsed.data, ipAddress: ip } as Parameters<typeof submitContact>[0]);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
