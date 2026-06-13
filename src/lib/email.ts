import nodemailer from "nodemailer";
import type { ContactInput } from "@/lib/validations/contact";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("SMTP not configured — emails will not be sent");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactNotification(data: ContactInput): Promise<boolean> {
  const transport = createTransport();
  if (!transport) return false;

  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM ?? process.env.SMTP_USER;

  if (!to) return false;

  const reasonLabels: Record<string, string> = {
    research: "Research Inquiry",
    collaboration: "Collaboration",
    employment: "Employment / Opportunity",
    media: "Media",
    general: "General",
    other: "Other",
  };

  try {
    await transport.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `[Portfolio] ${reasonLabels[data.reason] ?? data.reason} — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Organization: ${data.organization ?? "—"}`,
        `Reason: ${reasonLabels[data.reason] ?? data.reason}`,
        `Project Reference: ${data.projectReference ?? "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <h2>New Contact Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;">
          <tr><th align="left">Name</th><td>${escapeHtml(data.name)}</td></tr>
          <tr><th align="left">Email</th><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><th align="left">Organization</th><td>${escapeHtml(data.organization ?? "—")}</td></tr>
          <tr><th align="left">Reason</th><td>${escapeHtml(reasonLabels[data.reason] ?? data.reason)}</td></tr>
          <tr><th align="left">Project Reference</th><td>${escapeHtml(data.projectReference ?? "—")}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
