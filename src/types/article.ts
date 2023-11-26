import { z } from "zod";

// TS type
export type Article = {
  readonly id: number;
  readonly uuid: string;
  title: string;
  content: string;
  description?: string;
  conclusion?: string;
};


// Zod schema
export const formCreateArticleSchema = z.object({
  title: z.string().min(2).max(30).trim(),
  content: z.string().refine(
    (richText) => {
      let isNodePopulate = false;

      const divElement = document.createElement("div");
      divElement.innerHTML = richText;
      
      isNodePopulate = divElement.firstChild?.textContent !== "";
      divElement.remove();

      // editor tiptap return <p></p> if empty
      return isNodePopulate;
    },
    { message: "Le contenu est requis" },
  ),
  description: z.string().max(200).trim().optional(),
  conclusion: z.string().max(200).trim().optional(),
});
