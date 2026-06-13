"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "2rem",
          background: "var(--muted)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.25rem" }}>
          Admin Login
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "1.5rem" }}>
          Rupak Ghosh Portfolio
        </p>

        {error && (
          <div
            style={{
              padding: "0.75rem",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontSize: "0.875rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.625rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: "0.875rem",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "0.625rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: "0.875rem",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.625rem",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
