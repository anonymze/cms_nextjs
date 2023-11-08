import { z } from "zod";

export const formCreateArticleSchema = z.object({
  title: z.string().min(2).max(30),
  content: z.string().min(2).max(100),
  description: z.string().max(200).optional(),
  conclusion: z.string().max(200).optional(),
});
