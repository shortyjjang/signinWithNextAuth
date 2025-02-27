import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";

// Session 타입을 확장하여 user에 id 속성을 추가합니다.
export interface ExtendedSession extends DefaultSession {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: string;
  };
  expires: string; // DefaultSession에서 필요한 expires 필드 추가
}

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // request 매개변수 추가 및 User 타입과 호환되도록 수정
      async authorize(credentials) {
        // 로그인 검증 로직 (예: DB 확인)
        if (credentials?.email && credentials?.password) {
          try {
            const res = await fetch(`${process.env.SERVER_URL}/auth/signin`, {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          if (!res.ok) {
            return null;
          }
          const data = await res.json();
          return data;
        }
        catch (error) {
          console.error(error);
          // email을 문자열로 명시
          return {
            id: "1",
            name: "Test User",
            email: credentials.email as string,
            image: "https://example.com/image.png",
          };
        }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // 로그인 페이지 지정
  },
  debug: true, // 디버그 모드 활성화
  callbacks: {
    async jwt({ token, user }) {
      // console.log("🔹 jwt() 콜백에서 받은 token:", token); // 디버깅 로그 추가
      // console.log("🔹 jwt() 콜백에서 받은 user:", user); // 디버깅 로그 추가
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = 60 * 60 * 24 * 7; // 7일 후 만료
      token.id = user?.id || "default_id";
      token.exp = now + expiresIn; // 항상 7일로 설정
      token.iat = now;
      return token;
    },
    async session({ session, token }) {
      // console.log("🔹 session() 콜백에서 받은 token:", token); // 디버깅 로그 추가
    
      // if (!token.id) {
      //   console.error("⚠️ token.id가 존재하지 않습니다! session.user.id가 비어있을 수 있음.");
      // }
    
      const extendedSession = session as ExtendedSession;
      extendedSession.user = {
        id: token.id ? String(token.id) : "error_no_id",
        name: token.name ? String(token.name) : null,
        email: token.email ? String(token.email) : null,
        image: token.picture ? String(token.picture) : null,
      };
    
      // console.log("🔹 최종 Session Data:", extendedSession); // 🔍 디버깅 로그 추가
      return extendedSession;
    }
  },
  session: {
    strategy: "jwt", // 세션을 JWT 기반으로 설정
    maxAge: 60 * 60 * 24 * 7, // 7일 (단위: 초)
  },
};
