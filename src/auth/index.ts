import NextAuth, { NextAuthConfig, Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

// User 타입 확장
export interface ExtendedUser extends User {
  accessToken?: string;
}

// Session 타입 확장
export interface ExtendedSession extends Session {
  accessToken?: string;
}



export const authOptions: NextAuthConfig = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Naver({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    Credentials({
      authorize: async credentials => {
        const { email, password } = credentials
        let user: ExtendedUser = { id: '', name: '', email: '', image: '' }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })
          const data = await res.json()
          if (res.ok) {
            user = {
              ...data,
              accessToken: data?.accessToken
            }
          } else {
            throw new Error(data?.message || '로그인 실패!')
          }
        } catch (error:any) {
          throw new Error(error?.message || '로그인 실패!')
        }

        // <로그인 로직 ...>
        return user as User;
      }
    })
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용
    maxAge: 60 * 60 * 24 // 세션 만료 시간(sec)
  },
  pages: {
    signIn: '/signin' // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async () => {
      return true
    },
    jwt: async ({ token, user }) => {
      const extendedUser = user as ExtendedUser;
      if (extendedUser?.accessToken) {
        token.accessToken = extendedUser.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const extendedSession = session as ExtendedSession;
      extendedSession.accessToken = String(token?.accessToken || '');
      return extendedSession;
    },
    // `url`은 다음과 같을 수 있습니다.
    // '/abc'
    // '/abc?callbackUrl=/xyz'
    // 'https://heropy.dev/abc?callbackUrl=/xyz'
    // 'https://heropy.dev/abc?callbackUrl=https://heropy.dev/xyz'
    // ...
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (url) {
        const { search, origin } = new URL(url)
        const callbackUrl = new URLSearchParams(search).get('callbackUrl')
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl
        if (origin === baseUrl) return url
      }
      return baseUrl
    }
  }
}