import { createMediaDetailsSchema } from "@/types/media_details";
import prisma from "@/utils/libs/prisma/single_instance";
import { validateRequest } from "@/utils/server_api/requests/validate";
import { jsonResponseBadRequest } from "@/utils/server_api/responses/errors";
import { jsonResponsePost } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function POST(req: NextRequest) {
	const { error, messageError, data } = await validateRequest(req, ACCEPTED_CONTENT_TYPE, createMediaDetailsSchema);

	if (error) return jsonResponseBadRequest(messageError);

	const mediaDetailsUUids: string[] = [];

	const { base, i18n } = getModels(data.entityAttached);

	// @ts-expect-error you can't infer dynamicly the prisma model, maybe a TS wizard can...
	const entity = await base.findUniqueOrThrow({
		where: { uuid: data.entityUuid },
	});

	// @ts-expect-error
	const entityI18n = await i18n.findFirstOrThrow({
		where: {
			lang: data.lang,
			[`${data.entityAttached}_id`]: entity.id,
		},
	});

	for await (const mediaId of data.mediaUuids) {
		const media = await prisma.media.findUnique({
			where: { uuid: mediaId },
		});

		if (!media) continue;

		const mediaDetails = await prisma.media_Details.create({
			data: {
				media_id: media.id,
				title: "",
				[`${data.entityAttached}_i18n_id`]: entityI18n.id,
			},
		});

		mediaDetailsUUids.push(mediaDetails.uuid);
	}

	return jsonResponsePost(mediaDetailsUUids);
}

const getModels = (modelName: string) => {
	switch (modelName) {
		case "page":
			return { base: prisma.page, i18n: prisma.page_I18n };
		case "article":
			return { base: prisma.article, i18n: prisma.article_I18n };
		default:
			throw new Error(`Unknown model: ${modelName}`);
	}
};