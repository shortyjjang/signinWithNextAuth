"use server";
import { authOptions, ExtendedSession } from "@/auth";
import { getSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
    initialState: { message: string },
    formData: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email") || "",
        password: formData.get("password") || "",
      }),
    });
    if (!res.ok) {
        throw new Error("로그인 실패!");
    }
    await signIn("credentials", {
      displayName: formData.get("displayName") || "", // `'null'` 문자 방지
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    });
  } catch (error: any) {
    return { message: error.cause.err.message || "로그인 실패!" };
  }
  redirect("/"); // 또는 return { message: '메시지!' }
};

export async function updateUserInfo(updatedData: { displayName: string }) {
  const session = (await getSession()) as ExtendedSession;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_API_KEY as string,
      username: "HEROPY",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("사용자 정보 업데이트 실패!");
  }

  const updatedUser = await res.json();

  // 세션 업데이트 로직
  await updateSession({
    user: {
      name: updatedUser.displayName,
    },
  });

  redirect("/"); //갱신된 정보를 화면에 보여줌(refresh와 같음)
}

// 세션 업데이트 함수
async function updateSession(data: { user: { name: string } }) {
  // 세션 스토리지에 사용자 이름 저장
  sessionStorage.setItem('userName', data.user.name);
}

// 로그아웃 함수
export const signOutUser = async () => {
  await signOut(); // next-auth의 signOut 함수 호출

  // 세션 스토리지에서 사용자 정보 제거
  sessionStorage.removeItem('userName');
  // 추가적인 세션 정보가 있다면 여기에 제거할 수 있습니다.
  // 예: sessionStorage.removeItem('userEmail');

  redirect('/signin'); // 로그아웃 후 리다이렉트할 경로
};

