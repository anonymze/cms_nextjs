import { jsonResponseNotFound } from "@/utils/server_api/responses/response_error";
import prisma from "@/utils/libs/prisma/single_instance";
import fs from "fs";
import path from "path";
import { responseDelete } from "@/utils/server_api/responses/success";
import type { NextRequest } from "next/server";

export async function DELETE(_: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	await new Promise((resolve) => setTimeout(resolve, 3000));

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
