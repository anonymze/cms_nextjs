import { z } from "zod";
import { I18n } from "./i18n";

export type ArticleI18n = {
  conclusion?: string;
  content: string;
  description?: string;
  title: string;
  uuid: string
}

// Zod schema
export type ArticleZodType = z.infer<typeof articleSchema>;

export const articleSchema = z.object({
  conclusion: z.string().max(200).trim().optional(),
  content: z.string().trim(),
  description: z.string().max(200).trim().optional(),
  title: z.string().min(2).max(30).trim(),
  lang: z.string().default(I18n.DEFAULT),
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
