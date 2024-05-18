import { I18n } from "@/types/i18n";
import { formCreatePageSchema } from "@/types/page";
import { validateRequest } from "@/utils/server_api/requests/validate";
import { findManyWithLimit } from "@/utils/libs/prisma/server_helper";
import prisma from "@/utils/libs/prisma/single_instance";
import { jsonResponseBadRequest } from "@/utils/server_api/responses/errors";
import { jsonResponseGet, jsonResponsePost } from "@/utils/server_api/responses/successes";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(req: NextRequest) {
	const pages = (
		await findManyWithLimit(
			prisma.page,
			{
				select: {
					uuid: true,
					i18n: {
						select: {
							title: true,
							description: true,
							subtitle: true,
							lang: true
						},
						where: {
							lang: req.nextUrl.searchParams.get("lang") || I18n.DEFAULT,
						},
					},
				},
			},
			req.nextUrl.searchParams,
		)
	);

	return jsonResponseGet(pages);
}

export async function POST(req: NextRequest) {
	const { error, messageError, data } = await validateRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		formCreatePageSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

	const page = await prisma.page.create({
		data: {
			tag: data.tag,
			i18n: {
				create: {
					description: data.description,
					subtitle: data.subtitle,
					title: data.title,
					lang: data.lang || I18n.DEFAULT,
				},
			},
		},
	});

	return jsonResponsePost(page);
}
