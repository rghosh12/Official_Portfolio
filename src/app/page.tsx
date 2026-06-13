import { getFeaturedProjects } from "@/lib/actions/projects";
import { getCurrentWork } from "@/lib/actions/experience";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function HomePage() {
  const [featuredProjects, currentWork] = await Promise.all([
    getFeaturedProjects(),
    getCurrentWork(),
  ]);

  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Rupak Ghosh
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--muted-foreground)", marginBottom: "2rem" }}>
          Cell & Molecular Biology · Computational Neuroscience · Bioinformatics ·
          Climate Technology
        </p>
        <p style={{ marginBottom: "3rem", lineHeight: "1.7" }}>
          Research portfolio site — backend is live. Frontend coming soon.
        </p>

        {currentWork.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Current Work
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {currentWork.map((exp) => (
                <li key={exp.id} style={{ padding: "1rem", background: "var(--muted)", borderRadius: "8px" }}>
                  <strong>{exp.roleTitle}</strong>
                  {(exp as { institution?: { name: string } | null }).institution && (
                    <span> — {(exp as { institution?: { name: string } | null }).institution!.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {featuredProjects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Featured Projects
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {featuredProjects.map((project) => (
                <li key={project.id} style={{ padding: "1rem", background: "var(--muted)", borderRadius: "8px" }}>
                  <strong>{project.title}</strong>
                  {project.discipline && (
                    <span style={{ color: "var(--muted-foreground)", marginLeft: "0.5rem" }}>
                      {project.discipline}
                    </span>
                  )}
                  {project.summary && <p style={{ marginTop: "0.25rem", fontSize: "0.875rem" }}>{project.summary}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
