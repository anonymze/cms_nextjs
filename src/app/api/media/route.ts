import { mediaSchema } from "@/types/media";
import { manageFiles } from "@/utils/server_api/file_resolving";
import { validateRequest } from "@/utils/server_api/requests/validate";
import prisma from "@/utils/libs/prisma/single_instance";
import { jsonResponseBadRequest } from "@/utils/server_api/responses/errors";
import { jsonResponseGet, jsonResponsePost } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "multipart/form-data";

export async function GET() {
	return jsonResponseGet(
		await prisma.media.findMany({
			select: {
				uuid: true,
				filepath_public: true,
				filetype: true,
			},
		}),
	);
}

export async function POST(req: NextRequest) {
	const { error, messageError, data } = await validateRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		mediaSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	const { error: errorFile, filesEntity } = await manageFiles(data.files);

	if (errorFile) return jsonResponseBadRequest("Un des fichiers n'a pas pu être créé");

	return jsonResponsePost(filesEntity);
}
