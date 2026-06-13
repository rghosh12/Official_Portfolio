"use server";

import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactNotification } from "@/lib/email";
import type { ContactInput } from "@/lib/validations/contact";

export type ContactResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  // Validate input
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  // Honeypot check
  if (data.honeypot && data.honeypot.length > 0) {
    // Silently succeed to not reveal bot detection
    return { success: true };
  }

  // Save to database
  try {
    await db.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        organization: data.organization,
        reason: data.reason,
        message: data.message,
        projectReference: data.projectReference,
        honeypot: data.honeypot,
      },
    });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }

  // Send email notification (non-blocking — don't fail if email fails)
  sendContactNotification(data).catch(console.error);

  return { success: true };
}
