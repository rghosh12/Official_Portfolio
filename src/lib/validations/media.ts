import { z } from "zod";
import { MediaType } from "@prisma/client";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
export const ALLOWED_MIME_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export const mediaUploadSchema = z.object({
  altText: z.string().max(300).optional(),
  caption: z.string().max(500).optional(),
  credit: z.string().max(200).optional(),
  type: z.nativeEnum(MediaType).default(MediaType.IMAGE),
  projectId: z.string().cuid().optional(),
  projectUpdateId: z.string().cuid().optional(),
  methodId: z.string().cuid().optional(),
  outputId: z.string().cuid().optional(),
  displayOrder: z.number().int().default(0),
});

export type MediaUploadInput = z.infer<typeof mediaUploadSchema>;
