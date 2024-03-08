import type { NextAuthConfig } from "next-auth";

// Modifying the types to match our backend data
declare module "@auth/core/types" {
  interface User {
    access: string;
    refresh: string;
    access_expires_in: string;
  }

  interface Session extends DefaultSession {
    user?: User & DefaultSession["user"];
    accessToken?: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    refreshToken: string;
    accessToken: string;
    accessExpiresAt: number;
    error?: "RefreshAccessTokenError";
  }
}

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /* The authorized callback is used to verify if the request is
     * authorized to access a page via Next.js Middleware. It is called
     * before a request is completed, and it receives an object with the
     * auth and request properties. The auth property contains the user's
     * session, and the request property contains the incoming request.*/

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    // This callback is called on signIn and whenever a session is accessed
    async jwt({ token, user, account }) {
      // account is only passed the first time this callback is called in a new session
      if (account) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;

        token.accessExpiresAt =
          Date.now() + parseFloat(user.access_expires_in) * 1000;

        return token;
      }
      // Checks if the token hasn't expired
      if (Date.now() < token.accessExpiresAt) {
        return token;
      } else {
        // If the token has expired try to refresh it
        try {
          let credentialsServerUrl = process.env.BACKEND_URL as string;
          credentialsServerUrl += "/api/token/refresh/";

          const response = await fetch(credentialsServerUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: token.refreshToken }),
          });

          const tokenData = await response.json();

          if (!response.ok) throw tokenData;
          console.log("TOKEN REFRESHED");

          return {
            ...token,
            accessToken: tokenData.access,
            accessExpiresAt:
              Date.now() + parseFloat(tokenData.access_expires_in) * 1000,
          };
        } catch (err) {
          console.error("Error refreshing access token", err);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },

    // Data returned by this callback will be accessible by the client
    async session({ session, token }) {
      session.error = token.error;
      session.accessToken = token.accessToken;

      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
