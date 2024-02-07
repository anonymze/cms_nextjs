import { ENV_SERVER } from "@/env/server";
import {
  responseGithubAuthLogic,
  verifyGithubEnvVariables,
} from "./_services/github";
import { NextRequest, NextResponse } from "next/server";
import {
  responseGoogleAuthLogic,
  verifyGoogleEnvVariables,
} from "./_services/google";
import { api } from "@/api/_config";
import prisma from "@/utils/libs/prisma/single_instance";
import { clerkClient } from "@clerk/nextjs";
import { LoginStateInfo } from "@/types/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { service: string } }
) {
  // we get the service from the URL params
  const [service] = params.service;

  if (!service) {
    return new Response("No service OAuth provided");
  }

  try {
    return verifyEnvVariablesAndReturnResponse(service, req);
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 500 });
    return new Response("Something went wrong", { status: 500 });
  }
}

function verifyEnvVariablesAndReturnResponse(
  service: string,
  req: NextRequest
) {
  // clerk
  if (!ENV_SERVER.CLERK_MAGIC_LINK_URL) {
    throw new Error("URL magic link clerk is not set");
  }

  switch (service) {
    case "github":
      verifyGithubEnvVariables();
      return responseGithubAuthLogic(req);
    case "google":
      verifyGoogleEnvVariables();
      return responseGoogleAuthLogic(req);
    default:
      return new Response("Service OAuth not handled", { status: 500 });
  }
}

/**
 * @throws {Error}
 */
export async function handleClerkLoginAndReturnResponse(
  req: NextRequest,
  email: string,
  name = ""
) {
  const existingUserOurDb = await prisma.user.findUnique({
    where: { email },
  });

  // if user does not exists in our database at all, we create it, he will be inactive by default
  if (!existingUserOurDb) {
    await prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  // we get the clerk user or create it
  const usersClerk = await clerkClient.users.getUserList({
    emailAddress: [email],
  });

  const userClerk =
    typeof usersClerk[0] !== "undefined"
      ? usersClerk[0]
      : await clerkClient.users.createUser({
          emailAddress: [email],
          firstName: name,
          // generate random password (we don't care, it just needs to be strong)
          password:
            Math.random().toString(36) + Math.random().toString(36).slice(2),
        });

  // if not user
  if (!existingUserOurDb) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}/login/?info=${LoginStateInfo.CREATED}}`
    );
  }

  // if not active
  if (!existingUserOurDb.isActive) {
    return NextResponse.redirect(
      `${req.nextUrl.origin}/login/?info=${LoginStateInfo.INACTIVE}`
    );
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
    }
  );

  // external page will handle the magic link and log the user
  return NextResponse.redirect(
    `${req.nextUrl.origin}/login/external?token=${magicLink.token}`
  );
}
