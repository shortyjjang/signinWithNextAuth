import React from "react";
import { signIn } from "next-auth/react";
import { signInWithCredentials } from "@/auth/serverActions";

export default function SignInPage() {
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    if (!email || !password) {
      return;
    }
    formData.set("email", email);
    formData.set("password", password);
    const res = await signInWithCredentials({ message: "" }, formData);
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={handleSubmit}>
        <fieldset>
          <legend>로그인</legend>
          <input type="text" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
          <button onClick={() => signIn("kakao")}>카카오로 로그인</button>
          <button onClick={() => signIn("google")}>구글로 로그인</button>
          <button onClick={() => signIn("naver")}>네이버로 로그인</button>
        </fieldset>
      </form>
    </div>
  );
}
