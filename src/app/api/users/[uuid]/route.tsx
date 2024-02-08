import { HierarchyRole, userUpdateSchema } from "@/types/user";
import { validateRequest } from "@/utils/server_api/requests/validate";
import prisma from "@/utils/libs/prisma/single_instance";
import { jsonResponseNotFound, jsonResponseBadRequest, jsonResponseUnauthorized } from "@/utils/server_api/responses/errors";
import { responseDelete, jsonResponsePatch } from "@/utils/server_api/responses/successes";
import { getUserWithUuid } from "@/utils/libs/prisma/server_helper";
import { isActionAuthorized } from "@/utils/helper";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!uuid) return jsonResponseNotFound("User not found");

	const user = await getUserWithUuid(uuid);

	if (!user) return jsonResponseNotFound("User not found");

	if (!isActionAuthorized(user)) return jsonResponseUnauthorized();	

	await prisma.user.delete({
		where: {
			uuid,
		},
	});

	return responseDelete();
}

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!uuid) return jsonResponseNotFound("User not found");

	const user = await getUserWithUuid(uuid);

	if (!user) return jsonResponseNotFound("User not found");

	if (!isActionAuthorized(user)) return jsonResponseUnauthorized();	

	const { error, messageError, data } = await validateRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		userUpdateSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	const userUpdated = await prisma.user.update({
		where: {
			uuid,
		},
		data,
	});

	return jsonResponsePatch(userUpdated);
}
