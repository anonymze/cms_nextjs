import { type PageI18n, type PageI18ns, type formCreatePageSchema } from "@/types/page";
import { api } from "../_config";
import type { Page } from "@prisma/client";
import type { z } from "zod";
import type { QueryFunctionContext } from "@tanstack/react-query";

export async function getPagesQuery({ queryKey }: QueryFunctionContext) {
	const searchParams = new URLSearchParams();
	const [, params] = queryKey;

	if (params?.page) searchParams.set("page", params.page);

	const result = await api.get<PageI18n[]>(`pages?${searchParams.toString()}`);
	return result.data;
}

export async function getPageQuery({ queryKey }: QueryFunctionContext) {
	const [, params] = queryKey;

	if (!params?.slug) throw new Error("Slug is required");

	const result = await api.get<PageI18ns>(`pages/${params.slug}`);
	return result.data;
}

export async function createPageQuery(article: z.infer<typeof formCreatePageSchema>) {
	const result = await api.post("pages", article);
	return result.data;
}

export async function deletePageQuery(articleId: Page["uuid"]) {
	const result = await api.delete(`pages/${articleId}`);
	return result.data;
}

export async function updatePageQuery(
	page: { uuid: Page["uuid"] } & z.infer<typeof formCreatePageSchema>,
) {
	const { uuid, ...data } = page;
	const result = await api.patch(`pages/${uuid}`, data);
	return result.data;
}
