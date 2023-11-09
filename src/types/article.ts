import { z } from "zod";

export const formCreateArticleSchema = z.object({
  title: z.string().min(2).max(30).trim(),
  content: z.custom<Element>().refine(
    (richText) => {
      let isNodePopulate = false;

      const divElement = document.createElement("div");
      divElement.innerHTML = richText;
      
      isNodePopulate = divElement.firstChild.textContent !== "";
      divElement.remove();

      // editor tiptap return <p></p> if empty
      return isNodePopulate;
    },
    { message: "Le contenu est requis" },
  ),
  description: z.string().max(200).trim().optional(),
  conclusion: z.string().max(200).trim().optional(),
});
