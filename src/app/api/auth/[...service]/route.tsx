import { api } from "@/api/_config";
import { ENV_SERVER } from "@/env/server";
import type { NextRequest } from "next/server";

type GithubToken = {
  access_token: string;
  scope: string;
  token_type: string;
};

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

  const accessToken: GithubToken = await api.post(
    ENV_SERVER.GITHUB_ACCESS_TOKEN_URL,
    {
      client_id: ENV_SERVER.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: ENV_SERVER.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: ENV_SERVER.GITHUB_REDIRECT_URL,
    },
    {
      headers: { Accept: "application/json" },
    },
  );

  if (!accessToken) {
    return new Response("error on access token");
  }

  if (!ENV_SERVER.GITHUB_USER_URL) {
    return new Response("URL user github not set");
  }

  const user: any = await api.get(ENV_SERVER.GITHUB_USER_URL, {
    headers: { Authorization: `Bearer ${accessToken.access_token}` },
  });

  console.log(user);

  return new Response("oui");
}
