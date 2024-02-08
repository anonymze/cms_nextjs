
import prisma from "@/utils/libs/prisma/single_instance";
import fs from "fs";
import path from "path";
import { jsonResponseNotFound, jsonResponseUnauthorized } from "@/utils/server_api/responses/errors";
import { responseDelete } from "@/utils/server_api/responses/successes";
import { HierarchyRole } from "@/types/user";
import { isActionAuthorized } from "@/utils/helper";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import type { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();	

	// get the file from the database
	const file = await prisma.media.findUnique({
		where: { uuid },
	});

	if (!file) return jsonResponseNotFound("Fichier non");

	// delete the file from the public/media folder
	try {
		fs.unlinkSync(path.join("public", file.filepath_public));
	} catch (_) {}

	await prisma.media.delete({
		where: { uuid },
	});

	return responseDelete();
}
