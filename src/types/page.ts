import { z } from "zod";

// Zod schema
export type PageZodType = z.infer<typeof pageSchema>;

export const pageSchema = z.object({
  description: z.string().min(2).max(100).trim(),
  subtitle: z.string().min(2).max(30).trim().optional(),
  title: z.string().min(2).max(30).trim(),
});

export const formCreatePageSchema = pageSchema;
