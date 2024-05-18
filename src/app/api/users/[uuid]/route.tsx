import { userUpdateSchema } from "@/types/user";
import { validateRequest } from "@/utils/server_api/requests/validate";
import prisma from "@/utils/libs/prisma/single_instance";
import { jsonResponseNotFound, jsonResponseBadRequest, jsonResponseUnauthorized, jsonResponseForbidden } from "@/utils/server_api/responses/errors";
import { responseDelete, jsonResponsePatch } from "@/utils/server_api/responses/successes";
import { getUserWithUuid } from "@/utils/libs/prisma/server_helper";
import { isActionAuthorized } from "@/utils/helper";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	const currentUser = await getCurrentUser(req.cookies);

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(currentUser)) return jsonResponseUnauthorized();	

	// we verify the current user is not the same user we want to delete
	if (currentUser.uuid === uuid) return jsonResponseForbidden("You cannot delete yourself, ask another admin to do it");

	const { count } = await prisma.user.deleteMany({
		where: {
			uuid,
		},
	});

	// we delete the user (deleteMany does not throw if the user is not found)
	if (count === 0) return jsonResponseNotFound("User not found");

	return responseDelete();
}

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies))) return jsonResponseUnauthorized();	

	// we verify the request
	const { error, messageError, data } = await validateRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		userUpdateSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	// we verify the user exists
	if (!(await getUserWithUuid(uuid))) return jsonResponseNotFound("User not found");

	const userUpdated = await prisma.user.update({
		where: {
			uuid,
		},
		data,
	});

	return jsonResponsePatch(userUpdated);
}
