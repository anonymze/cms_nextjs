import { ENV_SERVER } from "@/env/server";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/api/_config";
import prisma from "@/utils/libs/prisma/single_instance";
import { clerkClient } from "@clerk/nextjs";
import { LoginStateInfo } from "@/types/user";
import { getUserWithEmail } from "@/utils/libs/prisma/server_helper";

/**
 * @throws {Error}
 */
export const handleClerkLoginAndReturnResponse =  async(
  req: NextRequest,
  email: string,
  name = ""
) => {
  const existingUserOurDb = await getUserWithEmail(email);

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
      // TODO
      `${req.nextUrl.origin}/login/?info=${LoginStateInfo.CREATED}}`
    );
  }

  // if not active
  if (!existingUserOurDb.isActive) {
    return NextResponse.redirect(
      // TODO
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
    // TODO
    `${req.nextUrl.origin}/en/login/external?token=${magicLink.token}`
  );
}

export function verifyClerkEnvVariables() {
	if (!ENV_SERVER.CLERK_SECRET_KEY) {
		throw new Error("Google client ID is not set");
	}

	if (!ENV_SERVER.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
		throw new Error("Google access token URL is not set");
	}

  if (!ENV_SERVER.CLERK_MAGIC_LINK_URL) {
		throw new Error("Google client secret is not set");
	}
}