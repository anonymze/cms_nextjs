import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import prisma from "@/utils/libs/prisma/single_instance";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";

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

  // TODO state is the code we sent to github, and we need to check github is sending us back the same code
  if (!code || state !== "1234") {
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

    // if user does not exists in our database at all, we create it, careful he will be inactive by default
    if (!existingUserOurDb) {
      await prisma.user.create({
        data: {
          email: userGithubEmail,
          name: userGithub.data.name,
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
            firstName: userGithub.data.name || "NO_NAME",
            // generate random password (we don't care, it just needs to be strong)
            password: Math.random().toString(36) + Math.random().toString(36).slice(2),
          });

    // if not user
    if (!existingUserOurDb) {
      return NextResponse.redirect(`${req.nextUrl.origin}/login/external?info=created`);
    }

    // if not active
    if (!existingUserOurDb.isActive) {
      return NextResponse.redirect(`${req.nextUrl.origin}/login/external?info=inactive`);
    }

    // we create a sign in token for the user
    const signInToken = await clerkClient.signInTokens.createSignInToken({
      userId: userClerk.id,
      expiresInSeconds: 60 * 10 // 10 mins
    });

    // we create a magic link for the user (we have to create the session in the front... Clerk does not handle it in the back yet)
    const token = await api.post(
      ENV_SERVER.NEXT_PUBLIC_CLERK_MAGIC_LINK_URL,
      {
        user_id: signInToken.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${signInToken.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.redirect(`${req.nextUrl.origin}/login/external?token=${token}`);
  } catch (error) {
    console.log({ error });
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

  // clerk
  if (!ENV_SERVER.NEXT_PUBLIC_CLERK_MAGIC_LINK_URL) {
    throw new Error("URL magic link clerk is not set in your env");
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
