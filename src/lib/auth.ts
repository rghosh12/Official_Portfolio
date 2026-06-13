import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { role?: string; id?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isApiAdminRoute = nextUrl.pathname.startsWith("/api/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";

      if (isLoginPage) return true;
      if (isAdminRoute || isApiAdminRoute) return isLoggedIn;
      return true;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Check against admin credentials from env
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPasswordHash) return null;
        if (email !== adminEmail) return null;

        // Dynamic import to avoid bundling bcrypt in all routes
        const bcrypt = await import("bcryptjs").catch(() => null);
        if (!bcrypt) return null;

        const passwordValid = await bcrypt.compare(password, adminPasswordHash);
        if (!passwordValid) return null;

        // Find or create admin user in DB
        let user = await db.user.findUnique({ where: { email } });
        if (!user) {
          user = await db.user.create({
            data: {
              email,
              name: "Admin",
              role: "admin",
              passwordHash: adminPasswordHash,
            },
          });
        }

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
});

export type AuthSession = Awaited<ReturnType<typeof auth>>;
