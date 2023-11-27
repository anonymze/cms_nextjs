import type { Page } from "@/types/page";
import { api } from "./_config";
import type { Article } from "@/types/article";

export async function getPagesQuery() {
  const result = await api.get<Article[]>("articles");
  return result.data;
}

export async function createPageQuery(article: Omit<Page, "uuid" | "id">) {
  const result = await api.post("pages", article);
  return result.data;
}

export async function deletePageQuery(articleId: Page["uuid"]) {
  const result = await api.delete(`pages/${articleId}`);
  return result.data;
}

export async function updatePageQuery(articleId: Page["uuid"]) {
  const result = await api.patch(`pages/${articleId}`);
  return result.data;
}
