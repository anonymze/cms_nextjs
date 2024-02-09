import { formCreateArticleSchema } from "@/types/article";
import { I18n } from "@/types/i18n";
import { validateRequest } from "@/utils/server_api/requests/validate";
import prisma from "@/utils/libs/prisma/single_instance";
import {
	jsonResponseNotFound,
	jsonResponseBadRequest,
	jsonResponseUnauthorized,
} from "@/utils/server_api/responses/errors";
import { jsonResponsePost, responseDelete, jsonResponsePatch } from "@/utils/server_api/responses/successes";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import { isActionAuthorized } from "@/utils/helper";
import type { NextRequest } from "next/server";
import { HierarchyRole } from "@/types/user";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(_: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	const article = await prisma.article.findUniqueOrThrow({
		select: {
			uuid: true,
			i18n: {
				select: {
					title: true,
					conclusion: true,
					description: true,
					content: true,
					lang: true,
				},
			},
		},
		where: {
			uuid,
		},
	});

	if (!article) return jsonResponseNotFound("Article not found");

	return jsonResponsePost(article);
}

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();

	// we delete the article (deleteMany does not throw if the article is not found)
	const { count } = await prisma.article.deleteMany({
		where: {
			uuid,
		},
	});

	if (count === 0) return jsonResponseNotFound("Article not found");

	return responseDelete();
}

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();

	// we verify the request and perform the update
	const { error, messageError, data } = await validateRequest(req, ACCEPTED_CONTENT_TYPE, formCreateArticleSchema);

	if (error) return jsonResponseBadRequest(messageError);

	// we verify the article exists
	const article = await prisma.article.findUnique({
		where: {
			uuid,
		},
	});

	if (!article) return jsonResponseNotFound("Article not found");

	let recordI18n = await prisma.article_I18n.findFirst({
		where: {
			article,
			lang: data.lang || I18n.DEFAULT,
		},
	});

	if (recordI18n) {
		recordI18n = await prisma.article_I18n.update({
			where: {
				id: recordI18n.id,
			},
			data: {
				title: data.title,
				description: data.description,
				conclusion: data.conclusion,
				content: data.content,
			},
		});
	} else {
		recordI18n = await prisma.article_I18n.create({
			data: {
				article: {
					connect: {
						uuid,
					},
				},
				...data,
				lang: data.lang || I18n.DEFAULT,
			},
		});
	}

	return jsonResponsePatch(recordI18n);
}
