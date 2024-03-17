import { ENV_SERVER } from "@/env/server";

export function getResponseHeader(getCookieApiToken: boolean) {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	if (getCookieApiToken) {
		// 2592000 = 30 days
		headers.append(
			"set-cookie",
			`token=${ENV_SERVER.API_KEY}; Max-Age=2592000; path=/api; HttpOnly; SameSite=None; Secure;`,
		);
	}

	return headers;
}
