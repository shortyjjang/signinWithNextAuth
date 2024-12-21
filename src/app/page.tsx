'use client'
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession()
  return (
    <div>
      {status === 'unauthenticated' ? '로그인 하지 않앗을때는 로그인페이지로 리다이렉팅됩니다.' : '로그인 했을때는 홈페이지로 리다이렉팅됩니다.'}
    </div>
  );
}
