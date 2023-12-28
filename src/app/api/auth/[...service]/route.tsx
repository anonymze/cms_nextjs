import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import prisma from "@/utils/libs/prisma";
import { Clerk } from "@clerk/clerk-sdk-node";
import type { NextRequest } from "next/server";

const OAUTH_SERVICES = ["github", "google", "apple"] as const;

export async function GET(req: NextRequest) {
  const service = req.nextUrl.pathname.split("/").at(-1);
  const searchParams = req.nextUrl.searchParams;

  // @ts-ignore, i don't know how to do...
  if (!service || !OAUTH_SERVICES.includes(service)) {
    return new Response("Service OAUTH not handled");
  }

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    return new Response(errorDescription);
  }

  if (!code || state !== ENV_SERVER.API_KEY) {
    return new Response("Oauth invalid data");
  }

  if (!ENV_SERVER.NEXT_PUBLIC_GITHUB_CLIENT_ID || !ENV_SERVER.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
    return new Response("Client ID or secret is not set in your env");
  }

  if (!ENV_SERVER.GITHUB_ACCESS_TOKEN_URL) {
    return new Response("Github URL access token not set");
  }

  try {
    const accessToken = await api.post(
      ENV_SERVER.GITHUB_ACCESS_TOKEN_URL,
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
      return new Response(accessToken.data.error_description);
    }

    if (!ENV_SERVER.GITHUB_USER_URL) {
      return new Response("URL user github not set");
    }

    try {
      const user = await api.get(ENV_SERVER.GITHUB_USER_URL, {
        headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
      });

      const userEmail = user.data.email;

      const existingUser = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (existingUser?.isActive) {
        return new Response("oui");
      }

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: userEmail,
            name: user.data.name,
            isActive: false,
          },
        });
      }      

      return new Response("oui mais pas actif");
    } catch (error: any) {
      return new Response(error.response.statusText, { status: error.response.status });
    }
  } catch (error: any) {
    return new Response(error.response.statusText, { status: error.response.status });
  }
}
