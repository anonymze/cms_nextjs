import { z } from "zod";
import { I18n } from "./i18n";
import type { Article } from "@prisma/client";

export type ArticleI18n = {
  conclusion?: string;
  content: string;
  description?: string;
  title: string;
  uuid: Article["uuid"];
}

export type ArticleI18ns = { 
  uuid: Article["uuid"];
  i18n : Array<{
    lang: I18n;
    conclusion?: string;
    content: string;
    description?: string;
    title: string;
  }>;
}

// Zod schema
export const articleSchema = z.object({
  conclusion: z.string().max(400).trim().optional(),
  content: z.string().trim(),
  description: z.string().max(400).trim().optional(),
  title: z.string().min(2).max(30).trim(),
  lang: z.string().default(I18n.DEFAULT),
});

export const formCreateArticleSchema = articleSchema.refine(
  (data) => {
    // editor tiptap return <p></p> if empty, we have to check if the content has been populated
    return data.content !== "<p></p>";
  },

);


