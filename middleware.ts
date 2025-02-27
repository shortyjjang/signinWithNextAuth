import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from 'path-to-regexp'
import { getToken } from 'next-auth/jwt'

// 인증이 필요한 페이지
const matchersForAuth = [
  '/*'
]
// 인증이 필요하지 않은 페이지
const matchersForSignIn = [
  '/auth/signin/*'
]
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // 인증이 필요한 페이지 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return token // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url))
      // : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
  }
  // 인증 후 회원가입 및 로그인 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return token
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()
  }
  return NextResponse.next()
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some(url => !!match(url)(pathname))
}