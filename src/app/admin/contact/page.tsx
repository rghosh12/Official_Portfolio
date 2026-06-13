import { db } from "@/lib/db";

interface Props {
  searchParams: { page?: string; unread?: string };
}

export default async function AdminContactPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page ?? "1");
  const onlyUnread = searchParams.unread === "true";
  const limit = 25;

  const where = {
    isSpam: false,
    ...(onlyUnread && { isRead: false }),
  };

  const [total, submissions] = await Promise.all([
    db.contactSubmission.count({ where }),
    db.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>
        Contact Submissions
      </h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        {total} total · {submissions.filter((s) => !s.isRead).length} unread on this page
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {submissions.map((s) => (
          <div
            key={s.id}
            style={{
              padding: "1.25rem",
              border: `1px solid ${s.isRead ? "var(--border)" : "#60a5fa"}`,
              borderRadius: "10px",
              background: s.isRead ? "transparent" : "#eff6ff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontWeight: "600" }}>{s.name}</span>
                {!s.isRead && (
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", background: "#3b82f6", color: "white", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>
                    NEW
                  </span>
                )}
                <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                  <a href={`mailto:${s.email}`} style={{ color: "inherit" }}>{s.email}</a>
                  {s.organization && ` · ${s.organization}`}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  {new Date(s.createdAt).toLocaleString()}
                </p>
                <span style={{ fontSize: "0.75rem", background: "var(--muted)", padding: "0.1rem 0.5rem", borderRadius: "4px" }}>
                  {s.reason}
                </span>
              </div>
            </div>
            {s.projectReference && (
              <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
                Project ref: {s.projectReference}
              </p>
            )}
            <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {s.message}
            </p>
          </div>
        ))}
        {submissions.length === 0 && (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)", border: "1px solid var(--border)", borderRadius: "10px" }}>
            No contact submissions.
          </div>
        )}
      </div>
    </div>
  );
}
