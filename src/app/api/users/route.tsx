import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import { clerkClient } from "@clerk/nextjs";
import { userCreationSchema } from "@/types/user";
import prisma from "@/utils/libs/prisma/single_instance";
import { findManyWithDefaults } from "@/utils/libs/prisma/find_many_defaults";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(req: NextRequest) {
   const users = await findManyWithDefaults(prisma.user, {
    select: {
      uuid: true,
      isActive: true,
      name: true,
      email: true,
    },
  }, req.nextUrl.searchParams);

  return jsonResponsePost(users);
}

export async function P(req: NextRequest) {
  const { error, messageError, data } = await processRequest(req, ACCEPTED_CONTENT_TYPE, userCreationSchema);

  if (error) return jsonResponseBadRequest(messageError);

  try {
    const userClerk = await clerkClient.users.getUser(data.clerkUserId);
    const email = userClerk.emailAddresses[0]?.emailAddress;

    if (!email) {
      return jsonResponseBadRequest("Email not found from auth service");
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: "",
      },
    });

    return jsonResponsePost(user);
  } catch (err) {
    return jsonResponseBadRequest("User not found");
  }
}