import { NextResponse } from "next/server";
import { ENV_SERVER } from "./env/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

type TokenInfo =
  | {
      validToken: true;
      token: string;
    }
  | {
      validToken: false;
      token: null;
    };

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login and login/xxx (authentication routes)
     * - register (authentication routes)
     * - conditions utilisation cgu (legal routes)
     * - politique-confidentialite (legal routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|test|login.*|register.*|politique-de-confidentialite|cgu|api/.*).*)",
  ],
};

export default authMiddleware({
  beforeAuth: (req) => {
    // / redirect to /dashboard
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("dashboard", req.nextUrl.origin));
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
      const { validToken, token } = tokenInfo(req);

      // token no valid = 401 unauthorized from clerk, you can redirect here if you prefer
      if (!validToken) return;

      // console.log(token);

      return false;
    }

    return;
  },
});

const tokenInfo = (request: NextRequest): TokenInfo => {
  const tokenCookie = request.cookies.get("token")?.value;

  // 2 authentications authorized, if we get the token by cookies
  if (tokenCookie === ENV_SERVER.API_KEY) return { validToken: true, token: tokenCookie };

  const tokenAuth = request.headers.get("authorization");

  // or if we get the token by authorization header
  if (tokenAuth === ENV_SERVER.API_KEY) return { validToken: true, token: tokenAuth };

  return { validToken: false, token: null };
};
