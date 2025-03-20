"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/entities/Input";
import Button from "@/entities/Button";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const res = await signIn("credentials", {
      email: email.trim(),
      password: password.trim(),
    });
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <fieldset className="flex flex-col gap-2">
          <legend>로그인</legend>
          <Input
            placeholder="이메일"
            value={email}
            regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
            regexMessage="올바른 이메일 형식을 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password as string}
            regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,16}$/}
            regexMessage="영문자, 대문자, 숫자, 특수문자를 포함한 8자 이상 16자 이하의 비밀번호를 입력해주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">로그인</Button>
        </fieldset>
        <Link href="/auth/signup">회원가입</Link>
      </form>
    </div>
  );
}
