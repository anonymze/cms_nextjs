import { userUpdateSchema } from "@/types/user";
import { validateRequest } from "@/utils/server_api/requests/validate";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";
import { jsonResponseNotFound, jsonResponseBadRequest } from "@/utils/server_api/responses/errors";
import { responseDelete, jsonResponsePatch } from "@/utils/server_api/responses/successes";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function DELETE(_: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!uuid) return jsonResponseNotFound("User not found");

	const user = await prisma.user.findUnique({
		where: {
			uuid,
		},
	});

	if (!user) return jsonResponseNotFound("User not found");

	// TODO setup rights, only admin should be able to delete users

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

	const user = await prisma.user.findUnique({
		where: {
			uuid,
		},
	});

	if (!user) return jsonResponseNotFound("User not found");

	const { error, messageError, data } = await validateRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		userUpdateSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	// TODO setup rights, only admin should be able to update users

	const userUpdated = await prisma.user.update({
		where: {
			uuid,
		},
		data,
	});

	return jsonResponsePatch(userUpdated);
}
