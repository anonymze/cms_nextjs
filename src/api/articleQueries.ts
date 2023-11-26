import { api } from "./_config";
import type { Article } from "@/types/article";

export async function getArticlesQuery() {
  const result = await api.get<Article[]>("articles");
  return result.data;
}

export async function createArticleQuery(article: Omit<Article, "uuid" | "id">) {
  const result = await api.post("articles", article);
  return result.data;
}

export async function deleteArticleQuery(uploadId: Article["uuid"]) {
  const result = await api.delete(`articles/${uploadId}`);
  return result.data;
}

export async function updateArticleQuery(uploadId: Article["uuid"]) {
  const result = await api.patch(`articles/${uploadId}`);
  return result.data;
}
