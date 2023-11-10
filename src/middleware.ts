import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jsonResponseUnauthorized } from "./utils/api/responses/response_error";
import { ENV_SERVER } from "./env/server";


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
  matcher: ["/", "/api/:path*"],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // we redirect / to /dashboard
  if (request.nextUrl.pathname === "/") return NextResponse.redirect(new URL("/dashboard", request.url));

  if (request.nextUrl.pathname.startsWith("/api")) {
    const { validToken, token } = tokenInfo(request);

    // token no valid = 401
    if (!validToken) return jsonResponseUnauthorized();

    console.log(token);
    // TODO
  }

  return NextResponse.next();
}

const tokenInfo = (request: NextRequest): TokenInfo => {
  const tokenCookie = request.cookies.get("token")?.value;

  // 2 methods authorized, if we get the token by cookies
  if (tokenCookie && tokenCookie === ENV_SERVER.API_KEY) return { validToken: true, token: tokenCookie };

  const tokenAuth = request.headers.get("authorization");

  // if we get the token by authorization header
  if (tokenAuth && tokenAuth === ENV_SERVER.API_KEY) return { validToken: true, token: tokenAuth };

  return { validToken: false, token: null };
};
