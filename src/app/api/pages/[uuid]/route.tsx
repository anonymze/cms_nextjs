import { I18n } from "@/types/i18n";
import { formCreatePageSchema } from "@/types/page";
import { processRequest } from "@/utils/server-api/responses/response";
import { jsonResponseBadRequest, jsonResponseNotFound } from "@/utils/server-api/responses/response_error";
import {
	jsonResponsePatch,
	jsonResponsePost,
	responseDelete,
} from "@/utils/server-api/responses/response_success";
import prisma from "@/utils/libs/prisma/single_instance";
import type { NextRequest } from "next/server";

const ACCEPTED_CONTENT_TYPE = "application/json";

export async function GET(_: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!uuid) return jsonResponseNotFound("Page not found");

	const page = await prisma.page.findUnique({
		select: {
			uuid: true,
			i18n: {
				select: {
					title: true,
					description: true,
					subtitle: true,
					lang: true,
				},
			},
		},
		where: {
			uuid,
		},
	});

	if (!page) return jsonResponseNotFound("Page not found");

	return jsonResponsePost(page);
}

export async function DELETE(_: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!uuid) return jsonResponseNotFound("Page not found");

	const page = await prisma.page.findUnique({
		where: {
			uuid,
		},
	});

	if (!page) return jsonResponseNotFound("Page not found");

	// TODO setup rights, only admin should be able to delete users

	await prisma.page.delete({
		where: {
			uuid,
		},
	});

	return responseDelete();
}

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
	// we get the UUID from the URL params
	const uuid = params.uuid;

	if (!uuid) return jsonResponseNotFound("Page not found");

	const page = await prisma.page.findUnique({
		where: {
			uuid,
		},
	});

	if (!page) return jsonResponseNotFound("Page not found");

	const { error, messageError, data } = await processRequest(
		req,
		ACCEPTED_CONTENT_TYPE,
		formCreatePageSchema,
	);

	if (error) return jsonResponseBadRequest(messageError);

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
				...data,
				lang: data.lang || I18n.DEFAULT,
			},
		});
	}

	return jsonResponsePatch(recordI18n);
}
