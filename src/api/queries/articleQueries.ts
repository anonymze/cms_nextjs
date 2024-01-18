import type { Article } from "@prisma/client";
import { api } from "../_config";
import type { ArticleI18n, ArticleI18ns, formCreateArticleSchema } from "@/types/article";
import type { z } from "zod";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { I18n } from "@/types/i18n";

export async function getArticlesQuery({ queryKey }: QueryFunctionContext) {
  const searchParams = new URLSearchParams();
  const [, params] = queryKey;

  if (params?.page) searchParams.set("page", params.page);

  const result = await api.get<ArticleI18n[]>(`articles?${searchParams.toString()}`);
  return result.data;
}

export async function getArticleQuery({ queryKey }: QueryFunctionContext) {
  const [, params] = queryKey;

  // if (params?.slug) throw new Error("Slug is required");

  const result = await api.get<ArticleI18ns>(`articles/${params.slug}`);
  return result.data;
}

export async function createArticleQuery(article: z.infer<typeof formCreateArticleSchema>) {
  const result = await api.post("articles", article);
  return result.data;
}

export async function deleteArticleQuery(articleId: Article["uuid"]) {
  const result = await api.delete(`articles/${articleId}`);
  return result.data;
}

export async function updateArticleQuery(
  article: { uuid: Article["uuid"] } & z.infer<typeof formCreateArticleSchema>,
) {
  const result = await api.patch(`articles/${article.uuid}`, article);
  return result.data;
}
