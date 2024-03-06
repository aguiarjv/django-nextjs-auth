import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        let credentialsServerUrl = process.env.BACKEND_URL as string;
        credentialsServerUrl += "/api/token/";

        const parsedCredentials = z
          .object({ email: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const body = { username: email, password: password };

          const response = await fetch(credentialsServerUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (response.status == 200) {
            const data = await response.json();
            console.log("RESPONSE DATA: ", data);
            return data;
          } else {
            const data = await response.json();
            console.log("RESPONSE DATA 400: ", data);
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
