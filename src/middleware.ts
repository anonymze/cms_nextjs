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
		 * - api/users/verify/* && api/auth/*  (some api routes are not verified at all)
		 * - test (in case you wanna make a test route)
		 */
		"/((?!_next/static|_next/image|favicon.ico|test|login.*|register.*|politique-de-confidentialite|cgu|api/users/verify/*|api/auth/*).*)",
	],
};

export default authMiddleware({
	beforeAuth: (req) => {
		// "/" redirect to /dashboard
		if (req.nextUrl.pathname === "/") {
			return NextResponse.redirect(new URL("dashboard", req.nextUrl.origin));
		}

		if (req.nextUrl.pathname.startsWith("/api")) {
			// invalid token return 401
			if (!hasValidToken(req)) return new Response(undefined, { status: 401, statusText: "API KEYS NOT SET OR INCORRECT" });

			// TODO invalid role return 401 (like "GUEST")			

			return NextResponse.next();
		}

		return;
	},
});

const hasValidToken = (request: NextRequest) => {
	const tokenCookie = request.cookies.get("token")?.value;
	const tokenAuth = request.headers.get("authorization");

	// 2 authentications authorized, if we get the token by cookies or by authorization header
	return tokenCookie === ENV_SERVER.API_KEY || tokenAuth === ENV_SERVER.API_KEY;
};
