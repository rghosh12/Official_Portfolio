import { db } from "@/lib/db";
import Link from "next/link";
import type { PublishStatus } from "@prisma/client";

interface Props {
  searchParams: { status?: string; page?: string };
}

export default async function AdminProjectsPage({ searchParams }: Props) {
  const status = searchParams.status as PublishStatus | undefined;
  const page = parseInt(searchParams.page ?? "1");
  const limit = 20;

  const where = status ? { status } : {};

  const [total, projects] = await Promise.all([
    db.project.count({ where }),
    db.project.findMany({
      where,
      orderBy: [{ updatedAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        projectInstitutions: {
          include: { institution: { select: { shortName: true } } },
        },
        _count: { select: { projectMethods: true, projectUpdates: true } },
      },
    }),
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Projects</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{total} entries</p>
        </div>
        <Link
          href="/admin/projects/new"
          style={{
            padding: "0.625rem 1.25rem",
            background: "var(--accent)",
            color: "var(--accent-foreground)",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          + New Project
        </Link>
      </div>

      {/* Status filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {[
          { label: "All", value: "" },
          { label: "Published", value: "PUBLISHED" },
          { label: "Draft", value: "DRAFT" },
          { label: "In Review", value: "IN_REVIEW" },
          { label: "Archived", value: "ARCHIVED" },
        ].map(({ label, value }) => (
          <Link
            key={value}
            href={value ? `/admin/projects?status=${value}` : "/admin/projects"}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              border: "1px solid var(--border)",
              background: (status ?? "") === value ? "var(--accent)" : "transparent",
              color: (status ?? "") === value ? "var(--accent-foreground)" : "var(--foreground)",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Title", "Discipline", "Status", "Methods", "Updated", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: "500" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div>
                    <span style={{ fontWeight: "500" }}>{project.title}</span>
                    {project.featured && (
                      <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", background: "#fef3c7", color: "#92400e", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{project.slug}</div>
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)" }}>
                  {project.discipline ?? "—"}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <StatusBadge status={project.status} />
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)" }}>
                  {project._count.projectMethods}
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)" }}>
                  {new Date(project.updatedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <Link href={`/admin/projects/${project.id}/edit`} style={{ color: "var(--accent)", marginRight: "0.75rem", fontSize: "0.8rem" }}>
                    Edit
                  </Link>
                  {project.status === "PUBLISHED" && (
                    <Link href={`/projects/${project.slug}`} target="_blank" style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
                      View ↗
                    </Link>
                  )}
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > limit && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {page > 1 && (
            <Link
              href={`/admin/projects?page=${page - 1}${status ? `&status=${status}` : ""}`}
              style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "6px", fontSize: "0.875rem" }}
            >
              Previous
            </Link>
          )}
          {page * limit < total && (
            <Link
              href={`/admin/projects?page=${page + 1}${status ? `&status=${status}` : ""}`}
              style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "6px", fontSize: "0.875rem" }}
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    PUBLISHED: { bg: "#dcfce7", color: "#166534" },
    DRAFT: { bg: "#f3f4f6", color: "#374151" },
    IN_REVIEW: { bg: "#dbeafe", color: "#1e40af" },
    ARCHIVED: { bg: "#fef3c7", color: "#92400e" },
  };
  const style = styles[status] ?? { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "500", background: style.bg, color: style.color }}>
      {status}
    </span>
  );
}
