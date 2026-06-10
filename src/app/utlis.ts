"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function decodeAuthenticatedUserToken() {
  const cookie = await cookies();
  const nextAuthToken = cookie.get("next-auth.session-token")?.value||cookie.get("__Secure-next-auth.session-token")?.value;
  const jwtRes = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthToken,
  });
  if (jwtRes) {
    return jwtRes.routeToken as string;
  } else {
    return null;
  }
}
