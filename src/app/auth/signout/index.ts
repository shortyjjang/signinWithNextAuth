"use client";
import { signOutUser } from "@/auth/serverActions";
import React, { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    signOutUser();
  }, []);
  return null;
}
