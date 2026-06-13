import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email required"),
  organization: z.string().max(200).optional(),
  reason: z.enum(["research", "collaboration", "employment", "media", "general", "other"], {
    errorMap: () => ({ message: "Please select a reason" }),
  }),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  projectReference: z.string().max(200).optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
