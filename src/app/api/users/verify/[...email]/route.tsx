import { jsonResponse } from "@/utils/api/responses/core_logic";
import { jsonResponseForbidden, jsonResponseNotFound } from "@/utils/api/responses/response_error";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  // we get the email from the URL params
  const [email] = params.email;

  if (!email) return jsonResponseNotFound("Email not specified");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return jsonResponseNotFound("User not found");
  if (!user.isActive) return jsonResponseForbidden("User is not active");

  return jsonResponse({
    body: "Found",
    status: 200,
    statusText: "OK",
  });
}
