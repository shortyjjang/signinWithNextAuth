import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const res = await signIn("credentials", { email: email.trim(), password: password.trim() });
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>로그인</legend>
          <input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">로그인</button>
          <button onClick={() => signIn("kakao")}>카카오로 로그인</button>
          <button onClick={() => signIn("google")}>구글로 로그인</button>
          <button onClick={() => signIn("naver")}>네이버로 로그인</button>
        </fieldset>
      </form>
    </div>
  );
}
