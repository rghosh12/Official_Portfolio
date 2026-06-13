import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mediaUploadSchema, ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/validations/media";
import { MediaType } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type '${file.type}' is not allowed` },
        { status: 415 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 413 }
      );
    }

    // Parse metadata
    const metaRaw = formData.get("meta");
    const meta = metaRaw
      ? mediaUploadSchema.parse(JSON.parse(String(metaRaw)))
      : mediaUploadSchema.parse({});

    // Upload to Vercel Blob
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
    }

    const { put } = await import("@vercel/blob");
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const blob = await put(`portfolio/${filename}`, file, {
      access: "public",
      token: blobToken,
    });

    // Get image dimensions if applicable
    let width: number | undefined;
    let height: number | undefined;
    if (file.type.startsWith("image/") && !file.type.includes("svg")) {
      try {
        const sharp = (await import("sharp")).default;
        const buffer = Buffer.from(await file.arrayBuffer());
        const metadata = await sharp(buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch {
        // Sharp is optional
      }
    }

    // Determine media type
    let mediaType: MediaType = MediaType.IMAGE;
    if (file.type === "application/pdf") mediaType = MediaType.PDF;
    else if (file.type.includes("presentation")) mediaType = MediaType.PRESENTATION;

    // Save to database
    const asset = await db.mediaAsset.create({
      data: {
        type: meta.type ?? mediaType,
        url: blob.url,
        altText: meta.altText,
        caption: meta.caption,
        credit: meta.credit,
        width,
        height,
        fileSize: file.size,
        mimeType: file.type,
        originalName: file.name,
        displayOrder: meta.displayOrder ?? 0,
        isPublished: false,
        projectId: meta.projectId,
        projectUpdateId: meta.projectUpdateId,
        methodId: meta.methodId,
        outputId: meta.outputId,
      },
    });

    return NextResponse.json({ asset, url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
