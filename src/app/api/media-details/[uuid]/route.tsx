import { HierarchyRole } from "@/types/user";
import { isActionAuthorized } from "@/utils/helper";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import prisma from "@/utils/libs/prisma/single_instance";
import { jsonResponseUnauthorized, jsonResponseNotFound } from "@/utils/server_api/responses/errors";
import { responseDelete } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

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
