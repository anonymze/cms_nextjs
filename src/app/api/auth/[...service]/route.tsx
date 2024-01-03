import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import prisma from "@/utils/libs/prisma";
import { clerkClient } from "@clerk/nextjs";
import next from "next";
import { NextResponse, type NextRequest } from "next/server";

const OAUTH_SERVICES = ["github", "google", "apple"];

export async function GET(req: NextRequest) {
  /***/
  const service = req.nextUrl.pathname.split("/").at(-1);

  if (!service || !OAUTH_SERVICES.includes(service)) {
    return new Response("Service OAUTH not handled");
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

  if (!code || state !== ENV_SERVER.API_KEY) {
    return new Response("Oauth invalid data");
  }

  /***/
  try {
    const accessToken = await api.post(
      ENV_SERVER.GITHUB_ACCESS_TOKEN_URL as string,
      {
        client_id: ENV_SERVER.NEXT_PUBLIC_GITHUB_CLIENT_ID,
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

    const userGithubEmail = userGithub.data.email;

    const existingUserOurDb = await prisma.user.findUnique({
      where: { email: userGithubEmail },
    });

    // if user is created in our database and is active, we can return the redirection to the dashboard safely
    if (existingUserOurDb?.isActive) {
      return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
    }

    // otherwise we create the user in Clerk, but before, if already exists we get it from Clerk
    const usersClerk = await clerkClient.users.getUserList({
      emailAddress: [userGithubEmail],
    });

    const userClerk =
      typeof usersClerk[0] !== "undefined"
        ? usersClerk[0]
        : await clerkClient.users.createUser({
            emailAddress: [userGithubEmail],
            firstName: userGithub.data.name || "NO_NAME",
            // generate random password (we don't care, it just needs to be strong)
            password: Math.random().toString(36) + Math.random().toString(36).slice(2),
          });

    // if user does not exists in our database at all, we create it, careful he will be inactive by default
    if (!existingUserOurDb) {
      await prisma.user.create({
        data: {
          email: userGithubEmail,
          name: userGithub.data.name,
        },
      });
    }

    // we create a sign in token for the user
    const signInToken = await clerkClient.signInTokens.createSignInToken({
      userId: userClerk.id,
      expiresInSeconds: 60 * 60 * 24 * 1, // 1 day
    });

    // we create a magic link for the user (we have to create the session in the front... Clerk does not handle it in the back yet)
    const magicLink = await api.post('https://api.clerk.com/v1/sign_in_tokens', {
      user_id: signInToken.userId,
    }, {
      headers: {
        Authorization: `Bearer ${signInToken.token}`,
        'Content-Type': 'application/json',
      },
    })

    return NextResponse.redirect(`${req.nextUrl.origin}/login/external?token=${magicLink}`);
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
      break;
    case "apple":
      break;
  }
}

function verifyGithubEnvVariables(): void {
  if (!ENV_SERVER.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
    throw new Error("Client ID is not set in your env");
  }

  if (!ENV_SERVER.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
    throw new Error("Client secret is not set in your env");
  }

  if (!ENV_SERVER.GITHUB_ACCESS_TOKEN_URL) {
    throw new Error("Github URL access token is not set in your env");
  }

  if (!ENV_SERVER.GITHUB_USER_URL) {
    throw new Error("URL user github is not set in your env");
  }
}
