import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 

// 인증이 필요하지 않은 페이지 (로그인, 회원가입 등)
const publicPaths = [
  '/auth/signin',
  '/auth/signup',
  '/api/auth'
]

// 2. Wrapped middleware option
export default async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl


  // 공개 경로인지 확인
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  );


  // API 경로인지 확인
  const isApiPath = pathname.startsWith('/api');

  // 정적 파일 경로인지 확인
  const isStaticPath = pathname.startsWith('/_next') || 
    pathname.startsWith('/static') || 
    pathname === '/favicon.ico';
  

  // 정적 파일이나 API 요청은 그대로 통과
  if (isApiPath || isStaticPath) {
    return NextResponse.next();
  }

  // 비로그인 상태에서 보호된 경로 접근 시
  if (!session && !isPublicPath) {
    const signInUrl = new URL('/auth/signin', request.url)
    return NextResponse.redirect(signInUrl);
  }

  // 로그인 상태에서 로그인/회원가입 페이지 접근 시
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}