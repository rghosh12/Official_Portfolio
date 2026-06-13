import { db } from "@/lib/db";
import { PublishStatus } from "@prisma/client";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    projectCount,
    draftProjectCount,
    experienceCount,
    outputCount,
    unreadContactCount,
    mediaCount,
  ] = await Promise.all([
    db.project.count({ where: { status: PublishStatus.PUBLISHED } }),
    db.project.count({ where: { status: PublishStatus.DRAFT } }),
    db.experience.count({ where: { status: PublishStatus.PUBLISHED } }),
    db.output.count({ where: { status: PublishStatus.PUBLISHED } }),
    db.contactSubmission.count({ where: { isRead: false, isSpam: false } }),
    db.mediaAsset.count(),
  ]);

  const stats = [
    { label: "Published Projects", value: projectCount, href: "/admin/projects" },
    { label: "Draft Projects", value: draftProjectCount, href: "/admin/projects?status=DRAFT" },
    { label: "Experience Entries", value: experienceCount, href: "/admin/experience" },
    { label: "Outputs", value: outputCount, href: "/admin/outputs" },
    { label: "Unread Messages", value: unreadContactCount, href: "/admin/contact", alert: unreadContactCount > 0 },
    { label: "Media Assets", value: mediaCount, href: "/admin/media" },
  ];

  const recentProjects = await db.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { id: true, title: true, slug: true, status: true, updatedAt: true },
  });

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>Dashboard</h1>
      <p style={{ color: "var(--muted-foreground)", marginBottom: "2rem", fontSize: "0.875rem" }}>
        Portfolio content overview
      </p>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        {stats.map(({ label, value, href, alert }) => (
          <Link
            key={label}
            href={href}
            style={{
              display: "block",
              padding: "1.25rem",
              background: alert ? "#fef3c7" : "var(--muted)",
              border: `1px solid ${alert ? "#f59e0b" : "var(--border)"}`,
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                lineHeight: 1,
                marginBottom: "0.25rem",
                color: alert ? "#b45309" : "var(--foreground)",
              }}
            >
              {value}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: "600" }}>Recently Updated Projects</h2>
          <Link
            href="/admin/projects/new"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}
          >
            + New Project
          </Link>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Title", "Status", "Updated", "Actions"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: "500" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr
                  key={project.id}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "0.75rem 1rem" }}>{project.title}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        background:
                          project.status === "PUBLISHED"
                            ? "#dcfce7"
                            : project.status === "DRAFT"
                              ? "#f3f4f6"
                              : "#fef3c7",
                        color:
                          project.status === "PUBLISHED"
                            ? "#166534"
                            : project.status === "DRAFT"
                              ? "#374151"
                              : "#92400e",
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--muted-foreground)" }}>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      style={{ color: "var(--accent)", fontSize: "0.8rem", marginRight: "0.75rem" }}
                    >
                      Edit
                    </Link>
                    {project.status === PublishStatus.PUBLISHED && (
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}
                      >
                        View ↗
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
              {recentProjects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ padding: "2rem", textAlign: "center", color: "var(--muted-foreground)" }}
                  >
                    No projects yet.{" "}
                    <Link href="/admin/projects/new" style={{ color: "var(--accent)" }}>
                      Create your first project
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
