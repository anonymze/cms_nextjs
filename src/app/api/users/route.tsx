import { validateRequest } from "@/utils/server_api/requests/validate";
import { clerkClient } from "@clerk/nextjs";
import { userCreationSchema } from "@/types/user";
import prisma from "@/utils/libs/prisma/single_instance";
import { findManyWithLimit, getUserWithEmail } from "@/utils/libs/prisma/server_helper";
import { jsonResponseBadRequest } from "@/utils/server_api/responses/errors";
import { jsonResponseGet, jsonResponsePost } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(req: NextRequest) {
	const users = await findManyWithLimit(
		prisma.user,
		{
			select: {
				uuid: true,
				isActive: true,
				name: true,
				email: true,
				role: true
			},
		},
		req.nextUrl.searchParams,
	);

	return jsonResponseGet(users);
}

export async function POST(req: NextRequest) {
	const { error, messageError, data } = await validateRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		userCreationSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	try {
		const userClerk = await clerkClient.users.getUser(data.clerkUserId);
		const email = userClerk.emailAddresses[0]?.emailAddress;

		if (!email) {
			return jsonResponseBadRequest("Email not found from auth service");
		}

		const user = await getUserWithEmail(email);
	
		if (!user) {
			const userCreated = await prisma.user.create({
				data: {
					email,
					name: "",
				},
			});

			return jsonResponsePost(userCreated);
		};	

		return jsonResponsePost(user);
	} catch (err) {
		return jsonResponseBadRequest("User not found from auth service");
	}
}
