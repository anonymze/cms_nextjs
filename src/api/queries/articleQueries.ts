import type { Article } from "@prisma/client";
import { api } from "../_config";

export async function getArticlesQuery() {
  const result = await api.get<Omit<Article, 'id'>[]>("articles");
  return result.data;
}

export async function createArticleQuery(article: Omit<Article, "uuid" | "id" | "createdAt">) {
  const result = await api.post("articles", article);
  return result.data;
}

export async function deleteArticleQuery(articleId: Article["uuid"]) {
  const result = await api.delete(`articles/${articleId}`);
  return result.data;
}

export async function updateArticleQuery(articleId: Article["uuid"]) {
  const result = await api.patch(`articles/${articleId}`);
  return result.data;
}
