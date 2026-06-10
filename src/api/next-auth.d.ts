import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    tokenCredentials: string;
  }

  interface Session {
    user: {
      id: string;
      tokenCredentials: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    routeToken: string;
  }
}
