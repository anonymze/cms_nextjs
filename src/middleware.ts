import { NextResponse } from "next/server";
import { ENV_SERVER } from "./env/server";
import { authMiddleware } from "@clerk/nextjs";
import { i18n } from "./i18n/translations";
import { getPreferedLocale } from "./utils/server_api/helper";
import { getKeysTypedObject } from "./utils/helper";
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
     * - api/users/verify/* && api/auth/*  (some api routes are not verified at all)
     * - test (in case you wanna make a test route)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*/test|test|.*/login|.*/politique-de-confidentialite|/.*/cgu|api/users/verify|api/auth/.*).*)",
  ],
};

export default authMiddleware({
  beforeAuth: (req) => {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      // invalid token return 401
      if (!hasValidToken(req))
        return new Response(undefined, {
          status: 401,
          statusText: "API KEYS NOT SET OR INCORRECT",
        });

      // ignore the clerk validation
      return NextResponse.next();
    }

    return transformRequestToI18n(req);
  },
});

const hasValidToken = (req: NextRequest) => {
  const tokenCookie = req.cookies.get("token")?.value;
  const tokenAuth = req.headers.get("authorization");

  // 2 authentications authorized, if we get the token by cookies or by authorization header
  return tokenCookie === ENV_SERVER.API_KEY || tokenAuth === ENV_SERVER.API_KEY;
};

const transformRequestToI18n = (req: NextRequest) => {
  // check if there is any supported locale in the pathname
  const { pathname } = req.nextUrl;
  let localeRedirectToDashboard: string | undefined;

  const pathnameHasLocale = Object.keys(i18n).some((locale) => {
    if (pathname === `/${locale}`) {
      localeRedirectToDashboard = locale;
      return false;
    }
    return pathname.startsWith(`/${locale}/`);
  });

  if (pathnameHasLocale) return;

  // "/{locale}" redirect to dashboard
  if (localeRedirectToDashboard) {
    req.nextUrl.pathname = `/${localeRedirectToDashboard}/dashboard`;
  } else {
    // redirect if there is no locale implicitly in the pathname
    const locale = getPreferedLocale(req.headers, getKeysTypedObject(i18n));
    
    // "/" redirect to dashboard
    if (pathname === "/") {
      req.nextUrl.pathname = `/${locale}/dashboard`;
    } else {
      req.nextUrl.pathname = `/${locale}${pathname}`;
    }
  }

  // e.g. incoming request is /products
  // the new URL is now /en/products
  return NextResponse.redirect(req.nextUrl);
};
