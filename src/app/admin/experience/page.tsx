import { db } from "@/lib/db";
import Link from "next/link";
import type { PublishStatus } from "@prisma/client";

interface Props {
  searchParams: { status?: string; category?: string };
}

export default async function AdminExperiencePage({ searchParams }: Props) {
  const status = searchParams.status as PublishStatus | undefined;
  const category = searchParams.category;

  const experiences = await db.experience.findMany({
    where: {
      ...(status && { status }),
      ...(category && { category: category as never }),
    },
    include: {
      institution: { select: { name: true, shortName: true } },
      _count: { select: { experienceMethods: true, projectExperiences: true } },
    },
    orderBy: [{ isCurrent: "desc" }, { startDate: "desc" }],
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Experience</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{experiences.length} entries</p>
        </div>
        <Link
          href="/admin/experience/new"
          style={{
            padding: "0.625rem 1.25rem",
            background: "var(--accent)",
            color: "var(--accent-foreground)",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          + New Entry
        </Link>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Role", "Institution", "Category", "Period", "Status", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: "500" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span style={{ fontWeight: "500" }}>{exp.roleTitle}</span>
                  {exp.isCurrent && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", background: "#dcfce7", color: "#166534", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>
                      Current
                    </span>
                  )}
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)" }}>
                  {exp.institution?.shortName ?? exp.institution?.name ?? "—"}
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
                  {exp.category}
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
                  {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  {" – "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                    : "Present"}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span
                    style={{
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      background: exp.status === "PUBLISHED" ? "#dcfce7" : "#f3f4f6",
                      color: exp.status === "PUBLISHED" ? "#166534" : "#374151",
                    }}
                  >
                    {exp.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <Link
                    href={`/admin/experience/${exp.id}/edit`}
                    style={{ color: "var(--accent)", fontSize: "0.8rem" }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>
                  No experience entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
