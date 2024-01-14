import type { formCreatePageSchema } from "@/types/page";
import { api } from "../_config";
import type { Page } from "@prisma/client";
import type { z } from "zod";

export async function getPagesQuery() {
  const result = await api.get<Omit<Page, "id">[]>("pages");
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

export async function updatePageQuery(articleId: Page["uuid"]) {
  const result = await api.patch(`pages/${articleId}`);
  return result.data;
}
