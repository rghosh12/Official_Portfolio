import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Login page doesn't need the shell
  // (middleware handles redirect, but we also skip the nav for the login page itself)

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)" }}>
      {session?.user && (
        <nav
          style={{
            width: "220px",
            flexShrink: 0,
            borderRight: "1px solid var(--border)",
            padding: "1.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Portfolio Admin
            </p>
          </div>

          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/projects", label: "Projects" },
            { href: "/admin/experience", label: "Experience" },
            { href: "/admin/education", label: "Education" },
            { href: "/admin/outputs", label: "Outputs" },
            { href: "/admin/methods", label: "Methods" },
            { href: "/admin/research-interests", label: "Research Interests" },
            { href: "/admin/collaborators", label: "Collaborators" },
            { href: "/admin/institutions", label: "Institutions" },
            { href: "/admin/media", label: "Media" },
            { href: "/admin/contact", label: "Contact" },
            { href: "/admin/links", label: "Links" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                color: "var(--foreground)",
                display: "block",
              }}
            >
              {label}
            </Link>
          ))}

          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
              {session.user.email}
            </p>
            <Link
              href="/api/auth/signout"
              style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}
            >
              Sign out
            </Link>
          </div>
        </nav>
      )}

      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>{children}</main>
    </div>
  );
}
