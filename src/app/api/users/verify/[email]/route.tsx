import { getUserWithEmail } from "@/utils/libs/prisma/server_helper";
import { jsonResponseNotFound, jsonResponseForbidden } from "@/utils/server_api/responses/errors";
import { jsonResponse } from "@/utils/server_api/responses/json_response";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
	// we get the email from the URL params
	const email = params.email;

	if (!email) return jsonResponseNotFound("Email not specified");

	const user = await getUserWithEmail(email);

	if (!user) return jsonResponseNotFound("User not found");
	if (!user.isActive) return jsonResponseForbidden("User is not active");

	return jsonResponse({
		body: "Found",
		status: 200,
		statusText: "OK",
	});
}
