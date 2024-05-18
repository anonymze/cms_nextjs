import { I18n } from "@/types/i18n";
import { formCreatePageSchema } from "@/types/page";
import { validateRequest } from "@/utils/server_api/requests/validate";
import prisma from "@/utils/libs/prisma/single_instance";
import {
	jsonResponseNotFound,
	jsonResponseBadRequest,
	jsonResponseUnauthorized,
} from "@/utils/server_api/responses/errors";
import { responseDelete, jsonResponsePatch, jsonResponseGet } from "@/utils/server_api/responses/successes";
import { HierarchyRole } from "@/types/user";
import { isActionAuthorized } from "@/utils/helper";
import { getCurrentUser } from "@/utils/libs/clerk/server_helper";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(_: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	const page = await prisma.page.findUnique({
		select: {
			uuid: true,
			tag: true,
			i18n: {
				select: {
					title: true,
					description: true,
					subtitle: true,
					lang: true,
					media_details: {
						select: {
							uuid: true,
							legend: true,
							tag: true,
							title: true,
							media: {
								select: {
									uuid: true,
									filepath_public: true,
									filetype: true,									
								},
							},
						},
					}
				},
			},
		},
		where: {
			uuid,
		},
	});

	if (!page) return jsonResponseNotFound("Page not found");

	return jsonResponseGet(page);
}

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();

	// we delete the page (deleteMany does not throw if the page is not found)
	const { count } = await prisma.page.deleteMany({
		where: {
			uuid,
		},
	});

	if (count === 0) return jsonResponseNotFound("Page not found");

	return responseDelete();
}

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	// we check if the user is authorized to perform the action
	if (!isActionAuthorized(await getCurrentUser(req.cookies), HierarchyRole.USER)) return jsonResponseUnauthorized();

	// we verify the request
	const { error, messageError, data } = await validateRequest(req, ACCEPTED_CONTENT_TYPE, formCreatePageSchema);

	if (error) return jsonResponseBadRequest(messageError);

	// we verify the page exists
	const page = await prisma.page.findUnique({
		where: {
			uuid,
		},
	});

	if (!page) return jsonResponseNotFound("Page not found");

	let recordI18n = await prisma.page_I18n.findFirst({
		where: {
			page,
			lang: data.lang || I18n.DEFAULT,
		},
	});

	if (recordI18n) {
		recordI18n = await prisma.page_I18n.update({
			where: {
				id: recordI18n.id,
			},
			data: {
				page: {
					update: {
						tag: data.tag,
					}
				},
				description: data.description,
				title: data.title,
				subtitle: data.subtitle,
			},
		});
	} else {
		recordI18n = await prisma.page_I18n.create({
			data: {
				page: {
					connect: {
						uuid,
					},
				},
				description: data.description,
				title: data.title,
				subtitle: data.subtitle,
				lang: data.lang || I18n.DEFAULT,
			},
		});

		await prisma.page.update({
			where: {
				uuid,
			},
			data: {
				tag: data.tag,
			},
		});
	}

	return jsonResponsePatch(recordI18n);
}
