import { updateMediaDetailsSchema } from "@/types/media_details";
import { HierarchyRole } from "@/types/user";
import { isActionAuthorized } from "@/utils/helper";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import prisma from "@/utils/libs/prisma/single_instance";
import { validateRequest } from "@/utils/server_api/requests/validate";
import { jsonResponseUnauthorized, jsonResponseNotFound, jsonResponseBadRequest } from "@/utils/server_api/responses/errors";
import { jsonResponsePatch, responseDelete } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();

	// we delete the media details (deleteMany does not throw if the page is not found)
	const { count } = await prisma.media_Details.deleteMany({
		where: {
			uuid,
		},
	});

	if (count === 0) return jsonResponseNotFound("Media details not found");

	return responseDelete();
}

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();

	// we verify the request
	const { error, messageError, data } = await validateRequest(req, ACCEPTED_CONTENT_TYPE, updateMediaDetailsSchema);

	if (error) return jsonResponseBadRequest(messageError);

	// we verify the media details exists
	const mediaDetails = await prisma.media_Details.findUnique({
		where: {
			uuid,
		},
	});

	if (!mediaDetails) return jsonResponseNotFound("Media details not found");

		await prisma.media_Details.update({
			where: {
				uuid,
			},
			data: {
				title: data.title,
				tag: data.tag,
				legend: data.legend
			},
		});
	

	return jsonResponsePatch(mediaDetails);
}

