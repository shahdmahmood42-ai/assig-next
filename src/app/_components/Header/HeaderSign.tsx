"use client";
import Link from "next/link";
import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import LogoutButton from "./LogoutButton";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useSession } from "next-auth/react";

export default function HeaderSign() {
  const session = useSession();
  const username = session.data?.user?.name;
  const isUserAuthenticated = !!username;
  return (
    <div className="flex gap-2">
      {isUserAuthenticated ? (
        <>
          <Link className="flex items-center gap-1" href="/profile">
            <IoPersonOutline />
            {username}
          </Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link className="flex items-center gap-1" href="/login">
            <IoPersonOutline />
            Sign in
          </Link>
          <Link className="flex items-center gap-1" href="/register">
            <MdOutlinePersonAddAlt1 />
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
