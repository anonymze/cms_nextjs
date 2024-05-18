import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import { NextRequest } from "next/server";
import { handleClerkLoginAndReturnResponse } from "./clerk";

export async function responseGithubAuthLogic(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const code = searchParams.get("code");
	const state = searchParams.get("state");
	const errorDescription = searchParams.get("error_description");

	if (errorDescription) {
		return new Response(errorDescription, { status: 500 });
	}

	if (!code) {
		return new Response("No code provided", { status: 500 });
	}

	if (state !== ENV_SERVER.GITHUB_STATE) {
		return new Response("Github state is not matching", { status: 500 });
	}

	try {
		const accessToken = await api.post(
			ENV_SERVER.GITHUB_ACCESS_TOKEN_URL!,
			{
				client_id: ENV_SERVER.GITHUB_PUBLIC_CLIENT_ID,
				client_secret: ENV_SERVER.GITHUB_CLIENT_SECRET,
				redirect_uri: ENV_SERVER.GITHUB_REDIRECT_URL,
				code,
			},
			{
				headers: { Accept: "application/json" },
			},
		);

		if (accessToken.data?.error) {
			return new Response(accessToken.data?.error_description, { status: 500 });
		}

		const userGithub = await api.get(ENV_SERVER.GITHUB_USER_URL!, {
			headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
		});

		return handleClerkLoginAndReturnResponse(req, userGithub.data.email, userGithub.data.name)
	} catch (error) {
		if (error instanceof Response) return new Response(error.statusText, { status: error.status });

		if (error instanceof Error) return new Response(error.message, { status: 500 });

		return new Response("Erreur inconnue, contactez l'administrateur", { status: 500 });
	}
}

export function verifyGithubEnvVariables() {
	if (!ENV_SERVER.GITHUB_PUBLIC_CLIENT_ID) {
		throw new Error("Github client ID is not set");
	}

	if (!ENV_SERVER.GITHUB_CLIENT_SECRET) {
		throw new Error("Github client secret is not set");
	}

	if (!ENV_SERVER.GITHUB_STATE) {
		throw new Error("Github client state is not set");
	}

	if (!ENV_SERVER.GITHUB_ACCESS_TOKEN_URL) {
		throw new Error("Github access token URL is not set");
	}

	if (!ENV_SERVER.GITHUB_REDIRECT_URL) {
		throw new Error("Github redirect URL is not set");
	}

	if (!ENV_SERVER.GITHUB_USER_URL) {
		throw new Error("Github user URL is not set");
	}
}
