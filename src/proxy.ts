import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const cookieName = process.env.NODE_ENV === 'production'?'__Secure-next-auth.session-token':'next-auth.session-token'
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET,cookieName });
  console.log("from middleware", token);
  if (!!token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}login`);
}
export const config = {
  matcher: ["/cart", "/profile"],
};
