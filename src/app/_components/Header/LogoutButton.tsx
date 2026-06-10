"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/login");
  }

  return (
    <span onClick={handleLogout} className="cursor-pointer">
      Logout
    </span>
  );
}
