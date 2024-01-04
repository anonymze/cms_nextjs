import { z } from "zod";
import type { Article } from "@prisma/client";

// Zod schema
export type ArticleZodType = z.infer<typeof articleSchema>;

export const articleSchema = z.object({
  content: z.custom<Article["content"]>(),
  conclusion: z.string().max(200).trim().optional(),
  description: z.string().max(200).trim().optional(),
  title: z.string().min(2).max(30).trim(),
});

export const formCreateArticleSchema = articleSchema.refine(
  (data) => {
    // editor tiptap return <p></p> if empty, we have to check if the content has been populated
    const divElement = document.createElement("div");
    divElement.innerHTML = data.content;

    const isNodePopulate = divElement.firstChild?.textContent !== "";
    divElement.remove();

    return !!isNodePopulate;
  },
  { message: "Le contenu est requis" },
);
