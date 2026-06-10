import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Fresh Cart 🛒",
      credentials: {
        email: {
          label: "Email",
          placeholder: "mahmoud@gmail.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },

      authorize: async function (credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "post",
            body: JSON.stringify(credentials),
            headers: { "content-type": "application/json" },
          },
        );

        const finalRes = await res.json();
        console.log("finalRes of Credentials ", finalRes);
        if (res.ok) {
          const { name, email } = finalRes.user;

          const data: { id: string } = jwtDecode(finalRes.token);
          return { name, email, id: data.id, tokenCredentials: finalRes.token };
          // const { role, ...rest } = finalRes.user;
          // return rest;
        }
        return null;
      },
    }),
  ],
  // callbacks: {
  //   jwt: function (param) {
  //     if (param.user) {
  //       param.token.routeToken = param.user.tokenCredentials;
  //       param.token.id = param.user.id;
  //     }
  //     console.log("JWT param", param);
  //     return param.token;
  //   },
  //   session: function (param) {
  //     param.session.user.id = param.token.id;

  //     console.log("session param", param);
  //     return param.session;
  //   },
  // },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.routeToken = user.tokenCredentials;
        token.id = user.id;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.id;
      session.user.tokenCredentials = token.routeToken;

      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 3,
  },
  pages: {
    signIn: "/login",
  },
};
function JwtDecode(token: any): { id: string } {
  throw new Error("Function not implemented.");
}
