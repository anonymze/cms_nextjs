import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import { NextRequest } from "next/server";
import { handleClerkLogicAndReturnResponse } from "../route";

export async function responseGoogleAuthLogic(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const code = searchParams.get("code");

	try {
		const accessToken = await api.post(
			ENV_SERVER.GOOGLE_ACCESS_TOKEN_URL!,
			new URLSearchParams({
				client_id: ENV_SERVER.GOOGLE_PUBLIC_CLIENT_ID!,
				client_secret: ENV_SERVER.GOOGLE_CLIENT_SECRET!,
				redirect_uri: ENV_SERVER.GOOGLE_REDIRECT_URL!,
				grant_type: "authorization_code",
				code : code || "",
			}),
			{
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			},
		);

		if (accessToken.data?.error) {
			return new Response(accessToken.data?.error_description, { status: 500 });
		}

		const userGoogle = await api.get(ENV_SERVER.GOOGLE_USER_URL!, {
			headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
		});


		// userGoogle.data.verified;
		// userGoogle.data.picture;

		return handleClerkLogicAndReturnResponse(req, userGoogle.data.email, userGoogle.data.name)
	} catch (error) {
		if (error instanceof Response) {
			return new Response(error.statusText, { status: error.status });
		}

		if (error instanceof Error) {
			return new Response(error.message, { status: 500 });
		}

		return new Response("Erreur inconnue, contactez l'administrateur", { status: 500 });
	}
}

export function verifyGoogleEnvVariables(): void {
	if (!ENV_SERVER.GOOGLE_CLIENT_SECRET) {
		throw new Error("Google client ID is not set");
	}

	if (!ENV_SERVER.GOOGLE_CLIENT_SECRET) {
		throw new Error("Google client secret is not set");
	}

	if (!ENV_SERVER.GOOGLE_ACCESS_TOKEN_URL) {
		throw new Error("Google access token URL is not set");
	}

	if (!ENV_SERVER.GOOGLE_USER_URL) {
		throw new Error("Google user URL is not set");
	}

	if (!ENV_SERVER.GOOGLE_REDIRECT_URL) {
		throw new Error("Google redirect URL is not set");
	}
}
