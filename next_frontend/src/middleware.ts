import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/* The middleware will be using the authorized callback
 * present in the authConfig */
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - png files
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|$).*)"],
};
