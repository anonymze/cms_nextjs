import { NextResponse } from "next/server";
import { ENV_SERVER } from "./env/server";
import { authMiddleware } from "@clerk/nextjs";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login and login/xxx (authentication routes)
     * - register (authentication routes)
     * - conditions utilisation cgu (legal routes)
     * - politique-confidentialite (legal routes)
     * - test (in case you wanna make a test route)
     * - 401 (unauthorized route)
     */
    "/((?!_next/static|_next/image|favicon.ico|test|login.*|register.*|politique-de-confidentialite|cgu|401).*)",
  ],
};

export default authMiddleware({
  beforeAuth: (req) => {
    // "/" redirect to /dashboard
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("dashboard", req.nextUrl.origin));
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
      // if we got a valid token api in the request, we skip the clerk authentication with next()
      if (hasValidToken(req)) return NextResponse.next();

      return NextResponse.redirect(new URL("/401", req.url));
    }

    return;
  },
});

const hasValidToken = (request: NextRequest) => {
  const tokenCookie = request.cookies.get("token")?.value;

  // 2 authentications authorized, if we get the token by cookies
  if (tokenCookie === ENV_SERVER.API_KEY) return true;

  const tokenAuth = request.headers.get("authorization");

  // or if we get the token by authorization header
  if (tokenAuth === ENV_SERVER.API_KEY) return true;

  return false;
};
