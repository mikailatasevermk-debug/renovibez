import { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CONSUMER" | "CONTRACTOR" | "ADMIN";
    } & DefaultSession["user"]
  }
  
  interface User {
    id: string;
    role: "CONSUMER" | "CONTRACTOR" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "CONSUMER" | "CONTRACTOR" | "ADMIN";
  }
}

export const authOptions: NextAuthOptions = {
  // @ts-expect-error - Type mismatch between adapter versions
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Optional role hint for validation
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        // If role is specified in credentials (for role-specific login pages), validate it
        if (credentials.role && user.role !== credentials.role) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as "CONSUMER" | "CONTRACTOR" | "ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "CONSUMER" | "CONTRACTOR" | "ADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/nl/login",
  },
};

// Helper function to get server session
export const auth = () => getServerSession(authOptions);