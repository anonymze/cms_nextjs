import type { Article } from "@prisma/client";
import { api } from "../_config";
import type {
  ArticleI18n,
  formCreateArticleSchema,
} from "@/types/article";
import type { z } from "zod";
import type { QueryFunctionContext } from "@tanstack/react-query";


export async function getArticlesQuery({ queryKey }: QueryFunctionContext) {
  const searchParams = new URLSearchParams();
  const [, params] = queryKey;

  if (params?.page) searchParams.set("page", params.page);
  if (params?.lang) searchParams.set("lang", params.lang);

  const result = await api.get<ArticleI18n[]>(`articles?${searchParams.toString()}`);
  return result.data;
}

export async function getArticleQuery({ queryKey }: QueryFunctionContext) {
  const searchParams = new URLSearchParams();
  const [, params] = queryKey;

  if (!params?.slug) throw new Error("Slug is required");
  if (params?.lang) searchParams.set("lang", params.lang);

  const result = await api.get<ArticleI18n>(
    `articles/${params.slug}?${searchParams.toString()}`
  );
  return result.data;
}

export async function createArticleQuery(
  article: z.infer<typeof formCreateArticleSchema>
): Promise<Article> {
  const result = await api.post("articles", article);
  return result.data;
}

export async function deleteArticleQuery(articleId: Article["uuid"]) {
  const result = await api.delete(`articles/${articleId}`);
  return result.data;
}

export async function updateArticleQuery(
  article: { uuid: Article["uuid"] } & z.infer<typeof formCreateArticleSchema>
) {
  const { uuid, ...data } = article;
  const result = await api.patch(`articles/${uuid}`, data);
  return result.data;
}
