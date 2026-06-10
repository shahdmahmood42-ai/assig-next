"use server";

import { cookies } from "next/headers";
import { LoginObjectType } from "./login.types";
import { getUserCart } from "@/api/services/Route.services";

export async function LoginAction(data: LoginObjectType) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      },
    );
    const finalRes = await res.json();
    console.log("finalRes of login", finalRes);
    if (res.ok) {
      const cookie = await cookies();
      cookie.set("tkn", finalRes.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.log("error", error);
  }
}
export async function getCurrentLoggedInUserCart() {
  return getUserCart();
}
