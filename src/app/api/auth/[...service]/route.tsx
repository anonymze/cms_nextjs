import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/utils/libs/prisma/single_instance";
import { LoginStateInfo } from "@/types/user";

const OAUTH_SERVICES = ["github", "google", "apple"];

export async function GET(req: NextRequest, { params }: { params: { service: string } }) {
	// we get the service from the URL params
	const [service] = params.service;

	if (!service || !OAUTH_SERVICES.includes(service)) {
		return new Response("Service OAuth not handled");
	}

	try {
		verifyEnvVariables(service);
	} catch (err) {
		if (err instanceof Error) return new Response(err.message);
	}

	/***/
	const searchParams = req.nextUrl.searchParams;

	const code = searchParams.get("code");
	const state = searchParams.get("state");
	const errorDescription = searchParams.get("error_description");

	if (errorDescription) {
		return new Response(errorDescription);
	}

	if (!code || state !== ENV_SERVER.GITHUB_ASK_AUTHORIZATION_URL) {
		return new Response("Oauth invalid data");
	}

	/***/
	try {
		const accessToken = await api.post(
			ENV_SERVER.GITHUB_ACCESS_TOKEN_URL as string,
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
			return new Response(accessToken.data?.error_description);
		}

		const userGithub = await api.get(ENV_SERVER.GITHUB_USER_URL as string, {
			headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
		});

		const userGithubName = userGithub.data.name;
		const userGithubEmail = userGithub.data.email;

		const existingUserOurDb = await prisma.user.findUnique({
			where: { email: userGithubEmail },
		});

		// if user does not exists in our database at all, we create it, he will be inactive by default
		if (!existingUserOurDb) {
			await prisma.user.create({
				data: {
					email: userGithubEmail,
					name: userGithubName,
				},
			});
		}

		// we get the clerk user or create it
		const usersClerk = await clerkClient.users.getUserList({
			emailAddress: [userGithubEmail],
		});

		const userClerk =
			typeof usersClerk[0] !== "undefined"
				? usersClerk[0]
				: await clerkClient.users.createUser({
						emailAddress: [userGithubEmail],
						firstName: userGithub.data.name,
						// generate random password (we don't care, it just needs to be strong)
						password: Math.random().toString(36) + Math.random().toString(36).slice(2),
				  });

		// if not user
		if (!existingUserOurDb) {
			return NextResponse.redirect(`${req.nextUrl.origin}/login/?info=${LoginStateInfo.CREATED}}`);
		}

		// if not active
		if (!existingUserOurDb.isActive) {
			return NextResponse.redirect(`${req.nextUrl.origin}/login/?info=${LoginStateInfo.INACTIVE}`);
		}

		// we create a magic link for the user (we have to create the session in the front... Clerk does not handle it in the back)
		const { data: magicLink } = await api.post(
			ENV_SERVER.CLERK_MAGIC_LINK_URL,
			{
				user_id: userClerk.id,
			},
			{
				headers: {
					Authorization: `Bearer ${ENV_SERVER.CLERK_SECRET_KEY}`,
					"Content-Type": "application/json",
				},
			},
		);

		return NextResponse.redirect(`${req.nextUrl.origin}/login/external?token=${magicLink.token}`);
	} catch (error) {
		if (error instanceof Response) {
			return new Response(error.statusText, { status: error.status });
		}

		if (error instanceof Error) {
			return new Response(error.message);
		}

		return new Response("Erreur inconnue, contactez l'administrateur");
	}
}

function verifyEnvVariables(service: string): void {
	switch (service) {
		case "github":
			verifyGithubEnvVariables();
			break;
		case "google":
			verifyGithubEnvVariables();
			break;
		case "apple":
			verifyGithubEnvVariables();
			break;
	}

	// clerk
	if (!ENV_SERVER.CLERK_MAGIC_LINK_URL) {
		throw new Error("URL magic link clerk is not set");
	}
}

function verifyGithubEnvVariables(): void {
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
