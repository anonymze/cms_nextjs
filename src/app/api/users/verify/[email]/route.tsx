import { getUserWithEmail } from "@/utils/libs/prisma/server_helper";
import { jsonResponseNotFound, jsonResponseForbidden } from "@/utils/server_api/responses/errors";
import { jsonResponseGet } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { email: string } }) {
	// we get the email from the URL params
	const email = params.email;

	if (!email) return jsonResponseNotFound("Email not specified");

	const user = await getUserWithEmail(email);

	if (!user) return jsonResponseNotFound("User not found");
	if (!user.isActive) return jsonResponseForbidden("User is not active");

	return jsonResponseGet("Found", false);
}
