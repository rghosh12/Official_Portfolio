import { db } from "@/lib/db";
import type { MediaType } from "@prisma/client";

interface Props {
  searchParams: { type?: string; page?: string };
}

export default async function AdminMediaPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page ?? "1");
  const type = searchParams.type as MediaType | undefined;
  const limit = 30;

  const where = type ? { type } : {};

  const [total, assets] = await Promise.all([
    db.mediaAsset.count({ where }),
    db.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        project: { select: { title: true, slug: true } },
      },
    }),
  ]);

  const totalSizeBytes = await db.mediaAsset
    .aggregate({ where, _sum: { fileSize: true } })
    .then((r) => r._sum.fileSize ?? 0);

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Media Assets</h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
          {total} files · {(totalSizeBytes / 1024 / 1024).toFixed(1)} MB total
        </p>
      </div>

      {/* Type filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {["", "IMAGE", "PDF", "POSTER", "RESUME", "PRESENTATION", "DIAGRAM"].map((t) => (
          <a
            key={t}
            href={t ? `/admin/media?type=${t}` : "/admin/media"}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              border: "1px solid var(--border)",
              background: (type ?? "") === t ? "var(--accent)" : "transparent",
              color: (type ?? "") === t ? "var(--accent-foreground)" : "var(--foreground)",
              textDecoration: "none",
            }}
          >
            {t || "All"}
          </a>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {assets.map((asset) => (
          <div
            key={asset.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "var(--muted)",
            }}
          >
            {asset.type === "IMAGE" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset.url}
                alt={asset.altText ?? ""}
                style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
              />
            )}
            {asset.type !== "IMAGE" && (
              <div
                style={{
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "var(--muted-foreground)",
                }}
              >
                {asset.type === "PDF" ? "📄" : asset.type === "POSTER" ? "🗺️" : "📎"}
              </div>
            )}
            <div style={{ padding: "0.75rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: "500", marginBottom: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {asset.originalName ?? asset.url.split("/").pop()}
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>
                {asset.type}
                {asset.fileSize && ` · ${(asset.fileSize / 1024).toFixed(0)} KB`}
                {asset.width && asset.height && ` · ${asset.width}×${asset.height}`}
              </p>
              {asset.project && (
                <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
                  {asset.project.title}
                </p>
              )}
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: "0.7rem", color: "var(--accent)" }}
                >
                  View ↗
                </a>
              </div>
            </div>
          </div>
        ))}
        {assets.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              padding: "3rem",
              textAlign: "center",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          >
            No media assets yet.
          </div>
        )}
      </div>
    </div>
  );
}
