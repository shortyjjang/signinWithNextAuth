import { authOptions } from "@/auth";
import NextAuth, { NextAuthConfig } from "next-auth";

const handler = NextAuth(authOptions as NextAuthConfig);

export { handler as GET, handler as POST };
