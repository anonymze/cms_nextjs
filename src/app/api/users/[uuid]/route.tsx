import { userUpdateSchema } from "@/types/user";
import { processRequest } from "@/utils/server-api/responses/response";
import { jsonResponseBadRequest, jsonResponseNotFound } from "@/utils/server-api/responses/response_error";
import {
	jsonResponsePatch,
	jsonResponsePost,
	responseDelete,
} from "@/utils/server-api/responses/response_success";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

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

	const { error, messageError, data } = await processRequest(
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
