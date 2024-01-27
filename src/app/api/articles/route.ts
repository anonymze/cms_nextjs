import { articleSchema, type ArticleI18n } from "@/types/article";
import { I18n } from "@/types/i18n";
import { processRequest } from "@/utils/api/responses/response";
import { jsonResponseBadRequest } from "@/utils/api/responses/response_error";
import { jsonResponsePost } from "@/utils/api/responses/response_success";
import { findManyWithDefaults } from "@/utils/libs/prisma/find_many_defaults";
import prisma from "@/utils/libs/prisma/single_instance";
import type { Article } from "@prisma/client";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(req: NextRequest) {
	const articles = (
		await findManyWithDefaults(
			prisma.article,
			{
				select: {
					uuid: true,
					i18n: {
						select: {
							title: true,
							description: true,
							conclusion: true,
							content: true,
						},
					},
				},
				where: {
					i18n: {
						some: {
							// TODO we will get locale from the request
							lang: I18n.DEFAULT,
						},
					},
				},
			},
			req.nextUrl.searchParams,
		)
	).map((article) => ({
		uuid: article.uuid,
		title: article.i18n[0]?.title,
		description: article.i18n[0]?.description,
		conclusion: article.i18n[0]?.conclusion,
		content: article.i18n[0]?.content,
	}));

	return jsonResponsePost(articles);
}

export async function POST(req: NextRequest) {
	const { error, messageError, data } = await processRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		articleSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	const article = await prisma.article.create({
		data: {
			i18n: {
				create: {
					content: data.content,
					conclusion: data.conclusion,
					description: data.description,
					title: data.title,
					lang: data.lang || I18n.DEFAULT,
				},
			},
		},
	});

	return jsonResponsePost(article);
}
