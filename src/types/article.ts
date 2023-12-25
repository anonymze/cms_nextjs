import { z } from "zod";

// TS type
export type Article = {
  readonly id: number;
  readonly uuid: string;
  title: string;
  // should start with <?> and end with </?>
  content: `<${string}>${string}</${string}>`;
  description?: string;
  conclusion?: string;
};

// Zod schema
export type ArticleZodType = z.infer<typeof articleSchema>;

export const articleSchema = z.object({
  conclusion: z.string().max(200).trim().optional(),
  content: z.custom<Article['content']>(),
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
